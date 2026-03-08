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

Orden de despliegue manual:

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/prometheus-configmap.yaml
kubectl apply -f k8s/prometheus-deployment.yaml
kubectl apply -f k8s/prometheus-service.yaml
kubectl apply -f k8s/grafana-datasource-configmap.yaml
kubectl apply -f k8s/grafana-dashboard-configmap.yaml
kubectl apply -f k8s/grafana-deployment.yaml
kubectl apply -f k8s/grafana-service.yaml
```

Validar recursos:

```bash
kubectl get all -n devops-lab
```

La app expone el puerto `3000` y usa `/health` como `readinessProbe` y `livenessProbe`.

En el estado actual del laboratorio, Jenkins tambien realiza este despliegue automaticamente al final del pipeline de CD.

Si quieres desplegar una version fija, reemplaza el tag `latest` por un tag de build, por ejemplo:

```text
lugomer9/docker_actividad1_devops_cicd:4
```

## Monitoreo local

Prometheus scrapea el endpoint `/metrics` de la app a traves del service interno de Kubernetes.

Acceso por port-forward:

```bash
kubectl port-forward -n devops-lab service/prometheus-service 9090:9090
kubectl port-forward -n devops-lab service/grafana-service 3001:3000
```

URLs:

- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001`

Credenciales iniciales de Grafana:

- usuario: `admin`
- password: `admin123`

Grafana queda provisionado automaticamente con:

- datasource Prometheus
- dashboard base de la app
