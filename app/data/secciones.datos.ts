import type { PaginaSeccion } from '~/types/seccion'

export const DATOS_SECCIONES: Record<string, PaginaSeccion> = {
  'el-colegio': {
    nav: 'El colegio',
    eyebrow: 'CONÓCENOS',
    title: 'Una comunidad que acompaña.',
    lead: 'Conoce quiénes somos, la identidad que nos inspira y la trayectoria del Colegio Fray Toribio de Benavente en la formación de jóvenes.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Instalaciones y campus del Colegio Fray Toribio de Benavente',
    cards: [
      {
        title: 'Quiénes somos',
        text: 'Institución de educación secundaria general en Xicohtzinco, Tlaxcala, comprometida con el desarrollo intelectual, emocional y social de cada estudiante.',
        icon: 'i-lucide-school',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
        badge: 'Identidad Institucional',
      },
      {
        title: 'Misión y valores',
        text: 'Guiamos a las y los adolescentes en valores como el respeto, la responsabilidad, la solidaridad y el amor por el conocimiento continuo.',
        icon: 'i-lucide-compass',
        image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
        badge: 'Formación Humana',
      },
      {
        title: 'Trayectoria y comunidad',
        text: 'Años consolidando generaciones de egresados preparados para bachillerato con bases sólidas, pensamiento crítico y sentido comunitario.',
        icon: 'i-lucide-landmark',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
        badge: 'Historia',
      },
    ],
    note: 'El mensaje oficial de la Dirección se actualiza al inicio de cada ciclo escolar con las metas de la comunidad educativa.',
  },

  'oferta-educativa': {
    nav: 'Oferta educativa',
    eyebrow: 'SECUNDARIA GENERAL',
    title: 'Aprendizajes para una nueva etapa.',
    lead: 'Un plan curricular avalado por la SEP fortalecido con tecnología, ciencias, idiomas y actividades que potencian el talento estudiantil.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Estudiantes trabajando en equipo en el aula escolar',
    cards: [
      {
        title: 'Enfoque académico integral',
        text: 'Desarrollo en matemáticas, ciencias naturales, español, historia y civismo con metodologías participativas y resolución de problemas.',
        icon: 'i-lucide-book-open',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
        badge: 'Currícula SEP',
      },
      {
        title: 'Tutoría y acompañamiento',
        text: 'Seguimiento cercano con docentes tutores y orientación psicológica para respaldar el bienestar socioemocional del adolescente.',
        icon: 'i-lucide-hand-heart',
        image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
        badge: 'Desarrollo Personal',
      },
      {
        title: 'Talleres formativos y ciencias',
        text: 'Laboratorio de ciencias, computación, habilidades digitales, educación artística y deportes para un aprendizaje integral.',
        icon: 'i-lucide-shapes',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
        badge: 'Talleres Prácticos',
      },
    ],
    note: 'La oferta educativa oficial corresponde al nivel Secundaria General CCT 29PES0084Y en turno matutino.',
  },

  'vida-escolar': {
    nav: 'Vida escolar',
    eyebrow: 'COMUNIDAD ACTIVA',
    title: 'Lo que vivimos en la escuela.',
    lead: 'Eventos cívicos, ferias académicas, proyectos deportivos y momentos compartidos que construyen la memoria de nuestros estudiantes.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Vida escolar y convivencia en el Colegio Fray Toribio',
    cards: [
      {
        title: 'Noticias y convocatorias',
        text: 'Avisos oficiales para familias, inicio de actividades extracurriculares y fechas de evaluaciones trimestrales.',
        icon: 'i-lucide-newspaper',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        badge: 'Avisos',
      },
      {
        title: 'Eventos cívicos y culturales',
        text: 'Feria de ciencias anual, concursos de oratoria, muestras de danza tradicional y ceremonias cívicas escolares.',
        icon: 'i-lucide-calendar-days',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
        badge: 'Eventos',
      },
      {
        title: 'Torneos y vida deportiva',
        text: 'Encuentros intramuros de básquetbol, fútbol y atletismo fomentando el trabajo en equipo y el juego limpio.',
        icon: 'i-lucide-award',
        image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
        badge: 'Deportes',
      },
    ],
    galeria: [
      {
        id: 'g1',
        imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80',
        title: 'Proyectos de Ciencias y Robótica',
        category: 'Académico',
      },
      {
        id: 'g2',
        imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
        title: 'Feria Cultural y Artística',
        category: 'Cultura',
      },
      {
        id: 'g3',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
        title: 'Torneo Deportivo Intramuros',
        category: 'Deportes',
      },
      {
        id: 'g4',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        title: 'Trabajo Colaborativo en Aulas',
        category: 'Comunidad',
      },
      {
        id: 'g5',
        imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
        title: 'Laboratorio de Matemáticas',
        category: 'Académico',
      },
      {
        id: 'g6',
        imageUrl: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80',
        title: 'Convivencia Estudiantil',
        category: 'Comunidad',
      },
    ],
    note: 'Las fotografías corresponden a actividades del ciclo escolar actual con autorización institucional.',
  },

  'admisiones': {
    nav: 'Admisiones',
    eyebrow: 'INGRESO A SECUNDARIA',
    title: 'Da el siguiente paso con información clara.',
    lead: 'Acompañamos a las familias en cada etapa del proceso de inscripción para el ciclo escolar 2026 - 2027.',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Estudiante iniciando su proceso de ingreso a secundaria',
    cards: [
      {
        title: '1. Requisitos de ingreso',
        text: 'Certificado de primaria o boleta de 6° grado, acta de nacimiento reciente, CURP certificada y comprobante de domicilio.',
        icon: 'i-lucide-clipboard-list',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
        badge: 'Paso 1',
      },
      {
        title: '2. Valoración diagnóstica',
        text: 'Sesión diagnóstica pedagógica para conocer el perfil del aspirante e identificar áreas de oportunidad en matemáticas y lectura.',
        icon: 'i-lucide-list-checks',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
        badge: 'Paso 2',
      },
      {
        title: '3. Entrevista familiar',
        text: 'Reunión con Dirección y Orientación para alinear expectativas formativas y presentar los reglamentos de convivencia escolar.',
        icon: 'i-lucide-message-circle-question',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
        badge: 'Paso 3',
      },
    ],
    note: 'Cupos limitados por ciclo escolar para asegurar grupos reducidos y atención personalizada.',
  },

  'contacto': {
    nav: 'Contacto',
    eyebrow: 'ESTAMOS PARA ATENDERTE',
    title: 'Hablemos sobre tu familia.',
    lead: 'Ubicados en Xicohtzinco, Tlaxcala. Te atendemos de forma presencial o por canales digitales para resolver todas tus dudas.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
    imageAlt: 'Recepción y atención a familias en el colegio',
    cards: [
      {
        title: 'Ubicación del plantel',
        text: 'Xicohtzinco, Tlaxcala. C.C.T. 29PES0084Y. Fácil acceso para familias de la región sur del estado.',
        icon: 'i-lucide-map-pin',
        badge: 'Dirección',
      },
      {
        title: 'Horarios de atención',
        text: 'Lunes a viernes de 7:30 a 14:30 hrs. Atención a padres con cita previa o en ventanilla escolar.',
        icon: 'i-lucide-clock',
        badge: 'Horarios',
      },
      {
        title: 'Medios de contacto',
        text: 'Envíanos un mensaje a través del formulario o comunícate vía telefónica y correo institucional.',
        icon: 'i-lucide-mail',
        badge: 'Informes',
      },
    ],
    note: 'Para visitas guiadas a las instalaciones se recomienda agendar previamente.',
  },
}
