import React, {useState, useEffect} from 'react'
import { StyleSheet, css } from 'aphrodite';
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'
import fire from '../../utils/firebaseUtils'

import Button from '../Button';
import Options from '../Options'
import Input from '../Input'

const Menucard = ({addOrder, items, hboption, setOption, hbextra, setExtra, open, setOpen, table, setTable, doneOrders, activeMenu, setActiveMenu, clientName, setName}) => {
  const breakfast = items.filter(item => item.bf===true)
  const allday = items.filter(item => item.bf===false)
  const [menu, setMenu] = useState([])
  const[mesaVaga, setMesaVaga] = useState([])
  const [mesaOcupada, setMesaOcupada] = useState([])
  
  useEffect(()=> {
    setMenu([...breakfast]);
  },[items])

  useEffect(()=> {
    setOpen({status :false})
  },[menu])

  useEffect(()=>{
    fire.collection('Pedidos')
    .orderBy('time', 'asc')
    .onSnapshot((snap) => {
      const orders = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      const teste = orders.map((order)=> order.table).sort((a,b) => a-b)
      setMesaOcupada(teste);
      setMesaVaga(Array.from(new Array(30),(val,index)=>(index+1).toString()).filter((item)=>(teste.indexOf(item)==-1)))
    })
    //setMesaOcupada(doneOrders.map((order)=> order.table).sort((a,b) => a-b))    
    console.log(mesaOcupada);
  
  },[])

  const handleChange = (e) => {
    const value = e.target.value;
    e.target.name === 'Extra' ? setExtra(value) : setOption(value);
  }

  const addOption = (item) =>{
    if (hboption) {
      const orderPrice = hbextra === 'Nenhum' || hbextra === '' ? item.price : item.price + 1
      const itemName = hbextra ==='Nenhum' || hbextra === ''? `${item.name} de ${hboption}` : `${item.name} de ${hboption} com ${hbextra}`
      const updateItem = {...item, name: itemName, price: orderPrice}
      addOrder(updateItem)
    } else {
      growl.warning({text:'Coloque a opção do hamburguer',fadeAway: true, fadeAwayTimeout: 2000})
    }
  }
  
  return (
    <section className={css(styles.menubox)}>
      <h2 className={css(styles.boxTitle)}>Menu</h2>
        <Button className={activeMenu.a? css(styles.menuTab, styles.activeMenu) : css(styles.menuTab)} handleclick ={() => {setActiveMenu({a:true, b:false, c:false})}}>Mesas</Button>
        <Button className={activeMenu.b? css(styles.menuTab, styles.activeMenu) : css(styles.menuTab)} handleclick ={() => {setMenu([...breakfast]); setActiveMenu({a:false, b:true, c:false})}}>Café da Manhã</Button>
        <Button className={activeMenu.c? css(styles.menuTab, styles.activeMenu) : css(styles.menuTab)} handleclick ={() => {setMenu([...allday]); setActiveMenu({a:false, b:false, c:true})} }>Almoço e Jantar</Button>
      <div className={css(styles.btnBox)}>

        {open.status &&
          <div className={css(styles.aditional)}>                        
            <Options array={open.menuItem.options} name='Opções' item={open.menuItem} handleChange={handleChange}/>
            <Options array={open.menuItem.extra} name='Extra' item={open.menuItem} handleChange={handleChange}/>
            <Button className={css(styles.opbtn)}  handleclick={() => addOption(open.menuItem)}>Adicionar</Button>
          </div>
        }
        {activeMenu.a ? 
        <div className={css(styles.tableBox)}>
          <form className={css(styles.clientData)}>
            <Input type="text" value={clientName} place="Nome do cliente" onchange={(e) => setName(e.currentTarget.value)}/>
          </form>
        <p>Mesas disponíveis</p>
          <div className={css(styles.tables)}>
        {mesaVaga.map((item)=>(
          <Button className={table === item ? css(styles.tablebtn, styles.chosenTable) :  css(styles.tablebtn)} id={item} key={item} handleclick={() => {setTable(item); setActiveMenu({a:false, b:true, c:false})}}>{item}</Button>
        ))}
          </div>
        <p>Mesas Ocupadas</p>
          <div className={css(styles.tables)}>
            {mesaOcupada.map((item)=>(
              <Button className={css(styles.tablebtn, styles.takenTable)} id={item} handleclick={() => {console.log('oi')}}>{item}</Button>
            ))}
          </div>

        </div>
        :
        <>
        {menu.map((item)=> ( 
        <div key={item.id} className={css(styles.btnlayout)}>
          {item.options ? 
            <Button className={css(styles.menubtn)} type="submit" id={item.id} handleclick={() => setOpen({status:true, menuItem: item})}><img className={css(styles.btnimg)} src={"images/"+ item.name + ".png"} alt={item.name}/><span className={css(styles.btntitle)}>{item.name}<br/>R$ {item.price},00</span></Button>
          :
            <Button className={css(styles.menubtn)} type="submit" id={item.id} handleclick={() => addOrder(item)}><img className={css(styles.btnimg)} src={"images/"+ item.name + ".png"} alt={item.name}/><span className={css(styles.btntitle)}>{item.name}<br/>R$ {item.price},00</span></Button>
          }
      </div>  
      ))}
      </>
      }
    </div>
    </section>
  )
}

const styles = StyleSheet.create({
  tablebtn:{
    backgroundColor: "Transparent",
    fontFamily: "Arial",
    fontSize: "1.2rem",
    width: "70px",
    height: "70px",
    margin: "5px",
    whiteSpace: "normal",
    color: "#fff",
    border: "3px solid #25B6D2",
    borderRadius: "15px",
  },
  chosenTable:{
    backgroundColor: "yellow",
    color: "black"
  },
  takenTable:{
    backgroundColor: "#25B6D2"
  },
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
    color: "#FFEE62",

  },
  boxTitle:{
    width: "90%",
    textAlign: "center",
    margin: "10px 0",
    color: "#FFEE62",
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
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    border: "3px solid #25B6D2",
    borderRadius: "15px",
    ':active': {
      backgroundColor: "#25B6D2",
    },
  },
  btnimg:{
    marginLeft: "3%"
  },
  btntitle:{
    width: "60%",
    marginRight: "3%"
  },
  tableBox:{
    width: "100%",
    display: "flex",
    flexFlow: "column wrap"
  },
  tables: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
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