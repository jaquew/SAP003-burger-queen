import React, {useState} from 'react'
import Input from '../Input'
import fire from '../../utils/firebaseUtils'
import firebase from 'firebase';
import Button from '../Button'
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
orderbox:{
width: "40%",
margin: "5px 30px"

},
updatebtn: {
height: "35px",
width: "35px",
padding: "5px",
},
placeorder:{
display: "flex",
alignItems: "center",
justifyContent: "space-evenly",
margin: "5px 0",
fontSize: "1.2em"
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
backgroundColor: "#25B6D2",
color: "#fff",
borderRadius: "15px",
width: "100%",
margin: "5px auto",
height: "60px",
fontSize: "1.2em",
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
			return (`(${order.count}) ${order.name}: (${order.hboption.burger}). Extra: ${order.hboption.extra}`)
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
	}

	fire.collection('Pedidos').add(clientOrder)
	setOrders([]);
	setTotal(0)
	setName('');
	setTable(0);
} else if (!orders.length) {
	alert('Coloque pelo menos 1 item no pedido!')
	
} else {
	alert('Preencha o número da mesa!')

}
}

return(	
<div className={css(styles.orderbox)}>
		<h2>Pedido de {clientName}</h2>
		<h3>Mesa {table}</h3>

		<Input type="text" value={clientName} className="client-data" place="Nome do cliente" onchange={(e) => setName(e.currentTarget.value)}/>

		<Input type="number" value={table} className="client-data" place="Numero da mesa" onchange={(e) => setTable(e.currentTarget.value)}/>
		
		<br/>
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
</div>
)
}

export default Order