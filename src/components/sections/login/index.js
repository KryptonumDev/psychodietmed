"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Input from "@/components/atoms/input";
import { emailPattern } from "../../../constants/patterns";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { useRouter } from "next/navigation";
import LOGIN from "../../../mutations/login";
import { useMutation } from "@apollo/client";
import { setCookie } from "@/app/actions";
import SEND_RESET from "../../../mutations/send-password-reset";
import Button from "@/components/atoms/button";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../loader";

export default function Login() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginStatus, setLoginStatus] = useState({ sending: false });
  const [renewPass, setRenewPass] = useState(false);
  const [clearTried, setClearTried] = useState(false);
  const [input, setInput] = useState(null);

  const loginSumbit = (data) => {
    setLoginStatus({ sending: true });
    const Input = {
      clientMutationId: v4(),
      username: data.email,
      password: data.password,
    };
    setInput(Input);
    login({ variables: { input: Input } });
  };

  const resetSubmit = (data) => {
    setLoginStatus({ sending: true });
    const Input = {
      clientMutationId: v4(),
      username: data.email,
    };
    reset({ variables: { input: Input } });
  };

  const [login, { loading: loginLoading }] = useMutation(LOGIN, {
    ignoreResults: true,
    onCompleted: (res) => {
      setCookie("authToken", res.login.authToken);
      localStorage.setItem("authToken", res.login.authToken);
      push("/moje-kursy");
      setLoginStatus({ sending: false });
    },
    onError: (error) => {
      if (error.message === "invalid_email") {
        setLoginStatus({ sending: false, error: "Nieprawidłowy adres e-mail" });
      } else if (error.message === "invalid_password") {
        setLoginStatus({ sending: false, error: "Nieprawidłowe hasło" });
      } else {
        console.error(error);
        if (clearTried) {
          setLoginStatus({
            sending: false,
            error: `Błąd serwera, spóbuj póżniej lub skontaktuj się z obsługą sklepu. Błąd do przekazania dla obsługi - ${error.message}`,
          });
        } else {
          localStorage.clear();
          setCookie("authToken", "");
          setClearTried(true);
          login({
            variables: { input: { ...input, clientMutationId: v4() } },
          });
        }
      }
    },
  });

  const [reset, { loading: resetLoading }] = useMutation(SEND_RESET, {
    onCompleted: (res) => {
      setRenewPass(false);
      setLoginStatus({ sending: false });
    },
    onError: () => {
      setLoginStatus({
        sending: false,
        error: "Coś poszło nie tak. Spróbuj ponownie później.",
      });
    },
  });

  return (
    <section className={styles.wrapper}>
      <Loader show={loginLoading || resetLoading} />
      {renewPass ? (
        <>
          <h2>Nie pamiętasz hasła?</h2>
          <p>
            Żaden problem! Podaj adres e-mail, a wyślemy na niego link do zmiany
            hasła, który wystarczy kliknąć.
          </p>
          <form onSubmit={handleSubmit(resetSubmit)}>
            <Input
              register={register("email", {
                required: true,
                pattern: emailPattern,
              })}
              errors={errors}
              name="email"
              title="E-mail"
              placeholder="E-mail"
            />
            <AnimatePresence mode="wait">
              {loginStatus.error && (
                <motion.p
                  className={styles.error}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                >
                  {loginStatus.error}
                </motion.p>
              )}
            </AnimatePresence>
            <Button type="submit" disabled={loginStatus.sending}>
              Zresetuj hasło
            </Button>
          </form>
          <button
            onClick={() => {
              setRenewPass(false);
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className={styles.button}
          >
            Zaloguj się
          </button>
        </>
      ) : (
        <>
          <h2>Zaloguj się, aby mieć dostęp do kursów</h2>
          <form onSubmit={handleSubmit(loginSumbit)}>
            <Input
              register={register("email", {
                required: true,
                pattern: emailPattern,
              })}
              errors={errors}
              name="email"
              title="E-mail"
              placeholder="E-mail"
            />
            <Input
              register={register("password", { required: true, minLength: 12 })}
              errors={errors}
              name="password"
              title="Hasło"
              placeholder="Hasło"
              type="password"
            />
            <AnimatePresence mode="wait">
              {loginStatus.error && (
                <motion.p
                  className={styles.error}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                >
                  {loginStatus.error}
                </motion.p>
              )}
            </AnimatePresence>
            <Button type="submit" disabled={loginStatus.sending}>
              Zaloguj się
            </Button>
          </form>
          <button
            onClick={() => {
              setRenewPass(true);
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className={styles.button}
          >
            Nie pamiętam hasła
          </button>
        </>
      )}
    </section>
  );
}
