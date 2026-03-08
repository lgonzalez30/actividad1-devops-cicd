# Informe Tecnico del Laboratorio DevOps

## 1. Objetivo

El objetivo de este laboratorio fue construir un flujo DevOps academico para una aplicacion web minima en Node.js, integrando automatizacion de CI, CD, seguridad, despliegue y monitoreo.

## 2. Arquitectura general

La solucion implementada se basa en los siguientes componentes:

- Aplicacion web Node.js + Express
- GitHub como repositorio central
- GitHub Actions para integracion continua
- SonarQube Cloud para analisis estatico
- Snyk para analisis de vulnerabilidades
- Jenkins para entrega continua
- Docker para empaquetado
- Kubernetes local para despliegue
- Prometheus y Grafana para monitoreo

## 3. Flujo CI/CD

### CI con GitHub Actions

El workflow definido en [.github/workflows/ci.yml](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/.github/workflows/ci.yml) ejecuta:

- checkout del repositorio
- instalacion de dependencias
- ejecucion de pruebas
- analisis con SonarQube Cloud
- escaneo de dependencias con Snyk

### CD con Jenkins

El pipeline definido en [jenkins/Jenkinsfile](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/jenkins/Jenkinsfile) ejecuta:

- checkout del repositorio
- `npm ci`
- `npm test`
- construccion de imagen Docker
- publicacion de imagen en Docker Hub

El trigger seleccionado para entorno local fue `Poll SCM`, evitando depender de webhooks publicos durante el taller.

## 4. Herramientas utilizadas y justificacion

### Node.js + Express

Se eligio por ser una stack ligera, rapida de implementar y suficiente para demostrar un flujo DevOps completo.

### GitHub Actions

Se utilizo para CI por su integracion nativa con GitHub, facilidad de configuracion y ejecucion automatica sobre la rama principal.

### Jenkins

Se utilizo para CD por ser una herramienta clasica en entornos DevOps y permitir demostrar pipelines orientados a construccion y publicacion de imagenes.

### SonarQube Cloud

Se incorporo para analisis estatico de codigo y calidad del repositorio.

### Snyk

Se utilizo para identificar vulnerabilidades de dependencias y complementar la validacion de seguridad.

### Docker

Permitio empaquetar la aplicacion y estandarizar su ejecucion entre entornos.

### Kubernetes

Se utilizo para demostrar despliegue de la aplicacion sobre un cluster local con manifiestos declarativos.

### Prometheus y Grafana

Se incorporaron para observabilidad basica, usando el endpoint `/metrics` de la aplicacion y visualizacion en dashboard.

## 5. Seguridad

### SonarQube Cloud

Se ejecuto analisis estatico sobre el proyecto para validar calidad y detectar posibles issues de mantenibilidad.

### Snyk

Se ejecuto escaneo de dependencias npm. En la validacion realizada no se detectaron vulnerabilidades conocidas en las dependencias instaladas.

### Recomendaciones de mejora

- endurecer el pipeline para fallar ante vulnerabilidades de severidad alta
- agregar cobertura de pruebas al analisis
- evitar uso de credenciales simples por defecto en Grafana para un entorno productivo
- automatizar despliegue a Kubernetes desde Jenkins con credenciales controladas

## 6. Monitoreo

La aplicacion expone:

- metricas del runtime Node.js mediante `prom-client`
- metricas HTTP personalizadas:
  - `http_requests_total`
  - `http_request_duration_seconds`

Prometheus recolecta estas metricas desde el service interno de Kubernetes y Grafana las presenta en un dashboard base con:

- requests HTTP
- latencia p95
- memoria residente
- uso de CPU
- estado `up`

## 7. Evidencias requeridas

Agregar en esta seccion capturas o enlaces a:

- GitHub Actions en ejecucion exitosa
- Jenkins pipeline exitoso
- SonarQube Cloud con analisis correcto
- Snyk con resultado del escaneo
- Docker Hub con imagen publicada
- Kubernetes con pods en estado `Running`
- Prometheus con target `UP`
- Grafana con dashboard activo

## 8. Reflexion sobre eficiencia operativa

La integracion de automatizaciones en CI y CD reduce trabajo manual repetitivo, mejora la trazabilidad de cambios y permite detectar errores de calidad y seguridad antes del despliegue. La construccion de imagenes en Jenkins y la posterior ejecucion en Kubernetes aportan consistencia entre entornos. Finalmente, el monitoreo con Prometheus y Grafana permite observar el comportamiento de la aplicacion y apoyar una operacion mas confiable.

## 9. Mejoras futuras

- despliegue automatico en Kubernetes desde Jenkins
- uso de tags de imagen inmutables en despliegue
- alertas basicas en Grafana
- almacenamiento persistente para Grafana y Prometheus
- uso de secrets de Kubernetes para configuraciones sensibles
