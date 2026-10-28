export type Project = {
  slug: string;
  title: string;
  category: string;
  status: "Finished Work" | "Concept Idea";
  location: string;
  year: string;
  area: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  features: string[];
};

export const projects: Project[] = [
  {
    slug: "hillside-residence",
    title: "Hillside Residence",
    category: "Residential Architecture",
    status: "Finished Work",
    location: "Shillong, Meghalaya",
    year: "2025",
    area: "3,200 sq ft",
    summary: "A contemporary home shaped by its landscape.",
    description: "A residential design exploring natural light, simple geometry and a connection between indoor living and the surrounding landscape.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
    ],
    features: ["Contemporary forms", "Natural materials", "Indoor-outdoor connection"]
  },
  {
    slug: "courtyard-house",
    title: "Courtyard House",
    category: "Private Residence",
    status: "Finished Work",
    location: "Northeast India",
    year: "2024",
    area: "2,600 sq ft",
    summary: "A private sanctuary shaped by light and greenery.",
    description: "A courtyard-centred home that brings daylight and planting into everyday living while preserving privacy.",
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
    ],
    features: ["Central courtyard", "Daylight-focused planning", "Private outdoor spaces"]
  },
  {
    slug: "urban-house",
    title: "Urban House",
    category: "Urban Residential",
    status: "Finished Work",
    location: "Meghalaya",
    year: "2024",
    area: "2,100 sq ft",
    summary: "A restrained design for compact urban living.",
    description: "An efficient residential plan balancing a clear exterior identity with practical, comfortable living spaces.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
    ],
    features: ["Efficient planning", "Geometric forms", "Practical finishes"]
  },
  {
    slug: "terrace-house",
    title: "The Terrace House",
    category: "Residential Concept",
    status: "Concept Idea",
    location: "Hilly Terrain",
    year: "Concept",
    area: "2,800 sq ft",
    summary: "Stepped volumes that follow the natural slope.",
    description: "A conceptual home working with the terrain, using terraces to create outdoor rooms and frame views.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85"
    ],
    features: ["Stepped massing", "View-oriented spaces", "Terraced outdoor living"]
  },
  {
    slug: "monolith-retreat",
    title: "Monolith Retreat",
    category: "Modern Retreat",
    status: "Concept Idea",
    location: "Northeast India",
    year: "Concept",
    area: "1,900 sq ft",
    summary: "Quiet geometry, deep shadows and tactile materials.",
    description: "A retreat imagined as simple, grounded volumes with carefully placed openings and a calm atmosphere.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
    ],
    features: ["Minimalist composition", "Textured materials", "Controlled natural light"]
  },
  {
    slug: "light-and-volume",
    title: "Light & Volume",
    category: "Spatial Study",
    status: "Concept Idea",
    location: "Design Study",
    year: "Concept",
    area: "Design exploration",
    summary: "An exploration of proportion, daylight and sculptural space.",
    description: "A study of solid forms, voids and natural light, focusing on proportion and the changing character of a space.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85"
    ],
    features: ["Spatial composition", "Light and shadow", "Material exploration"]
  }
];

export const finishedProjects = projects.filter(
  (project) => project.status === "Finished Work"
);

export const conceptProjects = projects.filter(
  (project) => project.status === "Concept Idea"
);
