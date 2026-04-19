# Documento de Requisitos

## Introducción

Sitio web profesional para la venta de esmeraldas colombianas, dirigido a compradores internacionales. La plataforma será construida con React JS y ofrecerá una experiencia bilingüe (español e inglés) con un diseño atractivo y elegante. Los precios se mostrarán en Pesos Colombianos (COP) y el proceso de compra se realizará a través de WhatsApp, conectando directamente al comprador con el vendedor.

## Glosario

- **Sitio_Web**: La aplicación web construida con React JS para la venta de esmeraldas colombianas
- **Catálogo**: Sección del Sitio_Web que muestra la colección de esmeraldas disponibles para la venta
- **Tarjeta_Producto**: Componente visual que muestra la información de una esmeralda individual, incluyendo imagen, nombre, descripción y precio
- **Selector_Idioma**: Componente de la interfaz que permite al usuario cambiar entre los idiomas español e inglés
- **Botón_Comprar**: Botón de acción en cada Tarjeta_Producto que redirige al usuario a WhatsApp para contactar al vendedor
- **Banner**: Imagen destacada de gran tamaño utilizada en secciones principales del Sitio_Web para atraer la atención del visitante
- **Visitante**: Persona que accede al Sitio_Web para explorar y potencialmente comprar esmeraldas
- **Vendedor**: Propietario del negocio que recibe los mensajes de WhatsApp y gestiona las ventas
- **Galería**: Sección que muestra múltiples imágenes de una esmeralda desde diferentes ángulos
- **COP**: Peso Colombiano, moneda oficial de Colombia utilizada para mostrar los precios

## Requisitos

### Requisito 1: Navegación y Estructura General del Sitio

**Historia de Usuario:** Como Visitante, quiero navegar por un sitio web profesional y bien estructurado, para que pueda explorar las esmeraldas colombianas con confianza y facilidad.

#### Criterios de Aceptación

1. THE Sitio_Web SHALL presentar una barra de navegación fija en la parte superior con el logotipo del negocio, enlaces a las secciones principales (Inicio, Catálogo, Nosotros, Contacto) y el Selector_Idioma
2. THE Sitio_Web SHALL mostrar una sección de inicio (hero) con un Banner principal que incluya un título destacado, un subtítulo descriptivo y un botón de llamada a la acción que dirija al Catálogo
3. THE Sitio_Web SHALL incluir una sección "Nosotros" que describa la historia del negocio, el origen de las esmeraldas y la propuesta de valor para compradores internacionales
4. THE Sitio_Web SHALL mostrar un pie de página con información de contacto, enlaces a redes sociales y un aviso de derechos reservados
5. THE Sitio_Web SHALL utilizar un diseño responsivo que se adapte correctamente a dispositivos móviles (320px), tabletas (768px) y escritorio (1024px o superior)

### Requisito 2: Soporte Bilingüe

**Historia de Usuario:** Como Visitante internacional, quiero poder cambiar el idioma del sitio entre español e inglés, para que pueda entender toda la información sobre las esmeraldas en mi idioma preferido.

#### Criterios de Aceptación

1. THE Selector_Idioma SHALL estar visible en la barra de navegación y permitir alternar entre español e inglés
2. WHEN el Visitante selecciona un idioma en el Selector_Idioma, THE Sitio_Web SHALL traducir todo el contenido estático (títulos, descripciones, etiquetas de botones, menús de navegación) al idioma seleccionado
3. THE Sitio_Web SHALL cargar en español como idioma predeterminado
4. WHEN el Visitante cambia el idioma, THE Sitio_Web SHALL conservar la selección de idioma durante toda la sesión de navegación sin requerir recarga de página
5. THE Sitio_Web SHALL mostrar los nombres y descripciones de los productos en el idioma seleccionado por el Visitante

### Requisito 3: Catálogo de Esmeraldas

**Historia de Usuario:** Como Visitante, quiero ver un catálogo organizado de esmeraldas con imágenes de alta calidad y detalles del producto, para que pueda evaluar las opciones disponibles antes de contactar al vendedor.

#### Criterios de Aceptación

1. THE Catálogo SHALL mostrar las esmeraldas disponibles en una cuadrícula de Tarjetas_Producto organizadas de forma visualmente atractiva
2. THE Tarjeta_Producto SHALL mostrar una imagen principal de la esmeralda, el nombre del producto, una descripción breve, el peso en quilates, el precio en COP y el Botón_Comprar
3. THE Tarjeta_Producto SHALL mostrar el precio formateado con el símbolo "$", separadores de miles con punto y el sufijo "COP" (ejemplo: $2.500.000 COP)
4. WHEN el Visitante pasa el cursor sobre una Tarjeta_Producto, THE Tarjeta_Producto SHALL aplicar un efecto visual de elevación para indicar interactividad
5. WHEN el Visitante hace clic en una Tarjeta_Producto (fuera del Botón_Comprar), THE Sitio_Web SHALL mostrar una vista detallada del producto con la Galería de imágenes, descripción completa, características técnicas (quilates, corte, claridad, origen) y el Botón_Comprar

### Requisito 4: Redirección de Compra a WhatsApp

**Historia de Usuario:** Como Visitante interesado en una esmeralda, quiero poder contactar al vendedor directamente por WhatsApp al presionar el botón de compra, para que pueda hacer preguntas y concretar la compra de forma personal.

