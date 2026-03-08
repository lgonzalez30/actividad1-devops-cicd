# Jenkins Infraestructura

Infraestructura minima para levantar Jenkins en Docker con:

- Jenkins LTS
- Docker CLI
- Node.js 20
- npm

## Levantar Jenkins

Desde esta carpeta:

```bash
docker compose up -d --build
```

Jenkins quedara disponible en:

```text
http://localhost:8080
```

## Obtener clave inicial

```bash
docker exec jenkins-devops-lab cat /var/jenkins_home/secrets/initialAdminPassword
```

## Plugins recomendados

- Git
- GitHub
- Pipeline
- Docker Pipeline
- NodeJS

## Configuracion del pipeline del laboratorio

- Repository URL: `https://github.com/lgonzalez30/actividad1-devops-cicd.git`
- Branch: `main`
- Script Path: `jenkins/Jenkinsfile`

## Requisitos

- Docker instalado en la maquina host
- Puerto `8080` libre
- Puerto `50000` libre
