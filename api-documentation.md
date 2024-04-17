## USER AUTHENTICATION/AUTHORIZATION

### All endpoints that require authentication

All endpoints that require a user to be logged in.

* Request: Endpoints that require authentication

* Error Response: Require authentication
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Authentication required"
    }
    ```

### All endpoints that require proper authorization

All endpoints that require authentication and the user does not have the
correct role(s) or permission(s).

* Request: Endpoints that require proper authorization

* Error Response: Require proper authorization
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Forbidden"
    }
    ```

### Sign Up a User

Creates a new user, logs them in as the current user, and returns the user's information.

* Require Authentication: false

* Request
  * Method: POST
  * URL: '/api/auth/signup'
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "username": "SpikeSpiegel",
      "email": "spikespiegel@email.com",
      "password": "password"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "username": "SpikeSpiegel",
      "email": "spikespiegel@email.com"
    }
    ```

* Error response: User already exists with the specified username or email
  * Status Code: 500
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "User already exists",
      "errors": {
        "username": "Username is already in use",
        "email": "Email address is already in use"
      }
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "username": "Username is required",
        "email": "Invalid email",
        "password": "Password is required"
      }
    }
    ```

### Log In a User

Logs in a user with valid credentials and returns the user's information.

* Require Authentication: false

* Request
  * Method: POST
  * URL: '/api/auth/login'
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "credential": "spikespiegel@email.com",
      "password": "password"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "username": "SpikeSpiegel",
      "email": "spikespiegel@email.com"
    }
    ```

* Error Response: Invalid credentials
  * Status Code: 401
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Invalid credentials"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "credential": "Username or email is required",
        "password": "Password is required"
      }
    }
    ```

### Get the Current User

Returns the information about the user that is logged in.

* Require Authentication: false

* Request
  * Method: GET
  * URL: '/api/auth/current'
  * Body: none

* Successful Response when there is a logged-in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "id": 1,
      "username": "SpikeSpiegel",
      "email": "spikespiegel@email.com"
    }
    ```

* Successful Response when there is no logged-in user
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "user": null
    }
    ```

### Log Out the Current User

Logs out the user.

* Require Authentication: true

* Request
  * Method: DELETE
  * URL: '/api/auth/logout'
  * Headers:
    * Content-Type: application/json
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Success"
    }
    ```

## CARTS

### Get Cart

Returns all items in the current user's cart.

* Require Authentication: true

* Request
  * Method: GET
  * URL: '/api/carts/current'
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Items": [
        {
          "product_id": 17,
          "upc": 1234567890000000,
          "name": "FTL Booster A7 Series",
          "category": "space travel",
          "subcategory": "spacecraft essentials",
          "price": 12000000,
          "condition": "New",
          "quantity": 1
        }
      ]
    }
    ```

### Add Product to Cart

Adds a product to the current user's cart and returns the product.

* Require Authentication: true

* Request
  * Method: POST
  * URL: '/api/carts/current/<product_id>'
  * Body:

    ```json
    {
      "quantity": 1
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "product_id": 17,
      "upc": 1234567890000000,
      "name": "FTL Booster A7 Series",
      "category": "space travel",
      "subcategory": "spacecraft essentials",
      "price": 12000000,
      "condition": "New",
      "quantity": 1
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "quantity": "Invalid quantity"
      }
    }
    ```

* Error response: Product already in cart
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product already in cart"
    }
    ```

* Error response: Insufficient stock
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "quantity": "Quantity exceeds available stock"
      }
    }
    ```

* Error response: Product couldn't be found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

### Update Product Quantity in Cart

Updates the quantity of a product in the current user's cart and returns the product.

* Require Authentication: true

* Request
  * Method: PUT/PATCH
  * URL: '/api/carts/current/<product_id>'
  * Body:

    ```json
    {
      "quantity": 2
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "product_id": 17,
      "upc": 1234567890000000,
      "name": "FTL Booster A7 Series",
      "category": "space travel",
      "subcategory": "spacecraft essentials",
      "price": 12000000,
      "condition": "New",
      "quantity": 2
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "quantity": "Invalid quantity"
      }
    }
    ```

* Error response: Insufficient stock
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "quantity": "Quantity exceeds available stock"
      }
    }
    ```

* Error response: Product not in user's cart
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

### Remove Product from Cart

Removes a product from the current user's cart.

* Require Authentication: true

* Request
  * Method: DELETE
  * URL: '/api/carts/current/<product_id>'
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully removed"
    }
    ```

* Error response: Product not in user's cart
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

## PRODUCTS

### Get All Products

Returns all products in the store.

* Require Authentication: false

* Request
  * Method: GET
  * URL: '/api/products'
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Products": [
        {
          "product_id": 17,
          "seller_id": 2,
          "upc": 1234567890000000,
          "name": "FTL Booster A7 Series",
          "category": "space travel",
          "subcategory": "spacecraft essentials",
          "price": 12000000,
          "condition": "New",
          "description": "<<Product description>>",
          "details": "<<Product details>>",
          "stock": 2,
          "previewImage": "<<Image url>>"
        }
      ]
    }
    ```

### Get Product Details

Returns the details of a product specified by id.

* Require Authentication: false

* Request
  * Method: GET
  * URL: '/api/products/<product_id>'
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "product_id": 17,
      "seller_id": 2,
      "upc": 1234567890000000,
      "name": "FTL Booster A7 Series",
      "category": "space travel",
      "subcategory": "spacecraft essentials",
      "price": 12000000,
      "condition": "New",
      "description": "<<Product description>>",
      "details": "<<Product details>>",
      "stock": 2,
      "Images": [
        {
          "image_id": 35,
          "url": "<<Image url>>",
          "thumbnail": true
        }
      ]
    }
    ```

