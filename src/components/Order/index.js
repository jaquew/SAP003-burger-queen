import React, {useState, useEffect} from 'react'
import Input from '../Input'
import fire from '../../utils/firebaseUtils'
import firebase from 'firebase';
import Button from '../Button'

const Order = ({ orders, total, addOrder, setTotal, setOrders }) => {
	const [clientName, setName] = useState('')
	const [table, setTable] = useState(0)

	useEffect(() => {
		setOrders(orders)
		setTotal(total)
	}, [orders, total])
	
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
				if (order.extra.length){
					return (`(${order.count}) ${order.name} (${order.options}): ${order.extra}`)
				} else if (order.options.length){
					return `(${order.count}) ${order.name} (${order.options})`
				}else {
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
		<div className="order-box">
        <h2>Pedido</h2>

        <Input type="text" value={clientName} className="client-data" place="Nome do cliente" onchange={(e) => setName(e.currentTarget.value)}/>

        <Input type="number" value={table} className="client-data" place="Numero da mesa" onchange={(e) => setTable(e.currentTarget.value)}/>
        
        <br/>
			{orders.map((order) =>(
				<p>
					{order.name}  
					<Button className="update-btn" title="-" handleclick={() => minusItem(order)}/>
					{order.count}
					<Button className="update-btn" title="+" handleclick={() => addOrder(order)}/>
					<span>R${order.price},00
						<Button className="delete-btn" title="X" handleclick={() => deleteItem(order)} />
					</span>
				</p>
						
			))}
			<p>Total: R${total},00</p>
			<Button className="send-btn" title="Enviar para Cozinha" handleclick={() => sendOrder(orders)}/>
		</div>
	)
}

export default Order