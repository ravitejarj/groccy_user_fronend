import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const CARD_MARGIN = 11;
const CARDS_PER_ROW = 4;
const windowWidth = Dimensions.get('window').width;
const CARD_WIDTH = (windowWidth - (CARDS_PER_ROW + 1) * CARD_MARGIN) / CARDS_PER_ROW;

export default function CategoryBox({ image, label }) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.label} numberOfLines={2}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: CARD_WIDTH,
    marginBottom: 18,
  },
  box: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    backgroundColor: '#f6f7f9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
  image: {
    width: CARD_WIDTH * 0.85,
    height: CARD_WIDTH * 0.85,
    resizeMode: 'contain',
  },
  label: {
    fontSize: 13,
    color: '#24292f',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
    letterSpacing: -0.1,
  },
});
