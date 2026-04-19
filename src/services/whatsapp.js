import { siteConfig } from '../config/site.js';

/**
 * Validates that a phone number is in the correct format for WhatsApp.
 * Must contain only digits and be at least 10 digits long.
 * @param {string} phoneNumber
 * @returns {boolean}
 */
export function isValidPhoneNumber(phoneNumber) {
  if (typeof phoneNumber !== 'string') return false;
  return /^\d{10,}$/.test(phoneNumber);
}

/**
 * Generates a WhatsApp URL with the given message text.
 * Returns null if the phone number is invalid.
 * @param {string} phoneNumber - Phone number in international format without "+"
 * @param {string} message - Message text (will be URL-encoded)
 * @returns {string|null} WhatsApp URL or null if phone is invalid
 */
function buildWhatsAppUrl(phoneNumber, message) {
  if (!isValidPhoneNumber(phoneNumber)) {
    return null;
  }
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Generates a WhatsApp URL with a product-specific message.
 * @param {string} productName - Name of the product
 * @param {string} formattedPrice - Already formatted price string (e.g. "$2.500.000")
 * @param {string} [language='es'] - Language code ('es' or 'en')
 * @returns {string|null} WhatsApp URL or null if phone number is invalid
 */
export function generateProductWhatsAppUrl(productName, formattedPrice, language = 'es') {
  const lang = (language === 'en') ? 'en' : 'es';
  const messageBuilder = siteConfig.whatsapp.messages[lang].product;
  const message = messageBuilder(productName, formattedPrice);
  return buildWhatsAppUrl(siteConfig.whatsapp.phoneNumber, message);
}

/**
 * Generates a WhatsApp URL with a generic greeting message.
 * @param {string} [language='es'] - Language code ('es' or 'en')
 * @returns {string|null} WhatsApp URL or null if phone number is invalid
 */
export function generateGreetingWhatsAppUrl(language = 'es') {
  const lang = (language === 'en') ? 'en' : 'es';
  const message = siteConfig.whatsapp.messages[lang].greeting;
  return buildWhatsAppUrl(siteConfig.whatsapp.phoneNumber, message);
}
