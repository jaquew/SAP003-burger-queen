import React, {useState, useEffect} from 'react';
import fire from '../../utils/firebaseUtils'
// import Menucard from '../../components/Menucard'
import Button from '../../components/Button'
import Input from '../../components/Input'
import Order from '../../components/Order'
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  halllayout: {
    display:"flex",
    padding: "20px"
  },
  menubox:{
    width: "50%"
  },
  btnlayout: {
    display:"flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "70px"
  },
  menubtn: {
    backgroundColor: "#fff",
    fontFamily: "Arial",
    width: "50%",
    height: "50px",
    border: "1px solid #c44",
    borderRadius: "15px",
    ':active': {
      backgroundColor: "#25B6D2",
      color: "#fff"
    },
  },
  btnlabel: {
    width: "20%",
    textAlign: "right"
  },
  extras: {
    width: "60%"
  }
})

const Hall = () => {  
  const [items, setItems] = useState([])
  const [orders, setOrders] = useState([])
  const [total, setTotal] = useState(0)

	// useEffect(() => {
	// 	setOrders(orders)
	// 	setTotal(total)
	// }, [ orders, total])
    
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
  console.log(items);
  
  return (
    <section className={css(styles.halllayout)}>
      {/* <Header /> */}

      
      <div className={css(styles.menubox)}>
        <h2>Menu</h2>
        <h3>Café da manhã</h3>
        {items.map((item)=> {
          if (item.bf===true) {
            return (
              <div className={css(styles.btnlayout)}>
                <Button className={css(styles.menubtn)} title={item.name} id={item.id} handleclick={() => addOrder(item)}/>

                <label className={css(styles.btnlabel)} htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
              </div>
            )
          }
        })}

        <h3>Almoço e Jantar</h3>
        {items.map((item)=> {
          if (item.bf===false) {
            return (
              <div className={css(styles.btnlayout)}>

                <Button className={css(styles.menubtn)} title={item.name} id={item.id} handleclick={() => addOrder(item)}/>

                  <label className={css(styles.btnlabel)} htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
                  
                  {/* <div className={css(styles.extras)}>
                    {item.options.map((op) => {
                      return (
                        <span>{op}
                        <Input type="radio" value={op} name="burger" />
                        </span>
                      )
                    })}
                    {item.extra.map((ex) => {
                      return (
                        <span>{ex}
                        <Input type="radio" value={ex} name="extra" />
                        </span>
                      )
                    })}
                  </div> */}
              </div>  
            )
          }
        })}
            
        </div>

        <Order orders={orders} total={total} addOrder={addOrder} setTotal={setTotal} setOrders={setOrders}/>
    </section>
  )
}



export default Hall