"use server";
import { UnsplashReturnType } from "../types/unsplash-return-type";

export const getUnsplashImage = async (query: string, page: number) => {
  if (!query) {
    return {
      message: "No query provided",
      success: false,
    };
  }
  try {
    const response = await fetch(
      `${process.env.UNSPLASH_URL}/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${encodeURIComponent(query)}&page=${page}&per_page=12`,
      {
        method: "GET",
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          "Accept-Version": "v1",
        },
      },
    );

    if (!response.ok) {
      return {
        message: "Failed to fetch images",
        success: false,
        status: response.status,
      };
    }

    const data = await response.json();

    if (data.results.length === 0) {
      return {
        message: "No images found",
        success: false,
      };
    }

    const filteredData: UnsplashReturnType[] = data.results.map(
      (item: UnsplashReturnType) => ({
        id: item.id,
        slug: item.slug,
        created_at: item.created_at,
        updated_at: item.updated_at,
        width: item.width,
        height: item.height,
        color: item.color,
        blur_hash: item.blur_hash,
        description: item.description,
        alt_description: item.alt_description,
        urls: {
          raw: item.urls.raw,
          full: item.urls.full,
          regular: item.urls.regular,
          small: item.urls.small,
          thumb: item.urls.thumb,
          small_s3: item.urls.small_s3,
        },
        links: {
          self: item.links.self,
          html: item.links.html,
          download: item.links.download,
          download_location: item.links.download_location,
        },
      }),
    );

    return {
      results: filteredData,
      total: data.total,
      total_pages: data.total_pages,
      page: page,
      per_page: 12,
      success: true,
    };
  } catch (error) {
    console.error("Unsplash API error:", error);
    return {
      message: "Error fetching image",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
