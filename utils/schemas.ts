import * as z from "zod";
import { ZodSchema } from "zod";

export const profileSchema = z.object({
  // firstName: z.string().max(5, { message: 'max length is 5' }),
  firstName: z.string().min(2, { message: "first name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "last name must be at least 2 characters" }),
  username: z.string().min(2, { message: "username must be at least 2 characters" }),
});

// this helper function
//! validating like this in each action is somewhat bad (DRY). so we need to create a helper function
//! it will take the schema and raw data , and returns the data if its valid and return the errors if it's not.
export function validateWithZodSchema<T>(schema: ZodSchema<T>, data: unknown): T {
  // safeParse don't throw the error it give the success and flag(bool), and data we need to handle the error.
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);

    throw new Error(errors.join(", "));
  }
  return result.data;
}

export const imageSchema = z.object({
  image: validateFile(),
});

// this is a helper function
function validateFile() {
  const maxUploadSize = 1024 * 1024; // 1MB
  const acceptedFileTypes = ["image/"];
  return z
    .instanceof(File)
    .refine((file) => {
      // refine helps to define our custom validations
      return !file || file.size <= maxUploadSize;
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return !file || acceptedFileTypes.some((type) => file.type.startsWith(type));
    }, "File must be an image");
}
