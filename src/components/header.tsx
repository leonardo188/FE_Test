import { mdiAccountCircleOutline, mdiMenu } from '@mdi/js'
import Icon from '@mdi/react'
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Cookies from 'js-cookie'

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const router = useRouter()

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  }

  const handleLogout = async () => {
    console.log('logout')
    Cookies.remove('ref')
    router.push('/')
  }
  
  return (
    <header className="bg-gray-400 p-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-[120px] h-[60px] bg-black overflow-hidden relative ">
            <Image 
              src="https://picsum.photos/2001/800"
              layout="fill"
              objectFit="fill"
              alt="Background Image"
            />
        </div>
        <div className="container mx-auto flex justify-end items-center">
          <button onClick={toggleDropdown} className="flex items-center">
            <Icon path={mdiAccountCircleOutline} size={1.25} color="black" />
          </button>
          <Icon className='ml-2' path={mdiMenu} size={1.25} color="black" />
        </div>
      </div>
      {dropdownOpen && (
        <ul className="absolute right-4 mt-2 bg-white text-black shadow-lg z-10">
          <li className="py-2 px-6 hover:bg-gray-200">
            Account
          </li>
          <li className="py-2 px-6 hover:bg-gray-200">
            <button onClick={handleLogout} className="flex items-center">
              Logout
            </button>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Header;
