eval $(minikube docker-env)

cd .. 
rm -rf "$1"/node_modules
docker build -f "$1"/Dockerfile -t localhost:5000/"$1" .
docker push localhost:5000/"$1"

cd kubernetes
kubectl delete service "$1"
kubectl delete deployment "$1"

kubectl create -f services/"$1".yaml
kubectl create -f deployments/"$1".yaml
