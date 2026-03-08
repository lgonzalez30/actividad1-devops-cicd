# Laboratorio DevOps CI/CD

Estructura base para un laboratorio academico con:

- Node.js + Express
- GitHub Actions para CI
- Jenkins para CD
- SonarCloud para analisis estatico
- Snyk para vulnerabilidades
- Kubernetes para despliegue
- Prometheus y Grafana para monitoreo

## Estado actual

Este repositorio contiene la estructura inicial del proyecto y una aplicacion Express minima lista para ejecutarse localmente o empaquetarse con Docker.

## Jenkins CD basico

El pipeline definido en [jenkins/Jenkinsfile](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/jenkins/Jenkinsfile) realiza:

- checkout del repositorio
- instalacion de dependencias con `npm ci`
- ejecucion de pruebas con `npm test`
- construccion de imagen Docker en rama `main`

Prerequisitos del agente Jenkins:

- Node.js 20 o compatible
- npm
- Docker disponible en el agente
- pipeline configurado con script path `jenkins/Jenkinsfile`

Para levantar Jenkins localmente con Docker, revisa [Jenkins_infraestructura/README.md](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/Jenkins_infraestructura/README.md).
