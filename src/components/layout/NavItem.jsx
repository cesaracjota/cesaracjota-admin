import React from 'react';
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";

const NavItem = (props) => {

    const bgActiveLinkColor = useColorModeValue("#f2f2f2", "#2d323a");

    const { icon, children, ...rest } = props;
    
    return (
        <Flex
            align="center"
            py="12px"
            cursor="pointer"
            _hover={{
                bg: bgActiveLinkColor,
                borderRadius: '3xl'
            }}
            role="group"
            px={2}
            // transition=".1s ease"
            {...rest}
        >
            {icon && (
                <Icon
                    mx="5"
                    ml={{ base: "1", md: "3" }}
                    fontSize="22px"
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
}

export default NavItem
