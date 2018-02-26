
kubectl delete service ouroboros
kubectl delete service trident 
kubectl delete service javelin
kubectl delete service populous 

kubectl delete deployment ouroboros
kubectl delete deployment javelin
kubectl delete deployment trident
kubectl delete deployment populous 

sed -i 's?[a-z]*/ouroboros?'"$1"'/ouroboros?' deployments/ouroboros.yaml
sed -i 's?[a-z]*/trident?'"$1"'/trident?' deployments/trident.yaml
sed -i 's?[a-z]*/populous?'"$1"'/populous?' deployments/populous.yaml
sed -i 's?[a-z]*/javelin?'"$1"'/javelin?' deployments/javelin.yaml

kubectl create -f services/ouroboros.yaml
kubectl create -f services/populous.yaml
kubectl create -f services/javelin.yaml
kubectl create -f services/trident.yaml

kubectl create -f deployments/ouroboros.yaml
kubectl create -f deployments/populous.yaml
kubectl create -f deployments/javelin.yaml
kubectl create -f deployments/trident.yaml


