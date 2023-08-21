import { NextResponse } from "next/server"

export async function POST(req) {
  let { employeId, serviceId } = await req.json()

  const days = 60
  const date = new Date()
  const formatedDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  try {
    const headers = {
      'X-Tenant': process.env.CALENDESK_TENANT_NAME,
      'X-API-Key': process.env.CALENDESK_API_KEY
    };
    const dates = await fetch(`https://api.calendesk.com/api/available-slots?service_id=${serviceId}&number_of_days=${days}&start_date=${formatedDate}`, {
      method: 'GET',
      headers,
      cache: 'no-cache'
    })
    const datesJSON = await dates.json()

    const service = await fetch(`https://api.calendesk.com/api/admin/services/${serviceId}`, {
      method: 'GET',
      headers,
      cache: 'no-cache'
    })

    const serviceJSON = await service.json()

    return NextResponse.json({ dates: datesJSON[employeId], service: serviceJSON })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}