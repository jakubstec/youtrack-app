export interface Project {
    id: string;
    name: string;
    shortName: string;
    iconUrl: string;
    description: string | null;
}

export interface FlagResponse {
    value: boolean;
}

// blueprint for API requests
export type ApiState<T> = {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
  };