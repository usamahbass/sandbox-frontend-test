import {
  Box,
  Card,
  CardBody,
  Flex,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import sanitize from "sanitize-html";
import PropTypes from "prop-types";
import { formatMoreText, toRupiah } from "@app/utils/helper";
import FallbackImage from "@app/assets/png/fallback.png";

const CardWisata = ({ wisata }) => {
  return (
    <Link to={`/wisata/${wisata?.slug}`}>
      <Card
        bg="white"
        h={["full", "full", "full", "446px"]}
        borderRadius="20px"
        transition=".3s ease"
        _hover={{
          transform: "translateY(-5px)",
          // bg: "rgba(0, 0, 0, 0.03)",
        }}
      >
        <CardBody px="auto">
          <Image
            src={wisata?.image}
            height={["174px", "174px", "174px", "192px"]}
            w="full"
            fallbackSrc={FallbackImage}
            alt={wisata?.name}
            borderRadius="10px"
          />
          <Stack mt="6" spacing="5">
            <Flex justifyContent="space-between" alignItems="center">
              <Box
                textTransform="uppercase"
                w="87px"
                h="33px"
                borderRadius="50px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize="10px"
                color="primary.500"
                fontWeight={600}
                bg="primary.100"
              >
                {wisata?.category_data?.label}
              </Box>

              <Text
                fontFamily={`'Poppins', sans-serif`}
                color="#1F2F59"
                fontSize="1rem"
                fontWeight={500}
              >
                {toRupiah(wisata?.price)}
              </Text>
            </Flex>

            <Stack>
              <Text fontSize="20px" fontWeight={600} color="dark.500">
                {wisata?.name}
              </Text>

              <Text fontSize="1rem" fontWeight={400} color="grey.500">
                {formatMoreText(
                  sanitize(wisata?.description, {
                    allowedAttributes: {},
                    allowedTags: [],
                  }),
                  94
                )}
              </Text>
            </Stack>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
};

export default CardWisata;

CardWisata.propTypes = {
  wisata: PropTypes.objectOf({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    category_data: PropTypes.objectOf({
      slug: PropTypes.string,
      label: PropTypes.string,
    }),
    description: PropTypes.string,
  }),
};
