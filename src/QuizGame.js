
import React, { useEffect, useState } from "react";
import Question from './Question';


export default function QuizGame()
{

const[questions, setQuestion]=useState([]);
const[allDone, setAllDone]=useState(false);
const[score, setScore]=useState(0);



   
 const url="https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple&encode=url3986";


 useEffect(callForQuestions, [])

 function callForQuestions() {
     fetch(url)
         .then(res => res.json())
         .then(data => {
             const newQuestions = []
             for (let i = 0; i < 10; i++) {
                 newQuestions.push(generateQuestion(data.results[i], i))
             }

             
             setQuestion(newQuestions)
         })
 }


function generateQuestion(res, index)
{

    return {
        id: index,
        value: decodeURIComponent(res.question),
        options: getOptions([res.correct_answer, ...res.incorrect_answers])
    }


}



function getRandNum(max){
    return Math.floor(Math.random()*max)
}

function getOptions(array){
    const len = array.length
    const indecies = []
    const res = []
    const correctAns = array[0]
    let randNum = getRandNum(len)
    while (res.length < len){
        if (indecies.includes(randNum)){
            randNum = getRandNum(len)
        }
        else{
            indecies.push(randNum)
            res.push({
                id: randNum,
                isCorrect: array[randNum] === correctAns? true : false,
                isSelected: false,
                value: decodeURIComponent(array[randNum])
            })
        }  
    }
    return res
}

function handleClick(quesId, ansId)
{
setQuestion((prev)=>{
    const result=prev.map((item)=>{

         if(item.id===quesId)
         {

           let res=[];

           for(let i=0; i<item.options.length;i++)
           {

            res=item.options.map((option)=>{

              if(option.id===ansId)
              {
                return {...option, isSelected: !option.isSelected};

              }

              else
              {
                return{...option, isSelected:false};
              }


            })
             
      
        

           }
           return {...item, options:res}


         }

         
         return item;
        })

   
   return result;
})


}

function getScore()
{

    let finalScore=0;

for(const question of questions)
{
    for(const option of question.options)
    {
       
        if(option.isSelected && option.isCorrect)
        {
            finalScore+=1;
        }
             

    }




}

setScore(finalScore);
setAllDone(true)



}

function resetQuiz()
{
    callForQuestions();
    setScore(0);
    setAllDone(false);

}

    
function getHtmlQuestion()
{


const questionEl=questions.map((item)=><Question question={item.value} id={item.id} key={item.id} options={item.options}  allDone={allDone} handleClick={handleClick}/>)

return questionEl

}





console.log(questions)



return(<div className="questions">{getHtmlQuestion()}
        

        {allDone && <p>Your score is {score} / 10</p>}
         <button className="submit-btn" onClick={!allDone ? getScore : resetQuiz}>{!allDone ? 'Check for answers' : 'Play again'}</button>



</div>

                       )






}


/*category: "General%20Knowledge"
correct_answer: "Economics"
difficulty: "medium"
incorrect_answers: (3) ['Philosophy', 'Politics', 'Physics']
question: "This%20field%20is%20sometimes%20known%20as%20%E2%80%9CThe%20Dismal%20Science.%E2%80%9D"
type: "multiple"

*/