import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Home,Game,Scores} from "./pages/Scores";
import Wrap  from "../src/components/wrap";


var  config =({
  apiKey: "AIzaSyBuiLxMFiSJImCr9v2JYP5AUM_IEbnU8QY",
  authDomain: "memory-game-a1fa3.firebaseapp.com",
  databaseURL: "https://memory-game-a1fa3.firebaseio.com",
  projectId: "memory-game-a1fa3",
  storageBucket: "memory-game-a1fa3.appspot.com",
  messagingSenderId: "264407920543"
})
firebase.initializeApp(config);

class App extends Component {
  state = { isSignedIn: false }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
      <Wrap>
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
         
          <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Game" component={Game} />
              <Route path="/Scores" component={Scores} />
            
            </Switch>
          </div>
        </Router>
        </span>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
      </Wrap>
    )
  }
}

export default App;
