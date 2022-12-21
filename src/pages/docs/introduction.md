---
layout: "../../layouts/DocsPost.astro"
title: "Introduction"
description: "Lorem ipsum dolor sit amet"
pubDate: "Dec 12 2022"
---

The following list should be installed on your computer:
## 1. Install xcode 
```
xcode-select --install
```
## 2a.	Review brew
## 2b.	Install brew 
https://mac.install.guide/commandlinetools/3.html
## 3.	Install iterm2
```
brew install --cask iterm2
```
https://stackoverflow.com/questions/60210024/how-can-i-use-iterm-as-default-terminal-on-macos
## 4. Make your zsh environment more friendly
https://github.com/gustavohellwig/gh-zsh
https://www.geeksforgeeks.org/how-to-customize-linux-terminal-using-powerline10k/
NOTE: If you don’t want to install the above at least do
## 5.	Install git prompt 
brew install zsh-git-prompt
Install NVM: https://github.com/nvm-sh/nvm#install--update-script
Node js (version 16).
nvm install 16
Install Typescript globally 
```
sudo npm i -g typescript).
```
Install Docker
https://www.docker.com/products/docker-desktop/ [ Apple Chip M1 ]
Install VS Code 
```
brew install --cask visual-studio-code
```
Install firebase tools - cli (npm package)
Run 
```
sudo npm install -g firebase-tools
firebase login
```
 
Install postman and ask Chezi Hoyzer to invite you to triple-whale workspace
 
Make sure your email *triplewhale* address was added to:
Github
Firebase
Google cloud use the dropdown to find triplewhale and search to find our projects
Jira https://triplewhale.atlassian.net/
Postman
 
Make sure you have access to the following in Google Cloud console:
Secret Manager on project triple-whale-staging
Prod env - Viewer access only
Staging - Editor & Secrets


Connect to the VPN

Connecting to the VPN
Google Cloud
Install the Google Cloud
`brew install --cask google-cloud-sdk && gcloud init`
 
Gcloud init
 
https://cloud.google.com/sdk/docs/install-sdk
Pay attention:
answer yes (Y) to the prompt Modify profile to update your $PATH and enable bash completion? 
-Pick cloud project to use: 
 [1] shofifi
 [2] triple-whale-staging
 [3] Enter a project ID
 [4] Create a new project
 
-Do you want to configure a default Compute Region and Zone? (Y/n)?  
 
We are using [8] us-central1-a
 
Git
Github credentials – Add to the Org and Dev group. TW email should be used
Before you can start you need to add SSH key to github account, here a good tutorial to do that: How to Properly Setup Your Github Repository — Mac Version
https://github.com/settings/keys
https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
 
 
Clone the VS Code Workspace

`git clone --recursive git@github.com:Triple-Whale/triplewhale.git && cd triplewhale/backend/ && ./devops/scripts/postclone.sh`
`git submodule foreach 'git checkout master'`
 
