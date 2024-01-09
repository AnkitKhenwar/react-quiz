import React from 'react'

const NextButton = ({dispatch,answer,index,questions}) => {
    if(answer===null) return null;
 if(index < questions.length-1) return (
    <div>
      <button className='btn btn-ui' onClick={()=>dispatch({type:"nextQuestion"})}>Next</button>
    </div>
  );
  
  if(index === questions.length-1) return (
  <div>
  <button className='btn btn-ui' onClick={()=>dispatch({type:"finish"})}>Finish</button>
</div>
  )
}

export default NextButton
