import React, {useState} from 'react'
import Button from '../Button'
import { StyleSheet, css } from 'aphrodite'


const HistoryCard = ({order}) => {
  const [history, setHistory] = useState(3)
  
  const showMore = () => {
    setHistory(history => history + 3)
  }
	return (
	  <div className={css(styles.historyBox, styles.vertical)}>
      <h3 className={css(styles.boxTitle)}>Histórico</h3>
      {order.slice(0, history).map( (done) => (
        <div key={done.id} className={css(styles.doneList)}>
          <div>
            <p className={css(styles.tableN)}>Mesa: {done.table}</p>
            <p>Cliente: {done.name}</p>
            <p><span role='img' aria-label='clockemoji'>⏰</span> Preparo: {done.kitchenTime} min</p>
            { done.delivered && <p><span role='img' aria-label='clockemoji'>⏰</span> Total: {done.readyTime} min</p>}
          </div>
          <ul className={css(styles.itemUl)}>{done.product.map((item) => (
            <li key={item.name+done.id} className={css(styles.itemN)}><span className={css(styles.count)}>{item.count} x </span>{item.name}</li>
          ))}</ul>
          <p>Total: R$ {done.total},00</p>
          <p> Status: {done.delivered ? `Entregue` : `Pendente`}</p>
        </div>
      ))}

      <Button handleclick={showMore} title="Ver mais"/>
    </div>
	)
}

const styles = StyleSheet.create({
  historyBox: {
    width: "20%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignContent: "flex-start",
    '@media (max-width: 850px)': {
      width: "90%",
      justifyContent: "space-around",
      margin: "10px auto"
    },
  },
  boxTitle:{
    width: "90%",
    textAlign: "center",
    margin: "10px 0",
    color: "#FFEE62",
  },
  doneList: {
    fontSize: "0.8em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px",
    border: "2px solid #25B6D2",
    borderRadius: "15px",
    margin: "10px",
    boxSizing: "border-box",
    '@media (max-width: 850px)': {
      width: "30%",

    },
  },
tableN: {
	fontSize: "1.1rem",
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
	paddingRight: "7px",
},
})


export default HistoryCard