You can open the workspace file triplewhale.code-workspace from VS Code
Npm TW registry
(https://github.com/Triple-Whale/backend-packages/blob/master/cli/README.md) 

From the triplewhale dir

`npm config set @tw:registry https://us-central1-npm.pkg.dev/shofifi/npm-packages/`
Install gcloud cli - https://cloud.google.com/sdk/docs/install
```
npx google-artifactregistry-auth --yes --repo-config=./services/api/.npmrc
```

`gcloud auth application-default login`

`gcloud config set project triple-whale-staging`

Make sure you have cloned the triplewhale repo before proceeding !

You will then need to run these commands from the backend repo

cd </path/to/backend-repo>
npx google-artifactregistry-auth --yes --repo-config=./services/api/.npmrc
sudo npm i -g @tw/cli


 
npx google-artifactregistry-auth --yes --repo-config=./services/api/.npmrc
Register TW tool
TW is command line to manage TripleWhale services locally, execute the following commands:
cd triplewhale/backend/packages/cli
npm install
npm run build
sudo npm link

—-----------------------------------------------------------------------------------------------------------------------


sudo npm i -g @tw/cli
Install & Raise local env
Backend service:
for service in services/*;
echo 'Running npm i for' $service &&  npm i --prefix $service --ignore-scripts; 
done
Look at the readme in /packages/cli if this is not working and follow instructions there.
tw services:up --select 
Choose the services (use space): api, subscription-manager
 
admin:
SOMEPATH/triplewhale/admin - npm start

client:
SOMEPATH/triplewhale/client - npm start

functions:
SOMEPATH/triplewhale/backend/functions - npm start debug
 
For more information, look at the readme: https://github.com/Triple-Whale/backend-packages/tree/master/cli#readme 
TW APPS URLs
staging:
https://triple-whale-staging.web.app/
https://staging.admin.triplewhale.com/
https://staging.developers.triplewhale.com/register-new-app 
 
prod:
https://app.triplewhale.com/ 
https://admin.triplewhale.com/ 
https://developers.triplewhale.com/register-new-app 
 
 
Do for both staging and prod: Go to first link and do the signup flow (pls signup with TW email)
 until add store page
Once both are done, ask Chezi Hoyzer (by slack) to add you as admin - send him the email address that you used to sign up
For both staging and prod: After you are admin go to the second link (admin) and add yourself to a shop - madisonbraids
Go again to the first link - refresh the page and you are in! 


 
Slack Channels – add user to the Dev group
Connect to the channels:
 
#Apps
#Bugs
#Cloud-alerts
#Cloud-build
#Dev
#Dev-random
#Dev-team
#Devops
#general
#Israel-office (for Israel employees)
#platform-stream - private for platform team
#Platform-stream-dev - private for platform team
#customer-success
#staging-channels
#releases
#app-status
 
Overall intro: 
https://www.notion.so/triplewhale/New-Hires-Introducing-Triple-Whale-8b6533351a724499b0b088a516ea9cbe
 
Videos
English:
 
On boarding first video - code overview (by Chezi Hoyzer) 53min
https://drive.google.com/file/d/1VJNlxxCOXaWmZtPQ8lIWRaVQeelwUe_t/view?usp=share_link 
CI-CD (by Chezi Hoyzer) 10min
https://drive.google.com/file/d/16GQ51O0vii_18tW4e459HNIqRMW9jcNO/view?usp=share_link
 
Running locally (by Chezi Hoyzer) 30min
https://drive.google.com/file/d/14_4sbb1yNOPy1NT0e-s1nzOIgNxnjRJh/view?usp=share_link
 
Data flow of 3rd party APIs into Triple Whale DB (by Chezi Hoyzer): 55min
https://drive.google.com/file/d/15gXwkMWS7XeJj94Ir__QpSwhVs3a7gDH/view?usp=sharing
 
Triple whale stats (by Chezi Hoyzer):40min 
https://drive.google.com/file/d/1sD1CzMq5zf_v-QDh1wcDhBQwTl3NmdSS/view?usp=sharing
 
Hebrew:
 
App introduction (Hebrew):
https://drive.google.com/file/d/1qzeJb6f86yZhZc7Kyhpsaprh2LZZNKUg/view 
 
backend introduction (Hebrew):
https://drive.google.com/file/d/1g3NJk7fiF9kuS-FtwkLVGLyFNGzkOBiQ/view 
https://drive.google.com/file/d/10W3v05nBrLGRmK6hO5mNkpO6TUea2Zdj/view 
 
Import service data flow (Hebrew):
https://drive.google.com/file/d/1KrRxiPTiLDRCgnhJjPF_Ti4yzNZvgyPj/view 
Import service data flow diagram - https://excalidraw.com/#room=bdc41cc99c0bc5714472,d2il0aEAseo82LzKKzhUUw 
 
Redux (Hebrew): 
https://drive.google.com/file/d/1tVlSHb3Oxr3Nj34QFBLgPR_q_PzFRGjr/view?usp=share_link
 
Unit Tests (Hebrew):
https://drive.google.com/file/d/1TOoadeHxvojTGqgbKRVviHY0HbwjlINt/view?usp=share_link
 
Data Health (Hebrew): 
https://drive.google.com/file/d/1ABXOh_miUqB67dy_STkgAea9CTCjIW8q/view?usp=share_link
 
 
eCom Crash course by Rabah (CMO): 
https://drive.google.com/file/d/1IK81K8N5LbNUQRIKFO1hub9Cffu23GpE/view
 
Another document that can help Downloads and Installations
 
