import * as React from "react";
import { Stack } from "@chakra-ui/layout"
import { RiContactsLine } from "react-icons/ri"
import { NavLink } from "./NavLink"
import { NavSection } from "./NavSection"

export const SidebarNav = () => {
    return (
        <Stack spacing="12" align="flex-start">
            <NavSection>
                <NavLink icon={RiContactsLine} href="/">Usuários</NavLink>
            </NavSection>
        </Stack>
    )
}