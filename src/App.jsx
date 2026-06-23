import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {

  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1)

  const getData = async () => {

    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)

    setUserData(response.data)
  }

  useEffect(function(){
    getData()
  },[index])

  let printUserData = <h3 className=' text-gray-400 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>

  if (userData.length>0) {
    printUserData = userData.map(function(elem,idx){

      return<div key={idx}>
        <a href={elem.url} target='_blank'>
          <div className='h-40 w-44 overflow-hidden rounded-xl'>
          <img className='h-full w-full object-cover' src={elem.download_url}/>
        </div>
      <h2 className='text-lg font-bold'>{elem.author}</h2>
      </a>
      </div>
    })
  }

  return (
    <div className='bg-black overflow-auto h-screen p-4 text-white'>
      <div className='flex flex-wrap justify-center gap-4 h-[85%]'>
      {printUserData}
      </div>

      <div className='flex justify-center items-center gap-6 p-4 fixed bottom-0 left-0 w-full bg-black'>
        <button style={{opacity: index== 1 ? 0.5 : 1}} className='bg-amber-400 text-sm text-black rounded px-5 py-3 font-semibold cursor-pointer active:scale-95'
        onClick={()=>{
          if(index>1){
            setIndex(index-1)
            setUserData([])}}}
        >prev</button>

        <h4>page {index}</h4>

        <button className='bg-amber-400 text-sm text-black rounded px-5 py-3 font-semibold cursor-pointer active:scale-95'
        onClick={()=>{
          setUserData([])
          setIndex(index+1)}}
        >next</button>
      </div>

    </div>
  )
}

export default App
