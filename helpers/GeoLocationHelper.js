import * as Location from 'expo-location';

/**
 * Fetches current location with high accuracy and permission handling.
 * Returns { latitude, longitude } or throws an error.
 */
export const getAccurateCurrentLocation = async () => {
  // Step 1: Request permission
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission denied');
  }

  // Step 2: Try to get high accuracy location
  try {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
      maximumAge: 10000, // Use cached location if <10s old
      timeout: 10000,    // Wait max 10s for fix
    });

    const { latitude, longitude } = location.coords;
    return { latitude, longitude };
  } catch (err) {
    console.warn('High accuracy location failed:', err.message);

    // Step 3: Fallback to last known location
    const fallback = await Location.getLastKnownPositionAsync();
    if (fallback) {
      const { latitude, longitude } = fallback.coords;
      return { latitude, longitude };
    } else {
      throw new Error('Unable to fetch location');
    }
  }
};
