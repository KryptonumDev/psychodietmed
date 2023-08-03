import axios from "axios"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const credentials = {
      username: process.env.WP_USERNAME,
      password: process.env.WP_PASSWORD
    }

    const headers = {
      "Content-Type": "application/json"
    }

    const getToken = await axios.post(`${process.env.WP_ENDPOINT}/wp-json/jwt-auth/v1/token`,
      credentials,
      headers
    )

    return NextResponse.json({ error: null, token: getToken.data.token })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.data, token: null })
  }
}