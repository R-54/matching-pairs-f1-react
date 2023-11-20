import React from 'react';
import f1 from '../../assets/img/f1.png';

const Card = ({ cards, onClick }) => {
  const inlineStyles = {
    card: {
      width: '160px',
      height: '250px',
      margin: '30px',
      backgroundColor: '#E10600',
    },
    cardsContainer: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  };

  return (
    <div style={inlineStyles.cardsContainer}>
      {cards.map(({ id, name, isFlipped, image }) => (
        <img
          id={id}
          key={id}
          style={inlineStyles.card}
          onClick={onClick}
          src={isFlipped ? image : f1}
          alt={name}
        />
      ))}
    </div>
  );
};

export default Card;
