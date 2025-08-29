import React from 'react'
import light from '../images/light.PNG';
const Navbar = () => {
  return (
    <div className="navbar bg-green-200 shadow-sm">
  <div className="flex-1">
    <img src={light} alt="img" className='ml-5 w-48'/>
  </div>

    <button className='bg-green-400 text-black  px-4 py-2 font-bold rounded-xl mr-4'>Logout</button>

</div>
  )
}

export default Navbar