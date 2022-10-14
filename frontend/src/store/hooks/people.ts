import { useQuery, UseQueryOptions } from "react-query";

import { api } from "../../services/api";

interface Person {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface GetPeopleResponseProps {
  people: Person[];
  totalCount: number;
}

export async function getPeople(
  page: number
): Promise<GetPeopleResponseProps> {

  const { data, headers } = await api.get("person", {
    params: {
      page
    },
    headers: {
        "Content-type": "application/json"
    }
  });

  const people: Person[] = data.person.map((person: Person) => {
    return {
      id: person.id,
      name: person.name,
      email: person.email,
      createdAt: new Date(person.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    };
  });

  const totalCount = Number(headers["x-total-count"]);

  return {
    people,
    totalCount
  };
}

export function usePeople(
  page: number,
  options?: UseQueryOptions<GetPeopleResponseProps>
) {
  return useQuery(["people", page], () => getPeople(page), {
    staleTime: 1000 * 60 * 10,
    ...options
  });
}
