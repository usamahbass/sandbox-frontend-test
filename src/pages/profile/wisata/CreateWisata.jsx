import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { request } from "@app/utils/request";
import { filterValuesObject, replaceAll } from "@app/utils/helper";
import Map from "@app/components/Map";
import Layer from "@app/components/Map/Layer";
import Pinning from "@app/components/Map/Pinning";
import UploadImage from "@app/components/FileUpload";
import TextEditor from "@app/components/TextEditor";
import PageTitle from "@app/components/PageTitle";
import ProfileMeContainer from "@app/containers/ProfileContainer";
import CurrencyInput from "@app/components/Currency";

const CreateWisataPage = () => {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: "onChange" });

  const { data: categoryData } = useSWR(
    "/api/datamaster/tourist-object-category/"
  );

  const isCategoryData = categoryData?.data;

  const toast = useToast();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const handleCreateToko = (values) => {
    setIsLoadingCreate(true);

    const filterValues = filterValuesObject(values, ["image"]);

    const isPayload = {
      ...filterValues,
      image: values?.image?.[0],
      location: JSON.stringify(values.location),
      price: parseInt(
        replaceAll(replaceAll(values?.price, "Rp ", ""), ",", "")
      ),
    };

    const formData = new FormData();

    Object.entries(isPayload).forEach(([key, value]) =>
      formData.append(key, value)
    );

    request
      .post("/api/tourist-object/tourist-object/", formData)
      .then(() => {
        toast({
          status: "success",
          title: "Sukses",
          description: `Wisata ${values?.name} berhasil dibuat!`,
        });
        navigate("/profil/wisata-saya");
      })
      .catch((err) => {
        const errorResponse = err.response.data;
      })
      .finally(() => setIsLoadingCreate(false));
  };

  return (
    <ProfileMeContainer>
      <PageTitle title="Tambah Wisata" />

      <Text
        color="dark.500"
        fontWeight={600}
        fontSize={["24px", "24px", "24px", "32px"]}
      >
        Tambah Wisata
      </Text>

      <Box
        px="32px"
        mt="72px"
        borderRadius="20px"
        bg="white"
        w="full"
        pt="32px"
        pb={["74px", "74px", "74px", "64px"]}
        h="100%"
      >
        <form onSubmit={handleSubmit(handleCreateToko)}>
          <FormControl mb={["10px", "10px", "10px", "32px"]}>
            <FormLabel
              fontWeight={600}
              lineHeight="26px"
              letterSpacing=".5px"
              fontSize={["14px", "14px", "14px", "16px"]}
            >
              Gambar
            </FormLabel>

            <Controller
              name="image"
              control={control}
              defaultValue={[]}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <UploadImage
                  files={value}
                  allowMultiple={false}
                  onChange={onChange}
                />
              )}
            />
          </FormControl>

          <FormControl mb={["10px", "10px", "10px", "32px"]}>
            <FormLabel
              fontWeight={600}
              lineHeight="26px"
              letterSpacing=".5px"
              fontSize={["14px", "14px", "14px", "16px"]}
            >
              Nama
            </FormLabel>

            <Input
              type="text"
              borderRadius="10px"
              border="1px solid #E9ECEF"
              placeholder={`Masukkan nama wisata`}
              h={["42px", "42px", "42px", "50px"]}
              {...register("name", {
                required: true,
              })}
              _placeholder={{
                color: "#091535",
                fontWeight: 400,
                opacity: 0.5,
                fontSize: "14px",
              }}
            />
          </FormControl>

          <FormControl mb={["10px", "10px", "10px", "32px"]}>
            <FormLabel
              fontWeight={600}
              lineHeight="26px"
              letterSpacing=".5px"
              fontSize={["14px", "14px", "14px", "16px"]}
            >
              Harga
            </FormLabel>

            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <CurrencyInput
                  placeholder="Masukkan harga"
                  onChange={(val) => onChange(val)}
                />
              )}
            />
          </FormControl>

          <FormControl mb={["10px", "10px", "10px", "32px"]}>
            <FormLabel
              fontWeight={600}
              lineHeight="26px"
              letterSpacing=".5px"
              fontSize={["14px", "14px", "14px", "16px"]}
            >
              Kategori
            </FormLabel>

            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Select
                  borderRadius="10px"
                  border="1px solid #E9ECEF"
                  onChange={(e) => onChange(e.target.value)}
                  h={["42px", "42px", "42px", "50px"]}
                  _placeholder={{
                    color: "#091535",
                    fontWeight: 400,
                    opacity: 0.5,
                    fontSize: "14px",
                  }}
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
              )}
            />
          </FormControl>

          <FormControl mb={["10px", "10px", "10px", "32px"]}>
            <FormLabel
              fontWeight={600}
              lineHeight="26px"
              letterSpacing=".5px"
              fontSize={["14px", "14px", "14px", "16px"]}
            >
              Deskripsi
            </FormLabel>

            <TextEditor required name="description" control={control} />
          </FormControl>

          <FormControl mb={["10px", "10px", "10px", "32px"]}>
            <FormLabel
              fontWeight={600}
              lineHeight="26px"
              letterSpacing=".5px"
              fontSize={["14px", "14px", "14px", "16px"]}
            >
              Alamat
            </FormLabel>

            <Textarea
              type="text"
              borderRadius="10px"
              border="1px solid #E9ECEF"
              placeholder={`Masukkan alamat wisata`}
              h={["42px", "42px", "42px", "50px"]}
              {...register("address", {
                required: true,
              })}
              _placeholder={{
                color: "#091535",
                fontWeight: 400,
                opacity: 0.5,
                fontSize: "14px",
              }}
            />
          </FormControl>

          <FormControl mb={["10px", "10px", "10px", "32px"]}>
            <FormLabel
              fontWeight={600}
              lineHeight="26px"
              letterSpacing=".5px"
              fontSize={["14px", "14px", "14px", "16px"]}
            >
              Lokasi
            </FormLabel>

            <Controller
              name="location"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <Map style={{ width: "100%", height: "400px" }}>
                  <Layer url="/api/datamaster/borderline/" />
                  <Pinning onChange={onChange} />
                </Map>
              )}
            />
          </FormControl>

          <Stack float="right" mt="5" direction="row" spacing={3}>
            <Button
              mt={["10px", "10px", "10px", "0"]}
              w={["full", "full", "full", "111px"]}
              type="button"
              h="52px"
              borderRadius="50px"
              float="right"
              colorScheme="primary"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Batal
            </Button>

            <Button
              mt={["10px", "10px", "10px", "0"]}
              w={["full", "full", "full", "111px"]}
              h="52px"
              borderRadius="50px"
              colorScheme="primary"
              type="submit"
              disabled={isLoadingCreate}
              isDisabled={!isValid || isLoadingCreate}
            >
              Simpan
            </Button>
          </Stack>
        </form>
      </Box>
    </ProfileMeContainer>
  );
};

export default CreateWisataPage;
