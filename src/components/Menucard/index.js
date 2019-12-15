import React,{useState, useEffect} from 'react'
import fire from '../../utils/firebaseUtils'
import Button from '../Button'

const Menucard = () => {
  const addOrder = (item) => (console.log(item.name, item.price))

  const [items, setItems] = useState([])
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
    items.map((item)=> (
      <div className="btn-layout">
      <Button className="menu-btn" title={item.name} id={item.id} handleclick={() => addOrder(item)}/>
      <label htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
      {item.options.length !==0 && <p>{item.options.join(' ')}</p>}
    </div> 
  ))
  )
}

export default Menucard