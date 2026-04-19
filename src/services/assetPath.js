/**
 * Resolves a public asset path using Vite's base URL.
 * In development: base is "/"
 * In production (GitHub Pages): base is "/esmeraldas/"
 * @param {string} path - Path starting with "/" (e.g. "/images/products/product1.jpeg")
 * @returns {string} Resolved path with base prefix
 */
export function assetPath(path) {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
