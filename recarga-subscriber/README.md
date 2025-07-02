# Cloud Function - Procesador de Recargas

Cloud Function que consume mensajes de Pub/Sub y llama al microservicio de registro.

## 🚀 Tecnologías

- Node.js
- Google Cloud Functions

## 🌐 Despliegue recomendado

Cloud Functions (trigger: Pub/Sub)

## 📦 Variables de entorno

- `RECORD_SERVICE_URL`: URL del microservicio en GKE (34.8.133.220).
- `SALDO_SERVICE_URL`: URL del microservicio en GKE (34.54.62.6).

## 🔄 Flujo

1. Recibe evento de Pub/Sub.
2. Hace POST a microservicio de Registro.
