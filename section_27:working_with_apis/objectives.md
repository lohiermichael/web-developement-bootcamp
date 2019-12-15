# 1. Intro to API's

API's allows us to interact with different applications. It stands for **Application Programming Interface**

# 2. JSON and XML

These are two different formats in which the data requested can be sent back

* XML (Extended Markup Language)
Same format as HTML however the tags don't stand for how the data is displayed on tht page but rather as a set of hierarchical rules on how the data is organized

* JSON (JavaScript  Object Notation)
It has become more popular than XML and is replacing it because of the compatibility with Javascript language. The data is organized in key-value pairs.

# 3. Making API requests

* The command line to make API requests from the terminal of commands is `curl`
* From a JavaScript file, it is different. We can use the library: `request`

# 4. Request an API

Same syntax as for an URL.
The result though is returned as a String. We need to parse it using the method `JSON.parse()` to convert it into a Javascript object.

**Important:** Library called **lotus** which allows to run a code and open an interface to run Javascript and interacting with the variables of the code.

We can also use another library called **request-promise** for which the syntax is more succinct.