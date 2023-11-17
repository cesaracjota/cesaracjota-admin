import { Box, Divider, Image, Flex, Icon, Link, Spacer, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import logo from './../../assets/cesaracjota.svg';
import NavItem from './NavItem';

function Sidebar({ isOpen, listItem, secondListItem, thirdListItem }) {

    const activeLinkcolor = useColorModeValue("purple.600", "white");
    const bgActiveLinkColor = useColorModeValue("#f2f2f2", "#2d323a");

    return (
        <Box
            w={{ base: isOpen ? "0" : "0", lg: "64" }}
            display={{
                base: isOpen ? "block" : "none",
            }}
            bgColor="white"
            _dark={{
                bgColor: "rgba(19,22,28, 0.9)",
                color: "primary.100",
            }}
            color="white"
            pos="fixed"
            top="0"
            left="0"
            bottom="0"
            h="calc(100vh - 0rem)"
            overflow="hidden"
            overflowY="auto"
            zIndex="0"
            transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
            transition="width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms"
            sx={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: useColorModeValue('#909090', '#717171'),
                    borderRadius: '24px',
                    width: '4px',
                },
                '&::-webkit-scrollbar-thumb:active': {
                    backgroundColor: useColorModeValue('#909090', '#717171'),
                },
                '&::-webkit-scrollbar-track': {
                    borderRadius: '24px',
                },
            }}
        >
            <Flex
                direction="column"
                as="nav"
                fontSize="15px"
                px={4}
                py={2}
                aria-label="Main Navigation"
                justify="space-between"
                h="100%"
            >
                <Flex justify={'center'} py={2} mb={6}>
                    <Image
                        w="50px"
                        src={logo}
                        alt="logo"
                        alignSelf={'center'}
                        objectFit="cover"
                        mr={2}
                    />
                </Flex>
                {
                    listItem?.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                as={NavLink}
                                to={item.path}
                                fontSize={'14px'}
                                mb={2}
                                color={'gray.700'}
                                _activeLink={{
                                    color: activeLinkcolor,
                                    bg: bgActiveLinkColor,
                                    fontWeight: '600',
                                    borderRadius: '3xl'
                                }}
                                _dark={{
                                    color: '#ffffff',
                                    _activeLink: {
                                        color: 'white',
                                    }
                                }}
                                _hover={{ textDecoration: 'none' }}
                            >
                                <NavItem icon={item.icon}>{item.label}</NavItem>
                            </Link>
                        )
                    })
                }

                <Divider my={3} />

                {
                    secondListItem?.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                as={NavLink}
                                to={item.path}
                                color={'gray.700'}
                                fontSize={'14px'}
                                _dark={{
                                    color: '#ffffff'
                                }}
                                _activeLink={{
                                    color: activeLinkcolor,
                                    bg: bgActiveLinkColor,
                                    borderRight: '4px solid',
                                    borderColor: 'primary.100',
                                    fontWeight: '600',
                                }}
                                _hover={{ textDecoration: 'none' }}
                            >
                                <NavItem icon={item.icon}>{item.label}</NavItem>
                            </Link>
                        )
                    })
                }

                <Spacer />

                <Stack
                    bottom={0}
                    direction="column"
                    as="nav"
                    fontSize="12px"
                    px={8}
                    py={6}
                    aria-label="Main Navigation"
                    color={'black'}
                    _dark={{
                        color: '#ffffff'
                    }}
                >
                    <Text fontSize={'12px'} as="span">© 2023 AgylCode LLC</Text>
                </Stack>
            </Flex>
        </Box>
    );
}

export default Sidebar;