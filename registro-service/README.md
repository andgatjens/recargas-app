# Microservicio Registro - Plataforma de Recargas

Microservicio que registra las recargas como transacciones en Firestore.

## 🚀 Tecnologías

- Node.js + Express / Go / Java
- Firestore SDK

## 🌐 Despliegue recomendado

GKE Autopilot

## 📦 Variables de entorno

- `GOOGLE_PROJECT_ID`: trusty-equinox-459800-k0
- Workload Identity: acceso a Firestore.

## 🔄 Flujo

1. Recibe POST desde la Cloud Function.
2. Guarda recarga en colección `recargas`.
3. Llama al microservicio de saldo.

## 🔒 Seguridad

- Workload Identity.
