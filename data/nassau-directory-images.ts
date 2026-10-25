import imageRecords from "./nassau-directory-images.json";

export type DirectoryImage = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  sourceUrl: string;
  captured: string;
  retrieved: string;
  changes: string;
  displayScale?: number;
} & (
  | {
      sourceType?: "licensed";
      author: string;
      license: string;
      licenseUrl: string;
    }
  | {
      sourceType: "user-supplied";
      credit: string;
      provenance: string;
    }
);
export const DIRECTORY_IMAGES = imageRecords as Record<string, DirectoryImage>;
