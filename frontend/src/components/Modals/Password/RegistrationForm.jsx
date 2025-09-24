import React, { useState, useEffect } from "react";
import Auth from "@/models/auth";
import { useTranslation } from "react-i18next";

export default function RegistrationForm({
  onSwitchToLogin,
  onRegistrationSuccess,
}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.username) {
      errors.username = "Username is required";
    } else if (formData.username.length < 2) {
      errors.username = "Username must be at least 2 characters long";
    } else if (!/^[a-z0-9_\-.]+$/.test(formData.username)) {
      errors.username =
        "Username must only contain lowercase letters, periods, numbers, underscores, and hyphens with no spaces";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await Auth.register({
        username: formData.username,
        password: formData.password,
      });

      if (result.success) {
        setSuccess(true);
        setError(null);
        // Show success message for a few seconds, then switch to login
        setTimeout(() => {
          if (onRegistrationSuccess) {
            onRegistrationSuccess(result.user);
          } else {
            onSwitchToLogin();
          }
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col justify-center items-center relative rounded-2xl bg-theme-bg-secondary md:shadow-[0_4px_14px_rgba(0,0,0,0.25)] md:px-12 py-12 -mt-4 md:mt-0">
        <div className="flex items-start justify-between pt-11 pb-9 rounded-t">
          <div className="flex items-center flex-col gap-y-4">
            <div className="text-center">
              <h3 className="text-md md:text-2xl font-bold text-white mb-4">
                {t("login.registration.account-created")}
              </h3>
              <p className="text-sm text-theme-text-secondary mb-6">
                {t("login.registration.account-created-message")}
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-button mx-auto"></div>
              <p className="text-xs text-theme-text-secondary mt-2">
                {t("login.registration.redirecting")}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col justify-center items-center relative rounded-2xl bg-theme-bg-secondary md:shadow-[0_4px_14px_rgba(0,0,0,0.25)] md:px-12 py-12 -mt-4 md:mt-0">
        <div className="flex items-start justify-between pt-11 pb-9 rounded-t">
          <div className="flex items-center flex-col gap-y-4">
            <h3 className="text-md md:text-2xl font-bold text-white text-center">
              {t("login.registration.title")}
            </h3>
            <p className="text-sm text-theme-text-secondary text-center">
              {t("login.registration.description")}
            </p>
          </div>
        </div>

        <div className="w-full px-4 md:px-12">
          <div className="w-full flex flex-col gap-y-4">
            <div className="w-screen md:w-full md:px-0 px-6">
              <input
                name="username"
                type="text"
                placeholder={t("login.registration.username")}
                value={formData.username}
                onChange={handleInputChange}
                className={`border-none bg-theme-settings-input-bg text-theme-text-primary placeholder:text-theme-settings-input-placeholder focus:outline-primary-button active:outline-primary-button outline-none text-sm rounded-md p-2.5 w-full h-[48px] md:w-[300px] md:h-[34px] ${
                  validationErrors.username ? "border-red-500" : ""
                }`}
                required={true}
                autoComplete="off"
              />
              {validationErrors.username && (
                <p className="text-red-400 text-xs mt-1">
                  {validationErrors.username}
                </p>
              )}
              <p className="text-xs text-theme-text-secondary mt-1">
                {t("login.registration.username-requirements")}
              </p>
            </div>

            <div className="w-screen md:w-full md:px-0 px-6">
              <input
                name="password"
                type="password"
                placeholder={t("login.registration.password")}
                value={formData.password}
                onChange={handleInputChange}
                className={`border-none bg-theme-settings-input-bg text-theme-text-primary placeholder:text-theme-settings-input-placeholder focus:outline-primary-button active:outline-primary-button outline-none text-sm rounded-md p-2.5 w-full h-[48px] md:w-[300px] md:h-[34px] ${
                  validationErrors.password ? "border-red-500" : ""
                }`}
                required={true}
                autoComplete="off"
              />
              {validationErrors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {validationErrors.password}
                </p>
              )}
              <p className="text-xs text-theme-text-secondary mt-1">
                {t("login.registration.password-requirements")}
              </p>
            </div>

            <div className="w-screen md:w-full md:px-0 px-6">
              <input
                name="confirmPassword"
                type="password"
                placeholder={t("login.registration.confirm-password")}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`border-none bg-theme-settings-input-bg text-theme-text-primary placeholder:text-theme-settings-input-placeholder focus:outline-primary-button active:outline-primary-button outline-none text-sm rounded-md p-2.5 w-full h-[48px] md:w-[300px] md:h-[34px] ${
                  validationErrors.confirmPassword ? "border-red-500" : ""
                }`}
                required={true}
                autoComplete="off"
              />
              {validationErrors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">Error: {error}</p>
            )}
          </div>
        </div>

        <div className="flex items-center md:p-12 px-10 mt-12 md:mt-0 space-x-2 border-gray-600 w-full flex-col gap-y-4">
          <button
            disabled={loading}
            type="submit"
            className="md:text-primary-button md:bg-transparent text-dark-text text-sm font-bold focus:ring-4 focus:outline-none rounded-md border-[1.5px] border-primary-button md:h-[34px] h-[48px] md:hover:text-white md:hover:bg-primary-button bg-primary-button focus:z-10 w-full"
          >
            {loading
              ? t("login.registration.creating-account")
              : t("login.registration.create-account")}
          </button>

          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-theme-text-secondary text-sm hover:text-theme-text-primary transition-colors"
          >
            {t("login.registration.already-have-account")}
          </button>
        </div>
      </div>
    </form>
  );
}
