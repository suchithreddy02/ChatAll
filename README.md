# ChatBuddy
## Introduction
Chat Buddy is a real-time web application that facilitates multiple users to engage in conversations. This report provides an overview of the application's architecture, key features, and technologies used for both the frontend and backend development. The application is designed to allow users to log in, join chat rooms, see a list of active users, send messages, and receive real-time updates.

## FrontEnd Development
The frontend of Chat Buddy is developed using React, a popular JavaScript library for building user interfaces. It consists of two main pages: the login page and the chat page. Here's a detailed overview of the frontend development:

- ### Login Page
  - Users access the application by visiting the login page, where they can enter their credentials.
  - React Router is used for handling routes, ensuring smooth navigation between pages.
  - User authentication is performed, and upon successful login, users are redirected to the chat 
    page.

   
![LoginPage](https://github.com/suchithreddy02/ChatBuddy/assets/56992293/43cd2d0e-a815-460d-aad1-13818eeb5ea6)

- ### Chat Page
  - The chat page is the core of the application, where users can engage in real-time conversations.
  - Key components include the chat window, user list, and message input area.
  - React Context is utilized for state management, allowing data sharing (e.g., username) between components efficiently.
  - Socket.IO is integrated to handle real-time communication between users. It triggers events for user login, messages, and disconnections.
  - The user list is dynamically updated when new users log in or existing users log out. React's reactivity ensures seamless UI updates.

![LoginPage](https://github.com/suchithreddy02/ChatBuddy/assets/56992293/449e98e4-6351-415b-9ada-66fdded85d21)

##BackEnd Development
The backend of Chat Buddy is built using Node.js, Express.js, and MongoDB. It provides the necessary RESTful APIs for user registration, retrieval of active user lists, and handling WebSocket connections for real-time updates. Below is a detailed breakdown of the backend development:
- ### Node.js and Express.js:
   - Node.js is used as the runtime environment, while Express.js serves as the web application framework.
   - Express.js simplifies the creation of RESTful APIs for user registration and user list retrieval.
- ### MongoDB Database:
   - MongoDB is chosen as the database to store user data, including their login status.
   - CRUD operations are implemented to create, read, update, and delete user records based on user actions like login, log out, and disconnection.
- ### Socket.IO Integration:
   - Socket.IO is used for real-time communication between clients and the server.
   - It facilitates events like user login, message sending, and user disconnection.
   - When a user logs in or out, the server emits events to update the active user list on the frontend in real-time.

 ## Key Features
- **User Authentication:** Users can log in securely using their credentials.
- **Real-time Messaging:** Users can engage in real-time conversations with other active users in the chat room.
- **Active User List:** The application displays a list of currently active users, updating in real-time as users log in or out.
- **Data Persistence:** User data, including login status, is stored in a MongoDB database, ensuring persistence between sessions.
- **RESTful APIs:**  RESTful APIs are available for user registration and retrieval of active user lists.
- **WebSocket Integration:** Socket.IO is used for WebSocket communication, enabling real-time updates and notifications.

## Conclusion
Chat Buddy is a real-time web application built using React for the frontend and Node.js, Express.js, MongoDB, and Socket.IO for the backend. It provides a seamless user experience, allowing users to log in, chat with others, and see an updated list of active users. The combination of frontend and backend technologies ensures efficient communication and data management, making Chat Buddy a robust and responsive chat application.






