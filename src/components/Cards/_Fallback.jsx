import {
  Card,
  CardBody,
  Flex,
  Skeleton,
  SkeletonText,
  Stack,
  Image,
} from "@chakra-ui/react";
import { formatMoreText, toRupiah } from "@app/utils/helper";
import PropTypes from "prop-types";
import FallbackImage from "@app/assets/png/fallback.png";

const FallbackCardPotensi = ({ wisata }) => {
  return (
    <Card
      h={["full", "full", "full", "446px"]}
      bg="white"
      borderRadius="20px"
      transition=".3s ease"
      _hover={{
        transform: "translateY(-5px)",
        bg: "rgba(0, 0, 0, 0.03)",
      }}
    >
      <CardBody>
        <Image
          width="full"
          height="192px"
          src={wisata?.gambar}
          fallbackSrc={FallbackImage}
          alt={wisata?.name}
          borderRadius="10px"
        />
        <Stack mt="6" spacing="5">
          <Flex justifyContent="space-between" alignItems="center">
            <Skeleton
              textTransform="uppercase"
              w="87px"
              h="33px"
              color="white"
              borderRadius="50px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              fontSize="12px"
              fontWeight={600}
              bg="primary.500"
            >
              {wisata?.category_data?.wisata}
            </Skeleton>

            <SkeletonText color="#1F2F59" fontSize="1rem" fontWeight={500}>
              {toRupiah(wisata?.price)}
            </SkeletonText>
          </Flex>

          <Stack>
            <SkeletonText fontSize="20px" fontWeight={600} color="dark.500">
              {wisata?.nama}
            </SkeletonText>

            <SkeletonText fontSize="1rem" fontWeight={400} color="grey.500">
              {formatMoreText(wisata?.description, 94)}
            </SkeletonText>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default FallbackCardPotensi;

FallbackCardPotensi.propTypes = {
  wisata: PropTypes.objectOf({
    name: PropTypes.string,
    price: PropTypes.number,
    gambar: PropTypes.string,
    category_data: PropTypes.objectOf({
      slug: PropTypes.string,
      label: PropTypes.string,
    }),
    description: PropTypes.string,
  }),
};
