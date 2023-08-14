import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const status = searchParams.get('status')

  if (!id || !status) return NextResponse.redirect('https://psychodietmed-git-develop-kryptonum.vercel.app/')

  if(status === 'failed'){
    return NextResponse.redirect('https://psychodietmed-git-develop-kryptonum.vercel.app/podsumowanie?status=failed')
  }

  try {
    const result = await fetch('https://psychodietmed.headlesshub.com/graphql', {
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
            status: "COMPLETED"
          },
        }
      }),
      cache: 'no-cache',
    });
    const { data } = await result.json()

    if (data?.updateOrder?.clientMutationId) {
      return NextResponse.redirect('https://psychodietmed-git-develop-kryptonum.vercel.app/podsumowanie?status=success')
    } else {
      return NextResponse.redirect('https://psychodietmed-git-develop-kryptonum.vercel.app/podsumowanie?status=error')
    }
  } catch {
    return NextResponse.redirect('https://psychodietmed-git-develop-kryptonum.vercel.app/podsumowanie?status=error')
  }
}