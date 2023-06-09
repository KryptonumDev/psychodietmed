'use client'
import React from "react";
// import { InlineWidget } from "react-calendly"
import axios from "axios";


const organisation = 'https://api.calendly.com/organizations/83a79125-76e0-462e-a6e4-f886ec132200' // get by rest api xd
const calendlyUrl = 'https://calendly.com/d/y6h-z7h-sg3/30min'
const apiKey = 'DTTNWCY6MSMUW2SYP6KZPV3VFQYII3ZY' // dont use
const calendlyToken = 'eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNjg2MzEyNjkxLCJqdGkiOiJiZmE3ODRlNS0zNDNjLTQ2YzUtYmVhMi1lNzYxM2M3ODMzZGQiLCJ1c2VyX3V1aWQiOiI0NjhkZWU5Mi02YWU5LTQ4N2YtOGI2MC05NWQyMzA1ZTk2OWIifQ.rC8XLmHIS3UcPUbHrScFXdxaec6bl1LfFe4nG6ZV-Jh8tu8i1GGl6n0fAqanx3sX2WTe-WpOF9otTQvExjhWRQ'

const options = {
  method: 'GET',
  url: 'https://api.calendly.com/event_types',
  params: {organization: 'kryptonumstudio'},
  headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + calendlyToken }
};

export default async function Specjalista({ params }) {

  axios.request(options).then(function (response) {
    debugger
  }).catch(function (error) {
    debugger
  });

  return (
    <>
      <main>

      </main>
    </>
  )
}