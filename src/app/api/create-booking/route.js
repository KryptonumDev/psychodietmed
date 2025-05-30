import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function POST(req) {
  let { email, name, surname, phone, employeId, serviceId, date, time, adres, city, postalcode } = await req.json()

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
        "send_reset_password": false,
        "default_address": {
          "name": name + ' ' + (surname ? surname : ''),
          "street": adres,
          "city": city,
          "postal_code": postalcode,
          "country_iso_code": "pl"
        }
      },
      "bookings": [
        {
          "employee_id": employeId,
          "service_id": serviceId,
          "start_date": date,
          "start_time": time,
          // "service_location_id": 3, // Commented out because the specified location caused a "SERVICE_LOCATION_NOT_ASSOCIATED" error.
          // It's likely that the service or employee is not assigned to this location, or the location ID is incorrect.
          // Omitting this field allows Calendesk to automatically assign the appropriate location if only one is available.
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

