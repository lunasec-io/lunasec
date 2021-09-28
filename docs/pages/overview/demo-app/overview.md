---
id: "overview"
title: "Demo App Overview"
sidebar_label: "Overview and Startup"
sidebar_position: 1
---

# Demo Applications
 TODO: FIX THE GITHUB LINKS IN THIS PAGE WHEN WE PUBLISH, DONT FORGET TO POINT TO MASTER BRANCH

The demo applications show how to integrate LunaSec into a modern web application.  The frontend uses React with MaterialUi
and the backend server demonstrates both Express and GraphQL.

![demo screenshot](/img/demo-app-homepage.png)

As you can see in the top right corner, the app can switch between several modes to test how LunaSec works with different systems.

## Running it
You can run it by cloning our repository and running `yarn start:demo`.  This will start the containers using docker-compose.
A local development copy of AWS will be used, so no credentials needed.  The demo app should now be running at [http://localhost:3000](http://localhost:3000).  
Use the buttons in the top right corner if you would like to change the mode.

Please see [Code Walkthrough](/pages/overview/demo-app/walkthrough) for an explanation of how the demo app is structured.