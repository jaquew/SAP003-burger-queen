import React from 'react'

function Input(props) {
  return(
  <input type={props.type} onClick={props.handleclick} className={props.className}/>
  )
}

export default Input