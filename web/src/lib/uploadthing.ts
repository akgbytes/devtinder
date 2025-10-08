import { BASE_URL } from "@/constants";
import { generateReactHelpers } from "@uploadthing/react";

export const { useUploadThing, uploadFiles } = generateReactHelpers<any>({
  url: `${BASE_URL}/uploadthing`,
});
