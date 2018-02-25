---
layout: post
title: Current topics of Karrot (February 2018)
ref: current-topics
date: 2018-02-24
lang: en
orig-lang: en
author: tilmann
---

We came quite far already, and there's so much to do!

### Sharing features
- person-to-person food sharing ("food baskets") would be a fitting addition so that people don't have to use other platforms for sharing food. It would also be a huge plus if new visitors arrive on the website (or the app) and can see the food baskets. -> [Issue](https://github.com/yunity/karrot-frontend/issues/672)
- public locations for food distribution could be added, as many groups use the to distribute food in the real world. they could also be public and help users to get into karrot. -> [Issue](https://github.com/yunity/karrot-frontend/issues/354)

<!--more-->

### User engagement
We want to notify users about noteworthy events in order to keep them engaged with their community on karrot.world. Possible ways are:
- weekly summary email -> [Issue](https://github.com/yunity/karrot-frontend/issues/847)
- email notification when a new message appears on the group wall -> [Pull Request](https://github.com/yunity/karrot-backend/pull/486)

### More community features
To improve the contact between group members, we want to have more community features. Right now, the group wall is barely used, so Nick and Tilmann tend to wait a bit and rather improve user engagement, but in future, these things could be added:
- threads in conversations (right now: group wall) -> [Issue](https://github.com/yunity/karrot-frontend/issues/846)
- conversations in stores and pickups -> [Issue](https://github.com/yunity/karrot-frontend/issues/677)
- one-to-one conversations -> [Pull Request](https://github.com/yunity/karrot-frontend/pull/855)

### Statistics collections
There are external statistics (number of requests, sent emails) and inside-app statistics (number of pickups, number of active users). Inside-app statistics are useful for many purposes, so we should extend them. Possible use cases for them:
- group statistics page -> [Issue](https://github.com/yunity/karrot-frontend/issues/355)
- weekly summary email -> [Issue](https://github.com/yunity/karrot-frontend/issues/847)
- removal of inactive users -> [Issue](https://github.com/yunity/karrot-frontend/issues/868)

### Roles
Karrot currently gives the same limited rights to every group member, but users want more rights (kick members) or less rights for others (prevent some from editing stores).
How do people get into these roles? A decision making process would be nice (like the one described for kicking members), but is has some dependencies:
- group join approval (request-to-join) -> [Issue](https://github.com/yunity/karrot-frontend/issues/894)
- removal of inactive users ->  [Issue](https://github.com/yunity/karrot-frontend/issues/868)
There's also the idea of implementing a web of trust into karrot: [Issue](https://github.com/yunity/karrot-frontend/issues/878)
