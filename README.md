# Setup

You'll need to follow a couple of steps in order to run all of your services locally.

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

### Start Minkube

```bash
minikube start --insecure-registry localhost:5000

docker run -d -p 5000:5000 --restart=always --name registry registry:2 # only need to run once
```

**Important note**: You'll need to specifiy `--insecure-registry localhost:5000` every time you start Minikube.

**Important note 2**: You only need to run these commands to deploy the services in `start.sh` once the docker images have been built. No need to run `start.sh` again, but if you need to reflect the new changes in your repository run `update.sh` instead. This is only the case if you haven't cleared the minikube files in `~/.minikube`

### Build Docker images and run local Kubernetes deployments

    cd kubernetes
    ./start.sh

After the first time you run `start.sh`, when you open `minikube` again, it will keep the old deployments and services.

### Run Ouroboros endpoints

```bash
minikube ip # get your local cluster IP

# port 31000 exposed on Ouroboros service
curl http://<minikube-ip>:31000/<your-endpoint>
```

### Run updated service of service on Kubernetes

    // make changes inside service repo
    cd kubernetes
    ./update.sh <your-service-name>

For doing a quick sanity check that your service is able to run without errors (without going through the process of running a deployment), you can simply run `npm run start` in your project package.

# Run without Kubernetes

You can try to run Kubernetes in localhost, but this approach is mainly not supported.

_Note:_ This only works if you're working on the backend. If you want to query the backend from the frontend, you'll need to use Kubernetes.

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

    curl http://localhost:31000/<your-endpoint>

# Developer Workflow

### Frontend

In order to run the frontend on `localhost`, you'll need to include a Google Chrome addon
that allow you to query the Minikube IP while running from localhost. Add
[allow-control-allow-origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en).

You'll also need to set a `.env` file inside of the `scythe` package.

```bash
cd scythe
touch .env

# insert into .env file
REACT_APP_MINIKUBE_IP=<minikube_ip>
```

You'll need to get your Minikube IP using `minikube ip`. This environment variables lets React know how to query the backend (gives the cluster IP).

There's a couple of other Chrome addons that help with React/Redux development.

* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

And React also includes some tools for [analyzing performance](https://medium.com/@dpark/using-reacts-perf-with-react-addons-perf-77ed260f2df0).

### Backend Logging

Logs are generated to the console using the [winston](https://github.com/winstonjs/winston) library. Each service should have a logger initialized somewhere, so logging requires just importing the logger and calling it.

```javascript
import logger from { 'logger.js' };
logger.info(`Entered myMethod ${myInfo}!`);
logger.error(`Exception from ${error}`));
```

After we `curl` our endpoints, we should be able to retrieve logs that were produced from our service.

```bash
# curl endpoints
kubectl logs --since=5m -l name=<my-service-name>
```

The `-l` flag specifies that we want to find logs from pods that include specific labels. We're using `name` because that's how we categorize each service in the Kubernetes `.yaml` files.

If you want to change the format of logged output, check out the winston page for options.

**Note**: Logs using `logger.debug` will not show up in the console, because Docker is building out a production version of the service.

### ESLint and Flow

You can check your package's ESLint and Flow status using npm commands.

```bash
npm run lint
npm run flow # or just run flow
```

### Tools

There are multiple tools you can use to improve your workflow. We can easily automate all of the tedious and boring stuff such as formatting.

#### Visual Studio Code

* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [Prettier](https://github.com/prettier/prettier-vscode)
* [Babel ES6/ES7](https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring)
* [Protobuf Support](https://github.com/peterj/vscode-protobuf)
* [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
* [npm Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense)
* [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)

Prettier can be modified to automatically format according to our `eslint` configuration. Open your `User Preferences` in VSCode and set the following:

```javascript
// Format a file on save. A formatter must be available, the file must not be auto-saved, and editor must not be shutting down.
"editor.formatOnSave": true,
// Enable/disable JavaScript validation. (For Flow)
"javascript.validate.enable": false,
// Enable/disable default JavaScript formatter (For Prettier)
"javascript.format.enable": false,
// Use 'prettier-eslint' instead of 'prettier'. Other settings will only be fallbacks in case they could not be inferred from eslint rules.
"prettier.eslintIntegration": true,
```

Now, whenever you save, you'll automatically format your file to match `eslint` requirements.

#### Other

You can likely find most of those plugins for other editors like Atom. The most important ones to get are ESLint, Prettier, and Flow. You'll need to follow separate configuration steps to make Prettier auto-format according to our `eslint` config.

* [Sublime Prettier](http://slashwhatever.com/code/leveraging-prettier-eslint-sublime/)
* [Atom Prettier](https://github.com/prettier/prettier-atom)

The above links both include instructions for configuring Prettier to match ESLint.

# Git Workflow

In order to avoid duplicating commits, you can use `git rebase` on feature branches. Here's a typical `git` workflow

```bash
git checkout -b my-feature # from master branch
# add your changes
git push origin my-feature
# add more changes
# your branch is now out of sync with master
git checkout master
git pull --rebase origin master
git checkout my-feature
git rebase master # stacks your changes on top of master on your feature branch
# resolve any merge conflicts that arise
git push origin my-feature
```

At any point after you push changes to your remote feature branch, you have the option to rebase and stack changes. Instead of duplicating the changes, other people's commits will just show below yours on the `git` history.

When your pull request is finally approved, you can merge with `Squash and Merge` on the pull request page. By squashing the changes on your pull request, only your final changes are shown in the commit diff (removes intermediate back-and-forth in pull request).

### Git Squash

If you prefer to make lots of local changes and only push some changes out to remote branches, you can use `git squash`.

```bash
# changes and commit on feature branch
# make more changes on feature branch
# your local feature branch is now 7 commits ahead of your remote feature branch
git rebase -i HEAD~7 # squash your 7 commits into 1
git push origin my-feature
```

# Resources

### gRPC

* [Protobuf Language Spec](https://developers.google.com/protocol-buffers/docs/proto3)
* [protobuf.js](https://github.com/dcodeIO/ProtoBuf.js/)
* [gRPC node](https://grpc.io/docs/tutorials/basic/node.html)

### Kubernetes

* [Kubernetes in 5 minutes](https://www.youtube.com/watch?v=PH-2FfFD2PU)
* [kubectl cheatsheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)

### React/Redux

* [Container Components](https://medium.com/@learnreact/container-components-c0e67432e005)
* [Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
* [Why Use Action Creators?](http://blog.isquaredsoftware.com/2016/10/idiomatic-redux-why-use-action-creators/)
* [Using Reselect Selectors](http://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/)
* [React prop-types](https://www.npmjs.com/package/prop-types)

### ESLint and Flow

* [ESLint Rules](https://eslint.org/docs/rules/)
* [Flow Docs](https://flow.org/en/docs/)

### Extra Videos

* [Intro to gRPC: A Modern Toolkit for Microservice Communication](https://www.youtube.com/watch?v=RoXT_Rkg8LA)
* [Kubernetes in Real Life](https://www.youtube.com/watch?v=UUt7SuG3nW4)
* [Functional Programming Basics in ES6](https://www.youtube.com/watch?v=HvMemAgOw6I&t=1040s)
* [Async/Await: Modern Concurrency in Javascript](https://www.youtube.com/watch?v=NsQ2QIrQShU&t)
* [Type Systems Will Make You a Better Javascript Developer](https://www.youtube.com/watch?v=V1po0BT7kac)
* [Immutability: Putting The Dream Machine To Work](https://www.youtube.com/watch?v=J-bC20aAat8)
