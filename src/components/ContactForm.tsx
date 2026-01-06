/**
 * ContactForm Component - reCAPTCHA-protected contact information
 *
 * Copyright (c) 2018-present Anudeep Samaiya
 * Licensed under the MIT License
 * See LICENSE file in the project root for full license information
 */

import { useState, useEffect } from "react";

// Google reCAPTCHA site key from environment variable
const RECAPTCHA_SITE_KEY = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function ContactForm() {
  const [showForm, setShowForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userCompany, setUserCompany] = useState("");
  const [error, setError] = useState("");
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showForm && !captchaLoaded) {
      // Load reCAPTCHA script
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = () => {
        setCaptchaLoaded(true);
      };

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showForm, captchaLoaded]);

  useEffect(() => {
    if (captchaLoaded && showForm) {
      // Render reCAPTCHA when loaded
      window.grecaptcha?.ready(() => {
        window.grecaptcha.render("recaptcha-container", {
          sitekey: RECAPTCHA_SITE_KEY,
          callback: handleCaptchaVerify,
        });
      });
    }
  }, [captchaLoaded, showForm]);

  const handleCaptchaVerify = () => {
    setCaptchaVerified(true);
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate name
    if (!userName || userName.trim().length < 2) {
      setError("Please enter your name");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail || !emailRegex.test(userEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    // Check reCAPTCHA verification
    if (!captchaVerified) {
      setError("Please complete the reCAPTCHA verification");
      return;
    }

    // TODO: Send to backend for storage
    console.log("Form submitted:", { userName, userEmail, userCompany });

    // Success - show contact info
    setShowContact(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setShowContact(false);
    setUserName("");
    setUserEmail("");
    setUserCompany("");
    setError("");
    setCaptchaVerified(false);
    setCaptchaLoaded(false);
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
      >
        📧 Get Contact Info
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-xl">
            {!showContact ? (
              <>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Let's Connect! 👋
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  I'd love to hear from you! Share your details below and I'll get back to you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Your Email
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="john@company.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={userCompany}
                      onChange={(e) => setUserCompany(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Acme Inc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Verify you're human
                    </label>
                    <div id="recaptcha-container"></div>
                  </div>

                  {error && (
                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  Here's How to Reach Me! 🎉
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-blue-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">📧 Email</p>
                    <a
                      href="mailto:anudeepsamaiya@gmail.com"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium text-lg"
                    >
                      anudeepsamaiya@gmail.com
                    </a>
                  </div>

                  <div className="p-4 bg-green-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">📄 Resume</p>
                    <a
                      href="https://docs.google.com/document/d/1ouYM4MhTTWZZ91OfkOz8mHzUa5JsjULgrzNiS3IXioo/edit?tab=t.0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 dark:text-green-400 hover:underline font-medium"
                    >
                      View My Resume →
                    </a>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Looking forward to connecting with you! Feel free to reach out anytime.
                </p>

                <button
                  onClick={handleClose}
                  className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
