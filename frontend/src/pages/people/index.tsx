import NextLink from "next/link";
import { useState } from "react";
import {
	Box,
	Button,
	Flex,
	Heading,
	Icon,
	keyframes,
	Spinner,
	Text,
	Tooltip
} from "@chakra-ui/react";
import { RiAddLine, RiRefreshLine } from "react-icons/ri";
import { useMutation } from "react-query";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { PeopleTable } from "../../components/Tables/People";

import { usePeople } from "../../store/hooks/people";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

const spin = keyframes`
  from { 
    transform: rotate(0deg); 
  }
  to { 
    transform: rotate(360deg); 
  }
`;

export default function PersonList() {
	const [page, setPage] = useState(1);
	const { data, refetch, isLoading, error, isFetching } = usePeople(page);

	const deletePerson = useMutation(
		async (id: number) => {
			const response = await api.delete(`users/${id}`, {
				headers: {
					"Content-type": "application/json"
				}
			});

			return response.data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("users");
			}
		}
	);

	return (
		<Box>
			<Header />

			<Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
				<Sidebar />

				<Box flex="1" borderRadius={8} bg="gray.800" p="8">
					<Flex mb="8" justify="space-between" align="center">
						<Heading size="lg" fontWeight="normal">
							Usuários
							{!isLoading && isFetching && (
								<Spinner size="sm" color="gray.500" ml="4" />
							)}
						</Heading>

						<Flex>
							<Tooltip label="Atualizar">
								<Button
									size="sm"
									fontSize="sm"
									bgColor="gray.700"
									cursor="pointer"
									onClick={() => refetch()}
								>
									<Icon
										as={RiRefreshLine}
										fontSize={20}
										animation={
											!isLoading && isFetching
												? `${spin} 1s infinite linear`
												: ""
										}
									/>
								</Button>
							</Tooltip>
							<NextLink href="/people/create" passHref>
								<Button
									as="a"
									size="sm"
									fontSize="sm"
									colorScheme="pink"
									ml="4"
									leftIcon={<Icon as={RiAddLine} fontSize={20} />}
									cursor="pointer"
								>
									Criar novo usuário
								</Button>
							</NextLink>
						</Flex>
					</Flex>

					{isLoading ? (
						<Flex justify="center">
							<Spinner />
						</Flex>
					) : error ? (
						<Flex justify="center">
							<Text>Falha ao obter dados dos usuários.</Text>
						</Flex>
					) : (
						<>
							<PeopleTable people={data.people} deletePerson={deletePerson} />

							{/* <Pagination
								registersPerPage={10}
								onPageChange={setPage}
								totalCountOfRegisters={data.totalCount}
								currentPage={page}
							/> */}
						</>
					)}
				</Box>
			</Flex>
		</Box>
	);
}