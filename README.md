# 🎯 Vocación App

> Orientación vocacional científica y honesta para jóvenes mexicanos — con datos reales del mercado laboral.

[![React Native](https://img.shields.io/badge/React_Native-Expo-blue?style=flat-square)](https://expo.dev)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Android-brightgreen?style=flat-square)](https://play.google.com)

---

## ¿Qué es esto?

La orientación vocacional en México es prácticamente inexistente o genérica. Miles de jóvenes toman la decisión más importante de su vida —elegir carrera— sin información real, sin metodología y sin considerar el mercado laboral actual.

**Vocación App** resuelve eso. Es una herramienta gratuita, honesta y basada en evidencia científica que ayuda a los jóvenes mexicanos a descubrir su perfil vocacional, entender sus fortalezas reales y tomar decisiones informadas con datos del mercado laboral mexicano.

No humo. No respuestas genéricas. No "deberías ser médico o abogado".

---

## ¿Qué incluye?

### 3 Tests basados en metodologías científicas

- **Holland RIASEC** — El estándar de oro mundial para orientación vocacional. 24 preguntas que generan un código de 6 tipos de personalidad profesional (Realista, Investigativo, Artístico, Social, Emprendedor, Convencional).
- **Inteligencias Múltiples de Gardner** — 16 preguntas que identifican los 8 tipos de inteligencia naturales de la persona.
- **Valores Profesionales** — 10 preguntas sobre lo que realmente importa en una vida de trabajo.

### Análisis con datos reales del mercado mexicano

- Salarios reales junior y senior en MXN (fuente: IMSS, INEGI, OCC Mundial 2024)
- Nivel de demanda laboral y saturación del mercado por carrera
- Posibilidad de trabajo remoto e ingresos en USD
- Opciones de estudio incluyendo universidades públicas gratuitas (UNAM, IPN, UAM)
- **Advertencias honestas**: si una carrera está saturada o tiene mal mercado, lo dice directo

### Análisis de IA personalizado

Integración con Claude (Anthropic) que cruza el perfil completo de la persona con el contexto del mercado mexicano real. El análisis es honesto, no solo motivacional — porque la verdad útil vale más que el halago vacío.

### Modelo de acceso

| Plan | Precio | Descripción |
|------|--------|-------------|
| 🆓 Holland básico | Gratis | Test completo + resultados |
| ⭐ Análisis completo | $25 MXN | Los 3 tests + IA + datos de mercado |
| 🏫 Escuela pública | Gratis | Siempre. La educación es un derecho. |
| 🏫 Escuela privada | $299 MXN | Hasta 40 alumnos + reporte grupal |

> Si no puedes pagar, hay un botón "no puedo pagar ahorita" que da acceso completo de todas formas. Las escuelas privadas subsidian a las públicas.

---

## Stack tecnológico

- **React Native** con Expo SDK 54
- **React Navigation** para navegación entre pantallas
- **Expo Linear Gradient, Haptics, SafeAreaContext**
- **Claude API** (Anthropic) para análisis vocacional con IA
- Toda la lógica de tests y scores corre **localmente en el celular** — sin servidores propios

---

## Estructura del proyecto

```
VocacionApp/
├── App.js                          # Navegación principal
├── app.json                        # Configuración Expo
├── eas.json                        # Configuración para build APK
├── src/
│   ├── config.js                   # API key y configuración
│   ├── screens/
│   │   ├── HomeScreen.js           # Pantalla de inicio
│   │   ├── TestHollandScreen.js    # Test Holland RIASEC (24 preguntas)
│   │   ├── BasicResultsScreen.js   # Resultados + paywall
│   │   ├── PlansScreen.js          # Planes de acceso
│   │   ├── PaymentScreen.js        # Checkout (Tarjeta/OXXO/SPEI)
│   │   └── PremiumAnalysisScreen.js # Tests + análisis IA completo
│   ├── components/
│   │   └── UI.js                   # Componentes reutilizables
│   ├── data/
│   │   ├── tests.js                # Preguntas y metadatos de los 3 tests
│   │   └── mexicanCareers.js       # Base de datos de carreras con mercado MX
│   └── utils/
│       ├── scores.js               # Algoritmos de cálculo de resultados
│       └── theme.js                # Colores y estilos globales
└── assets/                         # Íconos y splash screen
```

---

## Cómo correrlo localmente

### Requisitos
- Node.js 18+
- Expo Go instalado en tu celular Android
- Cuenta en [Expo](https://expo.dev) (gratis)

### Instalación

```bash
git clone https://github.com/TrinityBerserker/vocacion-app.git
cd vocacion-app
npm install
```

### Configurar API key

Abre `src/config.js` y agrega tu API key de [Anthropic](https://console.anthropic.com):

```js
export const ANTHROPIC_API_KEY = 'sk-ant-api03-...';
```

### Correr

```bash
npx expo start --tunnel --clear
```

Escanea el QR con Expo Go en tu celular.

---

## Publicar en Google Play

```bash
# Instalar EAS CLI
npm install -g eas-cli
eas login

# Build APK para pruebas
eas build --platform android --profile preview

# Build AAB para Google Play
eas build --platform android --profile production
```

Ver guía completa en [PUBLICAR.md](PUBLICAR.md).

---

## Contribuir

Las contribuciones son bienvenidas. Especialmente:

- Más carreras en la base de datos `mexicanCareers.js`
- Traducción al inglés para comunidades latinas en EUA
- Integración real con Conekta para pagos
- Módulo de seguimiento vocacional a 4-12 semanas
- Versión web

---

## Filosofía

Esta app existe porque la orientación vocacional es un derecho, no un producto de lujo. Está diseñada para ser accesible para cualquier joven en México, independientemente de su situación económica.

El objetivo no es solo ser un negocio — es cambiar cómo los jóvenes mexicanos toman la decisión más importante de su vida.

---

## Licencia

MIT — úsala, modifícala, mejórala.

---

*Hecho en México 🇲🇽*



---

## 📊 Estado actual del proyecto

**Última actualización:** 19 Mar 2026

### ✅ Hecho y funcionando
- 3 tests completos (Holland RIASEC, Gardner, Valores Profesionales)
- Resultados visuales con barras de colores y código Holland
- Base de datos de carreras mexicanas con salarios reales
- IA conectada con Claude API — análisis honesto funcionando
- Modo Beta sin pagos activo
- Honor system — "no puedo pagar" da acceso completo
- Precio: $25 MXN individual, escuelas públicas gratis, privadas $299 MXN
- GitHub listo para colaborar

### 🔜 En desarrollo
- Pantalla de seguimiento a 4 semanas
- Guardar resultados localmente en el celular

### ⚠️ Pendientes antes de publicar
- API key moverla a backend
- Integrar Conekta para pagos reales
- Política de privacidad
- Build APK con EAS
- Subir a Google Play ($25 USD)