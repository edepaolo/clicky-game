import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cards from "./cards.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    game: "play",
    activeCards: cards,
    clicked: [],
    score: 0,

  };

  checkClicked = id => {
    let currentClicked = this.state.clicked;
    let shuffled = this.shuffle(this.state.activeCards)
    if (currentClicked.includes(id) !== true && currentClicked.length < 11) {
            currentClicked.push(id)
            console.log(currentClicked);
            console.log(this.state.clicked);
            console.log(this.state.score);
            let newScore = this.state.score + 1;
      this.setState({clicked : currentClicked, score : newScore, activeCards : shuffled});

    } else if (currentClicked.includes(id) !== true && currentClicked.length === 11) {
      this.setState({score : 0, activeCards : shuffled, clicked : [], game : 'win' });
      console.log(currentClicked);
      console.log(this.state.clicked);
      console.log(this.state.score);
    } else if (currentClicked.includes(id) === true) {
      this.setState({score: 0, activeCards: shuffled, clicked: [], game: 'lose'});
    }
  } 

  shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
restart = () => {
  this.setState({game : 'play'})
}
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    let content;
    switch (this.state.game) {
      case "play":
        content = 
        this.state.activeCards.map(friend => (
            <FriendCard
              checkClicked={this.checkClicked}
              id={friend.id}
              key={friend.id}
              name={friend.name}
              image={friend.image}
              occupation={friend.occupation}
              location={friend.location}
            />
          ));
          break;
          case 'win': 
          content = 
          <div>
          <p>YOU WIN!</p>
          <button onClick={this.restart}>Restart Game</button>
          </div>
          break;
          case 'lose': 
          content = 
          <div>
          <p>YOU LOSE!</p>
          <button onClick={this.restart}>Restart Game</button>
          </div>
          break;
          default: 
          console.log('error');
    }
    return (
      <Wrapper>
        <Title>Clicky Game</Title>
        {content}
      </Wrapper>
    );
  }
}

export default App;
