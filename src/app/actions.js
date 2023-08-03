'use server'

import { cookies } from 'next/headers'

export async function setCookie(name, value) {
  cookies().set({
    name: name,
    value: value,
    path: '/', // For all paths
  })
}

export async function getCookie(name) {
  console.log('all:' + cookies().getAll())
  return cookies().get(name)
}