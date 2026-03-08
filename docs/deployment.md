# Despliegue

## Docker

Construir imagen local:

```bash
docker build -t actividad1-devops-cicd .
```

Ejecutar contenedor local:

```bash
docker run -p 3000:3000 actividad1-devops-cicd
```

## Docker Hub

La imagen publicada desde Jenkins es:

```text
lugomer9/docker_actividad1_devops_cicd
```

Se publican dos tags:

- `latest`
- `<BUILD_NUMBER>`

## Kubernetes

Los manifests base estan en la carpeta [k8s](/Users/luisgonzalez/Documents/development/maestria/taller_devops3/actividad1-devops-cicd/k8s).

Orden de despliegue:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

Validar recursos:

```bash
kubectl get all -n devops-lab
```

La app expone el puerto `3000` y usa `/health` como `readinessProbe` y `livenessProbe`.

Si quieres desplegar una version fija, reemplaza el tag `latest` por un tag de build, por ejemplo:

```text
lugomer9/docker_actividad1_devops_cicd:4
```
