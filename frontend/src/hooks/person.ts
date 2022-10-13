import { useQuery } from 'react-query';
import { api } from "../services/api";

type GetPeopleResponse<T> = {
	people: T[];
	totalCount: number;
}

const getPeople = async <T>(page: number): Promise<GetPeopleResponse<T>> => {
	const { data, headers } = await api.get('person', {
		params: {
			page,
		}
	});
	const totalCount = Number(headers['x-total-count']);
	return {
		totalCount,
		people: data.people.map(person => ({
			...person,
		}))
	};
}

export const useUsers = <T>(page: number) => {
	return useQuery(['users', page], () => getPeople<T>(page), { staleTime: 1000 * 5 });
}