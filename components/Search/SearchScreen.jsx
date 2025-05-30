import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const dummyProducts = [
  {
    id: '1',
    name: 'Fortune Atta',
    price: '₹249',
    weight: '5kg',
    rating: 4.2,
  },
  {
    id: '2',
    name: 'Reliance Fresh',
    price: '₹249',
    weight: '5kg',
    rating: 4.3,
  },
  {
    id: '3',
    name: 'Patanjali Atta',
    price: '₹289',
    weight: '5kg',
    rating: 4.2,
  },
  {
    id: '4',
    name: 'Organic Atta',
    price: '₹365',
    weight: '5kg',
    rating: 4.1,
  },
  {
    id: '5',
    name: 'Aashirvaad Atta',
    price: '₹275',
    weight: '5kg',
    rating: 4.4,
  },
  {
    id: '6',
    name: 'Pillsbury Atta',
    price: '₹255',
    weight: '5kg',
    rating: 4.0,
  },
];

const { width } = Dimensions.get('window');
const COLUMN_GAP = 16;
const NUM_COLUMNS = 2;
const CARD_WIDTH = (width - (COLUMN_GAP * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

const SearchScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState({}); // { [productId]: quantity }

  // Filter products by name or weight
  const filteredProducts = dummyProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.weight && product.weight.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

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

  const renderProduct = ({ item }) => {
    const quantity = cart[item.id] || 0;
    return (
      <View style={styles.productCard}>
        <View style={styles.productImageContainer}>
          <Image 
            source={require('@/assets/mobile-images/Product Details/product details.png')}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.productInfo}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productWeight}>{item.weight}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            {quantity === 0 ? (
              <TouchableOpacity style={styles.addButton} onPress={() => handleAdd(item.id)}>
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
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Ionicons name="search" size={64} color="#DDD" />
      <Text style={styles.emptyStateText}>Search for groceries or hot meals...</Text>
    </View>
  );

  return (
    <SafeAreaWrapper style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for groceries or hot meals..."
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery ? (
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={() => handleSearch('')}
            >
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.resultsContainer}>
        {searchQuery ? (
          <>
            <Text style={styles.resultsTitle}>
              Grocery Results for "{searchQuery}"
            </Text>
            <FlatList
              key={`grid-${NUM_COLUMNS}`}
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.productsList}
              numColumns={NUM_COLUMNS}
              columnWrapperStyle={styles.row}
            />
          </>
        ) : renderEmptyState()}
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
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
  resultsContainer: {
    flex: 1,
    padding: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  productsList: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: COLUMN_GAP,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: COLUMN_GAP,
  },
  productImageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
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
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default SearchScreen; 