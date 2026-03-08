# Arquitectura

## Componentes principales

- Aplicacion Node.js + Express
- GitHub como repositorio central
- GitHub Actions para integracion continua
- SonarQube Cloud para analisis estatico
- Snyk para analisis de vulnerabilidades
- Jenkins para entrega continua
- Docker Hub como registro de imagenes
- Kubernetes local para despliegue
- Prometheus y Grafana para monitoreo

## Relacion entre componentes

1. El desarrollador realiza cambios y los publica en GitHub.
2. GitHub Actions ejecuta CI, pruebas y validaciones de seguridad/calidad.
3. Jenkins consulta el repositorio con `Poll SCM`.
4. Jenkins construye y publica la imagen Docker.
5. Kubernetes consume la imagen publicada y despliega la aplicacion.
6. Prometheus obtiene metricas desde `/metrics`.
7. Grafana visualiza las metricas recolectadas por Prometheus.
