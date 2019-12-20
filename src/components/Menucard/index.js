import React, {useState} from 'react'
import { StyleSheet, css } from 'aphrodite';

// import Breakfast from '../Breakfast'
// import Allday from '../Allday'
import Button from '../Button';
import Input from '../Input'



const styles = StyleSheet.create({
  halllayout: {
    display:"flex",
    padding: "20px"
  },
  menubox:{
    width: "60%",
    margin: "5px 30px"
  },
  btnlayout: {
    display:"flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    minHeight: "70px",
    width: "50%",
    flexWrap: "wrap"
  },
  btn: {
    width: "100%"
  },
  menubtn: {
    backgroundColor: "#fff",
    fontFamily: "Arial",
    width: "60%",
    height: "50px",
    border: "1px solid #25B6D2",
    borderRadius: "15px",
    ':active': {
      backgroundColor: "#25B6D2",
      color: "#fff"
    },
  },
  btnBox: {
    display: "flex",
    flexWrap: "wrap"
  },
  btnlabel: {
    maxWidth: "35%",
    textAlign: "right"
  },
  aditional: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column"
  },
  list: {
    listStyle: "none",
    // textAlign: "center",
    padding: "10px",
    display: "flex",
    margin: "0"
  },

})




const Menucard = ({addOrder, items, setOption, hboption}) => {

  const breakfast = items.filter(item => item.bf===true)
  const allday = items.filter(item => item.bf===false)
  const [open, setOpen] = useState(false)
  

  const handleChange = (e) => {
    const value = e.target.value;
    setOption({...hboption,[e.target.name]: value});
  }
  console.log(hboption);
  
  return (
    <div className={css(styles.menubox)}>
      <h2>Menu</h2>
      {/* <Breakfast breakfast={breakfast} addOrder={addOrder} /> */}
      {/* <Allday allday={allday} addOrder={addOrder} setOption={setOption} hboption={hboption} />   */}

      <h3>Café da manhã</h3>

      <div className={css(styles.btnBox)}>

        {breakfast.map((item)=> (
          <div className={css(styles.btnlayout)}>
            <Button className={css(styles.menubtn)} title={`Hithi '\n' is a test message`} id={item.id} handleclick={() => addOrder(item)}/>
            <label className={css(styles.btnlabel)} htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
          </div>
        ))}
      </div>



      <h3>Almoço e Jantar</h3>
      {allday.map((item)=> (
        <div>
        {item.options ? 
          <div className={css(styles.btnlayout)}>
            <Button className={css(styles.menubtn)} title={item.name} id={item.id} handleclick={() => setOpen(!open)}/>
            <label className={css(styles.btnlabel)} htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
            {open && 
           <div className={css(styles.aditional)}>
            <ul className={css(styles.list,styles.options)}> Opção:
              {item.options.map((op) => 
                <li>
                  <Input type="radio" value={op} name="burger" id={op + item.id} onchange={(e) => handleChange(e)}/>
                  <label className={css(styles.label)} htmlFor={op + item.id}>{op}</label>
                </li>             
              )}
            </ul>

            <ul className={css(styles.list, styles.extra)}>Extra?
              {item.extra.map((ex) => 
                <li>
                    <Input type="radio" value={ex} name="extra" id={ex + item.id} onchange={(e) => handleChange(e)}/>
                  <label htmlFor={ex + item.id}>{ex}</label>
                </li>
                )}
            </ul>
            <Button className={css(styles.menubtn)} title="Adicionar" handleclick={() => addOrder(item)}/>

          </div>}

        </div>
        
        :
        <div className={css(styles.btnlayout)}>
          <Button className={css(styles.menubtn)} title={item.name} id={item.id} handleclick={() => addOrder(item)}/>
          <label className={css(styles.btnlabel)} htmlFor={item.id}>{'R$ ' + item.price +',00'}</label>
        </div>
        }
      </div>  
    ))}
    </div>
  )
}

export default Menucard