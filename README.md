# Laboratorio DevOps CI/CD

Laboratorio academico basado en una app web minima con Node.js y Express, integrado con:

- GitHub Actions para CI
- SonarQube Cloud para analisis estatico
- Snyk para analisis de vulnerabilidades
- Jenkins para CD basico
- Docker para empaquetado
- Kubernetes, Prometheus y Grafana como siguientes etapas del laboratorio

## Estado actual

Hasta este punto el repositorio ya tiene:

- app minima con endpoints `/`, `/health` y `/metrics`
- tests basicos con `node --test`
- `Dockerfile` funcional
- CI en GitHub Actions
- integracion con SonarQube Cloud
- integracion con Snyk
- pipeline de Jenkins ejecutando `checkout`, `npm ci`, `npm test` y `docker build`
- infraestructura local para Jenkins en Docker

## Estructura principal

```text
.
├── .github/workflows/ci.yml
├── Dockerfile
├── Jenkins_infraestructura/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── README.md
├── jenkins/Jenkinsfile
├── src/
│   ├── app.js
│   ├── server.js
│   ├── controllers/
│   ├── metrics/
│   └── routes/
├── tests/unit/
├── sonar-project.properties
└── package.json
```

## Aplicacion web

La app esta implementada con Express y expone:

- `GET /`
- `GET /health`
- `GET /metrics`

Archivos principales:

- [src/app.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/src/app.js)
- [src/server.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/src/server.js)
- [src/controllers/home.controller.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/src/controllers/home.controller.js)
- [src/controllers/health.controller.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/src/controllers/health.controller.js)
- [src/controllers/metrics.controller.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/src/controllers/metrics.controller.js)
- [src/metrics/register.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/src/metrics/register.js)

## Ejecucion local

Instalar dependencias:

```bash
npm install
```

Ejecutar aplicacion:

```bash
npm start
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Por defecto la app queda disponible en:

```text
http://localhost:3000
```

Para cambiar el puerto:

```bash
PORT=3007 npm start
```

## Tests

Ejecutar pruebas:

```bash
npm test
```

Tests actuales:

- [tests/unit/home.controller.test.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/tests/unit/home.controller.test.js)
- [tests/unit/health.test.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/tests/unit/health.test.js)
- [tests/unit/metrics.controller.test.js](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/tests/unit/metrics.controller.test.js)

## Validacion manual

Validar `/health`:

```bash
curl http://localhost:3000/health
```

Validar `/metrics`:

```bash
curl http://localhost:3000/metrics
```

La salida de `/metrics` debe ser texto compatible con Prometheus, con metricas como:

- `process_cpu_user_seconds_total`
- `process_start_time_seconds`
- `nodejs_eventloop_lag_seconds`

## Docker

Construir imagen:

```bash
docker build -t actividad1-devops-cicd .
```

Ejecutar contenedor:

```bash
docker run -p 3000:3000 actividad1-devops-cicd
```

Archivo principal:

- [Dockerfile](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/Dockerfile)

## CI con GitHub Actions

El workflow de CI esta en:

- [.github/workflows/ci.yml](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/.github/workflows/ci.yml)

Actualmente ejecuta:

- checkout del repositorio
- instalacion de dependencias
- ejecucion de tests
- analisis con SonarQube Cloud
- escaneo de dependencias con Snyk

Secrets requeridos en GitHub:

- `SONAR_TOKEN`
- `SNYK_TOKEN`

## SonarQube Cloud

Configuracion del proyecto:

- organizacion: `lgonmerdev`
- project key: `lgonzalez30_actividad1-devops-cicd`

Archivo de configuracion:

- [sonar-project.properties](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/sonar-project.properties)

## Jenkins para CD basico

El pipeline de Jenkins esta definido en:

- [jenkins/Jenkinsfile](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/jenkins/Jenkinsfile)

Actualmente realiza:

- checkout del repositorio
- `npm ci`
- `npm test`
- `docker build`
- listado de imagen generada

El pipeline esta pensado para ejecutarse sobre la rama `main`.

## Jenkins local sobre Docker

La infraestructura para Jenkins local esta en:

- [Jenkins_infraestructura/Dockerfile](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/Jenkins_infraestructura/Dockerfile)
- [Jenkins_infraestructura/docker-compose.yml](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/Jenkins_infraestructura/docker-compose.yml)
- [Jenkins_infraestructura/README.md](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/Jenkins_infraestructura/README.md)

### Levantar Jenkins

```bash
cd Jenkins_infraestructura
docker compose up -d --build
```

Si necesitas recrearlo:

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

### Plugins recomendados

- Git
- GitHub
- Pipeline
- Docker Pipeline
- NodeJS

### Configuracion del job Pipeline

Tipo de job:

- `Pipeline`

Configuracion recomendada:

- `Definition`: `Pipeline script from SCM`
- `SCM`: `Git`
- `Repository URL`: `https://github.com/lgonzalez30/actividad1-devops-cicd.git`
- `Credentials`: `None`
- `Branch Specifier`: `*/main`
- `Script Path`: `jenkins/Jenkinsfile`

Trigger recomendado para entorno local:

- `Poll SCM`
- expresion:

```text
H/5 * * * *
```

## Siguiente alcance del laboratorio

Para el entregable final, revisar tambien:

- [docs/informe-final.md](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/docs/informe-final.md)
- [docs/architecture.md](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/docs/architecture.md)
- [docs/workflow.md](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/docs/workflow.md)

Lo siguiente que falta por implementar es:

- publicacion de imagen en un registry
- despliegue real en Kubernetes
- integracion de Prometheus con el endpoint `/metrics`
- dashboard basico en Grafana
