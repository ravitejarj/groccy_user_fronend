import { GOOGLE_MAPS_API_KEY } from '@env';
import axios from 'axios';

// Get address suggestions from Google Places
export const getPlaceSuggestions = async (input) => {
  try {
    const res = await axios.get(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json',
      {
        params: {
          input,
          key: GOOGLE_MAPS_API_KEY,
          components: 'country:us',
        },
      }
    );
    return res.data.predictions || [];
  } catch (err) {
    console.error('Autocomplete error:', err);
    return [];
  }
};

// Get lat/lng from place ID
export const getPlaceDetails = async (placeId) => {
  try {
    const res = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          place_id: placeId,
          key: GOOGLE_MAPS_API_KEY,
        },
      }
    );
    return res.data.result.geometry.location;
  } catch (err) {
    console.error('Place details error:', err);
    return null;
  }
};
