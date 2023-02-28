import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Avatar,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { request } from "@app/utils/request";
import { useStore } from "@app/hooks/useStore";
import { setUserData } from "@app/context/actions";
import { getAuthToken, setToken } from "@app/utils/auth";
import ArrowDown from "@app/icons/ArrowDown";

const UserBox = ({ ...rest }) => {
  const { dispatch, state } = useStore();

  const handleLogoutUser = () => {
    request
      .post("/api/auth/logout/", {
        refresh: getAuthToken()?.refresh,
      })
      .then(() => {
        setToken(null);

        dispatch(
          setUserData({
            data: null,
            error: null,
            loading: false,
          })
        );
      });
  };

  return (
    <Flex {...rest} gap={3} alignItems="center" ml={{ base: "auto", lg: "0" }}>
      <Menu placement="bottom">
        <MenuButton minW={0} rounded="full" variant="link" cursor="pointer">
          <Stack direction="row" alignItems="center">
            <Stack align="flex-end" spacing={5}>
              <SkeletonCircle isLoaded={true}>
                <Avatar
                  size="sm"
                  name={state?.user?.data?.full_name}
                  src={state?.user?.data?.photo}
                  display="flex"
                />
              </SkeletonCircle>
            </Stack>

            <Stack
              justify="center"
              ml="auto"
              display={{
                xs: "none",
                md: "flex",
              }}
            >
              <Skeleton isLoaded={true}>
                <Text
                  ml="auto"
                  fontSize="sm"
                  pos="relative"
                  display="flex"
                  isTruncated
                  alignItems="center"
                >
                  {state?.user?.data?.full_name}
                  <Stack px={2}>
                    <ArrowDown />
                  </Stack>
                </Text>
              </Skeleton>
            </Stack>
          </Stack>
        </MenuButton>

        <MenuList
          w="224px"
          h="140px"
          borderRadius="20px"
          bg="white"
          ml="90px"
          color="#6E6E6E"
        >
          <Link to="/profil/profil-saya">
            <MenuItem
              color="#1F2F59"
              fontSize="sm"
              h="42px"
              borderRadius="20px 20px 0 0"
              _focus={{
                backgroundColor: "transparent",
              }}
              _hover={{
                color: "primary.500",
                backgroundColor: "transparent",
              }}
            >
              Profil Saya
            </MenuItem>
          </Link>

          <Link to="/profil/ubah-password">
            <MenuItem
              color="#1F2F59"
              fontSize="sm"
              h="42px"
              borderRadius="20px 20px 0 0"
              _focus={{
                backgroundColor: "transparent",
              }}
              _hover={{
                color: "primary.500",
                backgroundColor: "transparent",
              }}
            >
              Ubah Password
            </MenuItem>
          </Link>

          <MenuItem
            fontSize="sm"
            borderRadius="0 0 20px 20px"
            color="#1F2F59"
            h="42px"
            _focus={{
              backgroundColor: "transparent",
            }}
            _hover={{
              color: "primary.500",
              backgroundColor: "transparent",
            }}
            onClick={handleLogoutUser}
          >
            Keluar
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserBox;
