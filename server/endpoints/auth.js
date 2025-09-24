const { reqBody } = require("../utils/http");
const { User } = require("../models/user");
const { SystemSettings } = require("../models/systemSettings");
const { EventLogs } = require("../models/eventLogs");

function authEndpoints(app) {
  if (!app) return;

  /**
   * Public user registration endpoint
   * Allows new users to create accounts without admin intervention
   */
  app.post("/auth/register", async (request, response) => {
    try {
      // Check if multi-user mode is enabled
      const multiUserMode = await SystemSettings.isMultiUserMode();
      if (!multiUserMode) {
        response.status(400).json({
          success: false,
          error: "Multi-user mode is not enabled on this instance.",
        });
        return;
      }

      // Check if public registration is allowed (you can add this as a setting later)
      // For now, we'll allow it by default

      const { username, password, email } = reqBody(request);

      // Basic validation
      if (!username || !password) {
        response.status(400).json({
          success: false,
          error: "Username and password are required.",
        });
        return;
      }

      if (password.length < 8) {
        response.status(400).json({
          success: false,
          error: "Password must be at least 8 characters long.",
        });
        return;
      }

      // Check if username already exists
      const existingUser = await User.get({ username });
      if (existingUser) {
        response.status(400).json({
          success: false,
          error: "Username already exists. Please choose a different username.",
        });
        return;
      }

      // Create the new user with default role
      const { user: newUser, error } = await User.create({
        username,
        password,
        role: "default", // New users get default role
        dailyMessageLimit: null, // No message limit by default
        bio: "",
      });

      if (error || !newUser) {
        console.error("Failed to create user during registration:", error);
        response.status(400).json({
          success: false,
          error: error || "Failed to create user account.",
        });
        return;
      }

      // Log the registration event
      await EventLogs.logEvent(
        "user_registered",
        {
          username: newUser.username,
          registrationMethod: "self_registration",
        },
        newUser.id
      );

      response.status(200).json({
        success: true,
        message: "User account created successfully. You can now log in.",
        user: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
        },
      });
    } catch (error) {
      console.error("Registration error:", error);
      response.status(500).json({
        success: false,
        error: "Internal server error during registration.",
      });
    }
  });

  /**
   * Check if public registration is enabled
   */
  app.get("/auth/registration-enabled", async (request, response) => {
    try {
      const multiUserMode = await SystemSettings.isMultiUserMode();
      // For now, we'll allow registration if multi-user mode is enabled
      // You can add a specific setting for this later
      response.status(200).json({
        enabled: multiUserMode,
        multiUserMode,
      });
    } catch (error) {
      console.error("Error checking registration status:", error);
      response.status(500).json({
        enabled: false,
        error: "Failed to check registration status.",
      });
    }
  });
}

module.exports = { authEndpoints };
