export type BookPageLayout = "grid2" | "grid3" | "heroPlusThumbs" | "fullMedia" | "message";
export type PageMediaType = "photo" | "video";

export interface PageData {
  pageNumber: number;
  photos: string[];
  memory: string;
  date: string;
  layout?: BookPageLayout;
  pageTitle?: string;
  mediaType?: PageMediaType;
  video?: string;
}

export interface AlbumConfig {
  pages: PageData[];
  title: string;
  subtitle: string;
}
