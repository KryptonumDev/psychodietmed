import {
  P24,
  Currency,
  Country,
  Language,
  Encoding,
} from "@ingameltd/node-przelewy24";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function POST(req) {
  const { amount, sessionId, email, urlStatus, urlReturn, description = 'Zamówienie z psychodietmed.pl', client, address, zip, city } = await req.json()

  try {
    const p24 = new P24(
      Number(process.env.P24_MERCHANT_ID),
      Number(process.env.P24_POS_ID),
      process.env.P24_REST_API_KEY,
      process.env.P24_CRC,
      {
        sandbox: false
      }
    );

    // zip, city, adress, client - (imię nazwisko) 10-2000 zł
    const order = {
      sessionId: sessionId,
      amount: Number(amount),
      currency: Currency.PLN,
      description: description,
      email: email,
      country: Country.Poland,
      language: Language.PL,
      urlReturn: urlReturn, // URL address to which customer will be redirected when transaction is complete
      urlStatus: urlStatus,
      timeLimit: 60,
      encoding: Encoding.UTF8,
      city: city,
      address: address,
      zip: zip,
      client: client
    }

    const response = await p24.createTransaction(order)
    console.log(response)
    return NextResponse.json(response)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
};