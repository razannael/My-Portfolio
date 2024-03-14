import React from 'react'
import { platforms } from '../constants/index.js';

function MyPlatforms() {
  return (
    <div>
      <div className="flex justify-center gap-3" >{platforms.map((plat)=> <a key={plat.name} href={plat.link}><img className="w-8 cursor-pointer mb-5" src={plat.icon}/></a>)}</div>
    </div>
  )
}

export default MyPlatforms
