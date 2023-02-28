import { Navigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Text,
  Stack,
  Image,
  Avatar,
  SimpleGrid,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { Marker, Tooltip } from "react-leaflet";
import useSWR from "swr";
import format from "date-fns/format";
import idLocale from "date-fns/locale/id";
import { toRupiah } from "@app/utils/helper";
import PageTitle from "@app/components/PageTitle";
import RenderHtml from "@app/components/RenderHTML";
import PriceImage from "@app/assets/png/price.png";
import TelpImage from "@app/assets/png/telephone.png";
import FallbackImage from "@app/assets/png/fallback.png";
import Share from "@app/components/Share";
import Map from "@app/components/Map";
import Layer from "@app/components/Map/Layer";

const SlugWisata = () => {
  const { slug } = useParams();

  const {
    data: wisataResponse,
    error: wisataDetailError,
    isLoading: isLoadingWisataDetail,
  } = useSWR(slug ? `/api/tourist-object/tourist-object/${slug}/` : null);

  const wisataDetail = wisataResponse;

  if (wisataDetailError) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <PageTitle title={wisataDetail?.name ?? ""} />

      <Box mt="100px">
        {isLoadingWisataDetail ? (
          <Spinner display="block" mx="auto" />
        ) : (
          <Container maxW="6xl">
            <Stack justify="center" align="center" spacing={5}>
              <Text
                mx="auto"
                color="dark.500"
                fontWeight={600}
                textAlign="center"
                w={["full", "full", "full", "976px"]}
                fontSize={["32px", "32px", "32px", "48px"]}
              >
                {wisataDetail?.name}
              </Text>

              <Box w="78px" borderRadius="10px" h="4px" bg="primary.500" />
            </Stack>

            <Image
              mt="70px"
              h="400px"
              mx="auto"
              display="block"
              objectFit="cover"
              borderRadius="20px"
              alt={wisataDetail?.name}
              src={wisataDetail?.image}
              fallbackSrc={FallbackImage}
              w={["full", "full", "full", "904px"]}
            />

            {/* WISATA DETAIL */}

            <Box mt="47px">
              <Stack align="center" direction="row" spacing={5}>
                <Avatar
                  width="64px"
                  height="64px"
                  borderRadius="50px"
                  name="Usamah Basalamah"
                />

                <Stack spacing={[1, 1, 1, 2]}>
                  <Stack
                    spacing={3}
                    align={["start", "start", "start", "center"]}
                    direction={["column", "column", "column", "row"]}
                  >
                    <Stack
                      alignItems="center"
                      order={["2", "2", "2", "1"]}
                      direction="row"
                    >
                      <Text
                        color="#091535"
                        fontWeight={500}
                        fontSize={["18px", "18px", "18px", "24px"]}
                        lineHeight={["27px", "27px", "27px", "34px"]}
                      >
                        {wisataDetail?.name}
                      </Text>
                    </Stack>

                    <Box
                      order={["1", "1", "1", "2"]}
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
                      {wisataDetail?.category_data?.label}
                    </Box>
                  </Stack>
                  <Text
                    color="grey.500"
                    fontWeight={400}
                    fontSize={["14px", "14px", "14px", "18px"]}
                    lineHeight={["21px", "21px", "21px", "28px"]}
                  >
                    Diposting pada{" "}
                    {format(new Date(wisataDetail?.created), "dd MMMM yyyy", {
                      locale: idLocale,
                    })}
                  </Text>
                </Stack>
              </Stack>
            </Box>

            {/* WISATA DESCRIPTION */}

            <Box mt="54px">
              <RenderHtml html={wisataDetail?.description} />
            </Box>

            {/* WISATA PRICE AND NO TELP */}

            <SimpleGrid spacing="30px" mt="46px" columns={[1, 1, 1, 2]}>
              <Box mb={["20px", "20px", "20px", "0"]}>
                <Box
                  bg="white"
                  shadow="md"
                  display="flex"
                  alignItems="center"
                  borderRadius="20px"
                  px="20px"
                  gap="20px"
                  h={["99px", "99px", "99px", "118px"]}
                >
                  <Image
                    width="48px"
                    height="48px"
                    borderRadius="50px"
                    src={PriceImage}
                    fallbackSrc={FallbackImage}
                    alt="price"
                  />

                  <Stack>
                    <Text
                      color="#091535"
                      fontWeight={400}
                      fontSize={["14px", "14px", "14px", "16px"]}
                    >
                      Harga
                    </Text>
                    <Text
                      color="dark.500"
                      fontWeight={600}
                      fontSize={["14px", "14px", "14px", "18px"]}
                    >
                      {toRupiah(wisataDetail?.price)}
                    </Text>
                  </Stack>
                </Box>
              </Box>

              <Box mb={["20px", "20px", "20px", "0"]}>
                <Box
                  bg="white"
                  shadow="md"
                  display="flex"
                  alignItems="center"
                  borderRadius="20px"
                  px="20px"
                  gap="20px"
                  h={["99px", "99px", "99px", "118px"]}
                >
                  <Image
                    width="48px"
                    height="48px"
                    borderRadius="50px"
                    src={TelpImage}
                    fallbackSrc={FallbackImage}
                    alt="telephone"
                  />

                  <Stack>
                    <Text
                      color="#091535"
                      fontWeight={400}
                      fontSize={["14px", "14px", "14px", "16px"]}
                    >
                      No. Telpon
                    </Text>
                    {wisataDetail?.no_telp ? (
                      <Link
                        color="dark.500"
                        fontWeight={600}
                        href={`tel:${potensi?.no_telp}`}
                        fontSize={["14px", "14px", "14px", "18px"]}
                      >
                        {potensi?.no_telp}
                      </Link>
                    ) : (
                      <Text
                        color="dark.500"
                        fontWeight={600}
                        fontSize={["14px", "14px", "14px", "18px"]}
                      >
                        -
                      </Text>
                    )}
                  </Stack>
                </Box>
              </Box>
            </SimpleGrid>

            <Box mt="50px">
              <Share title="Wisata" shareTitle={wisataDetail?.name} />
            </Box>

            <Box mt="50px">
              <Map style={{ width: "100%", height: "400px" }}>
                <Layer url="/api/datamaster/borderline/" />

                {wisataDetail?.location && (
                  <Marker
                    position={[
                      wisataDetail?.location?.coordinates[1],
                      wisataDetail?.location?.coordinates[0],
                    ]}
                  >
                    <Tooltip>{wisataDetail?.name}</Tooltip>
                  </Marker>
                )}
              </Map>
            </Box>
          </Container>
        )}
      </Box>
    </>
  );
};

export default SlugWisata;
