# What We Built

## Frontend

For this phase we managed to implement the basic feature of our UI. Specifically, we created the general layout including a header and side navigation bar. We also implemented a page to view all details about a ticket and allow users to interact with the notes. We also started implementing the list views for tickets. Due to the differing needs for each user this is still in its early stages, however we have carefully planned how to implement this successfully. For the GAPF requirements we created a document page to allow users to submit documents for the GAPF applications. We also added in a login page to help us move toward a more real-world ready application.

## Backend

We have implemented user authentication and authorization systems to allow secure logins and a variety of user roles. Our services are connected to an externally hosted MongoDB database. For these databases we have created the necessary models. The ability to retrieve and update tickets has been implemented in our Javelin service


# What We Didn’t Build

## Frontend

We still need to add some additional modularity to allow each user to have the appropriate view. While we have planned to do this we quickly realized the potential complexity without careful planning and execution. We are also in need of some testing to ensure the functionality of our frontend. In the interest of time we focused on functionality over reliability.

## Backend

In the backend we have not yet implemented tests for Ouroboros, our gateway to the microservices. We failed to setup local instances of MongoDB and thus moved to an externally hosted instance. We had hoped to connect out ticket service (Javelin) to the user service (Populous), but left this out to accomplish other tasks.

# Design Overview

![Services overview](https://i.imgur.com/RjTgBVy.png)

Figure 1. Services Overview

Requests related to ticket functionality are routed to Javelin, our ticket service, while tickets related to GAPF functionality are routed to Trident, our GAPF service. Both of these services are dependent on Populous, our applicant and faculty service.

# Technical Highlights


## Challenges

| Team Member | Challenges Faced                                                                                                                                                                                                                                                                                                     |
|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Pratiman    | - Try to use React and Redux, because he hasn't used it before - Setting up Kubernetes.                                                                                                                                                                                                                              |
| Abrar       | - Trying to understand how Thrift works (docs don't exist)                                                                                                                                                                                                                                                           |
| Vanshil     | - Getting up to speed with the latest javascript syntax (async function / await to be specific)<br> - learning about RPC and how to communicate across services                                                                                                                                                          |
| Calvin      | -Trying to use Redux, because he hasn’t had prior experience using it before.                                                                                                                                                                                                                                        |
| Jesse       | - Trying to setup MongoDB with Docker/Kubernetes<br> -     Implementing microservices using gRPC<br> - Debugging code that has been deployed via Docker/Kubernetes (logs were initially difficult to get a hold of    as we didn’t have a reliable method of doing so other than checking the current running pods individually) |
| David       | -Designing UI to adhere to Redux principles -Coordinating with backend developers to understand how I can interact with backend -Missed considerations at design time                                                                                                                                                |
|Lucas        |-Learning how to use gRPC and returning data from mongo with gRPC <br>-     Debugging with Docker/Kubernetes (updating services takes a long time and logging was challenging because there were 6 pods I was trying to watch)



## Interesting bugs, lessons learned, observations

Pratiman/Calvin:
* Interesting bugs: Although bcryptSync works with JavaScript, it is not recognized in ES6/ES7 and has to be replaced with bcrypt, wouldn't have known this without ESLint
* Lessons Learned: The significance of containerizing components with Docker and Kubernetes and how to operate these tools
* Observations with respect to technical highlights: Transforming the mutable state code from React to the immutable state rules of Redux is a complex learning curve

Jesse/Lucas/Vanshil:
* Interesting bugs: Not so much a bug but a technical challenge was understanding the importance of callbacks with respect to gRPC and how promisify helped to improve the readability of our server-side code (by leveraging async/await). Invalid use of promises, callbacks and async/await was causing calls to the endpoint to hang. Combined with the challenge of logging from docker and kubernetes made debugging difficult, as we would not get useful error messages to aid us with finding out where in the code the problem was located. We both ran into this issue while working on our services (Populous and Javelin) and worked together to resolve it.
* Lessons learned: gRPC errors can be very obscure at times which can block dev progress. Secondly, having to build/redeploy docker containers can be pretty time consuming for small code changes. Lastly, good logging is very important, fixing these problems was very challenging without real time logging of all pods.

Abrar/David:

* Observations with respect to technical highlights: While building the basis of our frontend we experienced a dilemma around how we handle object updates. By principle a POST request shall only return a status code, no body. When creating a timestamp, for example, we were uncertain as to how best we could create the timestamp server side and have it used on the frontend without making an additional call to the backend.


# Teamwork & Progress Reflection

## Shared Documents

Using Google Docs has allowed the team to work on P2 documents concurrently during team meetings. It made it quite simple to allow everyone to provide their input for documents that were meant to be submitted.

## Kanban and Meeting Logistics

Over the course of the project thus far, we have been able to consistently meet once  a week  to get weekly updates on each members progress and plan out tasks for the upcoming weeks. After each meeting, the GitHub Issues page and Kanban board was updated with the new tasks. Moreover, group members were diligent and updated the Kanban board and issues regularly. This was was critical for us as a group to be able to accurately track our progress.  

Although we were effective as a group at assigning tasks and updating our Github Projects, we did struggle with accurately gauging how long tasks would take to be completed. For the most part, we underestimated how long tasks would take. This was a largely a result of us not realizing how long it would take some group member to familiarize themselves with new technologies such as Kubernetes on the backend and Redux on the frontend.  

## Github/Git

As planned in P1, we have been using code reviews to ensure that no bad code is being pushed to our master branch. When making a pull request, each member has been required to have at least two people review and approve their changes prior to merging to the master branch. This has ensured that our code in the master branch is fully functional and of a high quality.    
    

# Phase 3 Plan

For the last phase of our project we plan to complete the frontend and connect it to the backend. This will include the addition of more views on the frontend and testing with real endpoints to ensure our expectations meet reality. For the backend we aim to finish implementing

We would also like to add more thorough test cases for the various services.


# Artifacts
## Kanban Boards

### Trident

![Trident](https://i.imgur.com/Ll8uFzO.png)

### Ouroboros

![Ouroboros](https://i.imgur.com/xNnPFQ8.png)

### Populous

![Populous](https://i.imgur.com/mS9nYEv.png)

### Scythe

![Scythe](https://i.imgur.com/RAbpe0R.png)

### Trident

![Trident](https://i.imgur.com/Tv201PQ.png)


## Code Reviews

- [Backend Comments](https://github.com/csc302-winter-2018/proj-Pied_Piper/pull/54)
- [Frontend Comments](https://github.com/csc302-winter-2018/proj-Pied_Piper/pull/55)


