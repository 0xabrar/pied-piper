You'll need to follow a couple of steps of setup in order to run all of your services locally.

# Setup 

### Install minikube in order to run Kubernetes locally.
* You can follow the steps steps outlined on the [minikube](https://github.com/kubernetes/minikube) page for installation. 
* Note for Ubuntu you should use KVM2 for your `vm-driver` instead of VirtualBox.

### Install Docker
* The [Docker](https://docs.docker.com/install/#supported-platforms) pages have instructions for installation.
  * Docker for Windows requires Windows 10 Pro, for Windows 10 Home, use [Docker Toolbox](https://docs.docker.com/toolbox/toolbox_install_windows/)
* You'll separately need to sign up for [DockerHub](https://hub.docker.com/).

### Install Node
* node version `8.6.0`
* npm version `5.3.0`

You'll need to globally install some other npm packages in order to use functionality like linting. npm should let you know what packages you'll need when you try to run.

After these steps, you should be OK for running a local deployment using Kubernetes. 

# Run

**Unix:** Open terminal. 

**Windows:** Run Docker (or Docker Toolbox) as Administrator. Omit `sudo` wherever it's used.

### Start minikube
`minikube start`

### Build Docker images and run local Kubernetes deployments

    cd kubernetes
    sudo ./start.sh <your dockerhub username>

If you run into an error about permissions relating to Docker, you just need to login with `sudo docker login`.

### Run Ouroboros endpoints
* Get your local cluster IP using `minikube ip`.   
* `curl http://<minikube-ip>:31000/<your-endpoint>`
* We use `31000` for the port, because that's the exposed port for the `Ouroboros` service.

# Run without Kubernetes
For now, you can opt to run your services without Kubernetes. 

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
