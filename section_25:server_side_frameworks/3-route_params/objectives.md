# More routing!

* Show the `*` route matcher
This stands for a catch-all, for the routes that had not been references

* Write routes containing route parameters
For bigger websites, not all the routes of referenced. They are defined by patterns and ids. Route parameters vary from request to request.

* Discuss route order
Order of routes matter. For instance, if we put the "star" reference before all the others, it is going to displace all the others.
The rule is: "the first time a route is handled is the definitive one."