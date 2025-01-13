# IP-HCK75

## List of available endpoint:s 


-POST register
-POST login
-POST loginGoogle

-authentication-

-GET /
-POST cart/:id'
-GET /cart
-DELETE /deletecart/:id'
-GET /admin, isAdmin
-POST /addAlbum', isAdmin
-PUT /update/:id', isAdmin
- PATCH /album/:id/imageUrl, isAdmin
-delete /delete/:id', isAdmin
-GEt /admin


## 1. Register a User
- **Endpoint:** /register
- **Method:** POST
- **Description:** Registers a new user.
- **Response:**
Success: Returns a success message.
Failure: Error message (validation errors).

## 2. Login a User
- **Endpoint:** /login
- **Method:** POST
- **Description:** Logs in a user with email and password.
- **Response:**
Succe:ss Returns a token and user information.
Failu:re Error message (invalid credentials).

## 3. Google Login
- **Endpoint:** /loginGoogle
- **Method:** POST
- **Description:** Logs in a user using their Google account.
- **Response:**
Succe:ss Returns a token and user information.
Failu:re Error message.
Album Routes (Authentication Required)

## 4. Get Home (Album List)
- **Endpoint:** /
- **Method:** GET
- **Description:** Fetches the list of available albums.
Headers:
Authorization: Bearer <token>
- **Response:**
Succe:ss Returns an array of albums.
Failu:re Error message ( unauthorized access).
Cart Routes (Authentication Required)

## 5. Add Album to Cart
- **Endpoint:** /car:t/id
- **Method:** POST
- **Description:** Adds an album to the user's cart.
Headers:
Authorization: Bearer <token>
**Response:**
Succe:ss Returns the updated cart.
Failu:re Error message (album not found, unauthorized access).

## 6. Get User Cart
**Endpoint:** /cart
**Method:** GET
**Description:** Fetches the user's cart.
Heade:rs
Authorizati:on Bearer <token>
**Response:**
Succe:ss Returns the user's cart.
Failu:re Error message ( cart is empty, unauthorized access).

## 7. Delete Album from Cart
**Endpoint:** /deletecar:t/id
**Method:** DELETE
**Description:** Removes an album from the user's cart.
Heade:rs
Authorizati:on Bearer <token>
**Response:**
Succe:ss Returns the updated cart after deletion.
Failu:re Error message (album not in cart, unauthorized access).
Admin Routes (Admin Only)

## 8. Admin Home
**Endpoint:** /admin
**Method:** GET
**Description:** Fetches the admin dashboard and list of all albums.
Heade:rs
Authorizati:on Bearer <token>
**Response:**
Succe:ss Returns the list of albums.
Failu:re Error message (unauthorized access).

## 9. Add New Album
**Endpoint:** /addAlbum
**Method:** POST
**Description:** Adds a new album to the collection.
Heade:rs
Authorizati:on Bearer <token>
**Response:**
Succe:ss Returns the added album.
Failu:re Error message (validation errors, unauthorized access).

## 10. Update Album by ID
**Endpoint:** /updat:e/id
**Method:** PUT
**Description:** Updates the album details by album ID.
Heade:rs
Authorizati:on Bearer <token>
**Response:**
Succe:ss Returns the updated album.
Failu:re Error message (album not found, unauthorized access).

## 11. Delete Album by ID
**Endpoint:** /delet:e/id
**Method:** DELETE
**Description:** Deletes an album by album ID.
Heade:rs
Authorizati:on Bearer <token>
**Response:**
Succe:ss Returns a success message.
Failu:re Error message (album not found, unauthorized access).






