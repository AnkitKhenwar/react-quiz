import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import FinishScreen from './FinishScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';
import './index.css';
import Progress from './Progress';


const SECS_PER_QUEST=30;
const initialState={
  questions:[],
  status:"loading",
  index:0,
  answer:null,
  points:0,
  secondsRemaining:null
}
function reducer(state,action){
  switch(action.type){
    case "dataRecieved":
    return {
      ...state,
      questions:action.payload,
      status:"ready",
      index:0,
      answer:null
    };
    case "dataFailed":
      return {
        ...state,
        status:"error"
      }
      case "Start":
        return{
          ...state,
          status:"active",
          secondsRemaining:state.questions.length * SECS_PER_QUEST
        }
        case "newAnswer":
          const question=state.questions.at(state.index);
          return {
            ...state,
            answer:action.payload,
            points:action.payload===question.correctOption ? state.points+question.points : state.points
          }
          case "nextQuestion":
            return {
              ...state,
              index:state.index+1,
              answer:null
            }
            case "finish":
              return {
                ...state,
                status:"finished"
              }
              case "restart":
                return {
                  ...initialState,
                  questions:state.questions,
                  status:"ready"

                }
                case "tick":
                  return{
                    ...state,
                    secondsRemaining:state.secondsRemaining-1,
                    status:state.secondsRemaining===0 ? "finished" :state.status
                  }
        
    default:throw new Error("Action Unknown")
      }
  }

function App() {

  const [{questions,status,index,answer,points,secondsRemaining},dispatch]=useReducer(reducer,initialState);
 
  useEffect(()=>{
    fetch('https://api.jsonserve.com/chiM2-')
    .then((res)=>res.json())
    .then((data)=>dispatch({type:"dataRecieved",payload:data}))
    .catch((err)=>dispatch({type:"dataFailed"}))
  },[])
  //const maxpossiblepoints=questions.reduce((prev,curr)=> prev+curr.points,0 );
  return (
    <div className="app">
      <Header/>
     
      <Main>

        {status==="loading" && <Loader/>}
        {status==="error" && <Error/>}
        {status==="ready" && <StartScreen questions={questions.length} dispatch={dispatch}/>}
        {status==="active" && (
          <>
           <Progress questions={questions.length} index={index} points={points} />
        <Question questions={questions[index]} dispatch={dispatch} answer={answer} />
        <Footer>
        <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
        <NextButton dispatch={dispatch} answer={answer} questions={questions} index={index}/>
        </Footer>
       
        </>)}
        {status==='finished' && <FinishScreen points={points} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}

export default App;
