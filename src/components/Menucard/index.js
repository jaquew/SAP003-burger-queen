import React from 'react'
import { StyleSheet, css } from 'aphrodite';

import Breakfast from '../Breakfast'
import Allday from '../Allday'
import Button from '../Button';


const styles = StyleSheet.create({
  halllayout: {
    display:"flex",
    padding: "20px"
  },
  menubox:{
    width: "50%"
  },
  btnlayout: {
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "70px"
  },
  menubtn: {
    backgroundColor: "#fff",
    fontFamily: "Arial",
    width: "50%",
    height: "50px",
    border: "1px solid #c44",
    borderRadius: "15px",
    ':active': {
      backgroundColor: "#25B6D2",
      color: "#fff"
    },
  },
  btnlabel: {
    width: "20%",
    textAlign: "right"
  },
  extras: {
    width: "60%"
  }
})



const Menucard = ({addOrder, items}) => {

  const breakfast = items.filter(item => item.bf===true)
  const allday = items.filter(item => item.bf===false)
  
  return (
    <div className={css(styles.menubox)}>
      <h2>Menu</h2>
      <Breakfast breakfast={breakfast} addOrder={addOrder} />
      <Allday allday={allday} addOrder={addOrder} />   
    </div>
  )
}

export default Menucard