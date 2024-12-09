export interface UnsplashReturnType {
  id: string;
  slug: string;

  created_at: string;
  updated_at: string;

  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;

  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
}
