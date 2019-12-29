import React, {useState, useEffect} from 'react'
import fire from '../../utils/firebaseUtils'
import Button from '../../components/Button'
import { StyleSheet, css } from 'aphrodite'

function Kitchen(){
  const [orders,setOrders] = useState([])
  const [orderDone, setOrderDone] = useState([])
  const [history, setHistory] = useState(3)

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
      const readyTime = new Date(endTime - order.time.toDate()).toISOString().substr(14,5)
      const readyOrder = {...order, readyTime, delivered: false}
      
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



  const timer = (time) => {
    return setInterval( () => {
      const minutes = new Date(Date.now() - time.toDate()).toISOString().substr(14,5);
      console.log(minutes);
      // setOrders([...orders])
      return minutes
      
    }, 5000)
  }

  console.log(orders);
  

  return (
    <section className={css(styles.kitchenLayout)}>
      <div className={css(styles.orderBox)}>
        <h2>Pedidos na Fila</h2>
        {orders.map((order)=> (
          <>
            {order.ready===false &&
            <div key={order.id}>
            <p>Mesa: {order.table}. {order.name}          <Button title={order.status} handleclick={() => orderReady(order)} /></p>
            {console.log(order.time.toDate())}
            {order.time.toDate().toLocaleTimeString("pt-BR")}
            {/* {timer(order.time)} */}
            {order.product.map((item) => (
              <ul>
                <li>{item}</li>
              </ul>
              ))}
              </div>
            }
            </>
        ))}
      </div>
      
      <div className={css(styles.historyBox)}>
        <h3>Histórico</h3>
        {orderDone.slice(0, history).map( (done) => (
          <div className={css(styles.doneList)}>
            <p>Mesa: {done.table}. {done.name}</p>
            <p>Tempo de preparo: {done.readyTime}</p>
            {done.product.map((item) => (
              <ul>
                <li>{item}</li>
              </ul>
            ))}
            {done.delivered ? <p>Entregue</p> : <p>Pendente</p>}
            </div>
        ))}
        <Button handleclick={showMore} title="Ver mais"/>
      </div>
    </section>
  )
}

const styles = StyleSheet.create({
  kitchenLayout: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  doneList: {
    fontSize: "0.8em"
  }
})

export default Kitchen