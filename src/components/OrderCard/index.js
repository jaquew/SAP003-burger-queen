import React, {useState, useEffect} from 'react'
import Button from '../Button'
import { StyleSheet, css } from 'aphrodite'

const OrderCard = ({order}) => {
	const now = new Date();
	return (
		<>
			<div>
			<p className={css(styles.tableN)}>Mesa {order.table}</p>
			<p>{Math.floor(((now - order.time.toDate())/60000))} min atrás</p>
			</div>
			
			<ul className={css(styles.itemUl)} >
				{order.product.map((item) => (
					<li key={item.name+order.id} className={css(styles.itemN)}><span className={css(styles.count)}>{item.count} x </span>{item.name}</li>
				))}
			</ul>
			</>
	)
}

const styles = StyleSheet.create({
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
})


export default OrderCard