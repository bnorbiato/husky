import NextLink from "next/link";
import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Link,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Td,
  Text,
  Tr,
  useBreakpointValue,
  VStack
} from "@chakra-ui/react";
import { RiDeleteBin2Line, RiPencilLine } from "react-icons/ri";

interface Person {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface PersonItemProps {
  person: Person;
  isChecked: (id: number) => boolean;
  onChangeCheckbox: (checked: boolean, id: number) => void;
  onDelete: (id: number) => Promise<void>;
}

export function PersonItem({
  person,
  isChecked,
  onChangeCheckbox,
  onDelete
}: PersonItemProps) {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const isWideVersion = useBreakpointValue<boolean>({
    base: false,
    lg: true
  });

  return (
    <Tr>
      <Td px={["4", "4", "6"]}>
        <Checkbox
          colorScheme="pink"
          isChecked={isChecked(person.id)}
        />
      </Td>
      <Td>
        <Box>
          <Popover onOpen={() => {}}>
            <PopoverTrigger>
              <Link color="purple.400">
                <Text fontWeight="bold">{person.name}</Text>
              </Link>
            </PopoverTrigger>
            <PopoverContent
              bg="gray.900"
              borderColor="transparent"
              boxShadow="2xl"
              minW="320px"
            >
              <PopoverCloseButton />
              <PopoverHeader border="0">
                <Text
                  color="gray.400"
                  textTransform="uppercase"
                  fontSize="13px"
                  fontWeight="bold"
                >
                  Dados do usuário
                </Text>
              </PopoverHeader>
              <PopoverBody>
                <VStack spacing="3" fontSize="14px">
                  <Flex align="center" w="100%" justify="space-between">
                    <Text
                      color="gray.400"
                      textTransform="uppercase"
                      fontWeight="bold"
                    >
                      E-mail
                    </Text>
                    <Text>{person.email}</Text>
                  </Flex>
                  <Flex align="center" w="100%" justify="space-between">
                    <Text
                      color="gray.400"
                      textTransform="uppercase"
                      fontWeight="bold"
                    >
                      Nome completo
                    </Text>
                    <Text>{person.name}</Text>
                  </Flex>
                  <Flex align="center" w="100%" justify="space-between">
                    <NextLink href={`users/update/${person.id}`}>
                      <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
                        cursor="pointer"
                        w="140px"
                      >
                        Editar usuário
                      </Button>
                    </NextLink>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="sm"
                      w="140px"
                      colorScheme={isConfirmingDelete ? "purple" : "red"}
                      leftIcon={<Icon as={RiDeleteBin2Line} fontSize={16} />}
                      cursor="pointer"
                      onClick={() => {
                        if (isConfirmingDelete) {
                          onDelete(person.id);
                        }

                        setIsConfirmingDelete(true);
                      }}
                    >
                      {isConfirmingDelete ? "Confirmar" : "Excluir usuário"}
                    </Button>
                  </Flex>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Text fontSize="sm" color="gray.300">
            {person.email}
          </Text>
        </Box>
      </Td>
      <Td>
        {isWideVersion && (
          <NextLink href={`users/update/${person.id}`}>
            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="purple"
              leftIcon={<Icon as={RiPencilLine} fontSize={16} />}
              cursor="pointer"
              w="140px"
            >
              Editar usuário
            </Button>
          </NextLink>
        )}
      </Td>
    </Tr>
  );
}