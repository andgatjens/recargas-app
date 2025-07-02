# Microservicio Saldo - Plataforma de Recargas

Microservicio que actualiza el saldo actual de los números telefónicos.

## 🚀 Tecnologías

- Node.js + Express / Go / Python
- Firestore SDK

## 🌐 Despliegue recomendado

GKE Autopilot

## 📦 Variables de entorno

- `GOOGLE_PROJECT_ID`: trusty-equinox-459800-k0
- Workload Identity: acceso a Firestore.

## 🔄 Flujo

1. Recibe POST desde el microservicio de registro.
2. Actualiza la colección `saldos`.

## 🔒 Seguridad

- Workload Identity.
