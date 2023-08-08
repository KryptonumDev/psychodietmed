import {
  P24,
  Currency,
  Country,
  Language,
  Encoding,
} from "@ingameltd/node-przelewy24";
import { NextResponse } from "next/server";
import { v4 } from "uuid";

export async function GET(req) {
  // const { amount, sessionId, email } = await req.json()
  let amount = 100
  let sessionId = v4()
  let email = "shevagodan16@gmail.com"

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
      urlReturn: "http://myawesomeapp.com/podsumowanie", // URL address to which customer will be redirected when transaction is complete
      urlStatus: "http://myawesomeapp.com/p24callback", // URL address to which transaction status will be send
      timeLimit: 1, // 15min
      encoding: Encoding.UTF8,
    }

    const result = await p24.createTransaction(order).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })

    return NextResponse.json({ result: result })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
};