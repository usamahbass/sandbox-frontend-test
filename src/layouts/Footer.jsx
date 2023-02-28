import { Box, Container, Divider, Flex, Image } from "@chakra-ui/react";
import SandboxLogo from "@app/assets/png/logo-footer.png";

const Footer = () => {
  return (
    <Box
      as="footer"
      zIndex="999"
      py={["50px", "50px", "50px", "20px"]}
      pos="relative"
      h={["full", "full", "full", "300px"]}
      mt="250px"
      bg="#2B2C2B"
    >
      <Container maxW="6xl" py="12">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDir={["column", "column", "column", "row"]}
        >
          <Image src={SandboxLogo} width="160px" height="51px" alt="logo" />
        </Flex>

        <Divider mt="43px" borderColor="rgba(255, 255, 255, 0.3)" />
      </Container>
    </Box>
  );
};

export default Footer;
