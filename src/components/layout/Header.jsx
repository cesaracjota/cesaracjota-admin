import {
    Flex,
    Spacer,
    IconButton,
    Icon,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    Text,
    Stack,
    Box,
    Heading,
    useColorModeValue,
    HStack,
    Link,
    Image,
    Divider,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../theme/ColorModeSwitcher";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DrawerHeaderConponent } from "./DrawerHeader";
import { NavLink } from "react-router-dom";
import '@fontsource/smooch';
import logo from './../../assets/cesaracjota.svg';
import NavItem from './NavItem';

function Header({ onToggle, isOpen, listItem, secondListItem, thirdListItem }) {

    const sidebar = useDisclosure();

    const [isSpanded, setIsSpanded] = useState(false);

    const user = useSelector(state => state.auth.user);

    const activeLinkcolor = useColorModeValue("purple.600", "white");
    const bgActiveLinkColor = useColorModeValue("#f2f2f2", "#2d323a");

    const handleFullScreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            setIsSpanded(false);
        } else {
            document.documentElement.requestFullscreen();
            setIsSpanded(true);
        }
    }

    return (
        <Flex
            as="header"
            _dark={{
                bgColor: "rgba(19,22,28, 0.9)",
                color: "primary.100",
                backdropBlur: "blur(50px)"
            }}
            bg={'white'}
            backdropFilter="blur(10px)"
            position={{
                base: "fixed",
                lg: "sticky"
            }}
            ml={{
                base: 0,
                lg: isOpen ? "64" : "0"
            }}
            top="0"
            left="0"
            right="0"
            zIndex="sticky"
            px={5}
            py={3}
            align="center"
            justify="space-between"
            transition=".08s ease-out"
        // boxShadow={'0px 1px 4px 1px rgba(0, 0, 0, 0.2)'}
        >
            <IconButton
                display={{
                    base: "none",
                    lg: "inline-flex"
                }}
                size={'md'}
                rounded={'lg'}
                onClick={() => { onToggle() }}
                variant="ghost"
                colorScheme="gray"
                aria-label="Toggle navigation"
                icon={<Icon fontSize={24} as={HamburgerIcon} />}
            />

            <Drawer
                isOpen={sidebar.isOpen}
                onClose={sidebar.onClose}
                placement="left"
                size="xs"
            >
                <DrawerOverlay
                    bg="rgba(11,15,25, 0.8)"
                    backdropFilter='auto'
                    backdropBlur='2px'
                />
                <DrawerContent
                    bg={useColorModeValue("white", "primary.1100")}
                    display="flex"
                    w="full"
                    h="full"
                    overflowY="auto"
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
                </DrawerContent>
            </Drawer>


            <IconButton
                aria-label="Menu"
                display={{ base: "flex", lg: "none" }}
                onClick={sidebar.onOpen}
                fontSize="xl"
                size={'md'}
                rounded={'lg'}
                variant="ghost"
                colorScheme="gray"
                icon={<Icon fontSize={24} as={HamburgerIcon} />}
            />

            <Flex alignSelf="center" verticalAlign={'center'} justify={'flex-end'} justifyContent={{ base: "flex-end", lg: "space-between" }} w={'full'} display="inline-flex">
                <HStack display={{ base: "none", lg: "flex" }} ml={242}>
                </HStack>
                <HStack spacing={4}>
                    <IconButton
                        aria-label="Full Screen"
                        fontSize="xl"
                        variant="ghost"
                        rounded={'lg'}
                        icon={isSpanded === true ? <RiFullscreenExitLine /> : <RiFullscreenFill />}
                        colorScheme="gray"
                        onClick={handleFullScreen}
                    />
                    <ColorModeSwitcher />
                    <DrawerHeaderConponent user={user?.usuario} />
                </HStack>
            </Flex>
        </Flex>
    );
}

export default Header;