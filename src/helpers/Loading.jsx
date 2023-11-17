import { Flex } from "@chakra-ui/react";

export function Loading({ children }) {
    return (
        <Flex
            w="100%"
            h="65vh"
            alignItems="center"
            justifyContent="center"
        >
            {children}
        </Flex>
    );
}
