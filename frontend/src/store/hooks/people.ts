import { GetServerSidePropsContext } from "next";
import { useQuery, UseQueryOptions } from "react-query";

import { api } from "../../services/api";
import { Person } from "../types";

interface GetPeopleResponseProps {
  people: Person[];
  totalCount: number;
}

export async function getPeople(
  page: number,
  ctx: GetServerSidePropsContext = undefined
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
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
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
