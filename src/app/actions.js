'use server'

import { cookies } from 'next/headers'

export async function setCookie(name, value) {
  cookies().set({
    name: name,
    value: value,
    maxAge: 1209600 // 14 days
  })
}

export async function getCookie(name) {
  return cookies().get(name)
}