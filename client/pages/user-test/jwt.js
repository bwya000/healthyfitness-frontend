import React from 'react'
import axios from 'axios'

export default function UserTestIndex() {
  function parseJwt(token) {
    var base64Payload = token.split('.')[1]
    var payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  return (
    <>
      <h1>JWT text</h1>
      <hr />
      <button
        onClick={async () => {
          const res = await axios.post(
            'http://localhost:3005/api/auth-jwt/login',
            {
              username: 'ginny132',
              password: '12345',
            },
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)
          console.log(parseJwt(res.data.accessToken))
        }}
      >
        login
      </button>
      <button
        onClick={async () => {
          const res = await axios.post(
            'http://localhost:3005/api/auth-jwt/logout',
            {},
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)
        }}
      >
        logout
      </button>
      <button
        onClick={async () => {
          const res = await axios.get(
            'http://localhost:3005/api/auth-jwt/check-login',
            {
              withCredentials: true,
            }
          )

          console.log(res.data)
        }}
      >
        check login
      </button>
      <button
        onClick={async () => {
          const res = await axios.get(
            'http://localhost:3005/api/auth-jwt/private',
            {
              withCredentials: true,
            }
          )

          console.log(res.data)
        }}
      >
        access private
      </button>
    </>
  )
}
