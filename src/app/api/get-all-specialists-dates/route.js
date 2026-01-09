import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function POST(req) {
  let { specialists } = await req.json()

  const days = 60
  const date = new Date()
  const formatedDate = date.getFullYear() + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    String(date.getDate()).padStart(2, '0')

  try {
    const headers = {
      'X-Tenant': process.env.CALENDESK_TENANT_NAME,
      'X-API-Key': process.env.CALENDESK_API_KEY
    };

    // Get unique service IDs
    const serviceIds = [...new Set(specialists.map(s => s.serviceId).filter(Boolean))]
    
    // Fetch available slots for all services in parallel
    const slotsPromises = serviceIds.map(serviceId =>
      fetch(`https://api.calendesk.com/api/available-slots?service_id=${serviceId}&number_of_days=${days}&start_date=${formatedDate}`, {
        method: 'GET',
        headers,
        cache: 'no-cache'
      }).then(res => res.json()).then(data => ({ serviceId, data }))
    )

    // Fetch service details for all services in parallel
    const servicesPromises = serviceIds.map(serviceId =>
      fetch(`https://api.calendesk.com/api/admin/services/${serviceId}`, {
        method: 'GET',
        headers,
        cache: 'no-cache'
      }).then(res => res.json()).then(data => ({ serviceId, data }))
    )

    const [slotsResults, servicesResults] = await Promise.all([
      Promise.all(slotsPromises),
      Promise.all(servicesPromises)
    ])

    // Create lookup maps
    const slotsMap = {}
    slotsResults.forEach(({ serviceId, data }) => {
      slotsMap[serviceId] = data
    })

    const servicesMap = {}
    servicesResults.forEach(({ serviceId, data }) => {
      servicesMap[serviceId] = data
    })

    // Build response for each specialist
    const results = {}
    specialists.forEach(({ specialistId, serviceId }) => {
      if (specialistId && serviceId && slotsMap[serviceId]) {
        results[specialistId] = {
          dates: slotsMap[serviceId][specialistId] || {},
          service: servicesMap[serviceId] || null
        }
      }
    })

    return NextResponse.json(results)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}


