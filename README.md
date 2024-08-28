# Task-Management

A simple task management application built with React Native that includes functionalities for both admins and users. Admins can assign tasks with deadlines, while users can create, complete, and view tasks.

Features
Admin Dashboard:

Assign tasks to users.
Set deadlines for tasks.
View all assigned tasks.


User Dashboard:

Create new tasks.
View assigned tasks.
Complete pending tasks.


Technologies Used

React Native: Framework for building the app.
AsyncStorage: For local storage of tasks and user data.
DateTimePicker: For selecting deadlines.

Installation

Prerequisites
Node.js (version 17 or higher)
React Native CLI
Clone the Repository
bash
Copy code
git clone https://github.com/singhprakash14/task-management-app.git
cd task-management-app
Install Dependencies
bash
Copy code
npm install
Run the Application
For Android:

bash
Copy code
npx react-native run-android
For iOS:

bash
Copy code
npx react-native run-ios

Usage

Admin Dashboard

Create Tasks: Enter the task details and assign it to a user.
Set Deadlines: Choose a deadline for the task.
View Tasks: See all tasks assigned to users.

User Dashboard

Create Tasks: Create tasks for yourself.
Complete Tasks: Mark tasks as completed.
View Assigned Tasks: View tasks assigned by the admin.

File Structure

AdminDashboard.js:
Admin dashboard component for task management.

UserDashboard.js:
User dashboard component for task management.

App.js:
Main application file.

styles.js:
Contains styling for components.

Contributing
Contributions are welcome! If you’d like to contribute to this project, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Create a new Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

