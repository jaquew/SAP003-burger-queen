import React from 'react'

const Button = (props) => {
  return(
  <button onClick={props.handleclick} className={props.className}>{props.title}</button>
  )
}

export default Button