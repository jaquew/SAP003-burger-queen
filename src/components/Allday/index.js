import React, { useState } from 'react'
import Button from '../Button'
import Input from '../Input'
import { StyleSheet, css } from 'aphrodite';
import './index.css';

const styles =  StyleSheet.create( {
  btnlayout: {
    display:"flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "70px"
  },
  btn: {
    width: "100%"
  },
  menubtn: {
    backgroundColor: "#fff",
    fontFamily: "Arial",
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
  aditional: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  list: {
    listStyle: "none",
    // textAlign: "center",
    padding: "10px",
    display: "flex",
    margin: "0"
  },

})
const Allday = ({allday, addOrder}) => {
  
  const [list, setList] = useState(" ")
  const [open, setOpen] = useState(false)
  // let exibelista = "bla"
  // const lista = (item) =>(
    
  //   setList(
  //   <div className={css(styles.aditional)}>
  //   <ul className={css(styles.list,styles.options)}>
  //     {item.options.map((op) => 
  //       <li><Input type="radio" value={op} name="burger" />{op}</li>
  //     )}
  //   </ul>

  //   <ul className={css(styles.list, styles.extra)}>
  //     {item.extra.map((ex) => 
  //       <li><Input type="radio" value={ex} name="extra" />{ex}</li>
  //       )}
  //   </ul>
  // </div>
  //   )
  // )

  // const openList = () =>{
  //   setList(!list)
  //   exibelista = lista()
  //   return <p>oi</p>
  // }
  // console.log(list);
  

  return(
    <section>
      <h3>Almoço e Jantar</h3>
      {allday.map((item)=> (
        <div>
        {item.options ? 
          <div className={css(styles.btnlayout)}>
            <Button className={css(styles.menubtn)} title={item.name} id={item.id} handleclick={() => setOpen(!open)}/>
            <label className={css(styles.btnlabel)} htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
            {open && 
           <div className={css(styles.aditional)}>
            <ul className={css(styles.list,styles.options)}> Opção:
              {item.options.map((op) => 
                <li>
                    <Input type="radio" value={op} name="burger" id={op + item.id}/>
                  <label className={css(styles.label)} htmlFor={op + item.id}>{op}</label>
                </li>              )}
            </ul>

            <ul className={css(styles.list, styles.extra)}>Extra?
              {item.extra.map((ex) => 
                <li>
                    <Input type="radio" value={ex} name="extra" id={ex + item.id}/>
                  <label htmlFor={ex + item.id}>{ex}</label>
                </li>
                )}
            </ul>
          </div>}

        </div>
        
        :
        <div className={css(styles.btnlayout)}>
          <Button className={css(styles.menubtn)} title={item.name} id={item.id} handleclick={() => addOrder(item)}/>
          <label className={css(styles.btnlabel)} htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
        </div>
        }

      </div>  

    ))}
  
    </section>
  )
}

export default Allday