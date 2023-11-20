import { useState } from 'react';
import Card from './components/Card/Card';
import { dataList } from './utils/cards';
import './App.css';

const getShuffledList = (list, shuffledList) => {
  if (list.length === 0) {
    return shuffledList;
  }
  const randomInt = Math.floor(Math.random() * list.length);
  const randomElement = list.splice(randomInt, 1);
  return getShuffledList(list, [...shuffledList, ...randomElement]);
};

const shuffledCards = getShuffledList(dataList, []);

function App() {
  // We shuffle the array first
  const [cards, setCards] = useState(shuffledCards);
  const [currentCardsIds, setCurrentCardsIds] = useState([]);

  const handleOnClickCard = (event) => {
    const id = event.target.id;
    const selectedCardsIds = [...currentCardsIds, id];

    setCurrentCardsIds(selectedCardsIds);

    // We flip the card here
    setCards((prevState) =>
      prevState.map((card) => {
        if (selectedCardsIds.includes(card.id)) {
          return { ...card, isFlipped: true };
        }
        return card;
      })
    );

    // Here we know we already flip 2 cards
    if (selectedCardsIds.length === 2) {
      const selectedCards = cards.filter((card) =>
        selectedCardsIds.includes(card.id)
      );

      setCurrentCardsIds([]);

      // We select the same card 2 times or we select 2 cards with different group values
      if (
        selectedCards.length < 2 ||
        selectedCards[0].group !== selectedCards[1].group
      ) {
        // We need to wait in order to let the user see the second image
        setTimeout(() => {
          setCards((prevState) =>
            prevState.map((card) => {
              if (selectedCardsIds.includes(card.id)) {
                return { ...card, isFlipped: false };
              }
              return card;
            })
          );
        }, 1000);
      }
    }
  };

  return (
    <div className='App'>
      <Card cards={cards} onClick={handleOnClickCard} />
    </div>
  );
}

export default App;
