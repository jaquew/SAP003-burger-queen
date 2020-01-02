import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Tabs, Tab, Panel } from '@bumaga/tabs' 
// import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";

import fire from '../../utils/firebaseUtils'
import Order from '../../components/Order'
import Menucard from '../../components/Menucard'
import DoneOrders from '../../components/DoneOrders'

const Hall = () => {  
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)
  const [hboption, setOption] = useState ({})

    
  const addOrder = (item) => {    
    if(!orders.includes(item)){
      item.count = 1;
      if (item.options){
        item.hboption = hboption
        console.log(item.hboption);
      }
      setOrders([...orders, item])      
    } else {
      item.count++ 
      setOrders([...orders])
    }
    setTotal(total + (item.price));
  }
  
  useEffect(() => {
    fire.collection('Menu').get()
    .then((snap) => {
      const newItems = snap.docs.map((doc) => ({
        id: doc.id,
        count: 0,
        ...doc.data()
      }))
      setItems(newItems)
      
    })
  },[])
  
    
  return (
    <Tabs>
    <div className={css(styles.tabMenu)}>
      <Tab><button className={css(styles.tab)}>Principal</button></Tab>
      <Tab><button className={css(styles.tab)}>Pedidos Prontos</button></Tab>
    </div>

    <Panel>
      <section className={css(styles.halllayout)}>
        <Menucard addOrder={addOrder} items={items} setOption={setOption} hboption={hboption} />
        <Order orders={orders} total={total} addOrder={addOrder} setTotal={setTotal} setOrders={setOrders} hboption={hboption}/>
      </section>
    </Panel>
    <Panel>
      <DoneOrders />
    </Panel>
  </Tabs>
  )
}

const styles = StyleSheet.create({
  halllayout: {
    display:"flex",
    padding: "5px"
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
      backgroundColor: "#492796",
      color: "#fff"
    },
  },
  btnlabel: {
    width: "20%",
    textAlign: "right"
  },
  extras: {
    width: "60%"
  },
  tabMenu: {
    display: "flex",
    justifyContent: "space-around"
  },
  tab: {
    outline: "none",
    width: "50%",
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: "24px",
    padding: "8px 16px",
    color: "#492796",
    backgroundColor: "#fff",
    border: "1px solid #f1f1f1",
    boxShadow: "0 2px 16px 0 rgba(0,0,0,.1)",
    // marginRight: "24px",
     ':transition': "color .16s ease-in-out,background-color .16s ease-in-out,border-color .16s ease-in-out",
}
})

export default Hall