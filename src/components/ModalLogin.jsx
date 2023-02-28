import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  IconButton,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { request } from "@app/utils/request";
import { setToken } from "@app/utils/auth";
import { setTriggerUser } from "@app/context/actions";
import { useStore } from "@app/hooks/useStore";
import Eye from "@app/icons/Eye";
import Key from "@app/icons/Key";
import CloseIcon from "@app/icons/Close";
import EyeSlash from "@app/icons/EyeSlash";
import UserOctagon from "@app/icons/UserOcatagon";

const ModalLogin = ({ isOpen, onClose }) => {
  const { pathname } = useLocation();

  const { dispatch } = useStore();

  const {
    register,
    setError,
    handleSubmit,
    reset: resetForm,
    formState: { isValid, errors },
  } = useForm({
    mode: "onChange",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (loginPayload) => {
    setLoading(true);

    request
      .post("/api/auth/login/", loginPayload)
      .then((res) => {
        const responseData = res.data;

        setToken(responseData);
        resetForm();
        onClose();

        dispatch(setTriggerUser(true));
      })
      .catch((err) => {
        const errorMessage = err.response.data?.detail;

        setError("email", { message: errorMessage });
        setError("password", { message: errorMessage });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal
      size="xl"
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
        push(pathname);
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent borderRadius="20px" p={["0", "0", "0", "14px"]}>
        <form autoComplete="off" onSubmit={handleSubmit(handleLogin)}>
          <ModalHeader
            px="54px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              mx="auto"
              textAlign="center"
              fontWeight={600}
              fontSize="1rem"
              letterSpacing=".5px"
              color="#212529"
              pos="relative"
              left={["40px", "40px", "40px", "73px"]}
            >
              Login
            </Text>
            <IconButton
              ml="auto"
              bg="transparent"
              onClick={() => {
                onClose();
                resetForm();
              }}
            >
              <CloseIcon />
            </IconButton>
          </ModalHeader>

          <ModalBody pt="25px" px="44px">
            <FormControl isInvalid={errors?.email}>
              <FormLabel
                fontWeight={600}
                fontSize="1rem"
                letterSpacing=".5px"
                color="#212529"
              >
                Email
              </FormLabel>

              <InputGroup>
                <InputLeftElement top="4.5px">
                  <UserOctagon />
                </InputLeftElement>

                <Input
                  h="50px"
                  type="email"
                  border="1px solid #E9ECEF"
                  borderRadius="10px"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
              </InputGroup>
              {errors?.email && (
                <FormErrorMessage fontSize=".75rem">
                  {errors?.email?.message ?? "Harap masukkan email"}
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors?.password} mt="32px">
              <FormLabel
                fontWeight={600}
                fontSize="1rem"
                letterSpacing=".5px"
                color="#212529"
              >
                Password
              </FormLabel>

              <InputGroup>
                <InputLeftElement top="4.5px">
                  <Key />
                </InputLeftElement>

                <Input
                  h="50px"
                  borderRadius="10px"
                  placeholder="Password"
                  border="1px solid #E9ECEF"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
                />

                <InputRightElement
                  top="4.5px"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </InputRightElement>
              </InputGroup>
              {errors?.password && (
                <FormErrorMessage fontSize=".75rem">
                  {errors?.password?.message ?? "Harap masukkan password"}
                </FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter pb="25px" mt="22px">
            <Button
              type="submit"
              colorScheme="primary"
              w="257px"
              h="52px"
              display="flex"
              mx="auto"
              isDisabled={!isValid || loading}
              isLoading={loading}
              justifyContent="center"
              alignItems="center"
              borderRadius="50px"
            >
              Login
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ModalLogin;
