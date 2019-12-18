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
const Allday = ({allday, addOrder, setOption, hboption}) => {
  
  const [list, setList] = useState(" ")
  const [open, setOpen] = useState(false)
  console.log(hboption);
  

  const handleChange = (e) => {
    const value = e.target.value;
    setOption({...hboption,[e.target.name]: value});
}

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
                    <Input type="radio" value={op} name="burger" id={op + item.id} onchange={(e) => handleChange(e)}/>
                  <label className={css(styles.label)} htmlFor={op + item.id}>{op}</label>
                </li>              )}
            </ul>

            <ul className={css(styles.list, styles.extra)}>Extra?
              {item.extra.map((ex) => 
                <li>
                    <Input type="radio" value={ex} name="extra" id={ex + item.id} onchange={(e) => handleChange(e)}/>
                  <label htmlFor={ex + item.id}>{ex}</label>
                </li>
                )}
            </ul>
            {/* <Button className={css(styles.opbtn)} title="ok" id={item.id} handleclick={() => onchange={(e) => setName(e.currentTarget.value)}}/> */}

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