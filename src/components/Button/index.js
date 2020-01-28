import React from 'react'

const Button = (props) => {
  return(
  <button 
    onClick={props.handleclick} 
    className={props.className} 
     id={props.id}>
     {props.children}
  </button>
  )
}

export default Button