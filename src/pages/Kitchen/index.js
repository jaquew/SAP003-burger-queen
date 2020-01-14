import React, {useState, useEffect} from 'react'
import fire from '../../utils/firebaseUtils'
import Button from '../../components/Button'
import OrderCard from '../../components/OrderCard'
import HistoryCard from '../../components/HistoryCard'
import { StyleSheet, css } from 'aphrodite'

function Kitchen(){
  const [orders,setOrders] = useState([])
  const orderDone = orders.filter(el => el.ready).sort((a,b) => a.time > b.time ? -1 : 1)

  useEffect(() => {
    fire.collection('Pedidos')
    .orderBy('time', 'asc')
    .onSnapshot((snap) => {
      const newOrder = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setOrders(newOrder)
    })
  },[])
    
  const orderReady = (order) => {    
    if (order.status==="Confirmar"){
      order.ready = true;
      const endTime = new Date()      
      const kitchenTime = Math.floor((endTime - order.time.toDate())/60000)      
      
      const updateOrder = {ready: true, delivered: false, kitchenTime}
      fire.collection('Pedidos').doc(order.id).update(updateOrder)
    
    } else {
      order.status = "Confirmar"
    }
    setOrders([...orders])
  }

  return (
    <section className={css(styles.kitchenLayout)}>
      <div className={css(styles.orderBox, styles.vertical)}>
      <h2 className={css(styles.boxTitle)}>Pedidos na Fila</h2>
        {orders.map((order)=> (
          <>
          {!order.ready &&
            <div className={css(styles.orderCard)}>
              <OrderCard order={order}/>
              <Button className={css(styles.orderBtn)} title={order.status} img="images/correct.png" handleclick={() => orderReady(order)} />
            </div>
          }
          </>
        ))}
      </div>
      
      <HistoryCard order={orderDone} />
              
    </section>
  )
}

const styles = StyleSheet.create({
  kitchenLayout: {
    display: "flex",
    justifyContent: "space-evenly",
    '@media (max-width: 850px)': {
      flexDirection: 'column'
    },
  },
  vertical: {
    '@media (max-width: 850px)': {
      width: "90%",
      margin: "auto"
    },
  },
  orderBox: {
    borderRight: "1px solid #25B6D2",
    width: "75%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignContent: "flex-start",
    '@media (max-width: 850px)': {
      borderRight: "none"
    },
  },
  boxTitle:{
    width: "90%",
    textAlign: "center",
    margin: "10px 0",
    color: "#FFEE62"
  },
  orderCard:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "30%",
    padding: "10px",
    border: "2px solid #25B6D2",
    borderRadius: "15px",
    margin: "10px",
    boxSizing: "border-box",
    '@media (max-width: 850px)': {
      minWidth: "45%",
    },

  },
  tableN: {
    fontSize: "1.6rem",
    color: "#25B6D2",
    fontWeight: "bold"
  },
  orderBtn:{
    backgroundColor: "Transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "60%",
    height: "45px",
    marginBottom: "15px",
    whiteSpace: "normal",
    color: "#fff",
    border: "2px solid #25B6D2",
    borderRadius: "15px",
    ':focus': {
      backgroundColor: "#FFEE62",
      color: "#000"
    },    
  },
})

export default Kitchen