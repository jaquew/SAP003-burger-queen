import React, {useState, useEffect} from 'react'
import Menucard from '../../components/Menucard'
import fire from '../../utils/firebaseUtils'

function Kitchen(){
  const [pedidos,setPedidos] = useState([])

  useEffect(() => {
    fire.collection('Pedidos')
    .orderBy('time', 'asc')
    // .where('ready', '==', false)
    .onSnapshot((snap) => {
      const newItems = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setPedidos(newItems)
      // snap.forEach((doc) => {

      //   console.log(doc.data());
      //   setPedidos([...pedidos,{doc.data()}])
        
      // })
      
    })
  },[]) 
  console.log(pedidos);
    

  return (
    <div>
      <h2>Cozinhaa</h2>
      {pedidos.map((pedido)=> (
        <div>
        <p>Mesa: {pedido.table}. {pedido.name}</p>
          {console.log(pedido.time.toDate().toTimeString)}
        <p>{pedido.product}</p>
        {/* <p>{pedido.time}</p> */}
        </div>
       )
      )}
    </div>
  )
}

export default Kitchen