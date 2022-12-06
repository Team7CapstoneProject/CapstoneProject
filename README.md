# CapstoneProjectFrontEnd

--------------------------DEV NOTES FOR THE INSTRUCTORS--------------------------
If the product page doesn't populate, there might be something wrong with the Render server. If there is, please let us know on Slack and one of us can restart it for you! Render terminates the database pretty frequently and we're not sure why. We don't have autodeploy on.

If you want to log in as an admin and test out the admin functions, type in admin for both username and password. This account will be the master admin account and will differentiate itself from the other admin accounts by being un-deletable and its account information uneditable. This is because there must always be one admin account in the website.

Any mention of admin after this will apply to any other administrator (whether seeded or promoted.)

The guest user MUST sign in as a guest or else you cannot see the cart button nor can you add products to cart. The button will physically not be there. They can however look at the product and visit a detailed view of it.

A logged in guest cannot delete themselves or edit their account information. The "My Account" button won't even be visible. They can however add products to their cart and checkout. The logged in user's cart will persist.

Almost all user feedback will be located at the top of the screen in the white block above the navbar.

--------------------------LOG IN & REGISTER--------------------------
You can register yourself using any combination of letters and numbers for any of the fields in the form. The password however needs a minimum of 8 characters. Once registered, you will be redirected to the home page and a welcome message will greet you on top of the page. If an email is already taken, it will present you with an error message.

Logging in is the same process. If either the email or password is wrong, you will be given a message.
--------------------------MY ACCOUNT--------------------------
Any user (that is not a master admin or guest user) will be able to edit their information here. The only info that they can't update is the password. We didn't have enough time to figure out how to re-hash it. Any change (if accepted or not) will result in a message located above the navbar. Not all fields have to be filled in order to change the user's info, but if all the fields are empty, an error message will display for the user. 

If the user decides to delete the account, they will be navigated back to the home page and a goodbye message will pop up above the navbar.

There will also be two buttons that will link you to your cart and your order history.

--------------------------ADMIN DASHBOARD--------------------------
The admin dashboard will have its own navbar with 3 buttons on it. Each button can toggle its respective component on and off but is only programmed to show one component at a time. What this means is that if the admin clicks on the "SEE ALL USERS" button, any other active tab will be turned off, that way it keeps the page clean. The three tabs are as follows: 

CREATE PRODUCT
Any admin can create a new product. All products created will not be on sale yet. If a created product has the same name as an existing product, an error message will be displayed for the admin. 

SEE ALL USERS
Any admin can see all the users and promote or delete any account (user or admin)that isn't the guest user or the master admin account. If a user is promoted to admin status, they cannot be demoted back to user. The admin however can delete the account regardless of admin status. There is also a filter function that filters any users by any of the values in their key-value pair.

SEE ALL PRODUCTS
Any admin can see all the products and delete or edit the product. When the edit button is pressed, the delete button is hidden to keep the admin from accidentally deleting it while in the process of updating. This is where the admin can apply a sales percentage if the product is set to be on sale. If the product is not set to sale, the sales percentage will automatically be set to null. If the percentage is above 100 or below 0, an error message will be displayed to the admin. If a name is shared with an existing product, a message will be displayed. All the products in the admin dashboard will update state to reflect the sale percentage and discounted price. Not all fields have to be filled in in order to update the product. Any empty fields will retain the original value of the key-value pair. There is also a filter function that filters any products by its name. 


If the page is refreshed or if you go to another button on the navbar, the admin dashboard will auto-reload to display all users when you return to it. 

--------------------------PRODUCTS--------------------------
Once logged in, any user can see and filter the products, look at the detailed view, add product to cart (for both the main product page and the detailed product page.)
The "CART" button in the navbar will update state showing you how many UNIQUE items you have in your cart. Adding more products will update the number of products in the cart as well. A user CANNOT add more of the same product into the cart. They must go into the cart in order to increase or decrease its quantity.

If the product inventory is 0, it will show to be out of stock. If the product inventory is less than 10, then it will show that it only has a few items left. If the product has more than 10 units, it will display as available. 

If the product is on sale, a red banner will display to show the percentage off with the original price displayed next to it. The original price will be faded and struck-through. 

--------------------------CART--------------------------
Any logged in user can look at their cart. There will be a subtotal that adds the summed price of all the products based on their individual quantities and takes into account the discounted price (if applicable).

Each product will show its individual price, sale percentage, and its discounted price.

A user can add and subtract the quantity of their product or remove the product from the cart. The quantity of an individual product cannot be less than 0. The state of the entire cart will update accordingly.

Once the customer is satisfied with their product and its quantities, they can take one last look at the final price then press checkout.

--------------------------CHECKOUT--------------------------
Once the checkout button is pressed, the cart will register itself as completed in the database. A new cart will then be generated and the state of the cart will update accordingly. If you look at the "CART" button in the navbar, it will register as [0]. A notification will then be given to the user (above the navbar) that the cart is checked out. While we didn't update state for the order history, if you refresh the page then go to My Account > Order History, the cart that is checked out will now be visible there.
