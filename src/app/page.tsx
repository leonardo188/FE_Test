"use client"

import Image from "next/image"
import { useState } from "react"
import { login } from "./api/auth"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = { username, password }
    try {
      const response = await login(payload)
      if (response.code === 200) {
        router.push('/dashboard')
      }
      console.log('Login successful', response)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const isDisabled = !username || !password

  return (
    <div className="grid grid-cols-2 h-screen">
      <main className="flex flex-col justify-center items-center h-screen text-black">
        <div className="w-1/2 h-[120px] bg-black overflow-hidden relative ">
          <Image 
            src="https://picsum.photos/2001/800"
            layout="fill"
            objectFit="fill"
            alt="Background Image"
          />
        </div>
        <form onSubmit={handleSubmit} className="w-1/2 mt-8">
          <p>Username</p>
          <input 
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-700 px-2 py-1 block w-full shadow-sm bg-gray-200"
            required
          />
          <p className="mt-4">Password</p>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-700 px-2 py-1 block w-full shadow-sm bg-gray-200"
            required
          />
          <div className="flex flex-row justify-end">
            <button disabled={!username || !password} type="submit" 
            className={`mt-8 w-1/5 text-white font-bold p-2 rounded ${isDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-gray-800 hover:bg-gray-700'} transition duration-200`}>
              Login
            </button>
          </div>
        </form>
      </main>
      <main className="relative flex-1">
        <Image 
          src="https://picsum.photos/2000"
          layout="fill"
          objectFit="cover"
          alt="Background Image"
        />
      </main>
    </div>
  );
}
