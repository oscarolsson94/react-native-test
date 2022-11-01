export interface Show {
  score: number;
  show: {
    averageRuntime: number;
    dvdCountry?: string;
    ended: string;

    externals: {
      imdb: string;
      thetvdb: number;
      tvrage: number;
    };
    genres: string[];
    id: number;
    image: {
      medium: string;
      original: string;
    };
    language: string;
    name: string;
    network: {
      country: {
        code: string;
        name: string;
        timezone: string;
      };
      id: number;
      name: string;
      officialSite: string;
    };
    officialSite: string;
    premiered: string;
    rating: {
      average: number;
    };
    runtime: number;
    schedule: {
      days: string[];
      time: string;
    };
    status: string;
    summary: string;
    type: string;
    updated: number;
    url: string;
    webChannel?: string | null;
    weight: number;
    _links: { previousepisode: { href: string }; self: { href: string } };
  };
}
