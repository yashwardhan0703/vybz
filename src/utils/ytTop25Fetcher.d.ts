export interface LiveChartResult {
  results: Array<{
    rank: number;
    id: string;
    title: string;
    movie: string;
    singers: string;
    duration: string;
    tag: string;
    thumbnail: string;
  }>;
  source: string;
  updatedAt: number;
}

export function fetchLiveIndiaTop25(): Promise<LiveChartResult | null>;
