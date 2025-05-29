import { environments, adFormats } from "./mockData";
import { Environment, AdFormat, SegmentRecommendationResponse } from "../types";

export class ApiClient {
  private baseUrl = "/api";

  /**
   * Get all available advertising environments
   */
  async getEnvironments(): Promise<Environment[]> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return environments;
  }

  /**
   * Get ad formats for all environments or a specific environment
   */
  async getAdFormats(): Promise<{ [key: string]: AdFormat[] }>;
  async getAdFormats(environmentId: string): Promise<AdFormat[]>;
  async getAdFormats(
    environmentId?: string
  ): Promise<{ [key: string]: AdFormat[] } | AdFormat[]> {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (environmentId) {
      return adFormats[environmentId as keyof typeof adFormats] || [];
    }

    return adFormats;
  }

  /**
   * Get URL recommendations from the API based on campaign prompt
   */
  async getSegments(
    prompt: string,
    limit: number = 5
  ): Promise<SegmentRecommendationResponse | null> {
    try {
      const response = await fetch(`${this.baseUrl}/top-urls`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          limit: limit,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const recommendationResponse: SegmentRecommendationResponse =
        await response.json();
      return recommendationResponse;
    } catch (error) {
      console.error("Failed to fetch segments from API:", error);
      // Return null if API call fails
      console.warn("API call failed, returning null");
      return null;
    }
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
