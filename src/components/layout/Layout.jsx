import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { FaBox, FaCalendar, FaCertificate, FaChalkboard, FaCode, FaCog, FaFolder, FaThLarge, FaUser, FaVideo } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function Layout({ children }) {

    const [isOpen, setIsOpen] = useState(() => {
        const isOpenValue = JSON.parse(localStorage.getItem("isOpen"));
        return isOpenValue ?? false;
    });

    function handleToggle() {
        setIsOpen((prevIsOpen) => {
            const newIsOpen = !prevIsOpen;
            localStorage.setItem("isOpen", JSON.stringify(newIsOpen));
            return newIsOpen;
        });
    }

    const listItem = [
        {
            icon: FaThLarge,
            label: "Panel",
            path: "/",
        },
        {
            icon: FaUser,
            label: "Usuarios",
            path: "/usuarios",
        },
        {
            icon: FaCertificate,
            label: "Certificados",
            path: "/certificados",
        },
        {
            icon: FaBox,
            label: "Mensajes",
            path: "/mensajes",
        },
        {
            icon: FaCode,
            label: "Tech Skills",
            path: "/techskills",
        },
        {
            icon: FaChalkboard,
            label: "Proyectos",
            path: "/projects",
        }
    ]

    const secondListItem = [
        {
            icon: FaVideo,
            label: "Contenido",
            path: "/contenido",
        },
        {
            icon: SiGmail,
            label: "Correos",
            path: "/correos",
        },
        {
            icon: FaCalendar,
            label: "Calendario",
            path: "/calendario",
        },
    ]

    const thirdListItem = [
        {
            icon: FaCog,
            label: "Configuración",
            path: "/configuracion",
        },
        {
            icon: FaFolder,
            label: "Archivos",
            path: "/archivos",
        },
    ]

    return (
        <Box
            display="flex"
            flexDirection="column"
            minH="100vh"
            _dark={{
                bgColor: "primary.1200",
                color: "white"
            }}
        >
            <Header onToggle={handleToggle} isOpen={isOpen} listItem={listItem} secondListItem={secondListItem} thirdListItem={thirdListItem}/>
            <Sidebar isOpen={isOpen} listItem={listItem} secondListItem={secondListItem} thirdListItem={thirdListItem} />
            <Box
                as="main"
                flex="1"
                bg="#f9f9f9"
                _dark={{
                    bg: "primary.1200"
                }}
                px={
                    isOpen ? 3 : 6
                }
                p={6}
                ml={{
                    base: 0,
                    lg: isOpen ? "64" : "0"
                }}
                transition=".08s ease-out"
                mt={{
                    base: "16",
                    lg: "1"
                }}
            >
                {children}
            </Box>
            <Footer isOpen={isOpen}/>
        </Box>
    );
}

export default Layout;
