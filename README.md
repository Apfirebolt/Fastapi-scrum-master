# Scrum Master Kanban Board using React and FAST API

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

## Tech Stack

The project back-end is created using Fast API in Python and React is used for the front-end. Tailwind CSS classes are used to style the UI components. It uses "react-form-hooks" for validating forms and Redux for state management. For the database "Postgres" has been used.

## Introduction

It is a simple Kanban board application where you have four status 'To Do', 'In Progress', 'In Review' and 'Done'. You can create a generic task item and then through Kanban drag and drop dashboard, you can move items and save the updated status.

It has supoort for multi-user authentication.

## Updates

27/12/22 : Added Admin panel with support of being able to add users and tasks, modify any user or task for admin role user type.

## Screenshots

The style might be a subject to change in the future for this project. But, as of now this is how few pages look like

Add Task form.

![alt text](./screenshots/add_task.PNG)

Kanban board displaying all the tasks which is the core feature of this application.

![alt text](./screenshots/kanban.PNG)

## Deployment

In future I plan to write YAML script to deploy this on local using Docker containers.






