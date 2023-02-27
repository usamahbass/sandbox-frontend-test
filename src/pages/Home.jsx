import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import InfiniteScroll from "react-swr-infinite-scroll";
import { reFactorDataFromInfinite } from "@app/utils/helper";
import SearchIcon from "@app/icons/Search";
import PageTitle from "@app/components/PageTitle";
import CardWisata from "@app/components/Cards";

const HomePage = () => {
  const { data: categoryData } = useSWR(
    "/api/datamaster/tourist-object-category/"
  );

  const { handleSubmit, register } = useForm();

  const [categoryPick, setCategoryPick] = useState(null);
  const [touristsURL, setTouristsURL] = useState(
    `/api/tourist-object/tourist-object/?category=&search=`
  );

  const swr = useSWRInfinite((index) => `${touristsURL}&page=${index + 1}`, {
    revalidateFirstPage: false,
  });

  const isCategoryData = categoryData?.data;

  const handleSearchWisata = ({ searchInput }) =>
    setTouristsURL(
      `/api/tourist-object/tourist-object/?category=${
        categoryPick ?? ""
      }&search=${searchInput}`
    );

  useEffect(() => {
    if (categoryPick) {
      setTouristsURL(
        `/api/tourist-object/tourist-object/?category=${categoryPick}`
      );
    }
  }, [categoryPick]);

  return (
    <>
      <PageTitle title="Home" />

      <Container maxW="7xl">
        <Box mt="100px">
          <Stack justify="center" align="center" spacing={5}>
            <Text
              color="dark.500"
              fontWeight={600}
              fontSize={["32px", "32px", "32px", "48px"]}
            >
              Wisata
            </Text>

            <Box w="78px" h="4px" borderRadius="10px" bg="primary.500" />
          </Stack>

          <Text
            mt="30px"
            mx="auto"
            w={["full", "full", "full", "1096px"]}
            fontSize="1rem"
            fontWeight={400}
            color="#091535"
            lineHeight={["24px", "24px", "24px", "34px"]}
            textAlign="center"
          >
            Temukan wisata menarik disini
          </Text>

          <Flex mt="45px" alignItems="center" gap="24px">
            <InputGroup
              h="60px"
              mx="auto"
              as="form"
              borderRadius="100px"
              onSubmit={handleSubmit(handleSearchWisata)}
              boxShadow="0px 4px 20px rgba(184, 184, 184, 0.25)"
            >
              <InputLeftElement>
                <SearchIcon
                  style={{ position: "absolute", right: 0, bottom: 0 }}
                />
              </InputLeftElement>

              <Input
                h="60px"
                borderRadius="100px"
                placeholder={`Cari wisata`}
                color="#091535"
                fontSize="14px"
                fontWeight={400}
                border="0"
                paddingLeft="50px !important"
                paddingRight="50px !important"
                {...register("searchInput")}
              />

              <InputRightElement w="78px" h="40px" mx="auto">
                <Button
                  position="absolute"
                  left="0"
                  top="9px"
                  colorScheme="primary"
                  borderRadius="50px"
                  type="submit"
                >
                  Cari
                </Button>
              </InputRightElement>
            </InputGroup>

            <Select
              h="60px"
              borderRadius="100px"
              color="#091535"
              fontSize="14px"
              fontWeight={400}
              bg="white"
              onChange={(e) => setCategoryPick(e.target.value)}
              boxShadow="0px 4px 20px rgba(184, 184, 184, 0.25)"
            >
              <option value="" disabled selected>
                Pilih kategori
              </option>
              {isCategoryData?.map((category) => (
                <option key={category?.slug} value={category?.slug}>
                  {category?.label}
                </option>
              ))}
            </Select>
          </Flex>

          <SimpleGrid spacing="30px" mt="70px" columns={[1, 1, 2, 3]}>
            <InfiniteScroll
              swr={swr}
              loadingIndicator="loading..."
              isReachingEnd={(swr) => {
                const isDatas = reFactorDataFromInfinite(swr.data);

                return isDatas?.data?.length === isDatas?.meta?.total;
              }}
            >
              {(response) => {
                if (response?.data?.length > 0) {
                  return response?.data?.map((wisata) => (
                    <CardWisata key={wisata?.slug} wisata={wisata} />
                  ));
                }

                // empty state

                return <div>kosong</div>;
              }}
            </InfiniteScroll>
          </SimpleGrid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
