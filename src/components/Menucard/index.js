import React, {useState, useEffect} from 'react'
import { StyleSheet, css } from 'aphrodite';
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'

import Button from '../Button';
import Input from '../Input'
import Options from '../Options'

const Menucard = ({addOrder, items, hboption, setOption, hbextra, setExtra, open, setOpen}) => {
  const [active, setActive] = useState({b: true})
  const breakfast = items.filter(item => item.bf===true)
  const allday = items.filter(item => item.bf===false)
  const [menu, setMenu] = useState([])
  
  useEffect(()=> {
    setMenu([...breakfast]);
  },[items])

  useEffect(()=> {
    setOpen({status :false})
  },[menu])


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
        <Button className={active.a? css(styles.menuTab, styles.activeTab) : css(styles.menuTab)}  title="Menu Completo" handleclick ={() => {setMenu([...items]); setActive({a:true, b:false, c:false})}}/>
        <Button className={active.b? css(styles.menuTab, styles.activeTab) : css(styles.menuTab)}  title="Café da Manhã" handleclick ={() => {setMenu([...breakfast]); setActive({a:false, b:true, c:false})}} />
        <Button className={active.c? css(styles.menuTab, styles.activeTab) : css(styles.menuTab)}  title="Almoço e Jantar" handleclick ={() => {setMenu([...allday]); setActive({a:false, b:false, c:true})} } />
      <div className={css(styles.btnBox)}>

        {open.status &&
          <div className={css(styles.aditional)}>                        
            <Options array={open.menuItem.options} name='Opções' item={open.menuItem} handleChange={handleChange}/>
            <Options array={open.menuItem.extra} name='Extra' item={open.menuItem} handleChange={handleChange}/>
            <Button className={css(styles.opbtn)} title="Adicionar" handleclick={() => addOption(open.menuItem)}/>
          </div>
        }
      {menu.map((item)=> ( 
        <div key={item.id} className={css(styles.btnlayout)}>
          {item.options ? 
            <Button className={css(styles.menubtn)} type="submit" title={item.name} price={item.price} id={item.id} handleclick={() => setOpen({status:true, menuItem: item})} />
          :
            <Button className={css(styles.menubtn)} type="submit" title={item.name} price={item.price} id={item.id} handleclick={() => addOrder(item)} />
          }
      </div>  
      ))}
    </div>
    </section>
  )
}

const styles = StyleSheet.create({
  menubox:{
    width: "65%",
    margin: "5px",
    marginLeft: "10px",
    '@media (max-width: 850px)': {
      width: "50%",

    },
  },
  menuTab:{
    width: "30%",
    backgroundColor: "Transparent",
    color: "#fff",
    fontSize: "1.2rem",
    border: "none",
    height: "50px",    
    marginBottom: "15px",
    ':focus': {
      outline: "0",
    },
  },
  activeTab:{
    borderBottom: "3px solid #25B6D2",
  },
  btnlayout: {
    display:"flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "70px",
    width: "40%",
    '@media (max-width: 850px)': {
      width: "70%",
    },
  },
  btn: {
    width: "100%"
  },
  menubtn: {
    backgroundColor: "Transparent",
    fontFamily: "Arial",
    fontSize: "1.2rem",
    width: "100%",
    height: "80px",
    marginBottom: "15px",
    whiteSpace: "normal",
    color: "#fff",
    border: "3px solid #25B6D2",
    borderRadius: "15px",
    ':active': {
      backgroundColor: "#25B6D2",
    },
  },
  opbtn: {
    backgroundColor: "Transparent",
    color: "#fff",
    fontFamily: "Arial",
    width: "50%",
    marginBottom: "10px",
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
    justifyContent: "space-around",
    width: "90%",
    flexWrap: "wrap",
  },
})

export default Menucard