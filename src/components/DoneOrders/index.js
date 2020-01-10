import React, {useState, useEffect} from 'react'
import { StyleSheet, css } from 'aphrodite';
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'
import fire from '../../utils/firebaseUtils'
import Button from '../../components/Button'

const DoneOrders = ({doneOrders, setDoneOrders}) => {
  const ordersShow = doneOrders.filter(order => order.delivered===false)
  const history = doneOrders.filter(order => order.delivered===true)

  const deliverOrder = (done) => {
    console.log(done.id);
    const endTime = new Date()      
    const readyTime = new Date(endTime - done.time.toDate()).toISOString().substr(11,8)

    fire.collection('Historico').doc(done.id2).update({
      delivered: true,
      readyTime
    })
  }

	return (
		<section>
			<h1>Pedidos Prontos</h1>
			{ordersShow.map( (done) => (
          <div className={'bla'}>
            <p>Mesa: {done.table}. {done.name}</p>
            {/* {console.log(done.readyTime)} */}
            <p>Tempo de preparo: {done.readyTime}</p>
            {done.product.map((item) => (
              <ul key={item+done.id}>
                <li>{item}</li>
              </ul>
            ))}
            {done.delivered ? <p>Entregue</p> : <p>Pendente</p>}
            <Button title='Entregue' handleclick={() => deliverOrder(done)} />
            </div>
			))}
      {/* <h3>Histórico</h3>
       <div className={css(styles.historyBox)}>
        <h3>Histórico</h3>
        {orderDone.slice(0, history).map( (done) => (
          <div className={css(styles.doneList)}>
            <p>Mesa: {done.table}. {done.name}</p>
            <p>Tempo de preparo: {done.readyTime}</p>
            {done.product.map((item) => (
              <ul key={item+done.id}>
                <li>{item}</li>
              </ul>
            ))}
            {done.delivered ? <p>Entregue</p> : <p>Pendente</p>}
            </div>
        ))}
        <Button handleclick={showMore} title="Ver mais"/>
      </div> */}
		</section>
	)
}

export default DoneOrders