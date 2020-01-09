import React from 'react'
import { StyleSheet, css } from 'aphrodite';
import Input from '../Input'
import './index.css';

const Options = (props) => {

  return(
    <ul className={css(styles.list)}>
      {props.name}
      {props.array.map((elem) => 
        <li key={elem + props.item.id}>
          <Input type="radio" value={elem} name={props.name} id={elem + props.item.id} onchange={(e) => props.handleChange(e)}/>
          <label className={css(styles.label)} htmlFor={elem + props.item.id}>{elem}</label>
        </li>             
      )}
    </ul>
  
  )
}

const styles = StyleSheet.create({
  list: {
    listStyle: "none",
    padding: "5px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "0",
    fontSize: "0.7em"
  },
})

export default Options