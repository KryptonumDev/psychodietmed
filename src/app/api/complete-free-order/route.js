import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

export const dynamic = 'force-dynamic'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.redirect('https://www.psychodietmed.pl/podsumowanie?status=error')

    await fetch('https://wp.psychodietmed.pl/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${process.env.AUTHORISE_USERNAME}:${process.env.AUTHORISE_PASSWORD}`)}`
      },
      body: JSON.stringify({
        query: `
          mutation UPDATE_ORDER( $input: UpdateOrderInput! ) {
            updateOrder(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: {
          input: {
            clientMutationId: v4(),
            orderId: Number(id),
            status: "COMPLETED",
          },
        }
      }),
      cache: 'no-cache',
    })
      .then(result => result.json())
      .then(result => {
        console.log(result)
        if (result.data?.updateOrder?.clientMutationId)
          throw new Error('complete')
        else
          throw new Error('error')
      })
  } catch (err) {
    console.log(err)
    if (err.message === 'complete')
      return NextResponse.redirect('https://www.psychodietmed.pl/podsumowanie?status=success')
    else if (err.message === 'failed')
      return NextResponse.redirect('https://www.psychodietmed.pl/podsumowanie?status=failed')
    else
      return NextResponse.redirect('https://www.psychodietmed.pl/podsumowanie?status=error')
  }
}