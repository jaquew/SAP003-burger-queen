import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';

import fire from '../../utils/firebaseUtils'
import Order from '../../components/Order'
import Menucard from '../../components/Menucard'

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

const Hall = () => {  
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)
  const [hboption, setOption] = useState ({})

    
  const addOrder = (item) => {
    // const index = (orders.indexOf(item));
    // console.log(index);     
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
    <section className={css(styles.halllayout)}>

      <Menucard addOrder={addOrder} items={items} setOption={setOption} hboption={hboption} />
      
      <Order orders={orders} total={total} addOrder={addOrder} setTotal={setTotal} setOrders={setOrders} hboption={hboption}/>
    </section>
  )
}

export default Hall