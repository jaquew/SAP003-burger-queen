import React, {useState, useEffect} from 'react'
import fire from '../../utils/firebaseUtils'
import Button from '../../components/Button'
import OrderCard from '../../components/OrderCard'
import { StyleSheet, css } from 'aphrodite'

function Kitchen(){
  const [orders,setOrders] = useState([])
  const [orderDone, setOrderDone] = useState([])
  const [history, setHistory] = useState(3)
  const now = new Date();

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
      <div className={css(styles.orderBox, styles.vertical)}>
      <h2 className={css(styles.boxTitle)}>Pedidos na Fila</h2>
        {orders.map((order)=> (
          <>
            {!order.ready &&
              <div key={order.id} className={css(styles.orderCard)}>

                <OrderCard order={order}/>

                <Button className={css(styles.orderBtn)} title={order.status} handleclick={() => orderReady(order)} />
		          </div>

            /* <div key={order.id} className={css(styles.orderCard)}>
              <div>
              <p className={css(styles.tableN)}>Mesa {order.table}</p>
              <p>{Math.floor(((now - order.time.toDate())/60000))} min atrás</p>
              </div>
              
              <ul className={css(styles.itemUl)} >
                {order.product.map((item) => (
                  <li key={item.name+order.id} className={css(styles.itemN)}><span className={css(styles.count)}>{item.count} x </span>{item.name}</li>
                ))}
              </ul>

              <Button className={css(styles.orderBtn)} title={order.status} handleclick={() => orderReady(order)} />
            </div>*/
            }
             
            </>
        ))}
      </div>
      
      <div className={css(styles.historyBox, styles.vertical)}>
        <h3 className={css(styles.boxTitle)}>Histórico</h3>
        {orderDone.slice(0, history).map( (done) => (
          <div className={css(styles.doneList)}>
            <div>
              <p>Mesa: {done.table}. {done.name}</p>
              <p>Tempo até ser entregue: {done.readyTime}</p>
            </div>
            <ul>{done.product.map((item) => (
              <li key={item+done.id}>{item}</li>
            ))}</ul>
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
    width: "70%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
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
    padding: "15px",
    border: "2px solid #25B6D2",
    borderRadius: "15px",
    margin: "10px",
    boxSizing: "border-box",
    '@media (max-width: 850px)': {
      minWidth: "40%",
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