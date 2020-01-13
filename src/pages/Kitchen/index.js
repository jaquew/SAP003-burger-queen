import React, {useState, useEffect} from 'react'
import fire from '../../utils/firebaseUtils'
import Button from '../../components/Button'
import OrderCard from '../../components/OrderCard'
import HistoryCard from '../../components/HistoryCard'
import { StyleSheet, css } from 'aphrodite'

function Kitchen(){
  const [orders,setOrders] = useState([])
  const [orderDone, setOrderDone] = useState([])

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

  useEffect(() => {
    fire.collection('Historico')
    .orderBy('time', 'desc')
    .onSnapshot((snap) => {
      const done = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setOrderDone(done)
    })
  },[])

  const orderReady = (order) => {    
    if (order.status==="Confirmar"){
      order.ready = true;
      const endTime = new Date()      
      const kitchenTime = new Date(endTime - order.time.toDate()).toISOString().substr(11,8)
  

      const readyOrder = {...order, delivered: false, kitchenTime}
    
      fire.collection('Historico').add(readyOrder)
     
      fire.collection('Pedidos').doc(order.id).delete()
    
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
              <div key={order.id} className={css(styles.orderCard)}>

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
    alignContent: "flex-start"
  },
  boxTitle:{
    width: "90%",
    textAlign: "center",
    margin: "10px 0",
  },
  doneList: {
    fontSize: "0.8em"
  },
  orderCard:{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "30%",
    // minWidth: "30%",
    // maxWidth: "40%",
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
  itemUl:{
    paddingLeft: "15px",
  },
  itemN: {
    listStyle: "none"
  },
  orderBtn:{
    backgroundColor: "Transparent",
    width: "50%",
    height: "45px",
    marginBottom: "15px",
    whiteSpace: "normal",
    color: "#fff",
    border: "2px solid #25B6D2",
    borderRadius: "15px",
    ':focus': {
      backgroundColor: "#25B6D2",
    },    
  },
  count:{
    marginRight: "7px"
  },
  historyBox:{
    border: "1px solid white",

  }
})

export default Kitchen