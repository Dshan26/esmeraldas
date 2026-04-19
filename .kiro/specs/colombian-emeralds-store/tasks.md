# Plan de Implementación: Tienda de Esmeraldas Colombianas

## Resumen

Implementación de un sitio web SPA con React + Vite para la venta de esmeraldas colombianas. El plan sigue un enfoque incremental: primero la estructura base y configuración, luego los componentes de UI, después el catálogo y funcionalidad de WhatsApp, y finalmente integración y optimización. Cada tarea construye sobre las anteriores para evitar código huérfano.

## Tareas

- [x] 1. Configurar proyecto base y estructura de archivos
  - [x] 1.1 Inicializar proyecto React con Vite y configurar dependencias
    - Crear proyecto con `npm create vite@latest` usando template React
    - Instalar dependencias: `react-router-dom`, `react-i18next`, `i18next`, `fast-check` (dev), `vitest` (dev), `@testing-library/react` (dev), `@testing-library/jest-dom` (dev), `jsdom` (dev)
    - Configurar `vite.config.js` con soporte para code splitting por rutas
    - Configurar `vitest` en `vite.config.js` con entorno `jsdom`
    - _Requisitos: 8.2_

  - [x] 1.2 Crear estructura de carpetas y archivos de configuración
    - Crear estructura de directorios: `src/components/layout/`, `src/components/product/`, `src/components/ui/`, `src/components/common/`, `src/pages/`, `src/i18n/locales/`, `src/data/`, `src/config/`, `src/services/`, `src/hooks/`, `src/styles/`
    - Crear estructura de imágenes: `public/images/products/`, `public/images/banners/`, `public/images/icons/`
    - Crear `src/config/site.js` con la configuración centralizada del sitio (número WhatsApp, colores, mensajes por idioma)
    - _Requisitos: 4.5, 5.1, 6.1_

  - [x] 1.3 Configurar variables CSS globales y estilos base
    - Crear `src/styles/variables.css` con variables de colores (verde esmeralda #046A38, #50C878, dorado #D4AF37, blanco #FFFFFF), sistema de espaciado base 8px y tipografías
    - Crear `src/styles/global.css` con estilos globales, importación de Google Fonts (serifa para títulos, sans-serif para cuerpo) y reset CSS
    - _Requisitos: 6.1, 6.2, 6.4_

- [x] 2. Implementar sistema de internacionalización (i18n)
  - [x] 2.1 Configurar react-i18next y archivos de traducción
    - Crear `src/i18n/i18n.js` con configuración de i18next, idioma predeterminado español, sin recarga de página al cambiar idioma
    - Crear `src/i18n/locales/es.json` con todas las traducciones en español (nav, hero, product, contact, footer, about, errors)
    - Crear `src/i18n/locales/en.json` con todas las traducciones en inglés correspondientes
    - Integrar el provider de i18n en `src/main.jsx`
    - _Requisitos: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 2.2 Escribir prueba de propiedad para completitud de traducciones
    - **Propiedad 1: Completitud de traducciones**
    - Verificar que para cualquier clave en es.json existe una clave correspondiente en en.json y viceversa, ambas con valores no vacíos
    - **Valida: Requisito 2.2**

- [x] 3. Implementar servicios utilitarios
  - [x] 3.1 Implementar servicio de formateo de precios
    - Crear `src/services/formatPrice.js` que reciba un número entero no negativo y retorne string con formato "$X.XXX.XXX COP" (prefijo "$", separador de miles con punto, sufijo " COP")
    - _Requisitos: 3.3_

  - [ ]* 3.2 Escribir prueba de propiedad para formateo de precios
    - **Propiedad 4: Formateo de precios en COP (round-trip)**
    - Para cualquier entero no negativo, formatear y luego parsear de vuelta debe devolver el número original
    - **Valida: Requisito 3.3**

  - [x] 3.3 Implementar servicio de generación de enlaces WhatsApp
    - Crear `src/services/whatsapp.js` con funciones para generar URL de WhatsApp (`https://wa.me/{phone}?text={encodedMessage}`)
    - Implementar función para mensaje de producto (nombre + precio) y mensaje de saludo genérico por idioma
    - Validar formato del número de teléfono antes de construir la URL
    - _Requisitos: 4.1, 4.2, 7.2, 7.4_

  - [ ]* 3.4 Escribir prueba de propiedad para enlace WhatsApp con info de producto
    - **Propiedad 5: Generación de enlace WhatsApp con información del producto**
    - Para cualquier nombre de producto y precio, la URL generada debe comenzar con `https://wa.me/`, contener el número configurado, y el parámetro `text` decodificado debe contener nombre y precio
    - **Valida: Requisitos 4.1, 4.2**

  - [ ]* 3.5 Escribir prueba de propiedad para saludo WhatsApp en idioma correcto
    - **Propiedad 6: Mensaje de saludo WhatsApp en idioma correcto**
    - Para cualquier idioma soportado (es/en), el enlace de contacto general debe contener el mensaje de saludo configurado para ese idioma
    - **Valida: Requisitos 7.2, 7.4**

- [x] 4. Checkpoint - Verificar que la base del proyecto funciona
  - Asegurar que todas las pruebas pasan, preguntar al usuario si surgen dudas.

- [x] 5. Implementar componentes de layout y navegación
  - [x] 5.1 Crear componente Navbar con navegación responsiva
    - Crear `src/components/layout/Navbar.jsx` con barra de navegación fija (sticky) en la parte superior
    - Incluir logotipo, enlaces a secciones (Inicio, Catálogo, Nosotros, Contacto) y LanguageSelector
    - Implementar menú hamburguesa con panel deslizable para dispositivos móviles
    - Usar CSS Modules para estilos con alcance local
    - _Requisitos: 1.1, 6.5_

  - [x] 5.2 Crear componente LanguageSelector
    - Crear `src/components/ui/LanguageSelector.jsx` que muestre botones ES/EN
    - Al hacer clic, cambiar idioma globalmente via i18next sin recarga de página
    - Mantener selección durante toda la sesión de navegación
    - _Requisitos: 2.1, 2.4_

  - [x] 5.3 Crear componente Footer
    - Crear `src/components/layout/Footer.jsx` con información de contacto, enlaces a redes sociales y aviso de derechos reservados
    - Contenido traducible según idioma seleccionado
    - _Requisitos: 1.4_

  - [x] 5.4 Crear componente WhatsAppFloatingButton
    - Crear `src/components/layout/WhatsAppFloatingButton.jsx` con botón flotante fijo en esquina inferior derecha
    - Incluir ícono de WhatsApp con animación sutil de pulso
    - Al hacer clic, abrir wa.me con mensaje de saludo genérico en idioma actual
    - _Requisitos: 7.3, 7.4_

- [x] 6. Implementar componentes de producto y catálogo
  - [x] 6.1 Crear datos de productos y componente LazyImage
    - Crear `src/data/products.json` con datos de ejemplo de esmeraldas (id, imágenes, quilates, precio, corte, claridad, origen, nombre y descripciones bilingües)
    - Crear `src/components/ui/PlaceholderImage.jsx` con diseño elegante para imagen no disponible
    - Crear `src/components/ui/LazyImage.jsx` usando Intersection Observer para carga diferida, elemento `<picture>` con source WebP y respaldo JPEG, transición suave y manejo de error con placeholder
    - Crear `src/hooks/useLazyLoad.js` con hook para Intersection Observer
    - _Requisitos: 5.2, 5.3, 5.5, 8.3, 8.4_

  - [ ]* 6.2 Escribir prueba de propiedad para placeholder ante fallo de imagen
    - **Propiedad 7: Imagen placeholder ante fallo de carga**
    - Para cualquier fuente de imagen que falle, LazyImage debe mostrar placeholder manteniendo las mismas dimensiones del contenedor
    - **Valida: Requisitos 5.2, 8.4**

  - [x] 6.3 Crear componente ProductCard
    - Crear `src/components/product/ProductCard.jsx` que muestre imagen (lazy), nombre, descripción breve, quilates, precio formateado en COP y botón "Comprar por WhatsApp" con ícono
    - Implementar efecto hover de elevación (transform + box-shadow)
    - Clic en tarjeta (fuera del botón) navega a vista detallada
    - Botón de compra abre enlace WhatsApp en nueva pestaña con mensaje predefinido (nombre + precio)
    - Mostrar texto del botón según idioma seleccionado
    - _Requisitos: 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4_

  - [ ]* 6.4 Escribir prueba de propiedad para visualización bilingüe de productos
    - **Propiedad 2: Visualización bilingüe de productos**
    - Para cualquier producto y cualquier idioma soportado, nombre y descripción deben tener valor no vacío
    - **Valida: Requisito 2.5**

  - [ ]* 6.5 Escribir prueba de propiedad para campos requeridos en ProductCard
    - **Propiedad 3: Campos requeridos en Tarjeta de Producto**
    - Para cualquier producto válido, el render de ProductCard debe contener imagen (o placeholder), nombre, descripción, quilates, precio formateado y botón de compra
    - **Valida: Requisito 3.2**

  - [x] 6.6 Crear componente ProductGrid
    - Crear `src/components/product/ProductGrid.jsx` que muestre las esmeraldas en cuadrícula responsiva
    - En escritorio: múltiples columnas; en móvil: una sola columna
    - _Requisitos: 3.1, 6.5_

  - [x] 6.7 Crear componentes ProductGallery y ProductDetails
    - Crear `src/components/product/ProductGallery.jsx` con imagen principal grande, controles anterior/siguiente y miniaturas
    - Crear `src/components/product/ProductDetails.jsx` con descripción completa, características técnicas (quilates, corte, claridad, origen) y botón de compra WhatsApp
    - _Requisitos: 3.5, 5.4_

  - [ ]* 6.8 Escribir prueba de propiedad para navegación de galería ida y vuelta
    - **Propiedad 8: Navegación de galería ida y vuelta**
    - Para cualquier arreglo de imágenes con longitud > 1, navegar N pasos adelante y N pasos atrás debe retornar al índice original
    - **Valida: Requisito 5.4**

- [x] 7. Checkpoint - Verificar componentes de producto
  - Asegurar que todas las pruebas pasan, preguntar al usuario si surgen dudas.

- [x] 8. Implementar páginas y enrutamiento
  - [x] 8.1 Configurar React Router con lazy loading por rutas
    - Crear `src/App.jsx` con React Router v6, layout compartido (Navbar, Footer, WhatsAppFloatingButton) y rutas con `React.lazy()` + `Suspense` para cada página
    - _Requisitos: 1.1, 8.2_

  - [x] 8.2 Crear página de inicio (HomePage)
    - Crear `src/pages/HomePage.jsx` con HeroBanner (imagen de fondo, título, subtítulo, botón CTA al catálogo) y sección destacada de productos
    - Crear `src/components/ui/HeroBanner.jsx` con tipografía serif y contenido traducible
    - _Requisitos: 1.2_

  - [x] 8.3 Crear página de catálogo (CatalogPage)
    - Crear `src/pages/CatalogPage.jsx` que cargue productos desde `products.json` y los muestre usando ProductGrid
    - _Requisitos: 3.1_

  - [x] 8.4 Crear página de detalle de producto (ProductDetailPage)
    - Crear `src/pages/ProductDetailPage.jsx` que obtenga el producto por ID de la URL, muestre ProductGallery y ProductDetails
    - Mostrar mensaje amigable "Producto no encontrado" con enlace al catálogo si el ID no existe
    - _Requisitos: 3.5_

  - [x] 8.5 Crear página Nosotros (AboutPage)
    - Crear `src/pages/AboutPage.jsx` con historia del negocio, origen de las esmeraldas y propuesta de valor para compradores internacionales
    - Contenido traducible según idioma seleccionado
    - _Requisitos: 1.3_

  - [x] 8.6 Crear página de Contacto (ContactPage)
    - Crear `src/pages/ContactPage.jsx` con enlace directo a WhatsApp, correo electrónico del vendedor y ubicación (Colombia)
    - Al hacer clic en enlace WhatsApp, abrir con mensaje de saludo en idioma seleccionado
    - _Requisitos: 7.1, 7.2_

- [x] 9. Implementar animaciones y pulido visual
  - [x] 9.1 Crear componente ScrollAnimation y aplicar animaciones
    - Crear `src/components/common/ScrollAnimation.jsx` usando Intersection Observer para detectar entrada en viewport
    - Soportar animaciones: fadeIn, slideUp, slideLeft con delay configurable
    - Aplicar animaciones de entrada en secciones principales de todas las páginas
    - _Requisitos: 6.3_

  - [x] 9.2 Verificar diseño responsivo en todos los breakpoints
    - Asegurar que la cuadrícula del catálogo se adapta a 1 columna en móvil (320px), layout intermedio en tableta (768px) y completo en escritorio (1024px+)
    - Verificar menú hamburguesa en móvil y menú completo en escritorio
    - Verificar espaciado consistente con sistema de 8px
    - _Requisitos: 1.5, 6.4, 6.5_

- [x] 10. Checkpoint final - Verificar integración completa
  - Asegurar que todas las pruebas pasan, preguntar al usuario si surgen dudas.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Las pruebas de propiedad validan propiedades universales de correctitud definidas en el diseño
- Las pruebas unitarias validan ejemplos específicos y casos borde
- El catálogo usa datos estáticos en JSON, sin necesidad de backend
