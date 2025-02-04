import { createClient } from "@supabase/supabase-js";

const bucket = "wandernest"; // this name need to match with your bucket name.

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const uploadImage = async (image: File) => {
  const timestamp = Date.now();
  // const newName = `/users/${timestamp}-${image.name}`;
  const newName = `${timestamp}-${image.name}`; // Create unique name

  //   storing our image in the supabase bucket
  const { data } = await supabase.storage.from(bucket).upload(newName, image, {
    cacheControl: "3600",
  });

  if (!data) throw new Error("Image upload failed");
  //   get and return the public url of the image after saving so we can save it in our db and retrieve later.
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
