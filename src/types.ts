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

export type ConversationItem =
  | {
      type: "message";
      messageType: "ai" | "user";
      content: string;
      id: string;
    }
  | {
      type: "environment-selection";
      id: string;
    }
  | {
      type: "prompt-input";
      id: string;
    }
  | {
      type: "segment-recommendations";
      id: string;
    }
  | {
      type: "ad-format-selection";
      id: string;
    }
  | {
      type: "loading";
      id: string;
    };
