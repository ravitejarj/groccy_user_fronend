import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const { width } = Dimensions.get('window');

const ProductDetail = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [quantity, setQuantity] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Accept images as an array of URIs or require()s from params
  let images = [];
  if (params.images) {
    try {
      images = typeof params.images === 'string' ? JSON.parse(params.images) : params.images;
    } catch {
      images = Array.isArray(params.images) ? params.images : [];
    }
  }

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(0, prev - 1));
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(index);
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Image Slider */}
      <View style={styles.imageContainer}>
        {images.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={{ width }}
          >
            {images.map((img, idx) => (
              <Image
                key={idx}
                source={typeof img === 'string' ? { uri: img } : img}
                style={styles.productImageSlider}
                resizeMode="contain"
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.productImage}>
            <Ionicons name="bag" size={120} color="#FF5722" />
          </View>
        )}
        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {images.length > 0 ? images.map((_, idx) => (
            <View
              key={idx}
              style={[styles.paginationDot, idx === activeIndex && styles.paginationDotActive]}
            />
          )) : (
            <>
              <View style={[styles.paginationDot, styles.paginationDotActive]} />
              <View style={styles.paginationDot} />
            </>
          )}
        </View>
      </View>

      {/* Product Info */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productInfo}>
          <View style={styles.titleRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.productName}>{params.name || 'Big Bazaar'}</Text>
              <Text style={styles.subtitle}>{params.subtitle || 'Fortune Chakki Fresh Atta'}</Text>
            </View>
            <View style={styles.stockSatusview}>
            <Text style={styles.stockStatus}>In stock</Text>
            </View>
          </View>

          <Text style={styles.price}>{params.price || '$249'}</Text>

          {/* Ratings and Info */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.rating}>4.6</Text>
              </View>
              <Text style={styles.infoLabel}>Rating</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.infoValue}>1.5 km</Text>
              </View>
              <Text style={styles.infoLabel}>Distance</Text>
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.infoValue}>30min</Text>
              </View>
              <Text style={styles.infoLabel}>Delivery</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Product Description</Text>
            <Text style={styles.descriptionText}>
              {params.description || 'Fortune Chakki Fresh Atta is made from quality wheat grains, delivering soft rotis and nutrition. Ideal for daily meals, this Big pack suits the family.'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footer}>
        {quantity === 0 ? (
          <TouchableOpacity 
            style={styles.addToCartButton} 
            activeOpacity={0.8}
            onPress={incrementQuantity}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.cartControls}>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={decrementQuantity}
              >
                <Ionicons name="remove" size={20} color="#333" />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity 
                style={[styles.quantityButton, styles.quantityButtonPlus]} 
                onPress={incrementQuantity}
              >
                <Ionicons name="add" size={20} color="#FFF" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.addToCartButtonSmall}
              activeOpacity={0.8}
            >
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  shareButton: {
    padding: 8,
    marginRight: -8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    aspectRatio: 1.2,
    backgroundColor: '#FFF8F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImageSlider: {
    width: width,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FF5722',
    width: 20,
    borderRadius: 3,
  },
  productInfo: {
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  stockStatus: {
    fontSize: 12,
    color: '#0C0C0B',
    fontWeight: '500',

  },
  stockSatusview: {
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginVertical: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  infoItem: {
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  infoIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
  },
  descriptionContainer: {
    marginTop: 24,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  addToCartButton: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cartControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  quantityButtonPlus: {
    backgroundColor: '#FF5722',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingHorizontal: 16,
  },
  addToCartButtonSmall: {
    backgroundColor: '#FF5722',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    height: 36,
    justifyContent: 'center',
  },
});

export default ProductDetail; 