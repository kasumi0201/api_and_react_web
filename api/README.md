* Important
  * Restart the server when change the routes before send a cURL request
  * Configure body-parser so that Express.js server can interpret the provided data
  * Simulate request with Form data
    ```
    curl -d "name=n0bisuke&comment=nemui" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:7000
    ```
  * Simulate request with JSON data
    ```
    curl -d '{"name":"n0bisuke","comment":"nemui"}' -H 'Content-Type: application/json' http://localhost:7000
    ```
