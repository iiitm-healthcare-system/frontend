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

const InputComponent = {
  text: TextInput,
  email: TextInput,
  password: TextInput,
};

function AuthModal({ closeModal }: { closeModal: () => void }) {
  const [, setCookie] = useCookies();
  const [googleAccountFetching, setGoogleAccountFetching] =
    React.useState<boolean>(false);
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

  // const { trigger: authenticate, isMutating } = useSWRMutation(
  //   "authenticate",
  //   authenticationFetcher
  // );

  // const handleAuthSuccess = async (
  //   token: string,
  //   messageContents: (typeof COMPONENT_DATA.messages)[keyof typeof COMPONENT_DATA.messages]
  // ) => {
  //   setCookie("token", token);
  //   axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  //   notificationManager.showSuccess(
  //     messageContents.title,
  //     messageContents.description
  //   );

  //   mutate(API_CONSTANTS.GET_USER);
  //   closeModal();
  // };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      // let token = await authenticate({
      //   data: values,
      // });
      // handleAuthSuccess(
      //   token,
      //   COMPONENT_DATA.messages[
      //     currentVariant as keyof typeof COMPONENT_DATA.messages
      //   ]
      // );
    } catch (err: any) {
      console.log(err);
      notificationManager.showError(err);
    }
  };

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        // let token = await authenticate({
        //   authType: "google",
        //   data: codeResponse.code,
        // });
        // handleAuthSuccess(token, COMPONENT_DATA.messages.google);
      } catch (err: any) {
        console.log(err);
        notificationManager.showError(err);
      }
      setGoogleAccountFetching(false);
    },
    onError: (error) => {
      console.log("Google login failed", error);
      notificationManager.showError(error);
      setGoogleAccountFetching(false);
    },
    flow: "auth-code",
  });
  const loginWithGoogle = async () => {
    setGoogleAccountFetching(true);
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
