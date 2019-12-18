import React, {useState, useEffect} from 'react';
import fire from '../../utils/firebaseUtils'
import { StyleSheet, css } from 'aphrodite';

import Order from '../../components/Order'
import Menucard from '../../components/Menucard'

const styles = StyleSheet.create({
  halllayout: {
    display:"flex",
    padding: "20px"
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
    
  const addOrder = (item) => {
    if(!orders.includes(item)){
      item.count = 1
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
        ...doc.data()
      }))
      setItems(newItems)
      
    })
  },[])
  console.log(items);
                                             
  
  return (
    <section className={css(styles.halllayout)}>

      <Menucard addOrder={addOrder} items={items} />
      
      <Order orders={orders} total={total} addOrder={addOrder} setTotal={setTotal} setOrders={setOrders}/>
    </section>
  )
}

export default Hall