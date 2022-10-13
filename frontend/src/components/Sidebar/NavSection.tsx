import { Box, Stack, Link, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { RiDashboardLine, RiContactsLine } from "react-icons/ri"

interface NavSectionProps {
    children: any;
}

export const NavSection: React.FC<NavSectionProps> = ({ children } ) => {
    return (
        <Box>
            <Stack spacing="4" mt="8" align="stretch">
                {children}
            </Stack>
        </Box>
    )
}