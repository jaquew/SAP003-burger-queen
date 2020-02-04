import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Hall from './pages/Hall'
import Kitchen from './pages/Kitchen'
import Login from './pages/Login'
import firebase from './utils/firebaseUtils'
import { StyleSheet, css } from 'aphrodite';

function App() {
  const logout = (e) => {
    e.preventDefault()    
    firebase.fauth.signOut().then(() => { 
      console.log('saiu')
      window.location = '/';
    });
  }
  return (
    <>
      {(window.location.pathname!=="/") && <header className={css(styles.header)}>
        <a href="/"  onClick={(e)=>logout(e)} className={css(styles.back)}>Sair</a>
        <img src="images/logo.png" alt="Logo"/>
        <a href="/" className={css(styles.logout)}>Sair</a>
      </header>}
      <Router>
        <Switch>

          <Route path="/hall" component={Hall}/>
          <Route path="/kitchen" component={Kitchen}/>
          <Route path="/" component={Login}/>
        </Switch>
      </Router>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    display: "flex",
    height:"80px",
    alignItems: "center",
    justifyContent: "space-between"
  },
  back :{
    textAlign: "right",
    width: "10%",
    padding: "10px 5px",
    color: "#fff",
    textDecoration: "none",
    ':active': {
      backgroundColor: "#25B6D2",
    },
  },
  logout: {
    width: "10%",
    visibility: "hidden",
  },
  logo: {
    width: "60%",
    textAlign: "center"
  },
 
})

export default App;
