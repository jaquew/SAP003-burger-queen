import React from 'react'
import Button from '../Button'
import { StyleSheet, css } from 'aphrodite';

const styles =  StyleSheet.create( {
  btnlayout: {
    display:"flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "70px"
  },
  menubtn: {
    backgroundColor: "#fff",
    fontFamily: "Arial",
    fontSize: "1.2em",
    width: "60%",
    height: "50px",
    border: "1px solid #25B6D2",
    borderRadius: "15px",
    ':active': {
      backgroundColor: "#25B6D2",
      color: "#fff"
    },
  },
  btnlabel: {
    maxWidth: "35%",
    textAlign: "right"
  },
})
const Breakfast = ({breakfast, addOrder}) => {

  return(
    <section>
      <h3>Café da manhã</h3>
      {breakfast.map((item)=> (
        <div className={css(styles.btnlayout)}>
          <Button className={css(styles.menubtn)} title={item.name} id={item.id} handleclick={() => addOrder(item)}/>
          <label className={css(styles.btnlabel)} htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
        </div>
      ))}
    </section>
  )
}

export default Breakfast