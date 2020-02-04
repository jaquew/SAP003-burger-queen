import React from 'react'
import Input from '../Input'
import Button from '../Button'

const AuthHandler = (props) =>{

  return (
    <>
    <h2>{props.greeting}</h2>
    <Input className= 'input-email'place='email' type='email' value={props.mailValue} onchange={props.mailOnChange}/>
    <Input className= 'input-password'place='password' type='password' value={props.passValue} onchange={props.passOnChange}/>
    <select className= 'select-access' onChange={props.setAccess}>
      <option value={false}>-Selecione-</option>
      <option value="hall">Hall</option>
      <option value="kitchen">Cozinha</option>
    </select>
    <Button className='primary-button' handleclick={props.handleclick}>{props.btnChild}</Button>

    </>
  )
}

export default AuthHandler