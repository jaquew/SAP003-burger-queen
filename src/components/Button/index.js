import React from 'react'

const Button = (props) => {
  return(
  <button onClick={props.handleclick} className={props.className} key={props.id} id={props.id}>{props.title}< br />
  {props.price && `R$ ${props.price},00`}</button>
  )
}

export default Button