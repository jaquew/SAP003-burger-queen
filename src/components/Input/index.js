import React from 'react'

function Input(props) {
  return(
  <input 
    type={props.type}
    onChange={props.onchange} 
    name={props.name}
    className={props.className} 
    value={props.value}
    placeholder={props.place}/>
  )
}

export default Input