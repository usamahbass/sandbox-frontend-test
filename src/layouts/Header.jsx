import { useEffect } from "react";
import {
  Box,
  Flex,
  Container,
  useDisclosure,
  Button,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useStore } from "@app/hooks/useStore";
import { isUserAuthenticated } from "@app/utils/auth";
import ModalLogin from "@app/components/ModalLogin";
import SandboxLogo from "@app/assets/png/logo.png";
import useScrollDirection, { SCROLL_DOWN } from "@app/hooks/useScrollDirection";
import UserBox from "./UserBox";

const Header = () => {
  const { search: searchQuery } = useLocation();

  const { state } = useStore();

  const loginQuery = new URLSearchParams(searchQuery).get("login");

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const isUserAuth = isUserAuthenticated();
  const isScrollDir = useScrollDirection();

  useEffect(() => {
    if (loginQuery) {
      onOpenModal();
    }
  }, [loginQuery]);

  return (
    <Box
      zIndex="999"
      transition="all .3s"
      pos={"fixed"}
      w="full"
      bg="white"
      as="header"
      top={isScrollDir === SCROLL_DOWN ? "-80px" : "0"}
    >
      <Flex
        maxW="6xl"
        height="80px"
        justifyContent="space-between"
        alignItems="center"
        as={Container}
      >
        <Box
          flexDir={"row"}
          alignItems="center"
          display={"flex"}
          justifyContent="space-between"
          w={["full", "full", "auto"]}
        >
          <Box to="/" as={RouterLink}>
            <Image
              width="125px"
              height="40px"
              alt="logosandbox"
              src={SandboxLogo}
            />
          </Box>
        </Box>

        {isUserAuth || state?.user?.data ? (
          <UserBox />
        ) : (
          <Button
            width="111px"
            height="52px"
            colorScheme="primary"
            borderRadius="50px"
            onClick={onOpenModal}
            display={["none", "none", "block"]}
            _hover={{
              cursor: "pointer",
            }}
          >
            Login
          </Button>
        )}
      </Flex>

      <ModalLogin isOpen={isOpenModal} onClose={onCloseModal} />
    </Box>
  );
};

Header.defaultProps = {
  isFixed: true,
};

export default Header;
