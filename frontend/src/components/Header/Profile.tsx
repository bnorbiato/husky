import { Flex, Box, Avatar, Text } from "@chakra-ui/react"
import React from "react"

interface ProfileProps {
    showProfileData?: boolean;
}

export const Profile = ({ showProfileData = true }: ProfileProps) => {
    return (
        <Flex align="center">
            {showProfileData && (
                <Box mr="4" textAlign="center">
                    <Text>Ganem</Text>
                    <Text color="gray.300" fontSize="small">
                        ganem@email.com
                  </Text>
                </Box>
            )}
            <Avatar size="md" name="Ganem" src="https://avatars.githubusercontent.com/u/20447849?v=4" />
        </Flex>
    )
}