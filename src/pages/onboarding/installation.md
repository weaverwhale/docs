---
layout: "../../layouts/OnboardingPost.astro"
title: "⚙️ Installation"
description: "Follow these directions for full setup instructions on a fresh machine"
pubDate: "Dec 13 2022"
---

The following list should be installed on your computer:

## Install xcode

```bash
xcode-select --install
```

## Review & Install brew

https://mac.install.guide/commandlinetools/3.html

## Install iterm2

```bash
brew install --cask iterm2
```

https://stackoverflow.com/questions/60210024/how-can-i-use-iterm-as-default-terminal-on-macos

## Make your zsh environment more friendly

https://github.com/gustavohellwig/gh-zsh

https://www.geeksforgeeks.org/how-to-customize-linux-terminal-using-powerline10k/

NOTE: If you don’t want to install the above at least do below

## Install git prompt

```bash
brew install zsh-git-prompt
```

## Install NVM

https://github.com/nvm-sh/nvm#install--update-script

Node js (version 16).

```bash
nvm install 16
```

## Install Typescript globally 

```bash
sudo npm i -g typescript
```

## Install Docker

https://www.docker.com/products/docker-desktop/ [ Apple Chip M1 ]

## Install VS Code 

```bash
brew install --cask visual-studio-code
```

## Install Firebase tools - CLI (npm package)

```bash
sudo npm install -g firebase-tools
firebase login
```
 
## Install Postman 

Ask Chezi Hoyzer to invite you to triple-whale workspace

## Online Tools
 
Make sure your email *triplewhale* address was added to:

- Github
- Firebase
- Google cloud - use the dropdown to find triplewhale and search to find our projects
- Jira https://triplewhale.atlassian.net/
- Postman
 
Make sure you have access to the following in Google Cloud console:

- Secret Manager on project triple-whale-staging
- Prod env - Viewer access only
- Staging - Editor & Secrets


## Connect to the VPN

Connecting to the VPN

## Google Cloud

Install the Google Cloud

```bash
brew install --cask google-cloud-sdk && gcloud init
Gcloud init
```
 
https://cloud.google.com/sdk/docs/install-sdk

Pay attention:

answer yes (Y) to the prompt Modify profile to update your $PATH and enable bash completion? 

Pick cloud project to use: 

 `[1] shofifi`

 `[2] triple-whale-staging`

 `[3] Enter a project ID`

 `[4] Create a new project`

Do you want to configure a default Compute Region and Zone? (Y/n)?  
 
We are using `[8] us-central1-a`
 
## Git

Github credentials – Add to the Org and Dev group. TW email should be used

Before you can start you need to add SSH key to github account, here a good tutorial to do that: How to Properly Setup Your Github Repository — Mac Version

https://github.com/settings/keys

https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
 
## Clone the VS Code Workspace

```bash
git clone --recursive git@github.com:Triple-Whale/triplewhale.git && cd triplewhale/backend/ && ./devops/scripts/postclone.sh
git submodule foreach 'git checkout master'
```
 
You can open the workspace file triplewhale.code-workspace from VS Code

Npm TW registry (https://github.com/Triple-Whale/backend-packages/blob/master/cli/README.md) 

From the triplewhale dir

```bash
npm config set @tw:registry https://us-central1-npm.pkg.dev/shofifi/npm-packages/
```

## Install gcloud CLI

https://cloud.google.com/sdk/docs/install

```bash
cd backend
npx google-artifactregistry-auth --yes --repo-config=./services/api/.npmrc
gcloud auth application-default login
gcloud config set project triple-whale-staging
```

Make sure you have cloned the triplewhale repo before proceeding !

You will then need to run these commands from the backend repo

## Initialize TW Tool

```bash
cd </path/to/backend-repo>
npx google-artifactregistry-auth --yes --repo-config=./services/api/.npmrc
sudo npm i -g @tw/cli
```
 
### Register TW tool

```bash
npx google-artifactregistry-auth --yes --repo-config=./services/api/.npmrc
```

TW is command line to manage TripleWhale services locally, execute the following commands:

```bash
cd triplewhale/backend/packages/cli
npm install
npm run build
sudo npm link
```

## Install & Raise local env

### Backend

```bash
for service in services/*;
echo 'Running npm i for' $service &&  npm i --prefix $service --ignore-scripts; 
done
```

Look at the readme in `/packages/cli` if this is not working and follow instructions there.

```bash
tw services:up --select
```

Choose the services (use space): `api, subscription-manager`
 
### Admin

```bash
cd SOMEPATH/triplewhale/admin
npm start
```

### Client

```bash
cd SOMEPATH/triplewhale/client
npm start
```

### Functions (Deprecated)

```bash
cd SOMEPATH/triplewhale/backend/functions
npm start debug
```
 
For more information, look at the readme: https://github.com/Triple-Whale/backend-packages/tree/master/cli#readme 

## TW APPS URLs

### Staging

https://triple-whale-staging.web.app/

https://staging.admin.triplewhale.com/

https://staging.developers.triplewhale.com/register-new-app 
 
### Production

https://app.triplewhale.com/ 

https://admin.triplewhale.com/ 

https://developers.triplewhale.com/register-new-app 
 
### Creating Accounts for Both Environments

***Do for both staging and prod***

- Go to first link and do the signup flow (pls signup with TW email), until add store page
- Once both are done, ask Chezi Hoyzer (by slack) to add you as admin - send him the email address that you used to sign up
- For both staging and prod: After you are admin go to the second link (admin) and add yourself to a shop - madisonbraids
- Go again to the first link - refresh the page and you are in!