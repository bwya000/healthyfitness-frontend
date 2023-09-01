//基本上,以下是用來攔截當用戶點擊google註冊會發生的事,跟一般註冊沒關係,兩者是分開寫的
'use client'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import bcrypt from 'bcryptjs'
// import dbConnect from "../../../config/dbConnect";

import User from '../../../models/user'
import dbConnect from '@/configs/dbConnect'
import { signIn } from 'next-auth/react'
import axios from 'axios'

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: 'profile email', // 添加此行
      revokeOnSignout: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      scope: 'public_profile,email', // 添加此行
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect()

        const { email, password } = credentials

        const user = await User.getUserByEmail(email)

        if (!user) {
          throw new Error('Invalid Email or Password')
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password')
        }

        return user
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      console.log(user)

      return Promise.resolve(true) // 返回true,表示允許登入
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async redirect(url, baseUrl) {
      // 重定向
      return '/'
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})