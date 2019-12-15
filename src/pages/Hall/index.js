import React, {useState, useEffect} from 'react';
import fire from '../../utils/firebaseUtils'
// import Menucard from '../../components/Menucard'
import Button from '../../components/Button'
import firebase from 'firebase';


const Hall = () => {  
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const clientName = 'Jaque'
  const table = '2'
    
  const addOrder = (item) => {
    item.count = 1
    console.log(item);
    
    setOrders([...orders, item])
  }

  const deleteItem = (item) => {    
    orders.splice(item, 1)
    setOrders([...orders]);
  }

  const sendOrder = (orders) => {
    if (orders.length) {
      const food = orders.map((order) => (
        order.extra.length ? (`${order.name} ${order.option}: ${order.extra}`) : (order.name)
      ))
  
      const clientOrder = {
        name: clientName,
        table: table,
        food,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      }
      fire.collection('Pedidos').add(clientOrder).then(()=> {
        setOrders([]); 
  
      })
    } else {
      alert('Não há pedido!')
    }
  }

  useEffect(() => {
    fire.collection('Menu').get()
    .then((snap) => {
      const newItems = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setItems(newItems)
    })
  },[]) 
  console.log(orders);
  
  
  return (
    <section className="hall-layout">
      <div className="menu-box">
        <h2>Menu</h2>
      {items.map((item)=> (
      <div className="btn-layout">

      <Button className="menu-btn" title={item.name} id={item.id} handleclick={() => addOrder(item)}/>

      <label htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
      {item.options.length !==0 && <p>Opções: {item.options.join(' ')}</p>}
      {item.extra.length !==0 && <p>Extras: {item.extra.join(' ')}</p>}
    </div>
      ))}
      </div>

      <div className="order-box">
        <h2>Pedido</h2>
        {orders.map((order) =>(
          <p>{order.name} {order.count} <span>R${order.price},00
            <Button className="delete-btn" title="X" handleclick={() => deleteItem(order)} /></span>
          </p>
        
        ))}
        <Button className="send-btn" title="Enviar para Cozinha" handleclick={() => sendOrder(orders)}/>

        CSS QUE LUTE!
        <br/>
        <br/>
        <br/>
        <br/>

      </div>
    </section>
  )
}
export default Hall