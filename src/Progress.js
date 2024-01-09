import React from 'react'

const Progress = ({questions,index,points,maxpossiblepoints}) => {
  return (
    <header className='progress'>
    <progress questions={questions.length} value={index}/>
      <p>Question <strong>{index+1}</strong>/{questions}</p>
      <p><strong>{points}/280</strong></p>
    </header>
  )
}

export default Progress
