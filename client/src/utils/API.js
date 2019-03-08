import axios from "axios";

export default {
  // Gets all books
  getScores: function() {
    return axios.get("/api/scores");
  },
  // Gets the book with the given id
  getScore: function(id) {
    return axios.get("/api/scores/" + id);
  },
  // Deletes the book with the given id
  deleteScore: function(id) {
    return axios.delete("/api/scores/" + id);
  },
  // Saves a book to the database
  saveName: function(scoreData) {
    return axios.post("/api/scores", scoreData);
  
  },
  saveScore: function(scoreData) {
    return axios.put("/api/scores/scores", scoreData);
  }
  
};
