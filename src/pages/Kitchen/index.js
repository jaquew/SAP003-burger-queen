import React, {useState, useEffect} from 'react'
import fire from '../../utils/firebaseUtils'
import Button from '../../components/Button'
import { StyleSheet, css } from 'aphrodite'

function Kitchen(){
  const [orders,setOrders] = useState([])
  const [orderDone, setOrderDone] = useState([])
  const [history, setHistory] = useState(3)
  const now = new Date;

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

      const readyOrder = {...order, delivered: false}
    
      fire.collection('Historico').add(readyOrder)
     
      fire.collection('Pedidos').doc(order.id).delete()
    
    } else {
      order.status = "Confirmar"
    }
    setOrders([...orders]) //usar o spread para criar um outro array, assim forçando a renderização da pag
  }

  const showMore = () => {
    setHistory(history => history + 3)
  }

  return (
    <section className={css(styles.kitchenLayout)}>
      <div className={css(styles.orderBox)}>
      <h2 className={css(styles.boxTitle)}>Pedidos na Fila</h2>
        {orders.map((order)=> (
          <>
            {!order.ready &&
            <div key={order.id} className={css(styles.orderCard)}>
              <p className={css(styles.tableN)}>Mesa {order.table}</p>             
              <p>{Math.floor(((now - order.time.toDate())/60000))} min atrás</p>
              
              {order.product.map((item) => (
                <ul key={item+order.id}>
                  <li className={css(styles.itemN)}>{item}</li>
                </ul>
                ))}
              <Button title={order.status} handleclick={() => orderReady(order)} />
            </div>
            }
            </>
        ))}
      </div>
      
      <div className={css(styles.historyBox)}>
        <h3 className={css(styles.boxTitle)}>Histórico</h3>
        {orderDone.slice(0, history).map( (done) => (
          <div className={css(styles.doneList)}>
            <p>Mesa: {done.table}. {done.name}</p>
            <p>Tempo até ser entregue: {done.readyTime}</p>
            {done.product.map((item) => (
              <ul key={item+done.id}>
                <li>{item}</li>
              </ul>
            ))}
            <p> Status: {done.delivered ? `Entregue` : `Pendente`}</p>
          </div>
        ))}
        <Button handleclick={showMore} title="Ver mais"/>
      </div>
    </section>
  )
}

const styles = StyleSheet.create({
  kitchenLayout: {
    border: "1px solid blue",
    display: "flex",
    justifyContent: "space-evenly",
  },
  orderBox: {
    border: "1px solid red",
    width: "65%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  boxTitle:{
    width: "90%",
  },
  doneList: {
    fontSize: "0.8em"
  },
  orderCard:{
    width: "250px",
    maxWidth: "35%",
    padding: "15px",
    border: "2px solid #25B6D2",
    borderRadius: "15px",
    margin: "10px",

  },
  tableN: {
    fontSize: "1.6rem",
    color: "#25B6D2"
    // textAlign: "center" 
  },
  itemN: {
    listStyle: "none"
  },
  historyBox:{
    border: "1px solid white",

  }
})

export default Kitchen