import React, {useState} from 'react'
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'
import { StyleSheet, css } from 'aphrodite';
import firebase from 'firebase';

import Input from '../Input'
import fire from '../../utils/firebaseUtils'
import Button from '../Button'

const styles = StyleSheet.create({
orderbox:{
width: "45%",
margin: "5px",
marginRight: "15px"

},
clientData: {
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	alignItems: "center"
},
updatebtn: {
height: "30px",
width: "30px",
padding: "5px",
},
placeorder:{
display: "flex",
alignItems: "center",
justifyContent: "space-evenly",
margin: "5px 0",
},
placeitem: {
width: "33%",
// alignSelf: "center"
},
price: {
justifyContent: "flex-end",
display: "flex",
alignItems: "center"
},
total: {
marginRight: "10px",
fontSize: "1.4em"
},
sendbtn: {
color: "#fff",
backgroundColor: "Transparent",
borderRadius: "15px",
width: "100%",
margin: "5px auto",
height: "60px",
fontSize: "1.2em",
border: "1px solid #25B6D2",
':active': {
  backgroundColor: "#25B6D2",
},
}
})

const Order = ({ orders, total, addOrder, setTotal, setOrders }) => {
const [clientName, setName] = useState('')
const [table, setTable] = useState(0)

const deleteItem = (item) => {
const index = (orders.indexOf(item));
orders.splice(index, 1)
setOrders([...orders]);
const deleteTotal = total - (item.price * item.count)
setTotal(deleteTotal)
}

const minusItem = (item) => {
if (item.count === 1){
	deleteItem(item)
} else {			
	item.count -= 1
	setOrders([...orders]);
	const minusTotal = total  - item.price
	setTotal(minusTotal)
}
}

const sendOrder = (orders) => {
if (orders.length && table) {
	const product = orders.map((order) => {
		if (order.extra){
			return (`(${order.count}) ${order.name}: ${order.hboption.burger}. Extra: ${order.hboption.extra}`)
		} else {
			return `(${order.count}) ${order.name} `
		}
	})

	const clientOrder = {
		name: clientName,
		table: table,
		product,
		time: firebase.firestore.FieldValue.serverTimestamp(),
		total: total,
		ready: false,
		status: "Pronto",
	}

	fire.collection('Pedidos').add(clientOrder)
	setOrders([]);
	setTotal(0)
	setName('');
	setTable(0);
	growl.success({text: 'Pedido Enviado', fadeAway: true, fadeAwayTimeout: 2500});
} else if (!orders.length) {
	growl.warning({text:'Coloque pelo menos 1 item no pedido!', fadeAway: true, fadeAwayTimeout: 2500})
	
} else {
	growl.warning({text:'Preencha o número da mesa!',fadeAway: true, fadeAwayTimeout: 2500})

}
}

return(	
<section className={css(styles.orderbox)}>
		<h2>Pedido de {clientName}</h2>

		<form className={css(styles.clientData)}>
			<h3>Mesa {table}</h3>
			<Input type="text" value={clientName} place="Nome do cliente" onchange={(e) => setName(e.currentTarget.value)}/>
			<Input type="number" value={table} place="Numero da mesa" onchange={(e) => setTable(e.currentTarget.value)}/>
		</form>

		{orders.map((order) =>(
		<div className={css(styles.placeorder)}>
			<span className={css(styles.placeitem)}>{order.name}</span>

			<div className={css(styles.placeorder, styles.placeitem)}>  
				<Input className={css(styles.updatebtn)} type="image" src="images/minus.png" handleclick={() => minusItem(order)}/>

				<span>{order.count}</span>

				<Input className={css(styles.updatebtn)} type="image" src="images/add.png" handleclick={() => addOrder(order)}/>
			</div>

			<div className={css(styles.placeitem, styles.price)}>
				<span>R${order.price},00</span>  
				<Input className={css(styles.updatebtn)} type="image" src="images/remove.png" handleclick={() => deleteItem(order)} />
			</div>
		</div>
				
	))}
	<p className={css(styles.price, styles.total)}>Total: R${total},00</p>
	<Button className={css(styles.sendbtn)} title="Enviar para Cozinha" handleclick={() => sendOrder(orders)}/>
</section>
)
}

export default Order