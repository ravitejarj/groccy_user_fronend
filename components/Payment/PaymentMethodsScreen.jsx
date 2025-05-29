import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';

const PAYMENT_CARDS = [
  {
    id: '1',
    type: 'Mastercard',
    number: '**** **** **** 5678',
    iconName: 'card',
  },
  {
    id: '2',
    type: 'Visa',
    number: '**** **** **** 1234',
    iconName: 'card',
  },
];

const PaymentMethodsScreen = () => {
  const [selectedCard, setSelectedCard] = useState(PAYMENT_CARDS[0].id);
  const router = useRouter();

  const handleAddCard = () => {
    router.push('/add-card');
  };

  const handleApply = () => {
    // Handle apply logic here
    router.back();
  };

  const renderCard = (card) => (
    <TouchableOpacity
      key={card.id}
      style={[
        styles.cardContainer,
        selectedCard === card.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedCard(card.id)}
    >
      <View style={styles.cardInfo}>
        <View style={styles.cardIconContainer}>
          <Ionicons name={card.iconName} size={24} color="#FF5722" />
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.cardType}>{card.type}</Text>
          <Text style={styles.cardNumber}>{card.number}</Text>
        </View>
      </View>
      <View style={[
        styles.radioButton,
        selectedCard === card.id && styles.radioButtonSelected,
      ]}>
        {selectedCard === card.id && (
          <View style={styles.radioButtonInner} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.cardsContainer}>
          {PAYMENT_CARDS.map(renderCard)}
        </View>

        <TouchableOpacity style={styles.addCardButton} onPress={handleAddCard}>
          <Ionicons name="add-circle-outline" size={24} color="#FF5722" />
          <Text style={styles.addCardText}>Add New Card</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  cardsContainer: {
    padding: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    position: 'relative',
  },
  selectedCard: {
    borderColor: '#FF5722',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  cardIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFF8F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
  },
  cardType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
  },
  radioButtonSelected: {
    borderColor: '#FF5722',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF5722',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: '#FFF8F6',
    borderRadius: 12,
  },
  addCardText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FF5722',
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  applyButton: {
    backgroundColor: '#FF5722',
    borderRadius: 32,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentMethodsScreen; 