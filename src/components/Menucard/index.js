import React, {useState} from 'react'
import { StyleSheet, css } from 'aphrodite';

import Button from '../Button';
import Input from '../Input'
import './index.css';

const Menucard = ({addOrder, items, setOption, hboption}) => {
  
  const breakfast = items.filter(item => item.bf===true)
  const allday = items.filter(item => item.bf===false)
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState([])

  const handleChange = (e) => {
    const value = e.target.value;
    setOption({...hboption,[e.target.name]: value});
  }
  
  return (
    <section className={css(styles.menubox)}>
      <h2>Menu</h2>
        <Button className={css(styles.label)}  title="cafe" handleclick ={() => setMenu([...breakfast])}  />
        <Button className={css(styles.label)}  title="dia" handleclick ={() => setMenu([...allday])}  />
      <div className={css(styles.btnBox)}>
      {menu.map((item)=> (
        <div key={item.id} className={css(styles.btnlayout)}>
          {item.options ? 
            <>
              <Input className={css(styles.menubtn)} type="submit" value={`${item.name}\n R$ ${item.price},00`} id={item.id} handleclick={() => setOpen(!open)} />
              {open &&
                <div className={css(styles.aditional)}>
                  <ul className={css(styles.list,styles.options)}>
                    {item.options.map((op) => 
                      <li>
                        <Input type="radio" value={op} name="burger" id={op + item.id} onchange={(e) => handleChange(e)}/>
                        <label className={css(styles.label)} htmlFor={op + item.id}>{op}</label>
                      </li>             
                    )}
                  </ul>

                  <ul className={css(styles.list, styles.extra)}>
                    {item.extra.map((ex) => 
                      <li>
                        <Input type="radio" value={ex} name="extra" id={ex + item.id} onchange={(e) => handleChange(e)}/>
                        <label htmlFor={ex + item.id}>{ex}</label>
                      </li>
                      )}
                  </ul>
                  <Button className={css(styles.opbtn)} title="Adicionar" handleclick={() => addOrder(item)}/>
                </div>
              }
            </>
          :
            <Input className={css(styles.menubtn)} type="submit" value={`${item.name}\n R$ ${item.price},00`} id={item.id} handleclick={() => addOrder(item)} />
          }
      </div>  
      ))}
    </div>
    </section>
  )
}

const styles = StyleSheet.create({
  halllayout: {
    display:"flex",
    padding: "20px"
  },
  menubox:{
    width: "50%",
    margin: "5px",
    marginLeft: "10px"
  },
  btnlayout: {
    display:"flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "70px",
    width: "45%",
  },
  btn: {
    width: "100%"
  },
  menubtn: {
    backgroundColor: "#2c2c2c",
    fontFamily: "Arial",
    width: "100%",
    height: "55px",
    whiteSpace: "normal",
    color: "#fff",
    border: "1px solid #25B6D2",
    borderRadius: "15px",
    ':active': {
      backgroundColor: "#25B6D2",
    },
  },
  opbtn: {
    backgroundColor: "#fff",
    fontFamily: "Arial",
    width: "100%",
    height: "20px",
    border: "1px solid #25B6D2",
    borderRadius: "15px",
    ':active': {
      backgroundColor: "#25B6D2",
      color: "#fff"
    },
  },
  btnBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
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
    padding: "10px",
    display: "flex",
    margin: "0",
    fontSize: "0.7em"
  },
})

export default Menucard