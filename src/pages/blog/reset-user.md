---
layout: "../../layouts/BlogPost.astro"
title: "👤 Resetting User"
description: "Notes debugging & fixing empty user"
pubDate: "Mar 7 2023"
---

> "I prefer in this case to delete, and tell them to sign up again" -Chezi

## The Issue

A user keeps being added to a store, but empty - no first/last name, no email, no related store, just associated to a pod

<img src="/empty-user.png" />

<br>

## The Solution

Delete the user, and have them sign up again via firebase/firefoo

Both from the store's `/users` collection, and the `/users` collection