#### Criterios de Aceptación

1. WHEN el Visitante hace clic en el Botón_Comprar de una Tarjeta_Producto, THE Sitio_Web SHALL abrir una nueva pestaña del navegador con un enlace a la API de WhatsApp (https://wa.me/) dirigido al número del Vendedor
2. WHEN el Visitante hace clic en el Botón_Comprar, THE Sitio_Web SHALL incluir un mensaje predefinido en el enlace de WhatsApp que contenga el nombre del producto y el precio en COP
3. THE Botón_Comprar SHALL mostrar el texto "Comprar por WhatsApp" en español o "Buy via WhatsApp" en inglés, según el idioma seleccionado
4. THE Botón_Comprar SHALL incluir el ícono de WhatsApp junto al texto para facilitar el reconocimiento visual
5. THE Sitio_Web SHALL configurar el número de WhatsApp del Vendedor en un archivo de configuración centralizado para facilitar su actualización

### Requisito 5: Gestión de Imágenes del Producto

**Historia de Usuario:** Como Vendedor, quiero tener una estructura clara para agregar imágenes de mis esmeraldas y banners del sitio, para que pueda mantener el catálogo actualizado con fotografías profesionales.

#### Criterios de Aceptación

1. THE Sitio_Web SHALL organizar las imágenes en la siguiente estructura de carpetas: `public/images/products/` para fotos de esmeraldas, `public/images/banners/` para imágenes de Banner y `public/images/icons/` para íconos y logotipo
2. THE Sitio_Web SHALL mostrar una imagen de marcador de posición (placeholder) con un diseño elegante cuando la imagen de un producto no esté disponible
3. THE Tarjeta_Producto SHALL mostrar la imagen principal del producto con una relación de aspecto consistente sin distorsión
4. THE Galería SHALL permitir al Visitante ver múltiples imágenes de una esmeralda navegando entre ellas con controles de anterior y siguiente
5. THE Sitio_Web SHALL utilizar carga diferida (lazy loading) para las imágenes del Catálogo con el fin de optimizar el rendimiento de carga de la página

### Requisito 6: Diseño Visual Profesional

**Historia de Usuario:** Como Visitante internacional, quiero que el sitio web tenga un diseño elegante y profesional que transmita confianza y exclusividad, para que me sienta seguro al considerar una compra de esmeraldas.

#### Criterios de Aceptación

1. THE Sitio_Web SHALL utilizar una paleta de colores basada en tonos de verde esmeralda (#046A38, #50C878), dorado (#D4AF37) y blanco (#FFFFFF) como colores principales
2. THE Sitio_Web SHALL utilizar tipografías profesionales con serifa para títulos y sin serifa para texto de cuerpo, cargadas desde Google Fonts
3. THE Sitio_Web SHALL incluir animaciones sutiles de entrada al hacer scroll (scroll animations) en las secciones principales para mejorar la experiencia visual
4. THE Sitio_Web SHALL mantener un espaciado consistente entre secciones y componentes siguiendo un sistema de espaciado de 8px como unidad base
5. WHILE el Sitio_Web se muestra en un dispositivo móvil, THE Sitio_Web SHALL adaptar la cuadrícula del Catálogo a una sola columna y el menú de navegación a un menú tipo hamburguesa

### Requisito 7: Sección de Contacto

**Historia de Usuario:** Como Visitante, quiero tener acceso a información de contacto del vendedor y un enlace directo a WhatsApp, para que pueda comunicarme fácilmente para consultas generales sobre las esmeraldas.

#### Criterios de Aceptación

1. THE Sitio_Web SHALL mostrar una sección de contacto con un enlace directo a WhatsApp, correo electrónico del Vendedor y ubicación general (Colombia)
2. WHEN el Visitante hace clic en el enlace de WhatsApp de la sección de contacto, THE Sitio_Web SHALL abrir WhatsApp con un mensaje genérico de saludo predefinido en el idioma seleccionado
3. THE Sitio_Web SHALL mostrar un botón flotante de WhatsApp visible en todas las páginas que permita al Visitante contactar al Vendedor en cualquier momento
4. WHEN el Visitante hace clic en el botón flotante de WhatsApp, THE Sitio_Web SHALL abrir WhatsApp con un mensaje de saludo genérico en el idioma seleccionado por el Visitante

### Requisito 8: Rendimiento y Optimización

**Historia de Usuario:** Como Visitante, quiero que el sitio web cargue rápidamente y funcione sin problemas, para que pueda explorar las esmeraldas sin interrupciones ni tiempos de espera prolongados.

#### Criterios de Aceptación

1. THE Sitio_Web SHALL renderizar el contenido visible inicial (above the fold) en menos de 3 segundos en una conexión de 4G estándar
2. THE Sitio_Web SHALL implementar división de código (code splitting) por rutas para reducir el tamaño del paquete inicial de JavaScript
3. THE Sitio_Web SHALL optimizar las imágenes del Catálogo utilizando formatos modernos (WebP) con respaldo a JPEG para navegadores no compatibles
4. IF el Sitio_Web no puede cargar una imagen de producto, THEN THE Sitio_Web SHALL mostrar la imagen de marcador de posición sin afectar la disposición visual de la página
