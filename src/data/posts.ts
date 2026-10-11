export interface PostItem {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string;
  published: boolean;
  sample?: boolean;
  createdAt?: string | Date;
}

export const POSTS: PostItem[] = [
  {
    slug: "planning-home-interiors-chennai",
    title: "How to Plan Your Home Interiors in Chennai: From Budget to Handover",
    excerpt:
      "A strategic guide outlining the questions homeowners must answer before starting an interior project, avoiding budget creeps and execution delays.",
    content: `Before you speak to any interior team, write down how you actually live: cooking habits, storage requirements, who works from home, and how you entertain guests. These functional answers shape the spatial layout far more than any Pinterest board.

### 1. Fix the Core Functions First
Prioritize the high-traffic zones:
- **Modular Kitchen**: Choose moisture-resistant BWP marine ply carcass and durable quartz surfaces suited for Indian cooking.
- **Wardrobes**: Plan internal organizers around your wardrobe distribution (long hang, folded stacks, accessory drawers).
- **Living & Dining**: Design comfortable circulation paths before choosing sofa sizes or dining table dimensions.

### 2. Understand Material Specifications
Always demand clear specifications:
- **Carcass**: BWP (Boiling Water Proof) 710 grade plywood for kitchens and wet areas.
- **Hardware**: Soft-close hinges and drawer runners certified for 50,000+ cycles.
- **Finishes**: Matte acrylic, laminate, or natural veneers with PU coating.

### 3. Work Backwards From Your Move-in Window
A quality turnkey home interior typically takes 45 to 60 days of factory manufacturing and on-site assembly after drawing sign-off. Never compromise the curing and snagging periods before moving in.`,
    category: "Home Interiors",
    coverImage: "/images/blueprint.jpg",
    published: true,
  },
  {
    slug: "modular-kitchen-decisions",
    title: "Five Decisions That Shape an Enduring Modular Kitchen",
    excerpt:
      "A deep dive into kitchen ergonomics: work triangle, shutter finishes, quartz countertops, concealed pantries, and architectural task lighting.",
    content: `The kitchen is the hardest-working room in any Indian home. Here are the five foundational choices that determine how your kitchen performs for decades:

### 1. The Work Triangle & Workflow
Layout follows the cook, not the catalogue. Keep the refrigerator, sink, and cooking hob in a fluid triangular motion without obstructive island barriers.

### 2. Shutter Finishes
- **Anti-fingerprint Matte Acrylic**: Sleek modern look, easy to wipe oil and grease.
- **High-Pressure Laminate**: Highly scratch-resistant and budget-friendly.
- **PU Lacquer**: Seamless luxury finish with edge-free aesthetic.

### 3. Countertop Durability
Avoid soft marbles in the kitchen as turmeric and citrus quickly cause permanent staining. Engineered quartz or sintered stone provides heat resistance, zero porosity, and seamless aesthetic waterfall edges.

### 4. Hardware Selection
Hardware decides how every drawer glides every single day. Invest in certified concealed soft-close drawer channels with high load-bearing capacity (30kg to 50kg).

### 5. Shadow-Free Task Lighting
Ceiling lights alone cast annoying shadows when you lean over the counter. Always integrate 3000K warm under-cabinet LED profile lighting illuminating the prep surfaces directly.`,
    category: "Kitchens",
    coverImage: "/images/kitchen.jpg",
    published: true,
  },
  {
    slug: "office-interior-planning",
    title: "Planning Modern Commercial Workspaces Around High Team Productivity",
    excerpt:
      "How forward-thinking founders and facilities managers align workspace layouts, acoustic zoning, and brand aesthetics to foster collaboration.",
    content: `Designing a commercial workspace is an investment in your company's operational velocity. 

### 1. Headcount Growth & Agile Zoning
Start with team workflows rather than rigid desks. Map how departments collaborate, where confidential client conversations happen, and where focus is paramount.

### 2. Acoustic Comfort
Hard commercial surfaces create reverberation and fatigue. Integrate acoustic felt wall panels, baffled ceiling suspensions, and double-glazed boardroom partitions.

### 3. Biophilic Lighting & Climate Flow
Natural daylight dramatically reduces afternoon fatigue. Position collaborative lounges near perimeter windows and incorporate indoor greenery with high air-purifying capability.

### 4. Timelines Planned Backwards From Opening Day
Commercial fit-outs must meet non-negotiable inauguration dates. Turnkey planning coordinates MEP, HVAC, firefighting sanctions, and interior joinery simultaneously.`,
    category: "Commercial",
    coverImage: "/images/office.jpg",
    published: true,
  },
];
