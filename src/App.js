
import './style.css';
import Dice from './components/Dice'
import React, { useEffect, useState } from 'react';
import {nanoid} from "nanoid"

import Confetti from 'react-confetti'

export default function App() 
{

  const[dice, setDice]=useState(allNewDice());
  const[tenzies,setTenzies]=useState(false);
  const[count, setCount]=useState(0);
;
   
  const[best, setBest]=useState(0);

  
   

  useEffect(()=>{



      const held=dice.every((item)=>item.isHeld)
      const first=dice[0].value;
      const sameVal=dice.every(item=> item.value===first)
   

      if(held && sameVal)
      {


      
       
        setTenzies(true);
       
   
      

         
        
        
        
      }



       

      
     

     




  },  [dice])








    function generateDice()
  
     {


   return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
 } 






function allNewDice()
  {

 const diceArray=[];


for(let i=0;i<10;i++)
{

  diceArray.push(generateDice())
}

         return diceArray;
  }


  function roll()
  {

    if(!tenzies)
    {

      
       
      setCount(prev=>prev+1)
      console.log(best)
     

setDice((prev)=>prev.map((item)=>{

return item.isHeld ? item : generateDice();

}))

    }


    
else
{



if(best>0)
{
  if(count<best)
  {

    setTenzies(false);

    setBest(count);

   
    setCount(0);
           
 setDice(allNewDice());


  }

else

   {
    setTenzies(false);
    

    setCount(0);
        
 setDice(allNewDice());
 
}
  

  
}

else if(best===0)
{
  setTenzies(false);



  setBest(count);
  

  setCount(0);
              
 setDice(allNewDice());


}






  


  
 

}


  }




    




  function handleChange(id)
  {



     
     setDice((prev)=>prev.map((item)=>{

       
      return item.id===id? {...item, isHeld: !item.isHeld} : item;


     }))
  
       
     

  }


  console.log(localStorage.getItem('cat'))
  
const diceEl=dice.map((item)=> <Dice isHeld={item.isHeld} key={item.id} onClick={()=>handleChange(item.id)}
val={item.value}/>) 




  return (
    <main>

     <h2>Best score : {best}</h2>  
     <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
      {tenzies && <Confetti/>}

     {tenzies ? <p className='tries'>You took {count} tries</p> : <p className='tries'> {count} tries done</p>}

   <div className='dice-container'>

    {diceEl}
    
   
   
   
     </div>   
     <button className='roll-btn' onClick={roll}>{tenzies ? 'New game' : 'Roll dice' }</button>     
    </main>
  );

  }

