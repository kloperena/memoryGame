import React, { Component } from "react";
import API from "../../utils/API";
import { List} from "../../components/List";
import "./style.css";
import firebase from "firebase";
import Wrapper from "../../components/wrapper";
import Wr from "../../components/wr";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';


let scoreSong = new Audio("./scoreSong.mp3");

class Scores extends Component {
  // Setting our component's initial state
  state = {
    scores: [],
    username: "",
    score: "",
    isPlaying: false
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.musicToggle();
    this.loadScores();

  }

  // Loads all books  and sets them to this.state.books
  loadScores = () => {
    API.getScores()
      .then(res =>
        this.setState({ scores: res.data, username: "", score: "" })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteScore = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.username && this.state.score) {
      API.saveScore({
        username: this.state.username,
        score: this.state.score
      })
        .then(res => this.scores())
        .catch(err => console.log(err));
    }
  };

  musicToggle = () => {
    let isPlaying = this.state.isPlaying;


    if (isPlaying === true) {
      scoreSong.pause();
      isPlaying = false;
    }
    else {
      scoreSong.play();
      isPlaying = true;
    }

    this.setState({ isPlaying })
  };




  render() {
    return (
      
      <Wrapper>

           <div className="nav">
           <AppBar style={{ background: '#2E3B55' }} position="static">
        <Toolbar>
       
          <Typography variant="h6" color="inherit" className="grow">
          <Button onClick={this.musicToggle}><img className = "music" src = "./music-player.png" /></Button>
          <a  href="/">
        Memory Game
     </a>
     <img className = "high" src = "./highScores.gif" />
          </Typography> 
     <div className= "signOut">
          <Grid container justify="center" alignItems="center">
     <Button className = "back"><a href="/Game">◀◀◀</a> </Button>
      <Avatar alt="" src={firebase.auth().currentUser.photoURL} />
          <Button onClick={() => firebase.auth().signOut()} className= "signOut" color="inherit">Log Out</Button>
          </Grid> </div>
        </Toolbar>
      </AppBar>
    </div>
    <Wr>
        
          {this.state.scores.length ? (
            <List>
              {this.state.scores.map(score => {
                return (

                  // <marquee behavior="scroll" direction="up" scrollamount="1">
                  <marquee behavior="scroll" direction="up" scrollamount="1">
                  
                      <strong>
                        
                        {score.username} {score.score}
                      </strong>
                 

                   </marquee>
                   
                );
              })}
            </List>
          ) : (
              <h1>No Results to Display</h1>
            )}
 
   
 </Wr>
      </Wrapper>
    );
  }
}

export default Scores;