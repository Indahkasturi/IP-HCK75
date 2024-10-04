# IP-HCK75

Endpoints Server Side:

List of available endpoints :


-post register
-post login
-post loginGoogle

use(authentication)

-get /
-post cart/:id'
-get /cart
-delete /deletecart/:id'
-get /admin, isAdmin
-post /addAlbum', isAdmin
-put /update/:id', isAdmin
-delete /delete/:id', isAdmin

1. Endpoint: /register
Method: POST
Description: Registers a new user.
Response:
Success: Returns a success message.
Failure: Error message (validation errors).

2. Login a User
Endpoint: /login
Method: POST
Description: Logs in a user with email and password.
Response:
Success: Returns a token and user information.
Failure: Error message ( invalid credentials).

3. Google Login
Endpoint: /loginGoogle
Method: POST
Description: Logs in a user using their Google account.
Success: Returns a token and user information.
Failure: Error message.

4. Get Home (Album List)
Endpoint: /
Method: GET
Description: Fetches the list of available albums.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns an array of albums.

5. Add Album to Cart
Endpoint: /cart/:id
Method: POST
Description: Adds an album to the user's cart.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns the updated cart.
Failure: Error message (
    album not found, unauthorized access).

6. Get User Cart
Endpoint: /cart
Method: GET
Description: Fetches the user's cart.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns the user's cart.

7. Delete Album from Cart
Endpoint: /deletecart/:id
Method: DELETE
Description: Removes an album from the user's cart.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns the updated cart after deletion.
Failure: Error message (
    album not in cart, unauthorized access).


Here’s an API documentation for the routes defined in your Express.js app.

API Documentation
User Routes
1. Register a User
Endpoint: /register
Method: POST
Description: Registers a new user.
Request Body:
json
Copy code
{
  "username": "string",
  "email": "string",
  "password": "string"
}
Response:
Success: Returns a success message.
Failure: Error message (
    validation errors).
2. Login a User
Endpoint: /login
Method: POST
Description: Logs in a user with email and password.
Request Body:
json
Copy code
{
  "email": "string",
  "password": "string"
}
Response:
Success: Returns a token and user information.
Failure: Error message (
    invalid credentials).
3. Google Login
Endpoint: /loginGoogle
Method: POST
Description: Logs in a user using their Google account.
Request Body:
json
Copy code
{
  "idToken": "string"
}
Response:
Success: Returns a token and user information.
Failure: Error message.
Album Routes (Authentication Required)
4. Get Home (Album List)

Endpoint: /
Method: GET
Description: Fetches the list of available albums.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns an array of albums.
Failure: Error message (
    unauthorized access).
Cart Routes (Authentication Required)

5. Add Album to Cart
Endpoint: /cart/:id
Method: POST
Description: Adds an album to the user's cart.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns the updated cart.
Failure: Error message (
    album not found, unauthorized access).

6. Get User Cart
Endpoint: /cart
Method: GET
Description: Fetches the user's cart.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns the user's cart.
Failure: Error message (
    cart is empty, unauthorized access).

7. Delete Album from Cart
Endpoint: /deletecart/:id
Method: DELETE
Description: Removes an album from the user's cart.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns the updated cart after deletion.
Failure: Error message (album not in cart, unauthorized access).
Admin Routes (Admin Only)

8. Admin Home
Endpoint: /admin
Method: GET
Description: Fetches the admin dashboard and list of all albums.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns the list of albums.
Failure: Error message (unauthorized access).

9. Add New Album
Endpoint: /addAlbum
Method: POST
Description: Adds a new album to the collection.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns the added album.
Failure: Error message (validation errors, unauthorized access).

10. Update Album by ID
Endpoint: /update/:id
Method: PUT
Description: Updates the album details by album ID.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns the updated album.
Failure: Error message (album not found, unauthorized access).

11. Delete Album by ID
Endpoint: /delete/:id
Method: DELETE
Description: Deletes an album by album ID.
Headers:
Authorization: Bearer <token>
Response:
Success: Returns a success message.
Failure: Error message (album not found, unauthorized access).