* Error response: Product couldn't be found
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

### Add Product

Adds a new product for sale to the store and returns it.

* Require Authentication: true

* Request
  * Method: POST
  * URL: '/api/products'
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "upc": 1234567890000000,
      "name": "FTL Booster A7 Series",
      "category": "space travel",
      "subcategory": "spacecraft essentials",
      "price": 12000000,
      "condition": "New",
      "description": "<<Product description>>",
      "details": "<<Product details>>",
      "stock": 2
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "product_id": 17,
      "seller_id": 2,
      "upc": 1234567890000000,
      "name": "FTL Booster A7 Series",
      "category": "space travel",
      "subcategory": "spacecraft essentials",
      "price": 12000000,
      "condition": "New",
      "description": "<<Product description>>",
      "details": "<<Product details>>",
      "stock": 2
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "name": "Name is required",
        "category": "Category not found",
        "subcategory": "Subcategory not found",
        "price": "Invalid price",
        "condition": "Condition is required",
        "description": "Description is required",
        "stock": "Invalid stock quantity"
      }
    }
    ```

### Edit Product

Updates and returns a product belonging to the current user.

* Require Authentication: true
* Require Authorization: Product must belong to the current user

* Request
  * Method: PUT/PATCH
  * URL: '/api/products/<product_id>'
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "price": 11000000,
      "description": "<<New product description>>",
      "details": "<<New product details>>",
      "stock": 3
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "product_id": 17,
      "seller_id": 2,
      "upc": 1234567890000000,
      "name": "FTL Booster A7 Series",
      "category": "space travel",
      "subcategory": "spacecraft essentials",
      "price": 11000000,
      "condition": "New",
      "description": "<<New product description>>",
      "details": "<<New product details>>",
      "stock": 3
    }
    ```

* Error Response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "category": "Category not found",
        "subcategory": "Subcategory not found",
        "price": "Invalid price",
        "stock": "Invalid stock quantity"
      }
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

### Remove Product

Removes a product belonging to the current user from the store.

* Require Authentication: true
* Require Authorization: Product must belong to the current user

* Request
  * Method: DELETE
  * URL: '/api/products/<product_id>'
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

## PRODUCT REVIEWS

### Get All Reviews for Product

Returns all reviews for the specified product.

* Require Authentication: false

* Request
  * Method: GET
  * URL: '/api/product-reviews/<product_id>'
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "Reviews": [
        {
          "review_id": 5,
          "user_id": 3,
          "product_upc": 1234567890000000,
          "rating": 5,
          "review_text": "<<Review text>>"
        }
      ]
    }
    ```

### Create Product Review

Creates and returns a new review for the specified product.

* Require Authentication: true

* Request
  * Method: POST
  * URL: '/api/product-reviews/<product_id>'
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "rating": 5,
      "review_text": "<<Review text>>"
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review_id": 5,
      "user_id": 3,
      "product_upc": 1234567890000000,
      "rating": 5,
      "review_text": "<<Review text>>"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "rating": "Invalid rating",
        "review_text": "Review text required"
      }
    }
    ```

* Error response: Product does not have a UPC
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Cannot leave reviews for unregistered goods",
    }
    ```

* Error response: Couldn't find a product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

### Edit Product Review

Updates and returns a user's existing product review.

* Require Authentication: true
* Require Authorization: Review must belong to the current user

* Request
  * Method: PUT/PATCH
  * URL: '/api/product-reviews/<product_id>'
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "rating": 4,
      "review_text": "<<Updated review text>>"
    }
    ```

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "review_id": 5,
      "user_id": 3,
      "product_upc": 1234567890000000,
      "rating": 4,
      "review_text": "<<Updated review text>>"
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "rating": "Invalid rating"
      }
    }
    ```

* Error response: Couldn't find a review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

### Delete Product Review

Deletes a review belonging to the current user.

* Require Authentication: true
* Require Authorization: Review must belong to the current user

* Request
  * Method: DELETE
  * URL: '/api/product-reviews/<product_id>'
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find a review with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Review couldn't be found"
    }
    ```

## PRODUCT IMAGES

### Add Product Image

Creates and returns a new image for a product specified by id.

* Require Authentication: true
* Require Authorization: Product must belong to the current user

* Request
  * Method: POST
  * URL: '/api/products/<product_id>/images'
  * Body:

    ```json
    {
      "url": "<<Image url>>",
      "thumbnail": true
    }
    ```

* Successful Response
  * Status Code: 201
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "image_id": 35,
      "product_id": 17,
      "url": "<<Image url>>",
      "thumbnail": true
    }
    ```

* Error response: Body validation errors
  * Status Code: 400
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Bad Request",
      "errors": {
        "url": "Image url required"
      }
    }
    ```

* Error response: Cannot add any more images
  * Status Code: 403
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Maximum number of images was reached"
    }
    ```

* Error response: Couldn't find product with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Product couldn't be found"
    }
    ```

### Delete Product Image

Deletes a product image specified by id.

* Require Authentication: true
* Require Authorization: Product must belong to the current user

* Request
  * Method: DELETE
  * URL: '/api/images/<image_id>'
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted"
    }
    ```

* Error response: Couldn't find image with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Image couldn't be found"
    }
    ```
