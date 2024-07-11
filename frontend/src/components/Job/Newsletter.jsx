import React from 'react'
import{ FaEnvelopeOpenText, FaRocket } from "react-icons/fa6"
const Newsletter = () => {
  return (
    <div className='shadow-inner'>
        <div>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
  <FaEnvelopeOpenText />
  <span>Email me for jobs</span>
</h3>
<p className='text-primary/75 text-base mb-4'>One of the ways you can seek out openings to apply for is to email a company directly asking about their employment opportunities.</p>
<div className='w-full space-y-4'>
<input type="email" name='email' id='email' placeholder='firststname.lastName@etu.uae.ac.ma' className='w-full block py-2
  focus:outline-none' />
 <input type="submit" value={"subscribe"} className='w-full block py-2
 focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
</div>

<div className='w-full space-y-4'>
 {/* 2nd part */}
 <div className='mt-20'>
 <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
  <FaRocket />
  <span>Get noticied faster!</span>
</h3>
<p className='text-primary/75 text-base mb-4'>One of the ways you can seek out openings to apply for is to email a company directly asking about their employment opportunities.</p>
<div className='w-full space-y-4'>
<input type="submit" value={"upload your resume"}  className='w-full block py-2
 border focus:outline-none bg-blue rounded-sm text-white cursor-pointer font-semibold' />
 
</div>

 </div>
 
</div>

 </div>
 </div>
  )
}

export default Newsletter
