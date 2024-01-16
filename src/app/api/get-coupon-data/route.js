import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function POST(req) {
  const { code } = await req.json()

  return await fetch('https://wp.psychodietmed.pl/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${process.env.AUTHORISE_USERNAME}:${process.env.AUTHORISE_PASSWORD}`)}`
    },
    body: JSON.stringify({
      query: `
          query GET_COUPON(  $id: ID! ) {
            coupon(id: $id, idType: CODE) {
              id
              code
              amount
              discountType
            }
          }
        `,
      variables: {
        id: code,
      }
    }),
    cache: 'no-cache',
  })
    .then(res => res.json())
    .then(res => {
      return NextResponse.json(res.data)
    }).catch(err => {
      return NextResponse.json(err)
    })
}