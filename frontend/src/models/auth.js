import { API_BASE } from "@/utils/constants";
import { baseHeaders } from "@/utils/request";

const Auth = {
  /**
   * Register a new user account
   * @param {Object} userData - User registration data
   * @param {string} userData.username - Username for the new account
   * @param {string} userData.password - Password for the new account
   * @param {string} [userData.email] - Optional email for the new account
   * @returns {Promise<Object>} Registration result
   */
  register: async function (userData) {
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Registration failed",
        };
      }

      return {
        success: true,
        message: data.message,
        user: data.user,
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: "Network error during registration",
      };
    }
  },

  /**
   * Check if public registration is enabled
   * @returns {Promise<Object>} Registration status
   */
  isRegistrationEnabled: async function () {
    try {
      const response = await fetch(`${API_BASE}/auth/registration-enabled`);
      const data = await response.json();

      if (!response.ok) {
        return {
          enabled: false,
          error: data.error || "Failed to check registration status",
        };
      }

      return {
        enabled: data.enabled,
        multiUserMode: data.multiUserMode,
      };
    } catch (error) {
      console.error("Error checking registration status:", error);
      return {
        enabled: false,
        error: "Network error while checking registration status",
      };
    }
  },
};

export default Auth;
