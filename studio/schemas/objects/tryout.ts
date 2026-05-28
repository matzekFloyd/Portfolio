export default {
  name: "tryout",
  title: "Tryout",
  type: "object",
  description:
    'Configure an interactive demo for this project. When enabled, a "Try it" CTA appears on the project page and the demo is embedded at /try/<slug>.',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: "enabled",
      title: "Enable tryout",
      type: "boolean",
      description:
        'Toggles the "Try it" CTA on /project/<slug> and generates the /try/<slug> route on the next site build.',
      initialValue: false,
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      description:
        "Public URL of the demo. Will be embedded in an iframe (or opened in a new tab in External mode). Some sites set X-Frame-Options or frame-ancestors and refuse to be framed — use External mode for those.",
      hidden: ({ parent }) => !parent?.enabled,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const enabled = context?.parent?.enabled;
          if (!enabled) return true;
          if (!value) return "URL is required when the tryout is enabled";
          try {
            const parsed = new URL(value);
            if (!["http:", "https:"].includes(parsed.protocol)) {
              return "URL must use http or https";
            }
          } catch {
            return "Must be a valid absolute URL";
          }
          return true;
        }),
    },
    {
      name: "mode",
      title: "Mode",
      type: "string",
      description:
        '"Embedded" renders an iframe on /try/<slug>. "External" only renders a link that opens the URL in a new tab.',
      hidden: ({ parent }) => !parent?.enabled,
      options: {
        list: [
          { title: "Embedded (iframe)", value: "embedded" },
          { title: "External (new tab)", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "embedded",
    },
    {
      name: "description",
      title: "Description",
      type: "string",
      description:
        "Optional short blurb shown above the iframe. Falls back to the project excerpt / site description.",
      hidden: ({ parent }) => !parent?.enabled,
    },
    {
      name: "allowFullscreen",
      title: "Allow fullscreen",
      type: "boolean",
      hidden: ({ parent }) => !parent?.enabled || parent?.mode === "external",
      initialValue: true,
    },
    {
      name: "aspectRatio",
      title: "Aspect ratio",
      type: "string",
      description:
        'Aspect ratio of the embedded iframe. Use "Auto" for sites that should fill the available height.',
      hidden: ({ parent }) => !parent?.enabled || parent?.mode === "external",
      options: {
        list: [
          { title: "16:9", value: "16:9" },
          { title: "4:3", value: "4:3" },
          { title: "Auto (fill)", value: "auto" },
        ],
        layout: "radio",
      },
      initialValue: "16:9",
    },
  ],
};
