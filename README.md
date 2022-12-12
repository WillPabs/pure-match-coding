# pure-match-coding

## Entity
### User
- name
- email
- password

### Post
- title
- description
- photo

## Routes
### Users
- get user by id
- update user by id
- get all users
- delete user by id
- delete all users
- register a user
- login as user

### Posts
- get post by id
- create a post
- update post by id
- get all posts by user
- get all posts
- delete post by id

## Views
### Login
- Form containing required email and password fields. A button to request to log user in.
- Errors
    - email or password not found

### Register
- Form containing required name, email, password, and confirm password fields. A button to request to register user.
- Errors
    - already registered email
    - passwords do not match
    - name contains numbers

### Create Post
- Form containing required title and description fields with optional photo field. A button to create post.

### Posts
- A page containing a list of all posts created by the user.