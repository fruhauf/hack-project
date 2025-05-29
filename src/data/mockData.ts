export const environments = [
  {
    id: "ctv",
    title: "CTV",
    description: "Connected TV advertising for immersive video experiences",
    icon: "Tv",
  },
  {
    id: "openweb",
    title: "OpenWeb",
    description: "Premium publisher sites across the open internet",
    icon: "Globe",
  },
  {
    id: "social",
    title: "Social",
    description: "Social media platforms for maximum engagement",
    icon: "Users",
  },
];

export const adFormats = {
  ctv: [
    {
      id: "ctv-takeover",
      title: "CTV Takeover",
      description:
        "Full-screen immersive ad experience during streaming content",
      imageUrl:
        "https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg",
    },
    {
      id: "ctv-spotlight",
      title: "CTV Spotlight",
      description: "Premium placement during high-viewership moments",
      imageUrl:
        "https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg",
    },
    {
      id: "ctv-companion",
      title: "CTV Companion",
      description: "Synchronized multi-screen experience across devices",
      imageUrl:
        "https://images.pexels.com/photos/5082567/pexels-photo-5082567.jpeg",
    },
  ],
  openweb: [
    {
      id: "branded-takeover",
      title: "Branded Takeover",
      description: "Immersive site-wide brand experience",
      imageUrl: "/assets/images/branded-takeover.gif",
    },
    {
      id: "breakaway",
      title: "Breakaway",
      description: "Elegant scrolling format that reveals as users engage",
      imageUrl: "/assets/images/breakaway.gif",
    },
    {
      id: "lighthouse",
      title: "Lighthouse",
      description:
        "Attention-grabbing format that expands beyond standard units",
      imageUrl: "/assets/images/lighthouse.gif",
    },
  ],
  social: [
    {
      id: "social-canvas",
      title: "Social Canvas",
      description: "Full-screen vertical format optimized for social feeds",
      imageUrl:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    },
    {
      id: "social-carousel",
      title: "Social Carousel",
      description: "Swipeable multi-image format for storytelling",
      imageUrl:
        "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
    },
    {
      id: "social-spotlight",
      title: "Social Spotlight",
      description: "Premium sponsored content integrated naturally in feeds",
      imageUrl:
        "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg",
    },
  ],
};

export const audienceSegments = [
  {
    id: "gen-z",
    name: "Gen Z",
    description: "Ages 18-24, digital natives",
    color: "blue",
  },
  {
    id: "millennials",
    name: "Millennials",
    description: "Ages 25-40, experience-focused",
    color: "teal",
  },
  {
    id: "parents",
    name: "Parents",
    description: "Households with children under 18",
    color: "amber",
  },
  {
    id: "luxury-shoppers",
    name: "Luxury Shoppers",
    description: "High-income individuals interested in premium products",
    color: "purple",
  },
  {
    id: "tech-enthusiasts",
    name: "Tech Enthusiasts",
    description: "Early adopters and technology professionals",
    color: "pink",
  },
];

export const mockCampaignLines = [
  {
    id: "line-1",
    name: "Summer Collection - Gen Z",
    format: "social-canvas",
    formatName: "Social Canvas",
    segment: "gen-z",
    segmentName: "Gen Z",
    budget: 25000,
    impressions: 2500000,
  },
  {
    id: "line-2",
    name: "Summer Collection - Millennials",
    format: "runway",
    formatName: "Runway",
    segment: "millennials",
    segmentName: "Millennials",
    budget: 35000,
    impressions: 3200000,
  },
];

export const mockPerformanceData = {
  impressions: 5700000,
  clicks: 142500,
  ctr: 2.5,
  conversions: 8550,
  conversionRate: 6,
  spend: 60000,
};

export const mockDomainPerformance = [
  { domain: "premium-news.com", impressions: 1200000, ctr: 2.8, spend: 15000 },
  { domain: "fashion-blog.net", impressions: 950000, ctr: 3.2, spend: 12000 },
  { domain: "tech-review.org", impressions: 850000, ctr: 2.1, spend: 10000 },
  {
    domain: "lifestyle-magazine.com",
    impressions: 750000,
    ctr: 2.4,
    spend: 9000,
  },
  {
    domain: "entertainment-daily.com",
    impressions: 650000,
    ctr: 1.9,
    spend: 8000,
  },
];
