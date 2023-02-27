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
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { uppercaseFirstLetter } from "utils/helper";
import { useAuthServices } from "hooks/useAuthServices";
import ArrowDown from "icons/ArrowDown";
import Notification from "icons/Notification";
import Link from "next/link";

const UserBox = ({ ...rest }) => {
  const { notifications } = useSelector((state) => state.app);
  const { user, loading } = useSelector((state) => state.auth);

  const { logout } = useAuthServices();
  const profile = user?.profile;

  return (
    <Flex {...rest} gap={3} alignItems="center" ml={{ base: "auto", lg: "0" }}>
      <Link href="/notifikasi">
        <Flex>
          <IconButton bg="transparent">
            <Notification />
          </IconButton>

          {notifications?.length > 0 && (
            <Badge
              position="relative"
              right="25%"
              bottom="5px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="danger.500"
              color="white"
              w="19px"
              h="19px"
              fontSize="10px"
              rounded="full"
            >
              {notifications?.length}
            </Badge>
          )}
        </Flex>
      </Link>

      <Menu placement="bottom">
        <MenuButton minW={0} rounded="full" variant="link" cursor="pointer">
          <Stack direction="row" alignItems="center">
            <Stack align="flex-end" spacing={5}>
              <SkeletonCircle isLoaded={!loading}>
                <Avatar
                  size="sm"
                  name={profile?.nama}
                  display="flex"
                  src={profile?.foto}
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
              <Skeleton isLoaded={!loading}>
                <Text
                  ml="auto"
                  fontSize="sm"
                  pos="relative"
                  display="flex"
                  isTruncated
                  color="primary.500"
                  alignItems="center"
                >
                  {uppercaseFirstLetter(profile?.nama)}
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
          h="100px"
          borderRadius="20px"
          bg="white"
          ml="90px"
          color="#6E6E6E"
        >
          <Link href="/profil/profil-saya">
            <MenuItem
              color="dark.500"
              fontSize="sm"
              h="40px"
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

          <MenuItem
            fontSize="sm"
            borderRadius="0 0 20px 20px"
            color="dark.500"
            h="40px"
            _focus={{
              backgroundColor: "transparent",
            }}
            _hover={{
              color: "primary.500",
              backgroundColor: "transparent",
            }}
            onClick={() => logout(true)}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserBox;
