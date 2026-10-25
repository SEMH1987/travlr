Project Overview
Travlr Getaways is a full-stack web application built for managing and displaying travel packages, featuring both a public-facing customer view and a secure administrative dashboard. This project ties together a Node.js/Express backend, a MongoDB database, and an Angular single-page application (SPA) frontend with JWT-based authentication.

Architecture
Frontend Development: Express HTML/JS vs. Angular SPA
Working with both Express and an Angular single-page application showed a clear shift in how web apps handle rendering.

In the early Express setup, routing and HTML rendering happened directly on the server. Every time you navigated or updated a page, the server built and sent back a whole new page, which meant reloading everything.

Shifting to the Angular SPA changed that completely. The app loads a single shell page once, and Angular handles routing and data injection dynamically on the client side. It makes the actual UI feel a lot faster and more responsive once it's up and running, though setting up the module structure and routing config took some trial and error to get right.

Why MongoDB?
We used MongoDB for the backend database because of its NoSQL document structure. Travel data naturally fits into JSON-like documents. Unlike a rigid relational database with strict table schemas, MongoDB made it easy to store trip details, pricing, and user documents without constantly migrating tables every time a field changed.

Functionality
JSON vs. JavaScript
People sometimes mix them up, but they have distinct roles:

JavaScript is an actual programming language with logic, functions, loops, and runtime execution.

JSON (JavaScript Object Notation) is strictly a data format—just structured text used to represent data objects using key-value pairs.

JSON acts as the common language that bridges the frontend and backend. The Express API queries MongoDB, serializes the data into JSON, sends it across the wire over HTTP, and Angular deserializes that JSON to populate the UI components.

Refactoring and Reusable UI Components
Throughout building this project, a lot of code refactoring happened out of necessity. Initially, duplicating HTML blocks or API calls across different views created messy code.

Breaking repetitive elements down into reusable components—like the trip-card component—made a massive difference.

Instead of rewriting code for every listing, the data gets passed down as properties. If something needs to change in the layout, you fix it in one component file, and it updates everywhere. It cut down on repetitive code and made debugging a lot less painful.

Testing
Methods, Endpoints, and Security
Testing a full-stack app requires checking how data moves across different API endpoints using standard HTTP methods:

GET requests for retrieving data, POST for creating new records and PUT for updates.

Adding security layers like JSON Web Tokens (JWT) completely changed how testing worked. Once authentication was enforced, simply hitting an endpoint with a tool or a form submission wasn't enough—unauthorized requests threw 401 errors. Implementing the JwtInterceptor solved this by automatically attaching the Bearer token to outgoing requests, which required careful verification to ensure tokens were passing correctly between the client and server.

Reflection
Professional Goals and Marketable Skills
Building this application from scratch—from setting up the server routes and database schemas to wiring up the Angular frontend and securing admin routes—helped pull together a lot of separate concepts into a working system.

Dealing with bugs, broken routes, and authentication errors through trial and error built practical troubleshooting skills. Having a complete full-stack project that handles database CRUD operations, client-side routing, and token-based security provides a solid portfolio piece that demonstrates real-world development experience to future employers.