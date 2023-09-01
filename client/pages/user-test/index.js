import React from 'react'
import axios from 'axios'

// 模擬 session-cookie
export default function UserTestIndex() {
  return (
    <>
      <button
        onClick={async () => {
          const res = await axios.get('http://localhost:3005/api/users')
          console.log(res.data)
        }}
      >
        get users
      </button>
      <button
        onClick={async () => {
          const res = await axios.get('http://localhost:3005/api/users/1')
          console.log(res.data)
        }}
      >
        get user by id =1
      </button>
      <button
        onClick={async () => {
          const res = await axios.post('http://localhost:3005/api/users', {
            name: '金妮12132',
            email: 'ginny11132@test.com',
            username: 'ginny132',
            password: '12345',
          })

          console.log(res.data)
        }}
      >
        post user
      </button>
      <button
        onClick={async () => {
          const res = await axios.put('http://localhost:3005/api/users/3', {
            name: '金妮妮',
            email: 'ginny123@test.com',
            username: 'ginny123',
            password: '12345',
          })

          console.log(res.data)
        }}
      >
        put user
      </button>
      <hr />
      <button
        onClick={async () => {
          const res = await axios.post(
            'http://localhost:3005/api/auth/login',
            {
              username: 'ginny132',
              password: '12345',
            },
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)
        }}
      >
        login
      </button>
      <button
        onClick={async () => {
          const res = await axios.post(
            'http://localhost:3005/api/auth/logout',
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
            'http://localhost:3005/api/auth/check-login',
            {
              withCredentials: true, // save cookie in browser
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
            'http://localhost:3005/api/auth/private',
            {
              withCredentials: true, // save cookie in browser
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
