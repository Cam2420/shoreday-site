import imageRecords from "./nassau-directory-images.json";

export type DirectoryImage = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  captured: string;
  retrieved: string;
  changes: string;
  displayScale?: number;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  /** Serve a pre-sized display asset directly instead of resizing it on request. */
  unoptimized?: boolean;
} & (
  | {
      sourceType?: "licensed";
      sourceUrl: string;
      author: string;
      license: string;
      licenseUrl: string;
    }
  | {
      sourceType: "user-supplied";
      sourceUrl?: string;
      credit: string;
      provenance: string;
    }
);
export const DIRECTORY_IMAGES = imageRecords as Record<string, DirectoryImage>;
