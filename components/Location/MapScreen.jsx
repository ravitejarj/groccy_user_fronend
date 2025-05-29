import { getPlaceDetails, getPlaceSuggestions } from '@/services/maps';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import { getNearbyVendors } from './VendorsAPI';

const MapScreen = () => {
  const router = useRouter();
  const { lat, lng } = useLocalSearchParams();

  const [region, setRegion] = useState({
    latitude: parseFloat(lat) || 37.7749,
    longitude: parseFloat(lng) || -122.4194,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [checking, setChecking] = useState(false);
  const [notServiceable, setNotServiceable] = useState(false);
  const [vendorCircle, setVendorCircle] = useState(null);

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    reverseGeocode(region.latitude, region.longitude);
  }, [region]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const geo = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng });
      const item = geo[0];
      const formatted = `${item.name || ''}, ${item.street || ''}, ${item.city || ''}, ${item.region || ''}`;
      setAddress(formatted);
      setCity(item.city || '');
    } catch {
      setAddress('Unknown location');
      setCity('');
    }
  };

  const handleConfirm = async () => {
    setChecking(true);
    setNotServiceable(false);
    setVendorCircle(null);

    try {
      const vendors = await getNearbyVendors(region.latitude, region.longitude);
      if (!vendors.length) {
        setVendorCircle(null);
        setNotServiceable(true);
        return;
      }

      setVendorCircle(vendors[0]);

      router.push({
        pathname: '/AddressForm',
        params: {
          lat: region.latitude.toString(),
          lng: region.longitude.toString(),
          address,
          city,
        },
      });
    } catch (err) {
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setChecking(false);
    }
  };

  const goToCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please enable location access');
      return;
    }
    const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setRegion({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    });
  };

  const handleSuggestionSelect = async (placeId, description) => {
    const loc = await getPlaceDetails(placeId);
    if (loc) {
      setRegion({
        ...region,
        latitude: loc.lat,
        longitude: loc.lng,
      });
      setQuery(description);
      setSuggestions([]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Select Your Location</Text>

      <TextInput
        placeholder="Search for apartment, street name..."
        style={styles.searchInput}
        placeholderTextColor="#999"
        value={query}
        onChangeText={async (text) => {
          setQuery(text);
          if (text.length > 2) {
            const results = await getPlaceSuggestions(text);
            setSuggestions(results);
          } else {
            setSuggestions([]);
          }
        }}
      />

      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleSuggestionSelect(item.place_id, item.description)}
            >
              <Text style={styles.suggestionText}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
        {vendorCircle && (
          <Circle
            center={{
              latitude: vendorCircle.latitude,
              longitude: vendorCircle.longitude,
            }}
            radius={vendorCircle.deliveryRadiusInMiles * 1609.34}
            strokeColor="rgba(0,122,255,0.5)"
            fillColor="rgba(0,122,255,0.1)"
          />
        )}
      </MapView>

      <View style={styles.pinContainer} pointerEvents="none">
        <Image source={require('@/assets/mobile_images/icons/pin.png')} style={styles.pin} />
      </View>

      <TouchableOpacity style={styles.locateBtn} onPress={goToCurrentLocation}>
        <Image
          source={require('@/assets/mobile_images/icons/location_icon.png')}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>

      {notServiceable && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>We are not serviceable at this location. Please select a different location.</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.addressMain}>{address}</Text>
        <Text style={styles.addressCity}>{city}</Text>
        <TouchableOpacity
          style={[styles.confirmButton, notServiceable && styles.disabled]}
          onPress={handleConfirm}
          disabled={checking || notServiceable}
        >
          {checking ? <ActivityIndicator color="#fff" /> : <Text style={styles.confirmText}>Confirm Location</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
    textAlign: 'center',
    color: '#000',
  },
  searchInput: {
    marginHorizontal: 16,
    height: 44,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 4,
  },
  suggestionItem: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  suggestionText: {
    fontSize: 14,
    color: '#333',
  },
  map: { flex: 1 },
  pinContainer: {
    position: 'absolute',
    top: '48%',
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    zIndex: 10,
  },
  pin: { width: 48, height: 48 },
  locateBtn: {
    position: 'absolute',
    right: 20,
    bottom: 170,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 24,
    elevation: 4,
    zIndex: 20,
  },
  errorBox: {
    backgroundColor: '#fdecea',
    padding: 10,
    margin: 10,
    borderRadius: 8,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 13,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 6,
  },
  addressMain: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  addressCity: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginBottom: 14,
  },
  confirmButton: {
    backgroundColor: '#FF6D00',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  disabled: { opacity: 0.5 },
});

export default MapScreen;
