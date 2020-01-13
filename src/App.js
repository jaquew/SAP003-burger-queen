import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Hall from './pages/Hall'
import Kitchen from './pages/Kitchen'
import { StyleSheet, css } from 'aphrodite';

function App() {
  return (
    <div>
      <header className={css(styles.header)}>
        <a href="/" className={css(styles.back)}>Voltar</a>
        {/* <h2 className={css(styles.logo)}>Burguer Queen</h2> */}
        <img src="images/logo.png" alt="Logo"/>
        <a href="/" className={css(styles.logout)}>Sair</a>

      </header>
      <Router>
        <Switch>
          <Route path="/hall" component={Hall}/>
          <Route path="/kitchen" component={Kitchen}/>

          <Route path="/">
            <section className={css(styles.main)}>
              <Link className={css(styles.link)} to="/hall" ><h3>Hall</h3></Link>
              <Link to="/kitchen" className={css(styles.link)}><h3>Cozinha</h3></Link>
            </section>
          </Route>
    
        </Switch>
      </Router>
    </div>
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
    padding: "10px 5px",
    color: "#fff",
    textDecoration: "none",

  },
  logo: {
    width: "60%",
    textAlign: "center"
  },

  main: {
    display: "flex",
    justifyContent: "space-evenly",
    height: "80vh",
    alignItems: "center",
    textAlign: "center"
  },
  link: {
    display: "inline-block",
    padding: "5px",
    fontFamily: "Arial",
    width: "30%",
    height: "55px",
    whiteSpace: "normal",
    textDecoration: "none",
    color: "#fff",
    border: "1px solid #25B6D2",
    borderRadius: "15px",
    ':active': {
      backgroundColor: "#25B6D2",
    },
  },
})

export default App;
