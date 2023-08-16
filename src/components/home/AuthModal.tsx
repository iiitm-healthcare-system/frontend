import axios from "axios";
import Image from "next/image";
import React from "react";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import Link from "next/link";
import { Button, Title, Text, TextInput } from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { useGoogleLogin } from "@react-oauth/google";

import notificationManager from "@/components/helpers/NotificationManager";
import { useCookies } from "react-cookie";
// import API_CONSTANTS from "@/utils/apiConstants";
// import { authenticationFetcher } from "@/hooks/auth.swr";

import styles from "./AuthModal.module.css";
import IconGoogle from "@/assets/icons/Google.svg";
import API_CONSTANTS from "@/utils/apiConstants";
import { genericMutationFetcher } from "@/utils/helpers/swr.helper";
import { useRouter } from "next/navigation";

const InputComponent = {
  text: TextInput,
  email: TextInput,
  password: TextInput,
};

function AuthModal({ closeModal }: { closeModal: () => void }) {
  const router = useRouter();
  const [, setCookie] = useCookies();
  const mForm: UseFormReturnType<any> = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value: string) =>
        value.length > 0 ? null : "Password cannot be empty",
    },
  });

  const { trigger: login, isMutating: isAuthenticating } = useSWRMutation(
    API_CONSTANTS.LOGIN,
    genericMutationFetcher
  );
  const { trigger: googleLogin, isMutating: isAuthenticatingWithGoogle } =
    useSWRMutation(API_CONSTANTS.GOOGLE_LOGIN, genericMutationFetcher);

  const handleAuthSuccess = async (token: string) => {
    setCookie("token", token);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    await mutate([API_CONSTANTS.GET_USER, "get"]);
    router.push("/dashboard");
    notificationManager.showSuccess("Login Successful", "Redirecting...");
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const { data: token } = await login({
        type: "post",
        rest: [values],
      });
      handleAuthSuccess(token);
    } catch (err: any) {
      console.log(err);
      notificationManager.showError(err);
    }
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { data: token } = await googleLogin({
          type: "post",
          rest: [
            {
              code: codeResponse.code,
            },
          ],
        });
        handleAuthSuccess(token);
      } catch (err: any) {
        console.log(err);
        notificationManager.showError(err);
      }
    },
    onError: (error) => {
      console.log("Google login failed", error);
      notificationManager.showError(error);
    },
    flow: "auth-code",
  });
  const loginWithGoogle = async () => {
    handleGoogleAuth();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title order={3} className={styles.title}>
          Login to Portal
        </Title>
      </div>
      <div className={styles.body}>
        <form className={styles.form} onSubmit={mForm.onSubmit(handleSubmit)}>
          <Text color="black.4">
            Login Using Credentials Provided by Institue
          </Text>
          <TextInput
            data-autofocus
            type={"email"}
            placeholder={"Enter Email Address"}
            name={"email"}
            autoComplete={"email"}
            size="md"
            {...mForm.getInputProps("email")}
          />
          <TextInput
            type={"password"}
            placeholder={"Enter Password"}
            name={"password"}
            autoComplete={"current-password"}
            size="md"
            {...mForm.getInputProps("password")}
          />
          <Button
            color="primary"
            size="md"
            fullWidth
            className={styles.submitBtn}
            type="submit"
            // disabled={isMutating}
          >
            Log In
          </Button>
        </form>
        <div className={styles.googleAuth}>
          <Text color="black.4">
            If you do not have access to your credentials, you may login through
            Google Authentication
          </Text>
          <Button
            color="primary"
            variant="light"
            // disabled={isMutating || googleAccountFetching}
            leftIcon={
              <Image src={IconGoogle} alt={"Google"} width={20} height={20} />
            }
            fullWidth
            size="md"
            onClick={loginWithGoogle}
          >
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
