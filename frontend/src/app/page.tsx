'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, User, Award, Target } from 'lucide-react'
import { Footer } from './components/Footer'
import { useAuth } from './contexts/AuthContext'
import { useRouter } from 'next/navigation';
import { Loading } from './components/Loading'

export default function Home() {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (user) {
        setIsLoading(true)
        router.push('/dashboard')
      } else {
        setIsLoading(false)
      }
    }
    checkUser()
  }, [user, router])

  const handleLogin = async (method: 'metamask' | 'web3auth') => {
    setIsLoggingIn(true)
    try {
      await login(method)
      setIsLoading(true)
      router.push('/dashboard')
    } catch (error) {
      console.error(`Error during ${method} login:`, error)
      setIsLoggingIn(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex flex-col items-center py-4 md:flex-row md:justify-between">
          <h1 className="text-3xl font-bold text-blue-400 mb-2 md:mb-0">
            Find NFT Spots
          </h1>
          <div className="text-sm font-medium text-gray-300">
            Discover and Collect NFTs
          </div>
        </div>
      </header>
      <main className="flex-1 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
        <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Button
              onClick={() => handleLogin('metamask')}
              disabled={isLoggingIn}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              <Image src="/images/metamask-logo.png" width={32} height={32} alt="Metamask" className="mr-3" />
              <span>{isLoggingIn ? 'Logging in...' : 'Login with Metamask'}</span>
            </Button>
            <Button
              onClick={() => handleLogin('web3auth')}
              disabled={isLoggingIn}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
            >
              <Image src="/images/web3auth-logo.png" width={32} height={32} alt="Web3Auth" className="mr-3" />
              <span>{isLoggingIn ? 'Logging in...' : 'Login with Web3Auth'}</span>
            </Button>
          </div>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400">Welcome to Find NFT Spots</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">
                Explore the city and discover unique NFT spots around you. Collect digital art, 
                complete missions, and level up your NFT collection experience.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Find nearby locations with exclusive NFTs</li>
                <li>Complete missions and earn rewards</li>
                <li>Track your progress and level up</li>
                <li>Join a community of NFT enthusiasts</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}