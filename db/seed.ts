import { getDb } from "../api/queries/connection";
import { projects, posts } from "./schema";

/**
 * Seeds SAMPLE portfolio projects and articles so the site demonstrates its
 * intended structure. All rows are flagged sample=true and labelled
 * "Sample concept" in the UI — replace with real, approved work before launch.
 */
async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  await db.insert(projects).values([
    {
      slug: "sample-warm-minimal-living",
      title: "Warm Minimal Living — Sample Concept",
      category: "living-rooms",
      status: "concept",
      location: "Chennai",
      scope: "Living and dining interior concept",
      concept:
        "A warm minimalist concept built around natural oak slats, charcoal tones and soft layered evening light.",
      materials: "Oak veneer, matte laminate, textured fabric, warm LED",
      coverImage: "/images/living-room.jpg",
      featured: true,
      sample: true,
    },
    {
      slug: "sample-handleless-modular-kitchen",
      title: "Handleless Modular Kitchen — Sample Concept",
      category: "kitchens",
      status: "concept",
      location: "Chennai",
      scope: "Modular kitchen concept",
      concept:
        "A charcoal and walnut modular kitchen concept with handleless fronts, brass detailing and task lighting.",
      materials: "Matte acrylic, walnut laminate, quartz, brass",
      coverImage: "/images/kitchen.jpg",
      featured: true,
      sample: true,
    },
    {
      slug: "sample-calm-master-bedroom",
      title: "Calm Master Bedroom — Sample Concept",
      category: "bedrooms",
      status: "concept",
      location: "Chennai",
      scope: "Bedroom and wardrobe concept",
      concept:
        "A serene bedroom concept with warm textiles, veneer wardrobes and diffused dusk lighting.",
      materials: "Wood veneer, bouclé fabric, warm LED cove",
      coverImage: "/images/bedroom.jpg",
      featured: true,
      sample: true,
    },
    {
      slug: "sample-boutique-workspace",
      title: "Boutique Workspace — Sample Concept",
      category: "offices",
      status: "concept",
      location: "Chennai",
      scope: "Office fit-out concept",
      concept:
        "A compact office concept planned around focus zones, acoustic comfort and a confident brand palette.",
      materials: "Acoustic panels, oak desks, glass partitions",
      coverImage: "/images/office.jpg",
      featured: true,
      sample: true,
    },
    {
      slug: "sample-retail-gallery-store",
      title: "Retail Gallery Store — Sample Concept",
      category: "retail",
      status: "concept",
      location: "Chennai",
      scope: "Retail interior concept",
      concept:
        "A gallery-like retail concept with focused spotlights and quiet display plinths.",
      materials: "Polished concrete, charcoal walls, oak shelving",
      coverImage: "/images/retail.jpg",
      featured: false,
      sample: true,
    },
    {
      slug: "sample-evening-restaurant",
      title: "Evening Restaurant — Sample Concept",
      category: "commercial",
      status: "concept",
      location: "Chennai",
      scope: "Restaurant interior concept",
      concept:
        "A moody dining concept with amber pendant lighting, leather banquettes and charcoal walls.",
      materials: "Leather, stained wood, smoked mirror, warm metal",
      coverImage: "/images/restaurant.jpg",
      featured: false,
      sample: true,
    },
  ]);

  await db.insert(posts).values([
    {
      slug: "sample-planning-home-interiors-chennai",
      title: "How to Plan Your Home Interiors — Sample Article",
      excerpt:
        "A sample article outlining the questions homeowners should answer before starting an interior project.",
      content:
        "Sample article content.\n\nBefore you speak to any interior team, write down how you actually live: cooking habits, storage pain points, who works from home, and how you entertain. These answers shape the layout far more than any style image.\n\nNext, decide a realistic budget band and a target move-in window. A good design team will help you prioritise — kitchens and wardrobes first, loose furniture later.\n\nThis sample article will be replaced with editorial content approved by HILIGHT BUILDERS.",
      category: "Home Interiors",
      coverImage: "/images/blueprint.jpg",
      published: true,
      sample: true,
    },
    {
      slug: "sample-modular-kitchen-decisions",
      title: "Five Decisions That Shape a Modular Kitchen — Sample Article",
      excerpt:
        "A sample article on the choices that matter most in a modular kitchen: layout, shutters, counters, hardware and lighting.",
      content:
        "Sample article content.\n\n1. Layout follows the cook, not the catalogue. 2. Shutter finish decides maintenance. 3. Countertop material decides longevity. 4. Hardware decides how the kitchen feels every single day. 5. Lighting decides whether the kitchen works at night.\n\nThis sample article will be replaced with editorial content approved by HILIGHT BUILDERS.",
      category: "Kitchens",
      coverImage: "/images/kitchen.jpg",
      published: true,
      sample: true,
    },
    {
      slug: "sample-office-interior-planning",
      title: "Planning an Office Fit-Out Around Your Team — Sample Article",
      excerpt:
        "A sample article on aligning workspace layout with workflow, brand and opening schedules.",
      content:
        "Sample article content.\n\nStart with headcount and workflow, not furniture. Map how teams collaborate, where quiet focus is needed, and what clients see first. Then fix the opening date and work backwards through design, approvals and execution.\n\nThis sample article will be replaced with editorial content approved by HILIGHT BUILDERS.",
      category: "Commercial",
      coverImage: "/images/office.jpg",
      published: true,
      sample: true,
    },
  ]);

  console.log("Done.");
  process.exit(0);
}

seed();
