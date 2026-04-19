export const siteConfig = {
  whatsapp: {
    phoneNumber: "573134152951",
    messages: {
      es: {
        greeting: "¡Hola! Estoy interesado en sus esmeraldas colombianas.",
        product: (name, price) => `¡Hola! Estoy interesado en: ${name} - Precio: $${price} COP`
      },
      en: {
        greeting: "Hello! I'm interested in your Colombian emeralds.",
        product: (name, price) => `Hello! I'm interested in: ${name} - Price: $${price} COP`
      }
    }
  },
  colors: {
    emeraldDark: "#046A38",
    emeraldLight: "#50C878",
    gold: "#D4AF37",
    white: "#FFFFFF"
  }
};
