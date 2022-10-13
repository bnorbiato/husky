import { ChangeEvent, useState } from "react";
import {
  Button,
  Checkbox,
  Icon,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { UseMutationResult } from "react-query";

import { PersonItem } from "./Person";
import { Person } from "../../../store/types";
/* import { DeleteModal } from "../../Users/DeleteModal"; */

interface PeopleTableProps {
  people: Person[];
  deletePerson: UseMutationResult;
}

export function PeopleTable({ people, deletePerson }: PeopleTableProps) {
  const [selectedPeopleToDelete, setSelectedPeopleToDelete] = useState<number[]>(
    []
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const isWideVersion = useBreakpointValue<boolean>({
    base: false,
    lg: true
  });

  function handleChangeSelectAllCheckbox(ev: ChangeEvent<HTMLInputElement>) {
    if (ev.target.checked) {
        setSelectedPeopleToDelete([...people.map(person => person.id)]);
    } else {
        setSelectedPeopleToDelete([]);
    }
  }

  function handleChangeCheckbox(checked: boolean, id: number) {
    if (checked) {
        setSelectedPeopleToDelete(prevValues => [...prevValues, id]);
    } else {
        setSelectedPeopleToDelete(prevValues =>
        prevValues.filter(value => value !== id)
      );
    }
  }

  async function handleDelete(id: number) {
    await deletePerson.mutateAsync(id);
  }

  function deleteAllSelected() {
    selectedPeopleToDelete.forEach(async id => {
      await handleDelete(id);
    });
  }

  function isChecked(id: number) {
    return !!selectedPeopleToDelete.find(person => person === id);
  }

  const allChecked = selectedPeopleToDelete.length === people.length;
  const isIndeterminate = selectedPeopleToDelete.some(Number) && !allChecked;
  const isAnySelected = !!(selectedPeopleToDelete.length > 0);

  return (
    <>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th px={["4", "4", "6"]} color="gray.300" w="8">
              <Checkbox
                colorScheme="pink"
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={handleChangeSelectAllCheckbox}
              />
            </Th>
            <Th>Usuário</Th>
            {isWideVersion && <Th>Data de cadastro</Th>}
            <Th width="8">
              {isAnySelected && (
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="red"
                  leftIcon={<Icon as={RiDeleteBin2Line} fontSize={16} />}
                  cursor="pointer"
                  textTransform="none"
                  w="140px"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Excluir
                </Button>
              )}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {people.map(item => (
            <PersonItem
              key={item.id}
              person={item}
              isChecked={isChecked}
              onChangeCheckbox={handleChangeCheckbox}
              onDelete={handleDelete}
            />
          ))}
        </Tbody>

        {/* <DeleteModal
          isOpen={isDeleteModalOpen}
          onPressDelete={deleteAllSelected}
          onClose={() => setIsDeleteModalOpen(false)}
        /> */}
      </Table>
    </>
  );
}