import React, {useState, useEffect} from 'react';
import fire from '../../utils/firebaseUtils'
// import Menucard from '../../components/Menucard'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Order from '../../components/Order'


const Hall = () => {  
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)

	useEffect(() => {
		setOrders(orders)
		setTotal(total)
	}, [ orders, total])
    
  const addOrder = (item) => {
    if(!orders.includes(item)){
      item.count = 1
      setOrders([...orders, item])

    } else {
      item.count += 1
      setOrders([...orders])
    }
    setTotal(total + (item.price));
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
  
  return (
    <section className="hall-layout">
      {/* <Header /> */}
      <div className="menu-box">
        <h2>Menu</h2>
        <h3>Café da manhã</h3>
      {items.map((item)=> {
        if (item.bf===true) {
          return (
            <div className="btn-layout">

            <Button className="menu-btn" title={item.name} id={item.id} handleclick={() => addOrder(item)}/>

            <label htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
            </div>
          )
        }
      })}

      <h3>Almoço e Jantar</h3>
      {items.map((item)=> {
        if (item.bf===false) {
          return (
            <div className="btn-layout">

            <Button className="menu-btn" title={item.name} id={item.id} handleclick={() => addOrder(item)}/>

            <label htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
            <br/>
            {item.options.map((op) => {
              return (
                <span>{op}
                <Input type="radio" value={op} name="burger" />
                </span>
              )
            })}
            <br/>
            {item.extra.map((ex) => {
              return (
                <span>{ex}
                <Input type="radio" value={ex} name="extra" />
                </span>
              )
            })}
            </div>  
          )
        }
      })}
            
        </div>

        <Order orders={orders} total={total} addOrder={addOrder} setTotal={setTotal} setOrders={setOrders}/>

        CSS QUE LUTE!
        <br/>
        <br/>
        <br/>
        <br/>

    </section>
  )
}

export default Hall