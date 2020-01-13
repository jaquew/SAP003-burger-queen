import React from 'react'

const Button = (props) => {
  return(
  <button 
    onClick={props.handleclick} 
    className={props.className} 
     id={props.id}>
    {props.title} 
    {props.img && <img src={props.img} alt={props.title}/>}
    <br />
    {props.price && `R$ ${props.price},00`}
  </button>
  )
}

export default Button