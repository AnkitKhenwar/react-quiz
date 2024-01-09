import React from 'react'

const Question = ({questions,dispatch,answer}) => {
  const hasAnswered=answer!==null;
  return (
    <div>
      <h2>{questions.question}</h2>
      <div className='options'>
        {questions.options.map((option,index)=>{
           return <button className={`btn btn-option  ${index===answer ? "answer" : ""} ${hasAnswered ? index===questions.correctOption ? "correct" : "wrong" :""}`} onClick={()=>dispatch({type:"newAnswer",payload:index})} disabled={hasAnswered}>{option}</button>
        })}
      </div>
    </div>
  )
}

export default Question
