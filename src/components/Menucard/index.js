import React from 'react'
import { StyleSheet, css } from 'aphrodite';

import Breakfast from '../Breakfast'
import Allday from '../Allday'
// import Button from '../Button';


const styles = StyleSheet.create({
  halllayout: {
    display:"flex",
    padding: "20px"
  },
  menubox:{
    width: "50%",
    margin: "5px 30px"
  },
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