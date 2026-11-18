import type { PortalEscolar } from '~/types/portal'

export const portalesEscolares: PortalEscolar[] = [
  {
    id: 'control-escolar',
    titulo: 'Control Escolar (ServoEscolar Web)',
    subtitulo: 'Gestión y Seguimiento Académico Oficial',
    descripcion: 'Consulta de calificaciones bimestrales, boletas de evaluación, registro de asistencias, circulares escolares y avisos oficiales para madres, padres y tutores.',
    categoria: 'Administración y Boletas',
    badge: 'ServoEscolar Web',
    url: 'https://colegiofraymotolinia.servoescolar.mx/',
    imagen: '/images/portales/control-escolar.jpg',
    imagenAlt: 'Portal oficial de Control Escolar del Colegio Fray Toribio de Benavente',
    textoEnlace: 'Ingresar a Control Escolar',
    indicaciones: [
      'Ingresa con la clave de familia o matrícula asignada por el colegio.',
      'Consulta boletas oficiales y estado de cuenta escolar en cualquier momento.',
      'Soporte y recuperación de accesos directamente en la secretaría escolar.',
    ],
  },
  {
    id: 'suite-amco',
    titulo: 'Sistema de Enseñanza (Suite AMCO)',
    subtitulo: 'Plataforma Digital de Aprendizaje Bilingüe',
    descripcion: 'Espacio virtual interactivo con contenidos académicos digitales, recursos multimedia en inglés y español, proyectos de clase y evaluaciones formativas.',
    categoria: 'Aulas y Metodología',
    badge: 'Suite AMCO Learning',
    url: 'https://suite.amco.me/',
    imagen: '/images/portales/suite-amco.jpg',
    imagenAlt: 'Estudiantes y profesores interactuando en la plataforma digital AMCO',
    textoEnlace: 'Acceder a Suite AMCO',
    indicaciones: [
      'Acceso exclusivo para alumnas, alumnos y cuerpo docente activo.',
      'Consulta de libros interactivos, actividades y tareas en línea.',
      'Accesible desde computadoras, tablets y teléfonos móviles.',
    ],
  },
  {
    id: 'compra-libros',
    titulo: 'Compra de Libros y Materiales AMCO',
    subtitulo: 'Tienda Oficial de Libros y Licencias Digitales',
    descripcion: 'Plataforma oficial para la adquisición segura de paquetes pedagógicos, libros de texto impresos y licencias digitales requeridas para el ciclo escolar.',
    categoria: 'Materiales y Licencias',
    badge: 'Tienda Oficial AMCO',
    url: 'https://compradelibros.amco.me/',
    imagen: '/images/portales/compra-libros.jpg',
    imagenAlt: 'Paquete de libros y licencias educativas AMCO para el ciclo escolar',
    textoEnlace: 'Comprar libros del ciclo',
    indicaciones: [
      'Selecciona el grado escolar correspondiente a tu estudiante.',
      'Pagos seguros con tarjeta bancaria, transferencia o en tiendas autorizadas.',
      'Recibe confirmación y comprobante para seguimiento en el colegio.',
    ],
  },
]

