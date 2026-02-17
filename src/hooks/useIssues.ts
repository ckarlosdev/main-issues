import { useQuery } from "@tanstack/react-query";
import { Issue } from "../types";
import { api } from "./apiConfig";

const queryIssues = (): Promise<Issue[]> => {
  return api.get("v1/issues").then((response) => response.data);
};

function useIssues() {
  return useQuery({
    queryKey: ["issue"],
    queryFn: queryIssues,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: false,
  });
}

export default useIssues;
