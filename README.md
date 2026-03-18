# 🧭 Vocación App — Orientación Vocacional con IA

App móvil de orientación vocacional basada en metodologías científicas: Holland RIASEC, Inteligencias Múltiples de Gardner y Análisis de Valores Profesionales. Monetización por micropagos.

---

## 🚀 Requisitos

- Node.js 18+
- npm o yarn
- Expo CLI: `npm install -g expo-cli`
- Android Studio (para emulador Android) o Expo Go en tu celular

---

## ⚡ Instalación rápida

```bash
# 1. Clona o descomprime el proyecto
cd VocacionApp

# 2. Instala dependencias
npm install

# 3. Inicia Expo
npx expo start

# 4. Opciones para correr:
#    a) Escanea el QR con Expo Go en tu Android/iPhone
#    b) Presiona 'a' para abrir en emulador Android
#    c) Presiona 'i' para abrir en simulador iOS (solo Mac)
```

---

## 📱 Flujo de la app

```
HomeScreen
  │
  ├── TestScreen (Holland RIASEC · 24 preguntas · gratis)
  │     └── BasicResultsScreen (Código Holland + paywall)
  │           └── PlansScreen ($29 / $79 / $299 MXN)
  │                 └── PaymentScreen (Tarjeta · OXXO · SPEI)
  │                       └── PremiumAnalysisScreen
  │                             ├── Test Inteligencias Múltiples (16 preguntas)
  │                             ├── Test Valores Profesionales (10 preguntas)
  │                             └── Análisis IA (Claude API)
  │
  └── PlansScreen (acceso directo desde Home)
```

---

## 💰 Modelo de micropagos

| Plan               | Precio    | USD equiv | Target             |
|--------------------|-----------|-----------|---------------------|
| Orientación Básica | $29 MXN   | ~$1.50    | Individuos básicos  |
| Vocación Total     | $79 MXN   | ~$4.00    | ★ El más vendible   |
| Colegios / Grupos  | $299 MXN  | ~$15.00   | B2B educativo       |

### Proyección de ingresos mensuales
| Usuarios/mes | Plan mix típico | Ingreso estimado |
|-------------|-----------------|------------------|
| 200         | 70% $79, 30% $29| ~$13,000 MXN     |
| 500         | 70% $79, 30% $29| ~$33,000 MXN     |
| 1,000       | idem            | ~$66,000 MXN     |

---

## 🔑 Integraciones necesarias para producción

### 1. Anthropic API (ya incluida)
- Reemplaza la llamada con tu API key del backend
- **Nunca** pongas la API key en la app. Usa un backend intermediario:
  ```
  App → tu-backend.com/api/analyze → Anthropic API
  ```

### 2. Pasarela de pagos — Conekta (recomendada para México)
```bash
npm install @conekta/conekta-react-native
```
- Soporta: Tarjeta, OXXO, SPEI nativamente
- Integra en `PaymentScreen.js` reemplazando la simulación
- Dashboard: https://dashboard.conekta.com

### 3. Alternativas de pago
- **Stripe** — internacional, tiene OXXO via Checkout
- **Mercado Pago** — muy conocido en LATAM
- **OpenPay** — 100% mexicano, buenas comisiones

---

## 📦 Generar APK para Android

```bash
# Instala EAS CLI
npm install -g eas-cli

# Login en Expo
eas login

# Configura el proyecto
eas build:configure

# Build APK (para testing)
eas build --platform android --profile preview

# Build AAB (para Google Play Store)
eas build --platform android --profile production
```

---

## 🏪 Publicar en Google Play Store

1. Crea cuenta de desarrollador en play.google.com/console ($25 USD único)
2. Genera el AAB con `eas build`
3. Sube a Play Console → Versión interna → testing → producción
4. Precio en Play: GRATIS (con compras in-app) o cobrar directamente

### Monetización en Google Play
Para cobros in-app integra:
```bash
npx expo install expo-in-app-purchases
# o
npm install react-native-iap
```

---

## 🗂️ Estructura del proyecto

```
VocacionApp/
├── App.js                    # Navegación principal
├── app.json                  # Config Expo
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js         # Pantalla de bienvenida
│   │   ├── TestScreen.js         # Test genérico (reutilizable)
│   │   ├── BasicResultsScreen.js # Resultados Holland + paywall
│   │   ├── PlansScreen.js        # Planes de precio
│   │   ├── PaymentScreen.js      # Checkout (Tarjeta/OXXO/SPEI)
│   │   └── PremiumAnalysisScreen.js # Tests premium + IA
│   ├── components/
│   │   └── UI.js                 # Componentes reutilizables
│   ├── data/
│   │   └── tests.js              # Preguntas y metadatos
│   └── utils/
│       ├── theme.js              # Colores y estilos globales
│       └── scores.js             # Cálculo de puntajes + prompt IA
```

---

## 🔒 Consideraciones de seguridad

- Nunca incluyas API keys en el código del cliente
- Usa un backend (Node.js/FastAPI/Supabase Edge Functions) para las llamadas a Anthropic
- Los pagos con Conekta/Stripe se tokenizan del lado del cliente, nunca pasan por tu servidor
- Para datos de usuarios usa Firebase Auth o Supabase

---

## 📈 Roadmap sugerido

- [ ] **v1.0** — MVP actual: 3 tests + análisis IA + micropagos
- [ ] **v1.1** — Autenticación con email (Supabase/Firebase)
- [ ] **v1.2** — Historial de resultados y comparativa
- [ ] **v1.3** — Push notifications para recordar completar el test
- [ ] **v2.0** — Dashboard para orientadores y colegios
- [ ] **v2.1** — Versión iOS en App Store
- [ ] **v3.0** — Comunidad y matching con oportunidades educativas

---

Desarrollado con ❤️ · Stack: React Native + Expo + Claude API
# vocacion-app
