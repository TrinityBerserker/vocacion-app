# 🎯 Vocación App

> Orientación vocacional científica y honesta para jóvenes mexicanos — con datos reales del mercado laboral.

[![React Native](https://img.shields.io/badge/React_Native-Expo-20232A?style=for-the-badge&logo=react)](https://expo.dev)
[![Anthropic](https://img.shields.io/badge/IA-Claude_API-D97706?style=for-the-badge)](https://anthropic.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android)](https://play.google.com)
[![Made in Mexico](https://img.shields.io/badge/Hecho_en-México_🇲🇽-006847?style=for-the-badge)](https://github.com/TrinityBerserker)

> 🚀 Un proyecto de **[Uthopia Corsair](https://github.com/TrinityBerserker)**

---

## 🧭 ¿Qué es esto?

La orientación vocacional en México es prácticamente inexistente o genérica. Miles de jóvenes toman la decisión más importante de su vida —elegir carrera— sin información real, sin metodología y sin considerar el mercado laboral actual.

**Vocación App** resuelve eso. Es una herramienta gratuita, honesta y basada en evidencia científica que ayuda a los jóvenes mexicanos a descubrir su perfil vocacional, entender sus fortalezas reales y tomar decisiones informadas con datos del mercado laboral mexicano.

> ❌ No humo. ❌ No respuestas genéricas. ❌ No "deberías ser médico o abogado".

---

## 🔬 ¿Qué incluye?

### 📋 3 Tests basados en metodologías científicas

| Test | Preguntas | Descripción |
|------|-----------|-------------|
| 🧭 **Holland RIASEC** | 24 | Estándar de oro mundial. Genera tu código vocacional de 6 tipos. |
| 🧠 **Inteligencias Múltiples de Gardner** | 16 | Identifica tus 8 tipos de inteligencia naturales. |
| 💚 **Valores Profesionales** | 10 | Lo que realmente importa en tu vida de trabajo. |

### 📊 Datos reales del mercado mexicano

- 💰 Salarios reales junior y senior en MXN (IMSS, INEGI, OCC Mundial 2024)
- 📈 Nivel de demanda laboral y saturación del mercado por carrera
- 🌐 Posibilidad de trabajo remoto e ingresos en USD
- 🏫 Opciones de estudio incluyendo UNAM, IPN, UAM (gratuitas)
- ⚠️ **Advertencias honestas**: si una carrera está saturada, lo dice directo

### 🤖 Análisis de IA personalizado

Integración con Claude (Anthropic) que cruza tu perfil completo con el contexto del mercado mexicano real. Honesto, no solo motivacional — porque la verdad útil vale más que el halago vacío.

---

## 💳 Modelo de acceso

| Plan | Precio | Descripción |
|------|--------|-------------|
| 🆓 Holland básico | **Gratis** | Test completo + resultados |
| ⭐ Análisis completo | **$25 MXN** | Los 3 tests + IA + datos de mercado |
| 🏫 Escuela pública | **Gratis** | Siempre. La educación es un derecho. |
| 🏫 Escuela privada | **$299 MXN** | Hasta 40 alumnos + reporte grupal |

> 💛 Si no puedes pagar, hay un botón **"no puedo pagar ahorita"** que da acceso completo de todas formas. Las escuelas privadas subsidian a las públicas.

---

## 🗺️ Flujo de la app

```
🏠 HomeScreen
  │
  ├── 📋 TestHollandScreen (24 preguntas · gratis)
  │     └── 📊 BasicResultsScreen (Código Holland + paywall)
  │           ├── 💳 PaymentScreen ($25 MXN · Tarjeta · OXXO · SPEI)
  │           │     └── 🎯 PremiumAnalysisScreen
  │           │           ├── 🧠 Test Inteligencias Múltiples
  │           │           ├── 💚 Test Valores Profesionales
  │           │           └── 🤖 Análisis IA con mercado mexicano real
  │           └── 💛 "No puedo pagar" → 🎯 PremiumAnalysisScreen
  │
  └── 📑 PlansScreen (acceso directo desde Home)
```

---

## ⚙️ Stack tecnológico

| Tecnología | Uso |
|------------|-----|
| ⚛️ React Native + Expo SDK 54 | Base de la app |
| 🧭 React Navigation | Navegación entre pantallas |
| 🤖 Claude API (Anthropic) | Análisis vocacional con IA |
| 🎨 Expo Linear Gradient + Haptics | UI y experiencia |
| 📱 Expo SafeAreaContext | Compatibilidad de pantallas |

> 💡 Toda la lógica de tests y scores corre **localmente en el celular** — sin servidores propios.

---

## 🗂️ Estructura del proyecto

```
VocacionApp/
├── 📄 App.js                           # Navegación principal
├── 📄 app.json                         # Configuración Expo
├── 📄 eas.json                         # Configuración para build APK
├── 📄 PUBLICAR.md                      # Guía paso a paso para Google Play
├── 📁 src/
│   ├── 📄 config.js                    # API key y configuración
│   ├── 📁 screens/
│   │   ├── 🏠 HomeScreen.js            # Pantalla de inicio
│   │   ├── 📋 TestHollandScreen.js     # Test Holland RIASEC
│   │   ├── 📊 BasicResultsScreen.js    # Resultados + paywall
│   │   ├── 💳 PaymentScreen.js         # Checkout (Tarjeta/OXXO/SPEI)
│   │   ├── 📑 PlansScreen.js           # Planes de acceso
│   │   └── 🎯 PremiumAnalysisScreen.js # Tests premium + análisis IA
│   ├── 📁 components/
│   │   └── 🎨 UI.js                    # Componentes reutilizables
│   ├── 📁 data/
│   │   ├── 📄 tests.js                 # Preguntas y metadatos
│   │   └── 🇲🇽 mexicanCareers.js       # Carreras con mercado MX real
│   └── 📁 utils/
│       ├── 📄 scores.js                # Algoritmos de resultados
│       └── 🎨 theme.js                 # Colores y estilos globales
└── 📁 assets/                          # Íconos y splash screen
```

---

## 🚀 Instalación y uso

### 📋 Requisitos

- ✅ Node.js 18+
- ✅ Expo Go en tu celular Android
- ✅ Cuenta en [Expo](https://expo.dev) (gratis)

### ⬇️ Clonar e instalar

```bash
git clone https://github.com/TrinityBerserker/vocacion-app.git
cd vocacion-app
npm install
```

### 🔑 Configurar API key

Abre `src/config.js` y agrega tu API key de [Anthropic](https://console.anthropic.com):

```js
export const ANTHROPIC_API_KEY = 'sk-ant-api03-...';
```

### ▶️ Correr en desarrollo

```bash
npx expo start --tunnel --clear
```

Escanea el QR con Expo Go en tu celular Android.

---

## 💰 Integraciones para producción

### 💳 Pagos — Conekta (recomendada para México)

```bash
npm install @conekta/conekta-react-native
```

Soporta tarjeta, OXXO y SPEI nativamente. Integra en `PaymentScreen.js`.
- 🔗 Dashboard: https://dashboard.conekta.com
- Alternativas: **Stripe**, **Mercado Pago**, **OpenPay**

### 🔒 API de IA — Backend recomendado

```
📱 App → 🖥️ tu-backend.com/api/analyze → 🤖 Anthropic API
```

Opciones gratuitas: Railway, Render, Supabase Edge Functions.

---

## 📦 Publicar en Google Play

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview    # APK para pruebas
eas build --platform android --profile production  # AAB para Play Store
```

Ver guía completa en [PUBLICAR.md](PUBLICAR.md). Costo de cuenta: **$25 USD único**.

---

## 📈 Proyección de ingresos

| 👥 Usuarios pagando/mes | 💰 Ingreso estimado |
|------------------------|-------------------|
| 100 | ~$2,500 MXN |
| 500 | ~$12,500 MXN |
| 1,000 | ~$25,000 MXN |
| 1 escuela privada | +$299 MXN |

> 💡 Costo de API por análisis: ~$0.003 USD — prácticamente cero.

---

## 🗺️ Roadmap

- [x] ✅ MVP: 3 tests + análisis IA + datos mercado mexicano
- [x] ✅ Honor system (acceso sin pago para quien no puede)
- [x] ✅ Escuelas públicas gratis, privadas $299 MXN
- [ ] 🔜 Integración real con Conekta
- [ ] 🔜 Autenticación con email
- [ ] 🔜 Historial de resultados
- [ ] 🔜 Seguimiento vocacional a 4-12 semanas
- [ ] 🔜 Dashboard para orientadores y colegios
- [ ] 🔜 Versión iOS
- [ ] 🔜 Versión web

---

## 🤝 Contribuir

Las contribuciones son bienvenidas:

- 🇲🇽 Más carreras en `mexicanCareers.js` con datos actualizados
- 🌎 Traducción al inglés para comunidades latinas en EUA
- 💳 Integración real con Conekta
- 📅 Módulo de seguimiento vocacional
- 🌐 Versión web con Next.js

---

## 💡 Filosofía

Esta app existe porque la orientación vocacional es un derecho, no un producto de lujo. Está diseñada para ser accesible para cualquier joven en México, independientemente de su situación económica.

El objetivo no es solo ser un negocio — es cambiar cómo los jóvenes mexicanos toman la decisión más importante de su vida.

---

## 🔒 Seguridad

- ⚠️ Nunca incluyas API keys en el cliente en producción
- ✅ Los pagos con Conekta/Stripe se tokenizan del lado del cliente
- ✅ Para datos de usuarios usa Firebase Auth o Supabase

---

## 📄 Licencia

MIT — úsala, modifícala, mejórala.

---


**🚀 Un proyecto de [Uthopia Corsair](https://github.com/TrinityBerserker)**

*Hecho en México 🇲🇽 · React Native + Expo + Claude API*
