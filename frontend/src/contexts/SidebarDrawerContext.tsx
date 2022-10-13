import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect } from "react";

interface SidebarDrawerProps {
    children: any;
}


type SidebarDrawerContextData = UseDisclosureReturn;

const SidebarDrawerContext = createContext<SidebarDrawerContextData>({} as SidebarDrawerContextData);

export const SidebarDrawerProvider: React.FC<SidebarDrawerProps> = ({ children }) => {
    const disclosure = useDisclosure();
    const router = useRouter();

    useEffect(() => {
        disclosure.onClose();
    }, [router.asPath])
    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = () => {
    return useContext(SidebarDrawerContext);
}