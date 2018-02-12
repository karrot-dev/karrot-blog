---
layout: post
title: Karrot applies again for Rails Girls Summer of Code - Questions and Answers
ref: rgsoc-qa
date: 2018-01-31
lang: en
orig-lang: en
author: tilmann
---

Last year it was a nice experience, so we applied again this year. In this post, I'm going to publish answers to questions that arise from time to time. Expect updates!

<!--more-->

## How do I get in contact with you?

Please create an account in the [yunity Slack](https://slackin.yunity.org) and join the `#karrot-dev` channel.

## What do the users do at the pickup station?

Before pick-ups are entered into karrot, someone in the foodsaving group has to make a cooperation with the store (or supermarket). We provide guidelines for this [in our wiki](https://yunity.atlassian.net/wiki/spaces/FSINT/pages/46203075/How+to+build+and+maintain+cooperations+with+stores). Usually the agreement is that pick-ups happen regularly.

When a user goes there, they usually get a package of leftover food or get pointed to food that needs to be sorted. They can take the good stuff with them and throw the rest away. Afterwards, they distribute the food in their community.

## Are the tasks in the [Current discussion milestone](https://github.com/yunity/karrot-frontend/milestone/9) are the ones that are open to contributions from RGSoC candidates?

There are many tasks to work on; I listed some in the [RGSoC project description](https://teams.railsgirlssummerofcode.org/projects/207-karrot-foodsaving-worldwide). Until RGSoC starts in July, new ones will have arrived, and maybe some of them will already be implemented.

RGSoC applications are welcome to contribute to karrot anytime, also before July. Some good issues are the ["starter tasks"](https://github.com/yunity/karrot-frontend/issues?q=is%3Aopen+is%3Aissue+label%3Astarter-task).

## Can you please elaborate on the most critical features needed by the community?

All of [our issues](https://github.com/yunity/karrot-frontend/issues) are wishes by the community. I picked the ones that I found most important and feasible during RGSoC and listed them in the [project description](https://teams.railsgirlssummerofcode.org/projects/207-karrot-foodsaving-worldwide).

Actually, the most critical points are listed in the [current development](https://github.com/yunity/karrot-frontend/milestone/13) milestone, but they are usually not the best candidates for starter tasks because of high complexity.

## We would like to familiarise ourselves with this project. Could you please suggest something to get started with?

Please have a look at the ["starter tasks" issues](https://github.com/yunity/karrot-frontend/issues?q=is%3Aopen+is%3Aissue+label%3Astarter-task). It should take between one day and one week to solve one of them, depending on your knowledge and the complexity of the task. Don't hesitate to ask questions, either in the issue itself or in the #karrot-dev Slack channel

## What kind of GitHub workflow is currently followed for karrot-frontend and karrot-backend? Are [WIP] work-in-progress PRs permitted?

Before making a change, please comment on the respective issue that you are working on it (to avoid duplicate work). If no issue exists yet, feel free to create a new one.

Fork the repo that you are working on (karrot-frontend or karrot-backend), create a new branch and make the necessary changes. Run the tests and fix broken tests if necessary.

To get feedback on your approach, feel free to open a work-in-progress Pull Request, prefixed with `WIP:`. Members of the development team will have a look at the Pull Request and write a short review. In case you didn't get feedback within 24 hours, please mention your Pull Request in the #karrot-dev channel.

## I don't know how to get started with the project. I'm also confused about Quasar, Django REST Framework or another technology that you are using. Can you tell us more?

Regarding the frontend, you can find a introduction in the [CONTRIBUTE.md](https://github.com/yunity/karrot-frontend/blob/master/CONTRIBUTE.md), especially in the [last section](https://github.com/yunity/karrot-frontend/blob/master/CONTRIBUTE.md#used-tools-and-libraries).

Regarding the backend, there is a good [introduction in our docs](https://docs.karrot.world/backend-introduction.html), written by the RGSoC team of 2017.

In any case, please ask us questions in `#karrot-dev` (see first topic on this page)!