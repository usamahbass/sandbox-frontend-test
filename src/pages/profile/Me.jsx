import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  SkeletonText,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { request } from "@app/utils/request";
import { useStore } from "@app/hooks/useStore";
import { setTriggerUser } from "@app/context/actions";
import { filterValuesObject } from "@app/utils/helper";
import CameraIcon from "@app/icons/Camera";
import ProfileMeContainer from "@app/containers/ProfileContainer";

const MePage = () => {
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { state, dispatch } = useStore();

  const toast = useToast();
  const watchFotoURL = watch("photo", null);

  const [loadingProcess, setLoadingProcess] = useState(false);

  const isAvatarURL =
    watchFotoURL?.length > 0
      ? URL.createObjectURL(watchFotoURL?.[0])
      : state?.user?.data?.photo;

  const handleSaveProfile = (values) => {
    setLoadingProcess(true);

    let isPayload = {
      ...filterValuesObject(values, ["photo"]),
    };

    if (values?.photo?.length > 0) {
      isPayload = {
        ...isPayload,
        photo: values?.photo?.[0],
      };
    }

    const formData = new FormData();

    Object.entries(isPayload).forEach(([key, value]) =>
      formData.append(key, value)
    );

    request
      .patch(`/api/user/user/me/`, formData)
      .then(() => {
        toast({
          status: "success",
          title: "Sukses",
          description: "Profil anda berhasil diperbaharui !",
        });

        dispatch(setTriggerUser(true));
      })
      .finally(() => setLoadingProcess(false));
  };

  useEffect(() => {
    if (state?.user?.data) {
      setValue("full_name", state?.user?.data?.full_name);
      setValue("email", state?.user?.data?.email);
      setValue("address", state?.user?.data?.address);
      setValue("handphone", state?.user?.data?.handphone);
    }
  }, [state?.user]);

  const isNotValid = Object.entries(errors).length > 0;

  return (
    <ProfileMeContainer>
      <Box onSubmit={handleSubmit(handleSaveProfile)} as="form">
        {/* HEADER */}
        <Flex justify="space-between">
          <Stack direction="row" align="center" spacing={4}>
            <Box>
              <Avatar
                size="2xl"
                src={isAvatarURL}
                name={state?.user?.data?.full_name}
              />

              <input
                type="file"
                hidden
                id="avatarFile"
                {...register("photo")}
              />

              <IconButton
                size="sm"
                position="absolute"
                top="90px"
                left="44%"
                borderRadius="50px"
                colorScheme="primary"
                icon={<CameraIcon />}
                onClick={() => document.getElementById("avatarFile").click()}
              />
            </Box>

            <Stack spacing={2}>
              <SkeletonText
                noOfLines={1}
                isLoaded={state?.user?.data}
                w={!state?.user?.data ? "100px" : "auto"}
              >
                <Text color="dark.500" fontSize="2xl" fontWeight={500}>
                  {state?.user?.data?.full_name}
                </Text>
              </SkeletonText>

              <SkeletonText
                noOfLines={1}
                isLoaded={state?.user?.data}
                w={!state?.user?.data ? "300px" : "auto"}
              >
                <Text fontSize="lg" color="#465170">
                  {state?.user?.data?.address}
                </Text>
              </SkeletonText>
            </Stack>
          </Stack>

          <Button
            mt={["10px", "10px", "10px", "10"]}
            w={["full", "full", "full", "111px"]}
            h="52px"
            borderRadius="50px"
            colorScheme="primary"
            type="submit"
            isLoading={loadingProcess}
            disabled={isNotValid || loadingProcess}
          >
            Simpan
          </Button>
        </Flex>

        {/* CONTENT */}

        <Stack mt="10" spacing={["10px", "10px", "10px", "32px"]}>
          <FormControl>
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
              placeholder="Masukkan nama"
              h={["42px", "42px", "42px", "50px"]}
              {...register("full_name", {
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

          <FormControl>
            <FormLabel
              fontWeight={600}
              lineHeight="26px"
              letterSpacing=".5px"
              fontSize={["14px", "14px", "14px", "16px"]}
            >
              Email
            </FormLabel>

            <Input
              type="email"
              borderRadius="10px"
              border="1px solid #E9ECEF"
              placeholder="Masukkan email"
              h={["42px", "42px", "42px", "50px"]}
              {...register("email", {
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

          <FormControl>
            <FormLabel
              fontWeight={600}
              lineHeight="26px"
              letterSpacing=".5px"
              fontSize={["14px", "14px", "14px", "16px"]}
            >
              Alamat
            </FormLabel>

            <Textarea
              borderRadius="10px"
              border="1px solid #E9ECEF"
              placeholder="Masukkan alamat"
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

          <FormControl>
            <FormLabel
              fontWeight={600}
              lineHeight="26px"
              letterSpacing=".5px"
              fontSize={["14px", "14px", "14px", "16px"]}
            >
              No Handphone
            </FormLabel>

            <Input
              type="text"
              borderRadius="10px"
              border="1px solid #E9ECEF"
              placeholder="Masukkan no handphone"
              h={["42px", "42px", "42px", "50px"]}
              {...register("handphone", {
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
        </Stack>
      </Box>
    </ProfileMeContainer>
  );
};

export default MePage;
