# Flujo CI/CD

## Flujo de integracion continua

Cada cambio sobre `main` dispara GitHub Actions, el cual ejecuta:

- instalacion de dependencias
- pruebas automaticas
- analisis con SonarQube Cloud
- escaneo de dependencias con Snyk

## Flujo de entrega continua

Jenkins consulta periodicamente el repositorio mediante `Poll SCM`.

Cuando detecta cambios en `main`, ejecuta:

- checkout del codigo
- `npm ci`
- `npm test`
- `docker build`
- `docker push` a Docker Hub
- `kubectl apply` sobre el cluster local
- `kubectl rollout restart` y `kubectl rollout status`

## Flujo de despliegue

El despliegue a Kubernetes se realiza desde Jenkins, aplicando los manifiestos declarativos y validando el rollout del deployment principal.

## Flujo de monitoreo

- la app publica metricas en `/metrics`
- Prometheus scrapea esas metricas
- Grafana muestra paneles con CPU, memoria, requests y latencia
