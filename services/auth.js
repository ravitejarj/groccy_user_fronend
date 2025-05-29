import axios from 'axios';

const API_URL = "http://192.168.1.150:5000/api/auth"; // Use your backend IP

export const registerUser = async ({ firstName, lastName, email, phone, password, role = 'customer' }) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      firstName,
      lastName,
      email,
      phone,
      password,
      role, // ensure role is sent as 'customer'
    });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Signup failed";
    console.log("Register error:", message);
    throw new Error(message);
  }
};

export const verifyOtp = async ({ phone, otp }) => {
  try {
    const res = await axios.post(`${API_URL}/verify-otp`, {
      phone,
      otp,
    });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "OTP verification failed";
    console.log("OTP error:", message);
    throw new Error(message);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || "Login failed";
    console.log("Login error:", message); // ✅ this helps debug in Expo
    throw new Error(message);
  }
};