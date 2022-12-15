# Ecommerce-app

## API Setup

- How to generate ssh key: [https://jdblischak.github.io/2014-09-18-chicago/novice/git/05-sshkeys.html]
- 1. project setup
  - create front end and back end
  - create an express server
  - setup export & import
  - setup environment variabdbles & gitignore
  - setup morgan, chalk, cors
  - setup mvc for register and login
- 2. Database setup
  - connect to mongodb atlas database / loacl mongodb
- 3. User API
  - User model and schema with validations for user
  - register the user: /api/register
    - validate the data from the request body
    - get the data from the request body
    - return error if user already exist with the given email
    - hash the password
    - generate the token; pass the user input inside token
    - for jwt secret key: require("crypto").randomBytes(64).toString('hex');
    - send email for activation
  - User activation route
    - get the token from the request body
    - return error if token not found
    - verify token; if error then show link expired
      - decode the data: jwt.decode(token);
      - check user already exist or not using email
      - save the user in database
  - login the user
    - validate the data from the request body
    - get the data from the request body
    - return error if user does not exist with the given email
    - if the password is not matched then send error response
    - create a token & send it as a response along with user info
  - Reset password
  - forgot password
  - Authorization / protecting routes in server
    - create isLoggedIn middleware
    - get the token from reuest headers: req.headers.authorization
    - verify the token
    - if verified then set the decoded data
      and set the data (example: user id) in the request body and go to next
    - catch error: res.json(401).json(error)
  - Authorization / protecting routes in server based on Admin
    - get the user id from request body
    - find the user with the id
    - if user is not found then send an error response
    - check whether user is admin or not
    - if not then send error response: res.status(401).json({
      error: "Unauthorized user",
      }
    - if admin go to next
    - catch error: res.json(401).json(error)
- 4. Category API
  - Create category schema and model
    - name, slug (how to use slugify npm)
    - [slug](https://itnext.io/whats-a-slug-f7e74b6c23e0)
  - Create category validations
  - Create category routes
  - Category CRUD Operations
- 5. Product API
  - create product schema and model
    - ref Category model
  - create product validation
  - create product routes and controllers
  - upload file using formidable / express-formidable / multer
  - get products
  - get single product
  - delete product
  - update product

## Front end Setup

- create react app
- create pages
- create routes

## Cart Management

## Payment integration

## Order Management for User

- backend: when payment is successfully processed
  - create an order schema and model
  - store the order in database
- front end:
  - create a route for /dashboard/user/orders and also a page (UserOrder)
  - redirect the user to order page
  - show all orders in the order page if user is logged in
    - create a route GET: /orders
    - fetch the data in the front end if user is logged in
    - display orders status in a table
    - display each order's products
    - decrement the stock each time a product is sold (Very very important)

## Order Management for Admin

- create a route for /dashboard/admin/orders and also a page (reuse the AdminOrder)
- create a route for fetching all orders (add isLoggedIn, isAdmin middleware as well)
- fetch all the data in front end and set in a state
- update the status of product

  - add a drop down menu with 5 statuses - not processed, processing, shipped, delivered, cancelled
  - get the selected status from drop down menu
  - Passing multiple parameters to onChange in React
  - update the backend order database with the selected status based on order id

## Order Status email

- Order status email: send email to the user if the order status is changed
