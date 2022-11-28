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
### Register
- A user is able to to create an account by filling out the form with required fields: name, email, and password

### Login
- A user is able to login to their account by entering their email and password into the form. Upon successful login the user receives a JWT token.

### Create Post
- Only accessible to logged in users
- A user is able to create a post with the attributes title, description, and a photo.

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