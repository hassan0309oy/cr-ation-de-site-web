import { createFileRoute } from "@tanstack/react-router";
import { Shop } from "@/components/Shop";
import { T } from "@/config/site";

export const Route = createFileRoute("/fr")({
  head: () => ({ meta: [
    { title: T.fr.title }, { name: "description", content: T.fr.metaDesc },
    { property: "og:title", content: T.fr.title }, { property: "og:description", content: T.fr.metaDesc },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <Shop lang="fr" />,
});
