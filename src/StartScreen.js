import React from 'react'

const StartScreen = ({questions,dispatch}) => {
  return (
    <div>
      <h2>Welcome To The React Quiz!</h2>
      <h3>{questions} Questions To Test Your React Mastery!</h3>
      <button className='btn btn-ui' onClick={()=>dispatch({type:"Start"})}>Let's Start</button>
    </div>
  )
}

export default StartScreen
