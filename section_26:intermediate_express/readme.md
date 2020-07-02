# 1. Rendering HTML and Templates

* Use res.render() to render HTML (from on EJS file)

This allows us to make reference to an HTML page whenever we want to access a specif route

* Explain what EJS is and why we use it

EJS allows us to include Javascript code within HTML

* Pass variables to EJS templates

The way we write Javascript code in EJS file is by passing variables within our HTML files. This makes the content dynamic

# 2. EJS Control Flow

* Show examples of control flow in EJS templates

<i>Note: When there is some logic involved the tag is `<%` but if you only want to get a certain variable the tag is `<%=` </i>
* Write if statements in an EJS file
* Write loops in an EJS file

# 3. Styles and Partials

* Show how to properly include public assets
    * Organization and hierarchization of our files
    * Include the following piece of code:
    ```app.use(express.static("public"));```

* Properly configure our app to use EJS
    * Shortcut with ```app.set("view engine","ejs");```
    * DRY up our code including the partial pieces of HTML

* Use partials to DRY up our code

# 4. Post Requests!!!

* Write post routes, and test them with Postman
* Use a form to send a post request
* Use a body parser to get data from form

    