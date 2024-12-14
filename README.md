# Web Development Project

This repository contains the source code for a modern web application built using JavaScript. The project incorporates a modular architecture and is powered by the Lit framework for creating web components. Key features include user authentication, task management, widgets, and a dynamic calendar.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Features](#features)
- [Requirements](#requirements)
- [How to Use](#how-to-use)
- [Contributing](#contributing)

## Overview

The **Web Development Project** is designed to be a fully functional and modular web application. It demonstrates modern JavaScript development techniques and includes components for managing user authentication, displaying advertisements, managing tasks, and providing utilities like a BMI calculator and a calendar widget.

## Getting Started

To get started with the project, clone the repository to your local machine:

Install the required dependencies:

```bash
npm install
```

Run the application locally:

```bash
npm start
```

## Project Structure

- **auth.js**: Handles user authentication, including login and logout functionalities.
- **config.js**: Configures the backend URL for API requests.
- **main.js**: The entry point for the application. Initializes the main UI and imports components.
- **models.js**: Manages the application's data model, including tasks.
- **router.js**: Implements a custom router for navigating between different views.
- **Widgets**: A collection of web components providing interactive features:
  - **ad-widget.js**: Displays advertisements.
  - **blog-block.js**: Fetches and displays blog posts from an API.
  - **bmi-widget.js**: Calculates Body Mass Index (BMI).
  - **calendar-widget.js**: Displays a calendar with task due dates.
  - **create-task.js**: Provides a form to create new tasks.
  - **edit-task.js**: Allows users to edit task details through a modal dialog.
  - **login-widget.js**: Manages user login and logout functionality.
  - **mood-widget.js**: Displays a widget reflecting the user's current task status.
  - **task-board.js**: Displays categorized task boards (ToDo, Doing, Done).
  - **task-card.js**: Represents individual tasks within the task board.
  - **task-manager.js**: Manages and renders the task boards.
  - **time-task-widget.js**: A timer widget to manage task duration.
  - **widget-block.js**: A customizable placeholder widget.
  - **widget-container.js**: A container to organize multiple widgets.

## Features

- **User Authentication**:
  - Login and logout functionality.
  - Stores user data in `localStorage` for session persistence.

- **Task Management**:
  - Create, update, and delete tasks.
  - Categorize tasks and view tasks by date.

- **Widgets**:
  - **BMI Calculator**: Calculate and display BMI.
  - **Calendar**: Highlight task due dates.
  - **Blog Posts**: Display dynamic content from an external API.
  - **Mood Widget**: Reflect task completion status.
  - **Time Task Widget**: Timer for managing task durations.

- **Dynamic UI**:
  - Built with the Lit framework for responsive and efficient web components.
  - Modular and maintainable architecture.

## Requirements

- Node.js and npm installed locally.
- A modern web browser supporting ES6+.

## How to Use

1. Clone the repository and install dependencies as described in the [Getting Started](#getting-started) section.
2. Run the application locally using `npm start`.
3. Open your browser and navigate to `http://localhost:3000` to explore the application.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Submit a pull request with a detailed description of your changes.

