import { PortableText } from "@portabletext/react";
import type { ReactNode } from "react";

import { urlFor } from "@web/lib/sanity";

function extractYouTubeId(url = "") {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([^&]+)/,
    /(?:youtu\.be\/)([^?&/]+)/,
    /(?:youtube\.com\/embed\/)([^?&/]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

function resolveFigureAltText(rawAlt: unknown) {
  const normalized = typeof rawAlt === "string" ? rawAlt.trim() : "";
  if (!normalized) return "";
  if (normalized.toLowerCase() === "placeholder") return "";
  return normalized;
}

const components = {
  marks: {
    link({
      value,
      children,
    }: {
      value?: { href?: string; openInNewTab?: boolean };
      children: ReactNode;
    }) {
      const href = value?.href;
      if (!href) return <span>{children}</span>;
      const openInNewTab = value?.openInNewTab === true;
      return (
        <a
          href={href}
          target={openInNewTab ? "_blank" : undefined}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    figure: ({ value }: { value?: any }) => {
      const imageUrl = value ? urlFor(value)?.width(1400).fit("max").url() : null;
      if (!imageUrl) return null;
      return (
        <figure className="portableFigure">
          <img src={imageUrl} alt={resolveFigureAltText(value?.alt)} loading="lazy" />
          {value?.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      );
    },
    youtube: ({ value }: { value?: { url?: string } }) => {
      const id = extractYouTubeId(value?.url || "");
      if (!id) return null;
      return (
        <div className="portableYoutube">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    },
  },
};

export function PortableTextContent({ value }: { value?: unknown }) {
  if (!value) return null;
  return <PortableText value={value as any} components={components} />;
}

export function blocksToText(blocks: any[] | null | undefined) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) => block.children.map((child: any) => child.text).join(""))
    .join(" ");
}
