import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const categories = [
  { id: 1, name: 'Vegetables', image: require('@/assets/mobile-images/Product Categories/Vegetables.png') },
  { id: 2, name: 'Rice', image: require('@/assets/mobile-images/Product Categories/Rice.png') },
  { id: 3, name: 'Coriander', image: require('@/assets/mobile-images/Product Categories/Coriander.png') },
  { id: 4, name: 'Dairy', image: require('@/assets/mobile-images/Product Categories/Dairy.png') },
  { id: 5, name: 'Dals', image: require('@/assets/mobile-images/Product Categories/Dals.jpg') },
  { id: 6, name: 'Masalas', image: require('@/assets/mobile-images/Product Categories/masalas.png') },
  { id: 7, name: 'Household', image: require('@/assets/mobile-images/Product Categories/household.png') },
  { id: 8, name: 'Oil & Ghee', image: require('@/assets/mobile-images/Product Categories/oil & ghee.png') },
  { id: 9, name: 'Snacks', image: require('@/assets/mobile-images/Product Categories/snacks.png') },
];

const products = [
  {
    id: 1,
    name: 'Fresh Bhindi',
    weight: '(Keral) - 500g',
    price: '$18',
    category: 'Vegetables',
    image: require('@/assets/mobile-images/Product Details/product details.png'),
  },
  {
    id: 2,
    name: 'Tomato',
    weight: '(Tameta) - 500g',
    price: '$07',
    category: 'Vegetables',
    image: require('@/assets/mobile-images/Product Details/product details.png'),
  },
  {
    id: 3,
    name: 'Onions',
    weight: '(Dungli) - 1kg',
    price: '$10',
    category: 'Vegetables',
    image: require('@/assets/mobile-images/Product Details/product details.png'),
  },
  {
    id: 4,
    name: 'Aloo',
    weight: '(Bataka) - 1kg',
    price: '$17',
    category: 'Vegetables',
    image: require('@/assets/mobile-images/Product Details/product details.png'),
  },
  {
    id: 5,
    name: 'Tamata',
    weight: '(Tomato) - 500g',
    price: '$07',
    category: 'Vegetables',
    image: require('@/assets/mobile-images/Product Details/product details.png'),
  },
  {
    id: 6,
    name: 'Fresh Bhindi',
    weight: '(Okra) - 500g',
    price: '$18',
    category: 'Vegetables',
    image: require('@/assets/mobile-images/Product Details/product details.png'),
  },
];

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = 70;
const PRODUCT_MARGIN = 8;
const NUM_COLUMNS = 2;
const PRODUCT_WIDTH = (width - SIDEBAR_WIDTH - (PRODUCT_MARGIN * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

const VendorScreen = () => {
  const router = useRouter();
  const { store } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Vegetables');
  const [cart, setCart] = useState({}); // { [productId]: quantity }

  // Filter products by selected category
  const filteredProducts = products.filter(
    (p) => p.category === selectedCategory &&
      (!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAdd = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };
  const handleRemove = (id) => {
    setCart((prev) => {
      if (!prev[id] || prev[id] === 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: prev[id] - 1 };
    });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryButton,
        selectedCategory === item.name && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(item.name)}
    >
      <Image 
        source={item.image}
        style={[
          styles.categoryImage,
          selectedCategory === item.name && styles.categoryImageActive
        ]}
        resizeMode="contain"
      />
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === item.name && styles.categoryTextActive
        ]}
        numberOfLines={1}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => {
    const quantity = cart[item.id] || 0;
    const sliderImages = [
      require('@/assets/mobile-images/Product Details/product details.png'),
      require('@/assets/mobile-images/Product Details/product details.png'),
      require('@/assets/mobile-images/Product Details/product details.png'),
    ];
    return (
      <TouchableOpacity style={styles.productCard} onPress={() => router.push({ pathname: '/product', params: { name: item.name, images: JSON.stringify(sliderImages) } })} activeOpacity={0.8}>
        <View style={styles.productImageContainer}>
          <Image source={item.image} style={styles.productImage} resizeMode="contain" />
        </View>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productWeight}>{item.weight}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.productPrice}>{item.price}</Text>
            {quantity === 0 ? (
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => handleAdd(item.id)}
              >
                <Ionicons name="add" size={20} color="#FFF" />
              </TouchableOpacity>
            ) : (
              <View style={styles.quantitySelector}>
                <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.qtyBtn}>
                  <Ionicons name="trash" size={18} color="#FF5722" />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity onPress={() => handleAdd(item.id)} style={styles.qtyBtn}>
                  <Ionicons name="add" size={18} color="#FF5722" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.storeName}>{store || 'Patel Brothers'}</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search in Patel Brothers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => setSearchQuery('')}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.sidebar}>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.productRow}
          contentContainerStyle={styles.productsContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 16,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  searchContainer: {
    padding: 16,
    paddingTop: 0,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#0C0C0B1A',
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: SIDEBAR_WIDTH,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
    paddingVertical: 8,
  },
  categoryButton: {
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#FFF8F6',
  },
  categoryImage: {
    width: 32,
    height: 32,
    marginBottom: 4,
    opacity: 0.6,
  },
  categoryImageActive: {
    opacity: 1,
  },
  categoryText: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: '#FF5722',
  },
  productsContainer: {
    padding: PRODUCT_MARGIN,
  },
  productRow: {
    justifyContent: 'flex-start',
  },
  productCard: {
    width: PRODUCT_WIDTH,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#ffffff',
    borderRadius: 12,
    marginBottom: PRODUCT_MARGIN,
    marginRight: PRODUCT_MARGIN,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },
  productImageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '90%',
    height: '90%',
    borderRadius: 12,
    top: 4,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  productWeight: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 4,
  },
  qtyBtn: {
    padding: 4,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 8,
  },
});

export default VendorScreen; 