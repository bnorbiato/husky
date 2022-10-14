import { useQuery, UseQueryOptions } from "react-query";

import { api } from "../../services/api";

interface Person {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface GetPeopleResponseProps {
  person: Person;
}

interface UsePersonParams {
  id: number;
  email: string;
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
  return useQuery(["person", id], () => getPerson(id), {
    staleTime: 1000 * 60 * 10,
    ...options
  });
}
