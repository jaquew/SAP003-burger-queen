import React, {useState, useEffect} from 'react'
import { StyleSheet, css } from 'aphrodite';
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'

import fire from '../../utils/firebaseUtils'


const DoneOrders = (doneOrders, setDoneOrders) => {
	

	return (
		<section>
			<h1>Pedidos Prontos</h1>
			{doneOrders.map( (done) => (
          <div className={'bla'}>
            <p>Mesa: {done.table}. {done.name}</p>
            {console.log(done.readyTime)}
            <p>Tempo de preparo: {done.readyTime}</p>
            {done.product.map((item) => (
              <ul key={item+done.id}>
                <li>{item}</li>
              </ul>
            ))}
            {done.delivered ? <p>Entregue</p> : <p>Pendente</p>}
            </div>
			))}
		</section>
	)
}

export default DoneOrders