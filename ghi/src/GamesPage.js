import React from "react";


const GameList = ({ games }) => {
  let renderedList = games;

  const renderGameCards = renderedList.map((game) => (
    <GameCard key={game.id} Game={game}></GameCard>
  ));

  return <GameContainer>{renderGameCards}</GameContainer>;
};

const mapStateToProps = (state) => {
  return {
    games: state.games.games,
  };
};

export default connect(mapStateToProps)(GameList);
