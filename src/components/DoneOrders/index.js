import React, {useState, useEffect} from 'react'
import { StyleSheet, css } from 'aphrodite';
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'
import fire from '../../utils/firebaseUtils'
import Button from '../../components/Button'
import OrderCard from '../../components/OrderCard'

const DoneOrders = ({doneOrders, setDoneOrders}) => {
  const [history, setHistory] = useState(3)

  const ordersShow = doneOrders.filter(order => order.delivered===false)
  const orderHistory = doneOrders.filter(order => order.delivered===true)

  const deliverOrder = (done) => {
    console.log(done.id);
    const endTime = new Date()      
    const readyTime = new Date(endTime - done.time.toDate()).toISOString().substr(11,8)

    fire.collection('Historico').doc(done.id2).update({
      delivered: true,
      readyTime
    })
  }

  const showMore = () => {
    setHistory(history => history + 3)
  }

	return (
		<div className={css(styles.halllayout)}>
    <section className={css(styles.orderMain, styles.vertical)}>
			<h1 className={css(styles.boxTitle)}>Pedidos Prontos</h1>
			{ordersShow.map( (done) => (
        <div key={done.id} className={css(styles.orderCard)}>
          <OrderCard order={done}/>
          <Button title='Entregue' handleclick={() => deliverOrder(done)} />
        </div> 

          /*<div className='bla' key={done.id}>
            <p>Mesa: {done.table}. {done.name}</p>
            {/* {console.log(done.readyTime)} 
            <p>Tempo de preparo: {done.readyTime}</p>
            {done.product.map((item) => (
              <ul key={item+done.id}>
                <li>{item}</li>
              </ul>
            ))}
            {done.delivered ? <p>Entregue</p> : <p>Pendente</p>}

            </div>*/
			))}
    </section>
    <section className={css(styles.histAside, styles.vertical)}>
      <h3 className={css(styles.boxTitle)}>Histórico</h3>


      <div className={css(styles.historyBox)}>
        {orderHistory.slice(0, history).map( (hist) => (
          
          <div className={css(styles.histList)} key={`hist ${hist.id}`}>
            <p>Mesa: {hist.table}. {hist.name}</p>
            <p>Tempo de preparo: {hist.readyTime}</p>
            {hist.product.map((item) => (
              <ul key={item+hist.id}>
                <li>{item}</li>
              </ul>
            ))}
            {hist.delivered ? <p>Entregue</p> : <p>Pendente</p>}
            </div>
        ))}


        <Button handleclick={showMore} title="Ver mais"/>
      </div>
    </section>
		</div>
	)
}

const styles = StyleSheet.create({
  halllayout: {
    display:"flex",
    padding: "5px",
    '@media (max-width: 850px)': {
      flexDirection: 'column'
    },
  },
  orderMain: {
    borderRight: "1px solid #25B6D2",
    width: "70%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  histAside:{
    width: "30%",
  },
  boxTitle:{
    width: "90%",
    textAlign: "center",
    margin: "10px 0",
  },
  vertical: {
    '@media (max-width: 850px)': {
      backgroundColor: 'red',
      width: "90%",
      margin: "auto"
    },
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
})

export default DoneOrders