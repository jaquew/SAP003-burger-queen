import React, {useState} from 'react';
import firebase from '../../utils/firebaseUtils'
import growl from 'growl-alert'
import 'growl-alert/dist/growl-alert.css'
import AuthHandler from '../../components/AuthHandler'
import Button from '../../components/Button'
import { StyleSheet, css } from 'aphrodite';

const Login = () => {
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')
  const [active, setActive] = useState(true)
  const [access, setAccess] = useState('Hall')
  
  const login = () => {
    if (mail && pass) {
      firebase.fauth.signInWithEmailAndPassword(mail, pass).catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/user-not-found') {
          growl.warning({text:'Usuário não encontrado!',fadeAway: true, fadeAwayTimeout: 2000})
        } else if (errorCode === 'auth/invalid-email') {
          growl.warning({text:'Digite um e-mail válido',fadeAway: true, fadeAwayTimeout: 2000})
        } else if (errorCode === 'auth/wrong-password') {
          growl.warning({text:'Email ou senha inválido',fadeAway: true, fadeAwayTimeout: 2000})
        }
      });
      firebase.fauth.onAuthStateChanged((user) => {
        if (user) {          
          console.log("está logada queridinha");        
          window.location = '/hall';
        }
      });
    } else{
      growl.warning({text:'Por favor, digite email e senha',fadeAway: true, fadeAwayTimeout: 2000})

    }
  }
  const register = () => {
    if (mail && pass) {     
      firebase.fauth.createUserWithEmailAndPassword(mail, pass).then(() => {
        const user = firebase.fauth.currentUser;
        if (user != null) {          
          firebase.fire.collection('Funcionarios').doc(mail).set({
            mail,
            uid: user.uid,
            type: access
          })
          .then(()=>{
            window.location = '/'+ access;
          });
        }
      })
      
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  }


  return (
    <div className={css(styles.authPage)}>
      <section className={css(styles.main)}>
        <div className={css(styles.tabMenu)}>
          <Button className={active ? css(styles.tab, styles.activeTab) : css(styles.tab)} handleclick={()=> setActive(active => !active)}>Login</Button>
          <Button className={!active ? css(styles.tab, styles.activeTab) : css(styles.tab)} handleclick={()=>setActive(active => !active)}>Registre-se</Button>
        </div>
        {active ? <AuthHandler greeting="Olá, bem-vindo" mailValue={mail} mailOnChange= {(e)=>setMail(e.currentTarget.value)}  passValue={pass}  passOnChange={(e)=>setPass(e.currentTarget.value)} handleclick={login} btnChild="Entrar" setAccess={(e)=>setAccess(e.currentTarget.value)}/>
        : <>
      <AuthHandler greeting="Preencha os campos abaixo" mailValue={mail} mailOnChange= {(e)=>setMail(e.currentTarget.value)}  passValue={pass}  passOnChange={(e)=>setPass(e.currentTarget.value)} setAccess={(e)=>setAccess(e.currentTarget.value)} handleclick={register} btnChild="Registrar"/>
        </>}

      </section>
    </div>
  )
}

const styles = StyleSheet.create({
  authPage:{
    height: "100%",
    width:"100%",
    display:"flex",
    justifyContent: "center",
    alignItems: "center"
  },
  main: {
    display: "flex",
    width: "40%",
    height: "60%",
    alignItems: "center",
    paddingTop: "8%",
    border: "2px red solid",
    flexDirection: "column",
    textAlign: "center",
    
    '@media (max-width: 850px)': {
      width: "70%",
    },
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    fontSize: "2rem",
    fontFamily: "Arial",
    width: "30%",
    height: "75px",
    whiteSpace: "normal",
    textDecoration: "none",
    color: "#fff",
    border: "3px solid #25B6D2",
    borderRadius: "15px",
    ':active': {
      backgroundColor: "#25B6D2",
    },
  },
  tabMenu:{
    width:"100%",
    display: "flex",
    justifyContent: "space-evenly"
  },
  tab: {
    outline: "none",
    width: "40%",
    fontSize: "20px",
    // margin: "0 5px",
    lineHeight: "24px",
    padding: "8px 16px",
    backgroundColor: "Transparent",
    color: "#fff",
    border: "none",
    marginBottom: "15px",
    ':focus': {
      outline: "0",
    },
  },
  activeTab:{
    borderBottom: "4px solid #25B6D2",
  }
})

export default Login
