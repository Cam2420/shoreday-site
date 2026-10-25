import imageRecords from "./nassau-directory-images.json";

export type DirectoryImage = {
  src: string;
  alt: string;
  title: string;
  width: number;
  height: number;
  author: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  captured: string;
  retrieved: string;
  changes: string;
};
export const DIRECTORY_IMAGES = imageRecords as Record<string, DirectoryImage>;
