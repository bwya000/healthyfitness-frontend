import React from 'react'
import dynamic from 'next/dynamic'

const SupportChatWidget = dynamic(() => import('@/components/SupportChat'), {
  ssr: false,
})

export default function Chat() {
  return (
    <>
      <SupportChatWidget />
    </>
  )
}
