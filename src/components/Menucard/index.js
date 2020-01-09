import React, {useState} from 'react'
import { StyleSheet, css } from 'aphrodite';
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'

import Button from '../Button';
import Input from '../Input'
import Options from '../Options'

const Menucard = ({addOrder, items, hboption, setOption, hbextra, setExtra, open, setOpen}) => {
  
  const [menu, setMenu] = useState([])  
  const [open, setOpen] = useState(false)

  const breakfast = items.filter(item => item.bf===true)
  const allday = items.filter(item => item.bf===false)
  const [menu, setMenu] = useState([])

  const handleChange = (e) => {
    const value = e.target.value;
    e.target.name === 'Extra' ? setExtra(value) : setOption(value);
  }

  const addOption = (item) =>{
    if (hboption) {
      const orderPrice = hbextra !== 'Nenhum' ? item.price + 1 : item.price    
      const updateItem = {...item, name: `${item.name} de ${hboption} com ${hbextra}`, price: orderPrice}
      addOrder(updateItem)
    } else {
      growl.warning({text:'Coloque a opção do hamburguer',fadeAway: true, fadeAwayTimeout: 2000})
    }
  }

  
  return (
    <section className={css(styles.menubox)}>
      <h2>Menu</h2>
        <Button className={css(styles.menuTab)}  title="cafe" handleclick ={() => setMenu([...breakfast])}  />
        <Button className={css(styles.menuTab)}  title="dia" handleclick ={() => setMenu([...allday])}  />
      <div className={css(styles.btnBox)}>
      {menu.map((item)=> (
        <div key={item.id} className={css(styles.btnlayout)}>
          {item.options ? 
            <>
              <Input className={css(styles.menubtn)} type="submit" value={`${item.name}\n R$ ${item.price},00`} id={item.id} handleclick={() => setOpen(!open)} />
              {open &&
                <div className={css(styles.aditional)}>
                  <Options array={item.options} name='Opções' item={item} handleChange={handleChange}/>
                  <Options array={item.extra} name='Extra' item={item} handleChange={handleChange}/>

                  <Button className={css(styles.opbtn)} title="Adicionar" handleclick={() => addOption(item)}/>
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
    backgroundColor: "Transparent",
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
    backgroundColor: "#2c2c2c",
    color: "#fff",
    fontFamily: "Arial",
    width: "100%",
    height: "30px",
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
    padding: "5px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "0",
    fontSize: "0.7em"
  },
})

export default Menucard