import { Box, Container, Stack, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const profilItems = [
  {
    name: "Profil Saya",
    href: "/profil/profil-saya",
  },
  {
    name: "Wisata Saya",
    href: "/profil/wisata-saya",
  },
];

const ProfileMeContainer = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Box mt={["70px", "70px", "70px", "70px"]}>
      <Container maxW="6xl">
        <Flex gap="77px" columns={[1, 1, 1, 2]} mt="10">
          <Box w="300px" mb={["5", "5", "5", "0"]}>
            <Stack>
              {profilItems.map((profilItem, i) => {
                const isActiveAside = profilItem.href === pathname;

                const stylesButton = {
                  borderLeftWidth: isActiveAside ? "5px" : "0",
                  borderColor: isActiveAside ? "primary.500" : "none",
                };

                return (
                  <Link key={i} to={profilItem.href}>
                    <Box
                      transition=".3s ease"
                      h="60px"
                      padding="1rem"
                      display="flex"
                      bg="transparent"
                      {...stylesButton}
                      alignItems="center"
                      _hover={{
                        opacity: 0.9,
                        cursor: "pointer",
                        bg: "primary.100",
                      }}
                    >
                      <Text color="dark.500" fontSize="1.1rem" fontWeight={500}>
                        {profilItem.name}
                      </Text>
                    </Box>
                  </Link>
                );
              })}
            </Stack>
          </Box>

          <Box w="700px">{children}</Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default ProfileMeContainer;
