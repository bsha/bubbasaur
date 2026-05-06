'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Error</h1>
      <p className="text-red-600">
        {message || 'An error occurred. Please try again.'}
      </p>
      <Link href="/auth/login" className="text-blue-600 underline">
        Back to Login
      </Link>
    </div>
  )
}
