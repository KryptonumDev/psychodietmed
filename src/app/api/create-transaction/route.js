import {
  P24,
  Currency,
  Country,
  Language,
  Encoding,
} from "@ingameltd/node-przelewy24";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { amount, sessionId, email } = await req.json()
  try {
    const p24 = new P24(
      process.env.P24_MERCHANT_ID,
      process.env.P24_POS_ID,
      process.env.P24_REST_API_KEY,
      process.env.P24_CRC,
      {
        sandbox: false
      }
    );

    const order = {
      sessionId: sessionId,
      amount: amount, // Transaction amount expressed in lowest currency unit, e.g. 1.23 PLN = 123
      currency: Currency.PLN,
      description: "Zamówienie z psychodietmed.pl",
      email: email,
      country: Country.Poland,
      language: Language.PL,
      urlReturn: "http://myawesomeapp.com/continue",
      urlStatus: "http://myawesomeapp.com/p24callback", // callback to get notification
      timeLimit: 1, // 15min
      encoding: Encoding.UTF8,
    }
    const result = await p24.createTransaction(order)

    return NextResponse.json({ result: result })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
};