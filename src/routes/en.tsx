import { createFileRoute } from "@tanstack/react-router";
import { Shop } from "@/components/Shop";
import { T } from "@/config/site";

export const Route = createFileRoute("/en")({
  head: () => ({ meta: [
    { title: T.en.title }, { name: "description", content: T.en.metaDesc },
    { property: "og:title", content: T.en.title }, { property: "og:description", content: T.en.metaDesc },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <Shop lang="en" />,
});
