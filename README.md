# Laboratorio DevOps CI/CD

Repositorio academico para demostrar un flujo DevOps completo sobre una aplicacion web minima en Node.js + Express.

## Resumen

El proyecto implementa:

- CI con GitHub Actions
- analisis estatico con SonarQube Cloud
- analisis de vulnerabilidades con Snyk
- CD con Jenkins
- empaquetado con Docker
- despliegue en Kubernetes local
- monitoreo con Prometheus y Grafana

Estado actual:

- app con endpoints `GET /`, `GET /health` y `GET /metrics`
- tests basicos con `node --test`
- imagen publicada en Docker Hub
- Jenkins construyendo, publicando y desplegando en Kubernetes
- Prometheus scrapeando metricas
- Grafana mostrando dashboard base

## Flujo de trabajo

1. Se hace `git push` sobre `main`.
2. GitHub Actions ejecuta CI, pruebas, SonarQube Cloud y Snyk.
3. Jenkins detecta cambios mediante `Poll SCM`.
4. Jenkins construye la imagen Docker y la publica en Docker Hub.
5. Jenkins aplica manifiestos y valida el rollout en Kubernetes local.
6. Prometheus recolecta metricas desde `/metrics`.
7. Grafana visualiza CPU, memoria, requests y latencia.

## Estructura principal

```text
.
├── .github/workflows/ci.yml
├── Dockerfile
├── Jenkins_infraestructura/
├── jenkins/Jenkinsfile
├── k8s/
├── monitoring/
├── src/
├── tests/
├── docs/
├── package.json
└── sonar-project.properties
```

## Aplicacion

Archivos principales:

- [src/app.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/src/app.js)
- [src/server.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/src/server.js)
- [src/metrics/register.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/src/metrics/register.js)
- [src/middleware/http-metrics.middleware.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/src/middleware/http-metrics.middleware.js)

Endpoints:

- `GET /`
- `GET /health`
- `GET /metrics`

## Ejecucion rapida

Instalar dependencias:

```bash
npm install
```

Ejecutar localmente:

```bash
npm start
```

Modo desarrollo:

```bash
npm run dev
```

Pruebas:

```bash
npm test
```

Cambiar puerto:

```bash
PORT=3007 npm start
```

## Validacion manual

Aplicacion local:

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
curl http://localhost:3000/metrics
```

El endpoint `/metrics` debe devolver metricas Prometheus, incluyendo metricas de proceso y metricas HTTP personalizadas.

## Docker

Construir imagen local:

```bash
docker build -t actividad1-devops-cicd .
```

Ejecutar contenedor:

```bash
docker run -p 3000:3000 actividad1-devops-cicd
```

Imagen publicada por Jenkins:

```text
lugomer9/docker_actividad1_devops_cicd
```

Tags usados:

- `latest`
- `<BUILD_NUMBER>`

## CI

Workflow:

- [.github/workflows/ci.yml](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/.github/workflows/ci.yml)

Etapas actuales:

- checkout
- instalacion de dependencias
- pruebas
- SonarQube Cloud
- Snyk

Secrets requeridos:

- `SONAR_TOKEN`
- `SNYK_TOKEN`

## CD con Jenkins

Pipeline:

- [jenkins/Jenkinsfile](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/jenkins/Jenkinsfile)

Etapas actuales:

- checkout
- `npm ci`
- `npm test`
- `docker build`
- `docker push`
- `kubectl apply`
- `kubectl rollout status`

### Jenkins local en Docker

Infraestructura:

- [Jenkins_infraestructura/Dockerfile](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/Jenkins_infraestructura/Dockerfile)
- [Jenkins_infraestructura/docker-compose.yml](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/Jenkins_infraestructura/docker-compose.yml)
- [Jenkins_infraestructura/README.md](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/Jenkins_infraestructura/README.md)

Levantar Jenkins:

```bash
cd Jenkins_infraestructura
docker compose up -d --build
```

Recrear Jenkins:

```bash
docker compose down
docker compose up -d --build
```

Acceso:

```text
http://localhost:8080
```

Clave inicial:

```bash
docker exec jenkins-devops-lab cat /var/jenkins_home/secrets/initialAdminPassword
```

Configuracion recomendada del job:

- `Definition`: `Pipeline script from SCM`
- `SCM`: `Git`
- `Repository URL`: `https://github.com/lgonzalez30/actividad1-devops-cicd.git`
- `Branch Specifier`: `*/main`
- `Script Path`: `jenkins/Jenkinsfile`
- trigger: `Poll SCM`
- expresion: `H/5 * * * *`

## Kubernetes

Manifiestos:

- [k8s](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/k8s)

Despliegue manual:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

Validacion:

```bash
kubectl get all -n devops-lab
kubectl port-forward -n devops-lab service/devops-lab-service 3000:80
```

Nota:

- el pipeline de Jenkins ya realiza este despliegue automaticamente
- el `Service` principal es `ClusterIP`, por eso para pruebas locales se usa `port-forward`

## Monitoreo

Prometheus y Grafana se despliegan en Kubernetes y consumen el endpoint `/metrics`.

Recursos relevantes:

- [monitoring/prometheus/prometheus.yml](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/monitoring/prometheus/prometheus.yml)
- [monitoring/grafana/dashboards/app-dashboard.json](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/monitoring/grafana/dashboards/app-dashboard.json)

Port-forward:

```bash
kubectl port-forward -n devops-lab service/prometheus-service 9090:9090
kubectl port-forward -n devops-lab service/grafana-service 3001:3000
```

Accesos:

- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001`

Credenciales iniciales de Grafana:

- usuario: `admin`
- password: `admin123`

## Seguridad

SonarQube Cloud:

- organizacion: `lgonmerdev`
- project key: `lgonzalez30_actividad1-devops-cicd`
- configuracion: [sonar-project.properties](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/sonar-project.properties)

Snyk:

- integrado en el workflow de GitHub Actions
- orientado al analisis de dependencias npm

## Documentacion adicional

- [docs/informe-final.md](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/docs/informe-final.md)
- [docs/architecture.md](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/docs/architecture.md)
- [docs/workflow.md](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/docs/workflow.md)
- [docs/deployment.md](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/docs/deployment.md)
