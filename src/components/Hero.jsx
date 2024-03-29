import React from 'react'
import { motion } from 'framer-motion'
import { styles } from '../styles.js'
import {ComputersCanvas} from './canvas'
function Hero() {
  const handleFile =()=>{
    window.open('https://drive.google.com/file/d/14fmrxNx3XrR1LJ7c0PUFqhomO-FuQMDX/view?usp=drive_link')
  }
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute
      inset-0 top-[90px] max-w-7xl mx-auto flex flex-row
      items-start gap-5`}>
        <div className='flex flex-col justify-center
        items-center mt-5' >
           <div className='w-5 h-5 rounded-full bg-[#915eff]'/>
          <div className='w-1 sm:h-80 h-40 violet-gradient'/>
        </div>
        <div className='z-50' >
          <h1 className={`${styles.heroHeadText}
          text-white`}>Hi, I'm <span className='text-[#915eff]'>Razan</span></h1>
          <p className={`${styles.heroSubText} mt-0 text-white-100 mb-5`}>
          I develop user interfaces, and web applications
          </p>
          <button onClick={handleFile}  className='z-50 border-2 mt-5 w-44 border-[#5c3da0] rounded-lg px-3 py-2
           text-purple-400 hover:bg-[#5c3da0]  hover:text-white-100 '>Download My CV</button>
        </div>
        
      </div>
     
      <ComputersCanvas/>
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[25px] h-[47px] rounded-3xl border-4 border-secondary flex justify-center items-start p-1'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-2 h-2 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero
