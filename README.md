# Todos API

## Instructions

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the application with `npm start`.

## API Endpoints Documentation

### GET /todos

- Description: Get all todos
- Request Method: GET
- Request Body: None
- Response Body: Array of todos
- Response Status Code: 200 (OK)

### POST /todos

- Description: Create a new todo
- Request Method: POST
- Request Body: JSON object containing todo details (title, description, completed)
- Response Body: Newly created todo
- Response Status Code: 201 (Created)

### PUT /todos/:id

- Description: Update an existing todo
- Request Method: PUT
- Request Parameters: Todo ID
- Request Body: JSON object containing todo details to be updated
- Response Body: Updated todo
- Response Status Code: 200 (OK)

### DELETE /todos/:id

- Description: Delete an existing todo
- Request Method: DELETE
- Request Parameters: Todo ID
- Request Body: None
- Response Body: Success message
- Response Status Code: 204 (No Content)

## Additional Notes

- Ensure proper error handling for various scenarios.
- Use Postman or curl to test the API endpoints.
