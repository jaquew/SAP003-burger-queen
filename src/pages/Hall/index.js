import React, {useState, useEffect} from 'react';
import { StyleSheet, css } from 'aphrodite';

import fire from '../../utils/firebaseUtils'
import Order from '../../components/Order'
import Menucard from '../../components/Menucard'
import DoneOrders from '../../components/DoneOrders'

const Hall = () => {  
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)
  const [hboption, setOption] = useState ('')
  const [hbextra, setExtra] = useState('')
  const [open, setOpen] = useState({status: false})
  const [doneOrders, setDoneOrders] = useState([])
  const [active, setActive] = useState(true)
  
    
  const addOrder = (item) => {
    const index = orders.findIndex((i) => i.name === item.name)    

    if (index === -1) {
      setOrders([...orders, {...item, count: 1}])
    } else{
      plusItem(orders[index])
    }
    setTotal(total + item.price);
    setOption('')
    setExtra('')
    setOpen({status:false})
  }  

  const plusItem = (item) =>{
    item.count++
    setOrders([...orders])
    setTotal(total + (item.price));
    
  }

  const myArr = Array.from(new Array(30),(val,index)=>index+1);
  console.log(myArr);
  
  
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
  

	useEffect(() => {
		fire.collection('Pedidos')
    .orderBy('time', 'asc')
    .onSnapshot((snap) => {
      const orders = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setDoneOrders(orders);
    })
  },[])
    
  return (
    <section>
    <div className={css(styles.tabMenu)}>
      <button className={active ? css(styles.tab, styles.activeTab) : css(styles.tab)} onClick={()=> setActive(active => !active)}>Principal</button>
      <button className={!active ? css(styles.tab, styles.activeTab) : css(styles.tab)} onClick={()=>setActive(active => !active)}>Pedidos Prontos ({(doneOrders.filter(order => order.delivered===false)).length})</button>
    </div>    

      {active ? <section className={css(styles.halllayout)}>
        <Menucard addOrder={addOrder} items={items} setOption={setOption} hboption={hboption} open={open} setOpen={setOpen} setExtra={setExtra} hbextra={hbextra} />
        <Order orders={orders} total={total} plusItem={plusItem} setTotal={setTotal} setOrders={setOrders} hboption={hboption} hbextra={hbextra} />
      </section>
      : <DoneOrders doneOrders={doneOrders} setDoneOrders={setDoneOrders} />}
  </section>
  )
}

const styles = StyleSheet.create({
  halllayout: {
    display:"flex",
    padding: "5px",
  },
  tab: {
    outline: "none",
    width: "50%",
    fontSize: "20px",
    lineHeight: "24px",
    padding: "8px 16px",
    backgroundColor: "Transparent",
    color: "#fff",
    border: "none",
    marginBottom: "15px",
    ':focus': {
      outline: "0",
    },
  },
  activeTab:{
    borderBottom: "4px solid #25B6D2",
  }
})

export default Hall