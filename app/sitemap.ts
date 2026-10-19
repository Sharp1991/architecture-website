import { MetadataRoute } from "next";
import { metaData } from "./lib/config";

const BaseUrl = metaData.baseUrl.endsWith("/")
  ? metaData.baseUrl
  : `${metaData.baseUrl}/`;

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "robots.txt"].filter((route) => route !== "robots.txt");

  return routes.map((route) => ({
    url: `${BaseUrl}${route}`,
    lastModified: new Date(),
  }));
}
