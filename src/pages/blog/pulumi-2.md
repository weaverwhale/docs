---
layout: "../../layouts/BlogPost.astro"
title: "☸️ Local Pulumi & Kubernetes"
description: "How to run and deploy kubernetes with Pulumi"
pubDate: "Jun 28 2023"
---

# ☸️ Local Pulumi & Kubernetes

https://www.pulumi.com/


## Install Pulumi locally

```bash
brew install pulumi
```

```bash
pulumi version
```

## Install Kubernetes locally

```bash
brew install kubernetes-cli
```

```bash
kubectl version --client
```

## Create a new Pulumi project

```bash
pulumi new <THINGY>
```

## List Pulumi stacks

```bash
pulumi stack ls
```

## Making Updates to Pulumi

All our pulumi configurations live under the `/infra` folder

## BUG FIX

With our pulumi config, sometimes it will throw an error like this:

```bash
Diagnostics:
  kubernetes:core/v1:Service (summary-page):
    warning: configured Kubernetes cluster is unreachable: unable to load Kubernetes client configuration from kubeconfig file. Make sure you have:
    
         • set up the provider as per https://www.pulumi.com/registry/packages/kubernetes/installation-configuration/
    
     context "gke_shofifi_us-central1_knative-cluster" does not exist
    error: Preview failed: failed to read resource state due to unreachable cluster. If the cluster has been deleted, you can edit the pulumi state to remove this resource or retry with the PULUMI_K8S_DELETE_UNREACHABLE environment variable set to true.
```

To fix this, we need to run the following commands:

```bash
export FIX=1   
rm ~/.kube/config
pulumi up
```

## Pushing Changes to Pulumi

```bash
pulumi up
```
