"use server";

import { profileSchema, validateWithZodSchema } from "./schemas";
import db from "./db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// this getAuthUser helper function, we only use in this file for not export.
// this will get the current suer from clerk, if no user throw error.
// if user don't have metadata added to the clerk, which means, not create a profile in the app it will redirect there.
// So whenever we access protected route action we can use the getAuthUser helper function to redirect.
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

// Since we use the same way to handle error, so DRY we create this renderError. we can use this in upcoming actions this render Error.
const renderError = (error: unknown): { message: string } => {
  // initially we  don't the the type of the error thats why unknown.
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

// to tell that this is a server action we need to put the "use server" at the start of the function.
// server actions should be async
//! if we make a file for actions like this we can put "use server" then no need to use the text inn every server action.
export const createProfileAction = async (prevState: any, formData: FormData) => {
  //"use server"; // since we mark this file as "use server" no need to specify each function like this.

  try {
    const user = await currentUser(); //getting the user details from clerk (profile image, name ,email, userId of clerk.).
    if (!user) throw new Error("Please login to create a profile");

    //   const firstName = formData.get("firstName") as string;
    const rawData = Object.fromEntries(formData); // all form data as object in one line.
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    // create User
    await db.profile.create({
      data: {
        clerkId: user.id, // if we don'y put the if (!user), there should be ts error warning here, now the ts know the user exist so no warning.
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validatedFields,
      },
    });

    //! Add metadata to the clerk after successful profile creation in th app.
    // after successful login we can go to clerk and select a specific user and under private metadata we can see this hasProfile: true.
    // This will be very useful later in 1. can quickly check if a user has completed profile creation. (no need to check in database query)
    // 2. Conditional UI Rendering, Redirecting users to a profile setup page if they haven't completed their profile.
    // 3. Custom Access Control, If certain app features require a completed profile, you can check hasProfile in middleware or API routes to restrict access.
    // 4.Persistent User Data Across Sessions, Clerk metadata persists across sessions and remains associated with the user, making it useful for long-term tracking without relying on your app's database every time.
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
  } catch (error) {
    // return {
    //   message: error instanceof Error ? error.message : "An error occurred",
    // };
    return renderError(error); //above is the same as renderError.
  }
  redirect("/");
};

// in profile creation we got the image url from clerk and store in the db.
export const fetchProfileImage = async () => {
  const user = await currentUser(); //with this we can get the current login user clerk user Id.
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;
};

// get the login user details from this function,
// if no profile created in our app it redirect to create profile page.
export const fetchProfile = async () => {
  const user = await getAuthUser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id, // ts now knows that the should be existed in here since we throw the error if no user in the getAuthUser function.
    },
  });
  if (!profile) return redirect("/profile/create");
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);

    //! validating like this in each action is somewhat bad (DRY). so we need to create a helper function
    //! it will take the schema and raw data , and returns the data if its valid and return the errors if it's not.
    // we are going to use safeparse instead of parse from  here, so it won't throw error, we need to throw our error.
    // const validatedFields = profileSchema.safeParse(rawData);

    // if (!validatedFields.success) {
    //   const errors = validatedFields.error.errors.map((error) => error.message);
    //   throw new Error(errors.join(",")); // throwing our ouw error with only error names.
    // }

    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });
    revalidatePath("/profile");
    return { message: "Profile updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};
