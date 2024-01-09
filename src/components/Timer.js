import React, { useEffect } from 'react'

export default function Timer({secondsRemaining,dispatch}) {
    const mins=Math.floor(secondsRemaining/60);
    const secs=secondsRemaining % 60;
    useEffect(()=>{
       let timerId= setInterval(()=>{
        dispatch({type:"tick"})
        },1000)
        return (()=>{
            clearInterval(timerId);
        })
    },[dispatch])
  return (
    <div className='timer'>
      {mins}:{secs}
    </div>
  )
}
