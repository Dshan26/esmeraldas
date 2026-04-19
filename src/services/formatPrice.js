/**
 * Formatea un precio entero no negativo al formato colombiano COP.
 * @param {number} price - Número entero no negativo
 * @returns {string} Precio formateado, e.g. "$2.500.000 COP"
 */
export function formatPrice(price) {
  const formatted = price.toLocaleString('es-CO', {
    maximumFractionDigits: 0,
    useGrouping: true,
  });
  return `$${formatted} COP`;
}
