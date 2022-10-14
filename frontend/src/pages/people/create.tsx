import Link from "next/link";
import {
  Box,
  Divider,
  Flex,
  Heading,
  VStack,
  SimpleGrid,
  HStack,
  Button
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Input } from "../../components/Form/Input";

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

interface CreatePersonFormProps {
  name: string;
  email: string;
}

const createPersonFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("O campo precisa ser um email válido"),
});

export default function CreatePerson() {
  const router = useRouter();

  const createPerson = useMutation(
    async (person: CreatePersonFormProps) => {
      const response = await api.post("/person", person, {
        headers: {
            "Content-type": "application/json"
        }
      });

      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("people");
      }
    }
  );

  const { register, handleSubmit, formState } = useForm<CreatePersonFormProps>({
    resolver: yupResolver(createPersonFormSchema)
  });

  const handleCreatePerson: SubmitHandler<CreatePersonFormProps> = async data => {
    await createPerson.mutateAsync(data);

    router.push("/person");
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          onSubmit={handleSubmit(handleCreatePerson)}
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Adicionar nova pessoa
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                error={formState.errors.name}
                name="name"
                label="Nome completo"
                {...register("name")}
              />
              <Input
                error={formState.errors.email}
                name="email"
                type="email"
                label="E-mail"
                {...register("email")}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                isLoading={formState.isSubmitting}
                colorScheme="pink"
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}