import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Button } from 'react-native';
import MemoryCard from './MemoryCard';

const imgs = [
  { id: 1, img: require('../assets/ods1/COMBATE.jpeg') },
  { id: 2, img: require('../assets/ods1/COESAO.png') },
  { id: 3, img: require('../assets/ods1/REDUCAO.jpeg') },
  { id: 4, img: require('../assets/ods1/1.jpeg') },
  { id: 5, img: require('../assets/ods1/ii.jfif') },
  { id: 6, img: require('../assets/ods1/CORINGA.jpeg') }
];

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [lockCards, setLockCards] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [score, setScore] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const initializeGame = () => {
    const duplicatedCards = [...imgs, ...imgs].sort(() => 0.5 - Math.random());
    const initialCards = duplicatedCards.map(card => ({
      ...card,
      isFlipped: true,
      isMatched: false
    }));

    setCards(initialCards);
    setStartTime(null);
    setScore(0);
    setMatchedPairs(0);
    setFirstCard(null);
    setSecondCard(null);
    setLockCards(true); // bloqueia jogadas durante o preview

    // Esconde os cards após 2 segundos
    setTimeout(() => {
      const hiddenCards = initialCards.map(card => ({
        ...card,
        isFlipped: false,
      }));
      setCards(hiddenCards);
      setStartTime(Date.now()); // inicia cronômetro
      setLockCards(false); // libera jogadas
    }, 2000);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardPress = (cardIndex) => {
    if (lockCards) return;

    const newCards = [...cards];
    newCards[cardIndex].isFlipped = true;
    setCards(newCards);

    if (!firstCard) {
      setFirstCard({ card: newCards[cardIndex], index: cardIndex });
      return;
    }

    setSecondCard({ card: newCards[cardIndex], index: cardIndex });
    checkForMatch(newCards, cardIndex);
  };

  const checkForMatch = (newCards, cardIndex) => {
    const isMatch = firstCard.card.id === newCards[cardIndex].id;

    if (isMatch) {
      newCards[firstCard.index].isMatched = true;
      newCards[cardIndex].isMatched = true;
      setMatchedPairs(prev => {
        const updated = prev + 1;
        if (updated === imgs.length) {
          calculateScore();
        }
        return updated;
      });
      setScore(prev => prev + 100);
      resetCards();
    } else {
      setLockCards(true);
      setTimeout(() => {
        newCards[firstCard.index].isFlipped = false;
        newCards[cardIndex].isFlipped = false;
        setCards(newCards);
        resetCards();
      }, 1000);
    }
  };

  const calculateScore = () => {
    const endTime = Date.now();
    const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
    const timeBonus = Math.max(300 - elapsedSeconds, 0);
    setScore(prev => prev + timeBonus);
  };

  const resetCards = () => {
    setFirstCard(null);
    setSecondCard(null);
    setLockCards(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ODS 1: Erradicação da Pobreza</Text>
      <Text style={styles.score}>Pontuação: {score}</Text>

      {matchedPairs === imgs.length ? (
        <>
          <Text style={styles.finished}>Você concluiu!</Text>
          <Button title="Jogar Novamente" onPress={initializeGame} />
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.board}>
          {cards.map((card, index) => (
            <MemoryCard
              key={index}
              card={card}
              onPress={() => handleCardPress(index)}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#edc31a',
  },
  score: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  finished: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 20,
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 20,
  },
});

export default MemoryGame;
