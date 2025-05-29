// NearbyVendorsService.jsx (New)
export const getNearbyVendors = async (lat, lng) => {
  try {
    const res = await fetch(`http://192.168.1.150:5000/api/vendors/nearby?lat=${lat}&lng=${lng}`);
    if (!res.ok) throw new Error('Network response was not ok');
    const json = await res.json();
    return json || [];
  } catch (err) {
    console.error('Failed to fetch nearby vendors:', err);
    return [];
  }
};
