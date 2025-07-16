# 📱 Plataforma de Recargas - Examen Práctico GCP

Este proyecto es una solución cloud-native, serverless y basada en microservicios para procesar recargas telefónicas. Fue diseñada bajo los principios de escalabilidad, resiliencia y desacoplamiento utilizando **Google Cloud Platform (GCP)** y aprovechando el nivel gratuito disponible.

Demo: https://trusty-equinox-459800-k0.web.app/

---

## ✅ Arquitectura General

```plaintext
                                                      ┌────────────────────┐
                                                      │  Usuario Final      │
                                                      │ (Navegador Web)     │
                                                      └────────┬───────────┘
                                                               │
                                                HTTPS Request  │
                                                               ▼
                                                  ┌────────────────────┐
                                                  │ Frontend (React)   │
                                                  │ Cloud Run          │
                                                  └────────┬───────────┘
                                                           │
                                               HTTP API    │
                                                           ▼
                                                  ┌────────────────────┐
                                                  │ Backend API        │
                                                  │ Cloud Run          │
                                                  └────────┬───────────┘
                                                           │
                                     Publish to Pub/Sub    │
                                                           ▼
                                                ┌────────────────────┐
                                                │ Pub/Sub Topic       │
                                                └────────┬───────────┘
                                                         │
                                     Event subscription  │
                                                         ▼
                                          ┌────────────────────────┐
                                          │ Cloud Function         │
                                          │ Procesa recarga        │
                                          └────────┬───────────────┘
                                                   │
                                      HTTP Request │
                                                   ▼
                                      ┌─────────────────────────────┐
                                      │ Microservicio Registro      │
                                      │ GKE Autopilot (Pod 1)       │
                                      │ Firestore: "recargas"       │
                                      └────────┬────────────────────┘
                                               │
                                  HTTP Request │
                                               ▼
                                      ┌─────────────────────────────┐
                                      │ Microservicio Saldo         │
                                      │ GKE Autopilot (Pod 2)       │
                                      │ Firestore: "saldos"         │
                                      └─────────────────────────────┘
```

## 🔍 Componentes Principales

| Componente                | Tecnología                           | Descripción                                                     |
| ------------------------- | ------------------------------------ | --------------------------------------------------------------- |
| **Frontend**          | React + Cloud Run / Firebase Hosting | Interfaz para ingresar el número y monto a recargar.            |
| **Backend**           | Node.js + Cloud Run                  | Recibe las solicitudes y publica mensajes en Pub/Sub.           |
| **Mensajería**            | Pub/Sub                              | Canal asincrónico entre el frontend y el procesamiento.         |
| **Procesador**            | Cloud Function                       | Consume Pub/Sub y delega al microservicio de registro.          |
| **Registro Recargas**     | Node.js/Go + GKE + Firestore         | Registra la recarga como transacción.                           |
| **Actualización Saldo**   | Node.js/Go + GKE + Firestore         | Actualiza el saldo del número recargado.                        |
| **Base de Datos**         | Firestore (modo nativo)              | Base de datos NoSQL con dos colecciones (`recargas`, `saldos`). |
| **Autenticación Interna** | Workload Identity                    | Seguridad entre GKE y Firestore.                                |
| **Observabilidad**        | Cloud Logging, Cloud Monitoring      | Logs y métricas.                                                |

## 🚀 Tecnologías Principales

- Google Cloud Run
- Google Cloud Functions
- Google Pub/Sub
- Google Kubernetes Engine (GKE Autopilot)
- Google Firestore
- Workload Identity
- Node.js / Express
- React

## 📁 Estructura del Repositorio

.
├── frontend/                 # Aplicación React
├── backend/                  # Cloud Run - API HTTP que publica en Pub/Sub
├── recarga-subscriber/       # Cloud Function que procesa eventos
├── registro-service/         # Microservicio en GKE que guarda recargas
└── saldo-service/            # Microservicio en GKE que actualiza saldos

## 🔒 Seguridad
Los microservicios en GKE acceden a Firestore usando Workload Identity.

El acceso entre componentes podría autenticarse vía JWTs o API keys internas, pero usando GCP IAM y autenticación de servicio es suficiente para el nivel práctico.

## 📈 Observabilidad
Todos los servicios envían logs automáticamente a Cloud Logging.
Se pueden monitorear métricas básicas en Cloud Monitoring.

### Algunos comandos que me fueron útiles tener a mano

```bash
curl -X POST http://34.8.133.220/record -H "Content-Type: application/json" -d '{"phone":"12345678","amount":1500}'
curl -X POST http://34.54.62.6/updateSaldo -H "Content-Type: application/json" -d '{"phone":"12345678","amount":1500}'

kubectl get pods -l app=registro

kubectl logs -l app=registro

kubectl get ingress

kubectl get pods

kubectl logs -l app=registro

kubectl describe ingress registro-ingress

kubectl exec -it registro-deployment-58f685795f-md4gq -- curl -X POST http://localhost:8080/record -H "Content-Type: application/json" -d '{"phone":"12345678","amount":1500}'

kubectl logs -l app=registro --follow

gcloud builds submit --tag gcr.io/trusty-equinox-459800-k0/saldo-service

gcloud functions deploy processRecarga --runtime=nodejs18 --trigger-topic=recarga-topic --entry-point=processRecarga --region=us-central1 --project=trusty-equinox-459800-k0 --memory=128Mi --timeout=60s

gcloud builds submit --tag gcr.io/trusty-equinox-459800-k0/saldo-service:latest .
kubectl rollout restart deployment saldo-deployment
kubectl apply -f saldo-service.yaml
```
