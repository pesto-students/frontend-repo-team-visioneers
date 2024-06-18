import { axiosi } from "../../config/axios";

export const signUp = async (cred) => {
  try {
    const res = await axiosi.post(`/auth/register`, cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (cred) => {
  try {
    const res = await axiosi.post(`/auth/login`, cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const logout = async () => {
  try {
    const res = await axiosi.post(`/auth/logout`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Forgot password: send reset code
export const forgotPassword = async (cred) => {
  try {
    const res = await axiosi.post(`/auth/forgotpassword`, cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Verify reset code
export const verifyResetCode = async (cred) => {
  try {
    const res = await axiosi.post(`/auth/verification`, cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Resend reset code
export const resendOTP = async (cred) => {
  try {
    const res = await axiosi.post(`/auth/resendotp`, cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Reset password
export const resetPassword = async (cred) => {
  try {
    const res = await axiosi.post(`/auth/resetpassword`, cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update User Profile
export const updateProfile = async (cred) => {
  try {
    const res = await axiosi.put(`/auth/updateprofile`, cred);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
