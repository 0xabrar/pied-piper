eval $(minikube docker-env)

cd ..

# Remove all node_module in order to (significantly) reduce the Docker build
# context.
rm -rf ouroboros/node_modules
rm -rf trident/node_modules
rm -rf javelin/node_modules
rm -rf populous/node_modules
rm -rf scythe/node_modules

# Build local Docker images and push into local registry (localhost:5000 tag
# specifies local registry).
docker build -f ouroboros/Dockerfile -t localhost:5000/ouroboros .
docker push localhost:5000/ouroboros

docker build -f trident/Dockerfile -t localhost:5000/trident .
docker push localhost:5000/trident

docker build -f populous/Dockerfile -t localhost:5000/populous .
docker push localhost:5000/populous

docker build -f javelin/Dockerfile -t localhost:5000/javelin .
docker push localhost:5000/javelin

docker build -f scythe/Dockerfile -t localhost:5000/scythe .
docker push localhost:5000/scythe

# Delete any existing services and deployments and create new ones.
cd kubernetes
kubectl delete service ouroboros
kubectl delete service trident 
kubectl delete service javelin
kubectl delete service populous 
kubectl delete service scythe

kubectl delete deployment ouroboros
kubectl delete deployment javelin
kubectl delete deployment trident
kubectl delete deployment populous 
kubectl delete deployment scythe

kubectl create -f services/ouroboros.yaml
kubectl create -f services/populous.yaml
kubectl create -f services/javelin.yaml
kubectl create -f services/trident.yaml
kubectl create -f services/scythe.yaml

kubectl create -f deployments/ouroboros.yaml
kubectl create -f deployments/populous.yaml
kubectl create -f deployments/javelin.yaml
kubectl create -f deployments/trident.yaml
kubectl create -f deployments/scythe.yaml
