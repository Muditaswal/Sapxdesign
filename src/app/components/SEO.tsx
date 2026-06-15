import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

export function SEO({
  title,
  description,
  keywords = "Space and Product Studio, Architecture Design Studio, Interior Design Consultancy, Product Design Studio, UX Design Agency, UI UX Design Services",
  canonical,
  ogType = "website",
  ogImage = "https://sapxdesign.com/og-image.jpg",
  schema
}: SEOProps) {
  const location = useLocation();
  const currentUrl = canonical || `https://sapxdesign.com${location.pathname}${location.hash || ""}`;

  useEffect(() => {
    // 1. Dynamic Page Titles
    document.title = title;

    // Helper to set or create meta tags
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to set link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // 2. Dynamic Meta Descriptions
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);

    // 3. Canonical URLs
    setLinkTag("canonical", currentUrl);

    // 4. Open Graph Tags
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", currentUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", ogImage);

    // 5. Twitter Card Tags
    setMetaTag("property", "twitter:card", "summary_large_image");
    setMetaTag("property", "twitter:url", currentUrl);
    setMetaTag("property", "twitter:title", title);
    setMetaTag("property", "twitter:description", description);
    setMetaTag("property", "twitter:image", ogImage);

    // 6. Structured Data (JSON-LD)
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"].dynamic-schema');
    existingScripts.forEach((s) => s.remove());

    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      schemas.forEach((schemaObj) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.className = "dynamic-schema";
        script.text = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }
  }, [title, description, keywords, currentUrl, ogType, ogImage, schema]);

  return null;
}
