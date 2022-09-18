import React from "react";




function Option(props)
{







let styles={

      fontFamily: "'inter', sans-serif",
        fontSize: "12px",
        fontWeight: 500,
        padding: "0.5em 2em",
        border: "2px solid #5461a2",
        color: "#293264",
        borderRadius: "10px",
        marginRight: "10px",
        marginBottom: "10px",
        backgroundColor:"transparent",
        cursor: "pointer"



    
}




if(props.allDone)
{

   if(props.isCorrect)
   {

   styles={...styles, backgroundColor : "#94d7a2", }




   }


   else if(props.isSelected && !props.isCorrect)
   {

   styles={...styles,  opacity: 0.8,
    backgroundColor: "#ff7f50"}
   }

   else{
    styles = {
        ...styles,
        opacity:0.8
    }
}
}

else if(props.isSelected)
{
    styles = {
        ...styles,
        border: "none",
        backgroundColor: "#cbd0eb"
    }
}











return(<button onClick={() => {
    props.handleClick(props.quesId, props.id)
}} style={styles}>{props.option}</button>)


}




export default function Question(props)
{


   


    return(<div className="question-container"><p className="question">{props.question}</p>  
           {props.options.map((item)=><Option option={item.value} isCorrect={item.isCorrect}
           isSelected={item.isSelected} id={item.id} quesId={props.id} allDone={props.allDone} handleClick={props.handleClick} />)}
         
           </div>)








}