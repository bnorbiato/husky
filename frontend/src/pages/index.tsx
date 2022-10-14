import {
	Button,
	Flex,
	Icon
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import NextLink from "next/link";
import React from 'react';

export default function SignIn() {
    return (
        <Flex
            w="100vw"
            h="100vh"
            align="center"
            justify="center">
            <Flex
                as="form"
                w="100%"
                maxWidth={360}
                bg="gray.800"
                p="8"
                borderRadius={8}
                flexDir="column"
            >
                <NextLink href="/people" passHref>
                    <Button
                        as="a"
                        size="sm"
                        fontSize="sm"
                        colorScheme="pink"
                        ml="4"
                        cursor="pointer"
                    >
                        Acessar dashboard
                    </Button>
                </NextLink>
            </Flex>
        </Flex>
    )
}
