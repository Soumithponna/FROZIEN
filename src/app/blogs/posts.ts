export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO string
  image: string;
  tags: string[];
  content: string[]; // paragraphs
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "behind-the-layers",
    title: "Behind the Layers",
    excerpt: "A look at textures, toppings, and the transparent-cup aesthetic.",
    date: "2025-07-18",
    image: "/layer.png",
    tags: ["design", "layers"],
    content: [
      "Layers aren’t just for looks. Each tier balances texture, sweetness, and temperature to create a spoon-by-spoon experience.",
      "The transparent cup is intentional — it communicates honesty in sourcing and the pleasure of anticipation as you see what’s next.",
      "We test for flow: how toppings settle, how creams hold shape, and how every bite maintains interest without overwhelming the palate.",
    ],
  },
  {
    slug: "low-calorie-sweeteners",
    title: "Low-Calorie Sweeteners We Trust",
    excerpt: "How we balance sweetness with a light calorie profile.",
    date: "2025-07-02",
    image: "/seen.png",
    tags: ["nutrition", "ingredients"],
    content: [
      "Sweetness is chemistry and perception. We blend low-calorie options to avoid aftertastes and keep a rounded profile.",
      "The goal: satisfy cravings while preserving macros. That means careful dosing and complementary flavors to let the base shine.",
      "We iterate often and taste blind, favoring ingredients that keep things light without compromising texture.",
    ],
  },
];

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}

export function findPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}


