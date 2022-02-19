# TU-Makerspace-Card-Reader
### Card reader system for Tulane MakerSpace, built with React frontend and Node.JS (Express API with Sequelize to interact with mySQL database)

## Scope
### Frontend (in progress):
- Machine Tablet Views: Webpages for different control tablets mounted in the space, where users who are authorised can activate machines after tapping their RFID card. (in progress)
- Register View: Register a new user, requires login from fabTech (in progress)
- Train View: Update a user's trainings to allow access to machines, requires login from fabTech (in progress)
- Audit View: View user logs and machine logs, requires login from admin (in progress)
- Tagout View: Tag out/in and comment on machine status, notifies machine expert, requires login from fabTech (in progress)

### Backend (in progress):
#### Api Calls (complete)
##### These interact with the mySQL database of users. Coming soon is logging of these actions as well as logging machine use and tagouts.
- POST /api/users/ creates a new user, requires login
    REQUIRES: name, splash, email (no @tulane), id (unique int, should be card number), user (username of authenticating fabTech/admin), authPassword (password of authenticating fabTech/admin)
- GET /api/users/ returns all user data, not including password (passwords are hashed but should still not be accessible that feels wrong)
- GET /api/users/fabTech returns all fabTech users, I dont know why i made this call, kinda useless. It's also broken atm.
- GET /api/users/:id returns a user with specified id. id is the card number of their RFID card.
- PUT /api/users/:id updates a user with specified id. id is the card number of their RFID card. (requires user and authPassword of fabTech/Admin)
- DELETE /api/users/:id deletes a user with specified id. (requires user and authPassword of fabTech/Admin)

Similar api calls are availible for the machines sql table, go to machine.routes.js to see them.

Basically the backend is in a working state, with new features to be added as neccesary. time to get working on that frontend.

