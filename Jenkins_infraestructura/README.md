# Jenkins Infraestructura

Infraestructura minima para levantar Jenkins en Docker con:

- Jenkins LTS
- Docker CLI
- kubectl
- Node.js 20
- npm
- permisos para invocar Docker del host desde el contenedor

## Levantar Jenkins

Desde esta carpeta:

```bash
docker compose up -d --build
```

Si Jenkins ya estaba levantado, recrealo para aplicar el cambio:

```bash
docker compose down
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

## Acceso a Kubernetes local

El contenedor Jenkins monta el archivo local:

```text
/Users/luisgonzalez/.kube/config
```

Esto permite que el pipeline ejecute `kubectl apply` y `kubectl rollout status` sobre el cluster local configurado en esa maquina.

## Requisitos

- Docker instalado en la maquina host
- Puerto `8080` libre
- Puerto `50000` libre
