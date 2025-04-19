import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Animated } from 'react-native';

const MemoryCard = ({ card, onPress, isFlipped, isMatched }) => {
  const flipAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(flipAnim, {
      toValue: isFlipped || isMatched ? 180 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFlipped, isMatched]);

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      disabled={isFlipped || isMatched}
    >
      <View>
        <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
          <Image style={styles.face} source={require('../assets/ods.jpg')} />
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            { transform: [{ rotateY: backInterpolate }] },
          ]}
        >
          <Image style={styles.face} source={card.img} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 8,
    width: 90,
    height: 90,
    perspective: 1000,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backfaceVisibility: 'hidden',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  cardBack: {
    backgroundColor: '#fff',
  },
  face: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
});

export default MemoryCard;
