You'll need to follow a couple of steps of setup in order to run all of your services locally.

# Setup 

### Install minikube in order to run Kubernetes locally.
* You can follow the steps steps outlined on the [minikube](https://github.com/kubernetes/minikube) page for installation. 
* Note for Ubuntu you should use KVM2 for your `vm-driver` instead of VirtualBox.

### Install Docker
* The [Docker](https://docs.docker.com/install/#supported-platforms) pages have instructions for installation.
* Docker for Windows requires Windows 10 Pro, for Windows 10 Home, use [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)

### Install Node
* node version `8.6.0`
* npm version `5.3.0`

You'll need to globally install some other npm packages in order to use functionality like linting. npm should let you know what packages you'll need when you try to run.

After these steps, you should be OK for running a local deployment using Kubernetes. 

# Run

**Unix:** Open terminal. 

**Windows:** Run Docker (or Docker Toolbox) as Administrator. Omit `sudo` wherever it's used.

### start minikube
`minikube start --insecure-registry localhost:5000`
`eval $(minikube docker-env)` // this may be different on Windows
`docker run -d -p 5000:5000 --restart=always --name registry registry:2 // only
need to run once`

**Important note**: You have to run `eval $(minikube docker-env)` on each terminal
you want to use, since it only sets the environment variables for the current
shell session. You'll also need to specify the insecure registry flag every
time you start Minikube.

### Build Docker images and run local Kubernetes deployments

    cd kubernetes
    ./start.sh  // check inside this file

### Run Ouroboros endpoints
* Get your local cluster IP using `minikube ip`.   
* `curl http://<minikube-ip>:31000/<your-endpoint>`
* We use `31000` for the port, because that's the exposed port for the `Ouroboros` service.

### Run updated service of service on Kubernetes

    // make changes inside service repo
    cd kubernetes
    ./update.sh <your-service-name>

# Run without Kubernetes
For now, you can opt to run your services without Kubernetes. 

*Note:* This only works if you're working on the backend. If you want to query the backend from the frontend, you'll need to use Kubernetes.

### Run relevant internal services
    // run in different shells or tmux/screen
    cd trident
    npm run start
    cd ../populous
    npm run start
    cd ../ourobros
    npm run start

You'll need to manually copy over the common folder and delete it after if you run without Kubernetes.

    # inside service service (e.g., proj-Pied_Piper/trident)
    cp -r ../common .

Make sure you delete the common folder copy in your service directory before making a commit.

### Curl Ouroboros endpoints
    curl http://localhost:8080/<your-endpoint>

# Frontend

In order to run on the frontend, you'll need to include a Google Chrome addon
that allows you to query the Minikube IP while running from localhost. Add
[allow-control-allow-origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).
