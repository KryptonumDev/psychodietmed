import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(req) {
  const { data: { id } } = await req.json()
  try {
    // const token = await AuthJWT()
    const { data: { token } } = await axios('http://localhost:8000/api/auth')
    const url = `${process.env.WP_ENDPOINT}/wp-json/ldlms/v2/sfwd-lessons?course=${id}` 
    // const url = `${process.env.WP_ENDPOINT}/wp-json/ldlms/v2/sfwd-courses/${id}/steps`

    
    
    const courseSteps = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return NextResponse.json({ error: null, lessons: courseSteps.data })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.data, lessons: null })
  }
}