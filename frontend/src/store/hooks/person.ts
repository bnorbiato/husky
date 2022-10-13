import { useQuery, UseQueryOptions } from "react-query";

import { api } from "../../services/api";
import { Person } from "../types";

interface GetPeopleResponseProps {
  person: Person;
}

interface UsePersonParams {
  id: number;
  token: string;
}

export async function getPerson(id: number): Promise<GetPeopleResponseProps> {
  const { data } = await api.get(`person/${id}`, {
    headers: {
        "Content-type": "application/json"
    }
  });

  return data;
}

export function usePerson(
  id: number,
  options?: UseQueryOptions<GetPeopleResponseProps>
) {
  return useQuery(["user", id], () => getPerson(id), {
    staleTime: 1000 * 60 * 10,
    ...options
  });
}
