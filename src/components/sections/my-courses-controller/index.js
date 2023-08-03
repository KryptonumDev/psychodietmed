'use client'
import React, { useState } from "react"
import styles from './styles.module.scss'
import Content from "@/components/sections/my-courses-content";
import Login from "@/components/sections/login";
import LOGIN from "../../../mutations/login";
import { useMutation } from "@apollo/client";
import client from "../../../apollo/apolo-client";
import { setCookie } from "@/app/actions";
import CallToAction from "../cooperate-cta";
import CallToActionGray from "../call-to-action-gray";

export default function Controller({ cta, user }) {

  const [userState, setUserState] = useState(user)

  const [login, {
    data: loginResponse,
    loading: loginLoading,
    error: loginError
  }] = useMutation(LOGIN, {
    client,
    onCompleted: (res) => {
      setUserState(res.login.user)
      setCookie('authToken', res.login.authToken)
      localStorage.setItem('authToken', res.login.authToken)
      setCookie('refreshToken', res.login.refreshToken)
      setCookie('sessionToken', res.login.sessionToken)
      setCookie('userId', res.login.user.id)
    },
    onError: (error) => {
      throw new Error(error?.graphQLErrors?.[0]?.message ?? error);
    }
  });

  return (
    <div className={styles.wrapper}>
      <h1>Moje kursy</h1>
      {userState ? (
        <div>
          <Content data={userState.courses} />
          <CallToAction data={cta} />
        </div>
      ) : (
        <div>
          <Login login={login} />
          <CallToActionGray data={{ content: '<h2>Nie masz konta?</h2><p>Zakładamy ja automatycznie, gdy kupisz kurs w naszej Akademii.</p>', link: { title: 'Akademia', url: '/akademia' } }} />
        </div>
      )}
    </div>
  )
}