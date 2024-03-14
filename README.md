## Payments-App 

#### Seamlessly manage transactions, transfer funds securely, and connect with friends effortlessly in one intuitive platform.

#### [paymentsapp-priyam.vercel.app](https://paymentsapp-priyam.vercel.app)

##### Configure .env in /backend

### Database <img height="25" src="https://user-images.githubusercontent.com/25181517/117207330-263ba280-adf4-11eb-9b97-0ac5b40bc3be.png">

```bash
cd Payments-App

docker build ./ -t mongodb:4.7-replset

docker volume create mongodbdata

docker run --name mongodb-replset -p 27017:27017 -v mongodbdata:/data/db -d mongodb:4.7-replset
```

### Run Backend - Express <img height="25" src="https://user-images.githubusercontent.com/25181517/183859966-a3462d8d-1bc7-4880-b353-e2cbed900ed6.png">

```bash
cd backend

npm i 

node --watch index.js
```

### Run Frontend - React -  <img height="25" src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png">

```bash
cd frontend

npm i

npm run dev
```

### Backend Routes

### /api/v1/user

- `/signup`:
    - Allows users to sign up by providing required information such as username, email, password, first name, last name, etc.
    - Checks for uniqueness of username, email, and phone number.
    - Hashes the user's password using bcrypt before saving it to the database.
    - Generates a JWT token upon successful signup for authentication.

- `/signin`:
    - Allows users to sign in by providing either their username or email along with their password, or their phone number and password.
    - Verifies the credentials provided against the stored user data.
    - If the credentials are valid, generates a JWT token for authentication.

- `/update`:
    - Allows authenticated users to update their profile information.
    - Validates the input against a schema to ensure correct data types and format.
    - Updates the user's information in the database.

- `/bulk`:
    - Retrieves a list of users based on a filter provided in the query parameter.
    - Searches for users whose first name, last name, or username matches the provided filter using regex.
    - Returns an array of user objects containing their username, first name, last name, image url and user ID.

- `/addfriend`:
    - Allows authenticated users to add other users as friends.
    - Adds the specified user to the current user's list of friends if the user exists.
    - Returns a success message upon successfully adding the friend.

- `/friends`: test-p
    - Retrieves a list of friends for the authenticated user.
    - Retrieves the friends' information from the database and filters out unnecessary fields.
    - If both friends have added each other, displays their email and phone number.
    - Otherwise, displays only basic information such as username, first name, last name, and image URL.

- `/receivedfriendrequests`:
    - Allows authenticated users to receive friend requests


### /api/v1/account 

- `/balance`:
    - Retrieves the account balance for the authenticated user.
    - Queries the database to find the account associated with the user ID.
    - Returns the balance if the account exists, otherwise returns a 404 error.

- `/transfer`:
    - Allows authenticated users to transfer funds to another account.
    - Initiates a transaction using MongoDB session.
    - Verifies if the user has sufficient balance for the transfer.
    - Updates the balances of both the sender and the recipient accounts.
    - Commits the transaction if successful, otherwise aborts it and returns an error message.

- `/deposit`: 
    - Allows authenticated users to add funds to their account.

### /api/v1/transactions

- `/`: 
    - Allowed authenticated users to see their past transactions.
    - Added appropriate schema.
    - New transaction on signup and transfers and deposit endpoint.



### Pending Features 
- `Landing Page needs to me more preety`:Pending
- `My friends component`:Pending
- `More Money Related Features`: Pending
- `Friends can message each other` 🫂: Pending - Postponed
    - Allow authenticated friends to text each other.
    - Message Notifications


### Frontend
- `SignUp,SignIn and Landing Page`✅
- `Transactions Page`✅
- `SendMoney Page`✅
- `Dashboard Page`✅
- `Friends Page` ✅
- `Profile Page` ✅

### Optimization 

- `Performance` 💯
- `Accessibility` 💯
- `Best Practices` 💯
- `SEO` 💯
- `Progressive Web App` 💯