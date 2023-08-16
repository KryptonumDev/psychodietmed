export async function GET(req) {
  try {
    const headers = {
      'X-Tenant': process.env.CALENDESK_TENANT_NAME,
      'X-API-Key': process.env.CALENDESK_API_KEY
    };
    fetch('https://api.calendesk.com/api/admin/availability-schedules', {
      method: 'GET',
      headers,
      cache: 'no-cache'
    })
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
  } catch {

  }
}