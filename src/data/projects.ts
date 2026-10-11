export interface ProjectItem {
  id?: number;
  slug: string;
  title: string;
  category:
    | "residential"
    | "commercial"
    | "kitchens"
    | "living-rooms"
    | "bedrooms"
    | "offices"
    | "retail"
    | "renovation";
  status: "completed" | "in_progress" | "concept";
  location: string;
  area: string;
  scope: string;
  concept: string;
  materials: string;
  coverImage: string;
  featured: boolean;
  sample?: boolean;
}

export const PROJECTS: ProjectItem[] = [
  {
    slug: "the-aurora-villa-ecr",
    title: "The Aurora Villa — Contemporary Coastal Residence",
    category: "residential",
    status: "completed",
    location: "East Coast Road (ECR), Chennai",
    area: "4,800 sq.ft",
    scope: "Full turnkey construction, civil elevation, and luxury interior fit-out across two levels.",
    concept:
      "A contemporary coastal residence designed with expansive double-height ceilings, seamless indoor-outdoor transitions, and panoramic natural light.",
    materials: "Teak accents, Travertine flooring, textured lime plaster, high-performance insulated glazing.",
    coverImage: "/images/hero.jpg",
    featured: true,
  },
  {
    slug: "warm-minimal-living-anna-nagar",
    title: "Warm Minimal Living & Dining Suite",
    category: "living-rooms",
    status: "completed",
    location: "Anna Nagar, Chennai",
    area: "1,200 sq.ft",
    scope: "Turnkey living room interior styling, fluted wood paneling, custom credenza and automated cove lighting.",
    concept:
      "A warm minimalist concept built around natural oak slats, charcoal tones, clean linear silhouettes, and soft layered evening illumination.",
    materials: "Natural oak veneer, matte charcoal laminate, textured bouclé upholstery, warm 2700K architectural LED.",
    coverImage: "/images/living-room.jpg",
    featured: true,
  },
  {
    slug: "handleless-modular-kitchen-alwarpet",
    title: "Handleless Architectural Modular Kitchen",
    category: "kitchens",
    status: "completed",
    location: "Alwarpet, Chennai",
    area: "380 sq.ft",
    scope: "Custom island modular kitchen with Blum hardware, quartz waterfall counter, and concealed pantry storage.",
    concept:
      "Streamlined modern ergonomics featuring matte acrylic fronts, integrated gola profiles, high-load pull-outs, and shadow-free task illumination.",
    materials: "Anti-fingerprint matte acrylic, Italian quartz countertop, brushed brass profiles, BWP marine ply carcass.",
    coverImage: "/images/kitchen.jpg",
    featured: true,
  },
  {
    slug: "calm-master-suite-boat-club",
    title: "Serene Master Bedroom & Lounge",
    category: "bedrooms",
    status: "completed",
    location: "Boat Club Road, Chennai",
    area: "650 sq.ft",
    scope: "Master suite layout, custom upholstered bed backrest, acoustic wall treatment, and ambient lighting zones.",
    concept:
      "Understated luxury designed for acoustic tranquility and restful comfort with tactile natural fabrics and soft diffused cove lighting.",
    materials: "Acoustic fabric paneling, smoked oak veneer, brushed nickel hardware, hand-knotted wool accents.",
    coverImage: "/images/bedroom.jpg",
    featured: true,
  },
  {
    slug: "custom-walk-in-wardrobe-nungambakkam",
    title: "Bespoke Walk-in Wardrobe & Dressing Studio",
    category: "bedrooms",
    status: "completed",
    location: "Nungambakkam, Chennai",
    area: "260 sq.ft",
    scope: "Floor-to-ceiling tinted glass wardrobes with integrated sensor LEDs, central jewelry island, and vanity table.",
    concept:
      "Boutique dressing room experience with floor-to-ceiling tinted glass, soft micro-suede pullouts, and automated sensor lighting.",
    materials: "Fluted tinted glass, champagne aluminum profiles, micro-suede lining, vertical warm LED profiles.",
    coverImage: "/images/wardrobe.jpg",
    featured: false,
  },
  {
    slug: "fintech-headquarters-omr",
    title: "Fintech Corporate Headquarters",
    category: "offices",
    status: "completed",
    location: "OMR Tech Corridor, Chennai",
    area: "6,500 sq.ft",
    scope: "Turnkey office interior fit-out, acoustic boardrooms, collaborative zones, and executive suites.",
    concept:
      "A high-performance modern workspace balancing open-plan collaboration zones, acoustic phone booths, and an executive board suite.",
    materials: "Double-glazed acoustic partitions, engineered oak flooring, acoustic felt ceiling baffles, ergonomic task systems.",
    coverImage: "/images/office.jpg",
    featured: true,
  },
  {
    slug: "designer-retail-flagship-kh-road",
    title: "Designer Retail Flagship Store",
    category: "retail",
    status: "completed",
    location: "Khader Nawaz Khan Road, Chennai",
    area: "2,200 sq.ft",
    scope: "Commercial boutique interior design, custom display vitrines, architectural track lighting, and cashier counter.",
    concept:
      "An architectural gallery aesthetic allowing bespoke collections to take center stage against textured monolithic surfaces and directional beams.",
    materials: "Seamless microcement floor, fluted stone counters, 3000K high-CRI track spotlights, satin brass fixtures.",
    coverImage: "/images/retail.jpg",
    featured: false,
  },
  {
    slug: "amber-bistro-restaurant-velachery",
    title: "Amber Hearth Gourmet Dining & Lounge",
    category: "commercial",
    status: "completed",
    location: "Velachery, Chennai",
    area: "3,400 sq.ft",
    scope: "Full restaurant interior fit-out, custom leather banquettes, bar counter detailing, and acoustic ceiling.",
    concept:
      "A warm, moody dining atmosphere crafted with dark stained timber, amber glass pendants, and luxurious leather booth seating.",
    materials: "Saddle leather, dark stained teak, fluted amber glass, antique bronze bar trims.",
    coverImage: "/images/restaurant.jpg",
    featured: true,
  },
  {
    slug: "creative-atelier-design-studio-adyar",
    title: "Creative Atelier & Design Studio",
    category: "offices",
    status: "in_progress",
    location: "Adyar, Chennai",
    area: "1,800 sq.ft",
    scope: "Adaptive reuse interior fit-out, material library, and open brainstorming lounge.",
    concept:
      "An honest raw-material studio showcasing bare concrete textures, expansive drafting tables, and open material specimen display walls.",
    materials: "Exposed concrete, birch plywood joinery, matte black steel framing, natural linen blinds.",
    coverImage: "/images/studio.jpg",
    featured: false,
  },
  {
    slug: "heritage-bungalow-renovation-mylapore",
    title: "Heritage Bungalow Turnkey Modernization",
    category: "renovation",
    status: "in_progress",
    location: "Mylapore, Chennai",
    area: "3,600 sq.ft",
    scope: "Structural retrofitting, complete MEP overhaul, damp-proofing, and heritage-contemporary interior fusion.",
    concept:
      "Preserving iconic architectural columns and verandas while introducing contemporary open layouts, modern kitchen, and concealed HVAC.",
    materials: "Restored Burma teak, authentic Athangudi patterned tiles, breathable lime plaster, slimline aluminum fenestration.",
    coverImage: "/images/renovation.jpg",
    featured: true,
  },
  {
    slug: "contemporary-villa-construction-sholinganallur",
    title: "Contemporary Independent Villa Construction",
    category: "residential",
    status: "in_progress",
    location: "Sholinganallur, Chennai",
    area: "5,200 sq.ft",
    scope: "Civil construction from foundation to finish, post-tensioned slabs, MEP engineering, and exterior elevation.",
    concept:
      "Precision civil engineering meeting modern architectural geometry with deep overhang cantilevers and energy-efficient double-skin exterior walls.",
    materials: "Reinforced structural concrete, Porotherm clay insulation blocks, exposed brick, weather-grade exterior timber.",
    coverImage: "/images/construction.jpg",
    featured: false,
  },
  {
    slug: "turnkey-architectural-planning-guindy",
    title: "Turnkey Architectural Blueprints & Commercial Masterplan",
    category: "commercial",
    status: "concept",
    location: "Guindy, Chennai",
    area: "8,000 sq.ft",
    scope: "Master planning, structural validation, 3D visualization, and complete sanction drawings.",
    concept:
      "Comprehensive Building Information Modeling (BIM) ensuring zero-defect construction milestones, accurate BOQ estimates, and code compliance.",
    materials: "Detailed architectural drawings, MEP BIM coordination, finish schedule documentation.",
    coverImage: "/images/blueprint.jpg",
    featured: false,
  },
];
