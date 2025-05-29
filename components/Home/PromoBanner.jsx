import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

const BANNERS = [
  {
    id: '1',
    validText: 'Valid for a limited time',
    titleText: 'Free Delivery on\nOrders Above $25!',
    image: require('@/assets/mobile-images/Home Page Banner/Home Banner 1.png'),
    buttonText: 'Order Now',
  },
  {
    id: '2',
    validText: 'Special Offer',
    titleText: '20% OFF on\nFirst Order!',
    image: require('@/assets/mobile-images/Home Page Banner/Home Banner 1.png'),
    buttonText: 'Shop Now',
  },
  {
    id: '3',
    validText: 'Limited Period',
    titleText: 'Buy 1 Get 1 Free\nOn Selected Meals!',
    image: require('@/assets/mobile-images/Home Page Banner/Home Banner 1.png'),
    buttonText: 'Grab Deal',
  },
];

const { width } = Dimensions.get('window');
const BANNER_WIDTH = width - 32 - 32; // 16px padding on both sides, 32px to show next banner
const BANNER_SPACING = 16;

const PromoBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef(null);

  const onScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (BANNER_WIDTH + BANNER_SPACING));
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={BANNER_WIDTH + BANNER_SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingLeft: 16 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={[styles.content, { width: BANNER_WIDTH, marginRight: BANNER_SPACING }]}> 
            <View style={styles.textContainer}>
              <Text style={styles.validText}>{item.validText}</Text>
              <Text style={styles.titleText}>{item.titleText}</Text>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>{item.buttonText}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={item.image}
                style={styles.bannerImage}
                resizeMode="contain"
              />
            </View>
          </View>
        )}
      />
      {/* <View style={styles.dotsContainer}>
        {BANNERS.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, activeIndex === idx && styles.activeDot]}
          />
        ))}
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    backgroundColor: '#F6F6F6',
    marginBottom: 0,
  },
  content: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 0,
  },
  textContainer: {
    flex: 1,
  },
  validText: {
    color: '#FFF',
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4,
  },
  titleText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FF5722',
    fontWeight: '600',
    fontSize: 14,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: 100,
    height: 100,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD6B3',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FF5722',
  },
});

export default PromoBanner; 