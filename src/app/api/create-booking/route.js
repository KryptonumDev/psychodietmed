import { NextResponse } from "next/server"

export async function POST(req) {
  let { email, name, surname, phone, message, employeId, serviceId, date, time } = await req.json()

  try {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("X-Requested-With", "XMLHttpRequest");
    headers.append("X-Tenant", process.env.CALENDESK_TENANT_NAME);
    headers.append("X-Api-Key", process.env.CALENDESK_API_KEY);

    var body = JSON.stringify({
      "user": {
        "email": email,
        "name": name,
        "default_phone": phone,
        "surname": surname,
        "send_reset_password": false
      },
      "bookings": [
        {
          "employee_id": employeId,
          "service_id": serviceId,
          "start_date": date,
          "start_time": time,
          "description": message
        }
      ]
    });

    const res = await fetch(`https://api.calendesk.com/api/user/bookings/v2`, {
      method: 'POST',
      headers: headers,
      body: body,
      redirect: 'follow',
      cache: 'no-cache'
    })
    const data = await res.json()
    
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

