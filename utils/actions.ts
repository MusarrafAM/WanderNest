"use server";

import {
  createReviewSchema,
  imageSchema,
  profileSchema,
  propertySchema,
  validateWithZodSchema,
} from "./schemas";
import db from "./db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { uploadImage } from "./supabase";
import { warnOnce } from "@prisma/client/runtime/library";
import { it } from "node:test";
import { calculateTotals } from "./calculateTotals";

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

export const updateProfileImageAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  try {
    const image = formData.get("image") as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);

    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });
    revalidatePath("/profile"); // to show the updated image right away.
    return { message: "Profile image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File;

    // we don't have image validation on propertySchema. so validatedFields won't have the image filed.
    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    const validatedFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validatedFile.image); // upload image to supabase.

    await db.property.create({
      data: {
        ...validatedFields,
        image: fullPath,
        profileId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/");
};

export const fetchProperties = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  const properties = await db.property.findMany({
    // if the search is undefined nothing will be fetched thats why we put empty string as a default value.
    // even though we don't pass any category or search, Since we put empty string for search where will be applied for that.
    where: {
      category, // this is short for  category:category
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { tagline: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      // instead of getting all the data related to the property fetch only the needed ones.
      id: true,
      name: true,
      tagline: true,
      country: true,
      image: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc", // newest property will come first.
    },
  });
  return properties;
};

export const fetchFavoriteId = async ({ propertyId }: { propertyId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      propertyId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { propertyId, favoriteId, pathname } = prevState; // this prevStave value can be accessed since we used bind method on action (FavoriteToggleForm).

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    // Since we will use this action in multiple palaces(home, favorite page)
    // we need to get pathname and revalidate it. (if just only one path we can just hard coded it, but here its not.)
    revalidatePath(pathname);
    return { message: favoriteId ? "Removed from Faves" : "Added to Faves" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    // We only get favorite's id, profileId, and propertyId from this.
    // We are only selecting the related `property` fields.
    //! Very Important:
    //! Since we defined a relation between `Favorite` and `Property` in the schema,
    //! we can access the related `Property` fields inside `select`.
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          price: true,
          country: true,
          image: true,
        },
      },
    },
  });
  // structure the rerun data same as fetchProperty details so we can reuse this
  return favorites.map((favorite) => favorite.property);
};

export const fetchPropertyDetails = (id: string) => {
  return db.property.findUnique({
    where: {
      id,
    },

    // The `include` option is used to fetch related data along with the main record.
    // - `profile: true` ensures that the related `profile` data (e.g., owner or agent details) is included.
    // - `select` is used when you want to fetch only specific fields from a table.
    // - `include` is used to add related records along with the fetched one.
    include: {
      profile: true,
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
    },
  });
};

export async function createReviewAction(prevState: any, formData: FormData) {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(createReviewSchema, rawData);
    await db.review.create({
      data: {
        ...validatedFields,
        profileId: user.id,
      },
    });
    revalidatePath(`/properties/${validatedFields.propertyId}`);
    return { message: "Review submitted successfully" };
  } catch (error) {
    return renderError(error);
  }
}

export async function fetchPropertyReviews(propertyId: string) {
  const reviews = await db.review.findMany({
    where: {
      propertyId, //propertyId:propertyId
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
}

export const fetchPropertyReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      property: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        profileId: user.id,
      },
    });

    revalidatePath("/reviews");
    return { message: "Review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export async function fetchPropertyRating(propertyId: string) {
  const result = await db.review.groupBy({
    by: ["propertyId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      propertyId,
    },
  });

  // empty array if no reviews
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
}

export const findExistingReview = async (userId: string, propertyId: string) => {
  //! We are using findFirst
  return db.review.findFirst({
    where: {
      profileId: userId,
      propertyId: propertyId,
    },
  });
};

//! Since we are using bind we need to use prevState
export const createBookingAction = async (prevState: {
  propertyId: string;
  checkIn: Date;
  checkOut: Date;
}) => {
  const user = await getAuthUser();

  const { propertyId, checkIn, checkOut } = prevState;
  //! we are getting the price from the database using the property in in server
  const property = await db.property.findUnique({
    where: { id: propertyId },
    select: { price: true },
  });
  if (!property) {
    return { message: "Property not found" };
  }
  const { orderTotal, totalNights } = calculateTotals({
    checkIn,
    checkOut,
    price: property.price,
  });

  try {
    const booking = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        orderTotal,
        totalNights,
        profileId: user.id,
        propertyId,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect("/bookings");
};

export const fetchBookings = async () => {
  const user = await getAuthUser();
  const bookings = await db.booking.findMany({
    where: {
      profileId: user.id,
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          country: true,
        },
      },
    },
    orderBy: {
      checkIn: 'desc',
    },
  });
  return bookings;
};

export async function deleteBookingAction(prevState: { bookingId: string }) {
  const { bookingId } = prevState;
  const user = await getAuthUser();

  try {
    const result = await db.booking.delete({
      where: {
        id: bookingId,
        profileId: user.id,
      },
    });

    revalidatePath('/bookings');
    return { message: 'Booking deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
}