import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  FormErrorMessage,
  FormHelperText,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDebounce } from "use-debounce";
import { request } from "@app/utils/request";
import { useStore } from "@app/hooks/useStore";
import Eye from "@app/icons/Eye";
import EyeSlash from "@app/icons/EyeSlash";
import PageTitle from "@app/components/PageTitle";

const ChangePasswordPage = () => {
  const {
    watch,
    register,
    setError,
    clearErrors,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm();

  const { state } = useStore();

  const toast = useToast();

  const watchOldPassword = watch("old_password");
  const watchNewPassword = watch("new_password");
  const watchConfirmNewPassword = watch("new_password_confirm");

  const [debounceOldPassword] = useDebounce(watchOldPassword, 400);

  const [oldPasswordCorrect, setOldPasswordCorrect] = useState(false);
  const [loading, setLoading] = useState({
    validateOldPassword: false,
    resetPassword: false,
  });
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    new_confirm: false,
  });

  const handleResetPassword = (values) => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      resetPassword: true,
    }));

    request
      .post("/api/user/user/change-password/", {
        old_password: values?.old_password,
        new_password: values?.new_password,
      })
      .then(() => {
        toast({
          title: "Sukses",
          status: "success",
          description: "Password berhasil diganti !",
        });

        resetForm();
        setOldPasswordCorrect(false);
      })
      .finally(() =>
        setLoading((prevLoading) => ({
          ...prevLoading,
          resetPassword: false,
        }))
      );
  };

  const handleValidateOldPassword = (oldPassword) => {
    setLoading((prevLoading) => ({
      ...prevLoading,
      validateOldPassword: true,
    }));

    request
      .post("/api/auth/login/", {
        email: state?.user?.data?.email,
        password: oldPassword,
      })
      .then(() => {
        setOldPasswordCorrect(true);
        clearErrors("old_password");
      })
      .catch(() => {
        setError("old_password", {
          message: "Password lama anda salah, silakan coba lagi !",
        });
      })
      .finally(() =>
        setLoading((prevLoading) => ({
          ...prevLoading,
          validateOldPassword: false,
        }))
      );
  };

  useEffect(() => {
    if (debounceOldPassword) {
      handleValidateOldPassword(debounceOldPassword);
    }
  }, [debounceOldPassword]);

  useEffect(() => {
    if (
      watchConfirmNewPassword &&
      watchConfirmNewPassword !== watchNewPassword
    ) {
      setError("new_password_confirm", {
        message: "Konfirmasi password tidak cocok !",
      });
    }

    return () => clearErrors("new_password_confirm");
  }, [watchNewPassword, watchConfirmNewPassword]);

  return (
    <>
      <PageTitle title="Ubah Password" />

      <Box mt="100px">
        <Container maxW="6xl">
          <Heading>Ubah Password</Heading>

          <form onSubmit={handleSubmit(handleResetPassword)}>
            <Stack mt="30px" spacing="20px">
              <FormControl isInvalid={errors?.old_password} mt="32px">
                <FormLabel
                  fontWeight={600}
                  fontSize="1rem"
                  letterSpacing=".5px"
                  color="#212529"
                >
                  Password Lama
                </FormLabel>

                <InputGroup>
                  <Input
                    h="50px"
                    borderRadius="10px"
                    border="1px solid #E9ECEF"
                    placeholder="Masukkan password lama"
                    type={showPassword ? "text" : "password"}
                    {...register("old_password", { required: true })}
                    disabled={loading.validateOldPassword || oldPasswordCorrect}
                  />

                  <InputRightElement
                    top="4.5px"
                    onClick={() =>
                      setShowPassword((prevOldPassword) => ({
                        ...prevOldPassword,
                        old: !showPassword.old,
                      }))
                    }
                  >
                    {showPassword.old ? <Eye /> : <EyeSlash />}
                  </InputRightElement>
                </InputGroup>
                {errors?.old_password && (
                  <FormErrorMessage fontSize=".75rem">
                    {errors?.old_password?.message ??
                      "Harap masukkan password lama"}
                  </FormErrorMessage>
                )}

                {oldPasswordCorrect && (
                  <FormHelperText color="green.500" fontSize=".75rem">
                    Password lama anda benar !
                  </FormHelperText>
                )}
              </FormControl>

              {oldPasswordCorrect && (
                <>
                  <FormControl isInvalid={errors?.new_password} mt="32px">
                    <FormLabel
                      fontWeight={600}
                      fontSize="1rem"
                      letterSpacing=".5px"
                      color="#212529"
                    >
                      Password Baru
                    </FormLabel>

                    <InputGroup>
                      <Input
                        h="50px"
                        type={showPassword.new ? "text" : "password"}
                        borderRadius="10px"
                        border="1px solid #E9ECEF"
                        placeholder="Masukkan password baru"
                        {...register("new_password", { required: true })}
                      />

                      <InputRightElement
                        top="4.5px"
                        onClick={() =>
                          setShowPassword((prevOldPassword) => ({
                            ...prevOldPassword,
                            new: !showPassword.new,
                          }))
                        }
                      >
                        {showPassword.new ? <Eye /> : <EyeSlash />}
                      </InputRightElement>
                    </InputGroup>
                    {errors?.new_password && (
                      <FormErrorMessage fontSize=".75rem">
                        {errors?.new_password?.message ??
                          "Harap masukkan password lama"}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={errors?.new_password_confirm}
                    mt="32px"
                  >
                    <FormLabel
                      fontWeight={600}
                      fontSize="1rem"
                      letterSpacing=".5px"
                      color="#212529"
                    >
                      Konfirmasi Password Baru
                    </FormLabel>

                    <InputGroup>
                      <Input
                        h="50px"
                        borderRadius="10px"
                        border="1px solid #E9ECEF"
                        placeholder="Masukkan konfirmasi password baru"
                        type={showPassword.new_confirm ? "text" : "password"}
                        {...register("new_password_confirm", {
                          required: true,
                        })}
                      />

                      <InputRightElement
                        top="4.5px"
                        onClick={() =>
                          setShowPassword((prevOldPassword) => ({
                            ...prevOldPassword,
                            new_confirm: !showPassword.new_confirm,
                          }))
                        }
                      >
                        {showPassword.new_password_confirm ? (
                          <Eye />
                        ) : (
                          <EyeSlash />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {errors?.new_password_confirm && (
                      <FormErrorMessage fontSize=".75rem">
                        {errors?.new_password_confirm?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                </>
              )}
            </Stack>

            <Stack
              mt="40px"
              justify="end"
              direction="row"
              spacing="20px"
              float="right"
            >
              <Button
                w="120px"
                h="52px"
                borderRadius="30px"
                p="14px 28px 14px 28px"
                colorScheme="primary"
                type="button"
                variant="outline"
              >
                Batal
              </Button>
              <Button
                w="120px"
                h="52px"
                borderRadius="30px"
                p="14px 28px 14px 28px"
                colorScheme="primary"
                type="submit"
                isDisabled={errors?.new_password_confirm}
                isLoading={loading.resetPassword}
              >
                Simpan
              </Button>
            </Stack>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default ChangePasswordPage;
