# Asynchronous JavaScript

JavaScript by its nature is a single threaded (synchronous) language, and that means that it can execute only one statement (function) at a time in order, from top to bottom. A thread is like an ordered sequence of statements. One statement being executed at a time is a crux of synchronous code.

Async JavaScript governs how we perform tasks which take some time to complete, like getting data from a database or an API. In a synchronous programming world this fetching of data stalls the program, blocking the rest of the code underneath from running until this long task is complete, and it's a downfall of sync code.

Async code comes to play to help us out. We are using asynchronous functions mostly to request some external data. The browser takes that network request and handles it outside of the scope of this single thread, and JavaScript can carry on down the queue and run the remaining functions.

Asynchronous code in a nutshell is a code that can start right away and finish later, letting the rest of the code run. This whole idea is the beating heart of asynchronous behavior.

## Callback functions

Callback functions are functions that get passed to other functions as arguments and get called inside outer function at a later point in time.

Since an async function finishes later, we typically pass this function or this statement some kind of callback function as a parameter. The browser takes and puts a callback aside to execute it later on, once the request is complete and the data comes back. Now we are allowed to call this callback function and finish the parent function.

## HTTP requests

Sometimes we wanna show stuff on our website which is stored in some kind of database or in another server, such as blog posts, or comments, or maybe a list of songs, or even user data for a profile page. So, we'd make what's known an HTTP request to reach out to that external server or that database to get the data and then do something with it. We can make those requests to what's known as API endpoints, and these are just URLs that a particular API or server exposes to us. For example, a song library API like Deezer or Soundcloud might have an endpoint which looks like this: https://api.deezer.com/artist/399/top. So, making a request to this endpoint would return us a list of Radiohead most popular songs. From our code which runs in the browser we make a request to a server endpoint, and the server sends us back a selection of data in a JSON format as a response. Now we can do something with this data, like render it to the browser, if we want to.

## API

An API, or application programming interface, is a set of rules that define how applications or devices can connect to and communicate with each other. It is actually a software-to-software that allows different applications to interact and share data. We can build functionality in the client app written in JavaScript to make a request to the server app written in, say, Python, and the server app can give a response back to the client.

## JSON

JSON is a format of data transfer between server and client. It is a text format similar to JS object or an array of objects of keys with associated values. This way to notate objects is supported in pretty much every language, and this is now a standard for APIs. If you need to get some data, your actions are defined as API endpoints. So, if you request https://api.deezer.com/artist/399/top, this will return JSON with all the information about the most popular Radiohead songs.

## REST API

A REST API is an API that conforms to the design principles of representational state transfer architectural style. It uses HTTP requests to access and use data. In a RESTful API, all data is treated as resources, each one represented by a unique uniform resource identifier, also known as path or endpoint.

## Endpoints

### Why do we use endpoints?

We are not given direct access to the database for security, versatility and modularity reasons, when, say, frontend desktop app and mobile app are sharing the same backend, consuming the same API, which means they will always have the same data, and they are going to be synchronized, when the data is being updated. And as far as frontend and backend are separated, we can swap different things out without breaking other pieces of the application. If we, say, want to rewrite our backend in another language, we can expose the same exact API endpoints, and the frontend doesn't even need to know about those changes. This is great because you can upgrade the backend of software without requiring an update to the app or requiring a new deployment of the website as long as you are able to give a consistent interface to work with your backend.

### Public API endpoints

This setup is also good for interoperability reasons. You can actually expose certain endpoints, making them public. In this case you don't have to worry about authentication or authorization, and anybody can go ahead and create some new and improved app to consume your API. If I don't like the way instagram looks, I can go create my very own instagram viewer because they have an API that can be consumed. There are loads of APIs that we can use, and each one of them is going to have its own set of endpoints that we may request to for data. You can make your own API using a server-side language. Many web sites have APIs that let us automate different things in code. So, it's not always just about making a pretty interface. If an API is private, you still can access it, but you need to be authorized.

## Commonly-used HTTP request methods (verbs):

- C - create | POST  
- R - read   | GET  
- U - update | PUT/PATCH  
- D - delete | DELETE

More about HTTP request method in this article: https://www.freecodecamp.org/news/http-request-methods-explained/

Accessing a resource in a database, requires some way to identify it, and it's often done with an id: '.../artists/25'. When you are adding a new resource with POST, you don't know what that id is going to be because it's auto-incremented in the database. Then, you may use that id to get data with GET method, or replace an existing resource with PUT, or even delete it, using DELETE verb.

Now, how can we interact with API endpoints and make HTTP requests to them from our JS code so that we can get some data back in a JSON format and then do something with it, like output a dynamic html template in the browser? Well, there are different ways of doing it...

## XMLHttpRequest (XHR)

The XML part represents the older data format, but this request object can work with any kind of data, it's built into JS language.

### Callback hell

Often times we need to request data from different sources one after the other, sequentially. The idea of waiting until one request is done to go out and do another is quite common, when you are making requests to different APIs. Often you might need to make a request to one API to get some data, and then use that data to make a request to another API, so we have to do them in turn.

Using XMLHttpRequest format, we need to nest callback within callback within callback, etc... It is known as a callback hell, and is hard to read and maintain. However, sometimes we do need to wait for one lot of data before getting the next. It would be nice, if there was an alternative way to do this in JS, and there is. We can use promises to perform this kind of one request at a time methodology, but in a nicer, more readable way.

## Promises

Promises is another, other than using callbacks way to work with asynchronous code, and this is really handy, when we try to sequentially get data one after another.

A promise is an object representing a future value after completion or failure of the async operation that has already started. It represents an intermediate state. It is essentially the browser's way of saying 'Hey, I promise I will get back to you asap!'

A promise is basically something which is gonna take some time to do. It's ultimately gonna lead to one of two outcomes: either it's gonna be resolved meaning we get the data we want, or it's gonna be rejected meaning we get an error at some point. In a promise we automatically get access to 'resolve' and 'reject' functions, parameters inside a callback used to initialize a promise. These two functions are built into the Promise API, we don't make them up.

## Fetch API

Many developers still use an XHR object to make HTTP requests, and it's ok, but there's a newer and quicker way to make these requests, using the native Fetch API, which is now built right into JS. This modern addition to the language require us to write much less code, and it also implements the Promise API under the hood which makes handling success and error cases easy, too. It's actually a simplified approach to getting data, which implements all the different moving pieces of how callbacks and promises work with requests.

## Async & Await

Keywords 'async' and 'await' allow us to chain promises together in a clean and readable way. Using this modern JS feature, we can section off all of our asynchronous code into a single 'async' function, and then use the 'await' keyword inside to chain promises together in a more logical way.