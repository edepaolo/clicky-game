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
    if (currentClicked.includes(id) !== true && currentClicked.length < currentClicked.length < 11) {
      let shuffled = this.shuffle(this.state.activeCards);
      currentClicked.push(id)
      this.setState({clicked : currentClicked})
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

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    let content;
    switch (this.state.game) {
      case "play":
        content = 
        this.state.activeCards.map(friend => (
            <FriendCard
              removeFriend={this.removeFriend}
              id={friend.id}
              key={friend.id}
              name={friend.name}
              image={friend.image}
              occupation={friend.occupation}
              location={friend.location}
            />
          ));
    }
    return (
      <Wrapper>
        <Title>Friends List</Title>
        {content}
      </Wrapper>
    );
  }
}

export default App;
