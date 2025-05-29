export interface Environment {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AdFormat {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface AudienceSegment {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface UrlMatch {
  URL: string;
  SIMILARITY_SCORE: number;
}

export interface SegmentRecommendationResponse {
  status: string;
  description: string;
  urls: UrlMatch[];
  count: number;
  prompt: string;
  timestamp: string;
}
