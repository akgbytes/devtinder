import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB" },
  }).onUploadComplete(({ file }) => {
    // do something here if required
  }),
} satisfies FileRouter;

export type FileRouterType = typeof fileRouter;
