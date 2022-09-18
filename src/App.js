import React  from "react";

import "./style.css"
import QuizGame from './QuizGame'


export default function App()
{

   const[introduction, setIntroduction]=React.useState(true)



function change()
{

setIntroduction(false);


}


function starter()
{


return(<div className="container">

  <h1 className="heading">Quizzical</h1>
  <button className="start-btn" onClick={change}>Start Quiz</button>
       
    
</div>)

}



return(introduction ? starter() : <QuizGame/>)



}