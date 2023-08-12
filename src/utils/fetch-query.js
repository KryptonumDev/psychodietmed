export async function Fetch({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables,
  revalidate
}) {
  try {
    const result = await fetch(process.env.GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      ...(revalidate && { next: { revalidate: revalidate } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    throw {
      status: e.status || 500,
      message: e.message,
      query
    };
  }
}