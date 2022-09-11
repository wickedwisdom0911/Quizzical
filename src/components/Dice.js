import React from 'react';



export default function dice(props)
{

const styles={
  
      backgroundColor: props.isHeld ? "#ffc6ff" : "#00072d",

}





return <div onClick={props.onClick} style={styles} className='dice'>

      <h2>{props.val}</h2>


       </div>









}