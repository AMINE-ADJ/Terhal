import React from 'react'
import UserCircle from './userCircle'
import SearchBar from './SearchBar'

export default function Navbar() {
  const phone = '+ 1 (800) 657 8976'
  return (
    <div className='z-10 w-full h-20 sticky flex flex-row justify-between items-center bg-white pr-10 pl-5'>
      <SearchBar/>
      <div className='flex flex-row gap-10 items-center'>
        <div className='flex flex-row gap-2 items-center'>
        <ion-icon name="call"></ion-icon>
     <p>{phone}</p>
        </div>
      
      <UserCircle/>
      </div>
     
    </div>
  )
}