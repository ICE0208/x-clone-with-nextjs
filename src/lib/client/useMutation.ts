import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
  status?: number;
}

type useMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string,
): useMutationResult<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<any | undefined>(undefined);
  const [status, setStatus] = useState<number | undefined>(undefined);
  async function mutation(data: any) {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setStatus(response.status);
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  return [mutation, { loading, data, error, status }];
}
