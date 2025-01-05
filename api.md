# Notes API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <token>
```

## Authentication Endpoints

### Sign Up

```http
POST /auth/signup
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `201 Created`

```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

### Sign In

```http
POST /auth/signin
```

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`

```json
{
  "message": "Signed in successfully",
  "session": {
    "access_token": "token",
    "refresh_token": "token"
  },
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

### Change Password

```http
POST /auth/change-password
```

**Request Body:**

```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:** `200 OK`

```json
{
  "message": "Password updated successfully"
}
```

### Reset Password

```http
POST /auth/reset-password
```

**Request Body:**

```json
{
  "password": "newpassword123"
}
```

**Response:** `200 OK`

```json
{
  "message": "Password reset successfully"
}
```

### Forgot Password

```http
POST /auth/forgot-password
```

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

**Response:** `200 OK`

```json
{
  "message": "Password reset instructions sent to email"
}
```

## Notes Endpoints

### Create Note

```http
POST /notes
```

**Request Body:**

```json
{
  "title": "My Note",
  "content": "Note content",
  "tags": ["work", "important"]
}
```

**Response:** `201 Created`

```json
{
  "id": "uuid",
  "title": "My Note",
  "content": "Note content",
  "tags": ["work", "important"],
  "is_archived": false,
  "created_at": "2024-01-20T12:00:00Z",
  "updated_at": "2024-01-20T12:00:00Z"
}
```

### Get All Notes

```http
GET /notes
```

**Query Parameters:**

- `archived` (boolean): Filter by archive status
- `tag` (string): Filter by specific tag
- `search` (string): Search in title and content

**Response:** `200 OK`

```json
[
  {
    "id": "uuid",
    "title": "My Note",
    "content": "Note content",
    "tags": ["work", "important"],
    "is_archived": false,
    "created_at": "2024-01-20T12:00:00Z",
    "updated_at": "2024-01-20T12:00:00Z"
  }
]
```

### Get All Tags

```http
GET /notes/tags
```

**Response:** `200 OK`

```json
["work", "important", "personal"]
```

### Get Note by ID

```http
GET /notes/:id
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "title": "My Note",
  "content": "Note content",
  "tags": ["work", "important"],
  "is_archived": false,
  "created_at": "2024-01-20T12:00:00Z",
  "updated_at": "2024-01-20T12:00:00Z"
}
```

### Update Note

```http
PUT /notes/:id
```

**Request Body:**

```json
{
  "title": "Updated Note",
  "content": "Updated content",
  "tags": ["work", "updated"]
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "title": "Updated Note",
  "content": "Updated content",
  "tags": ["work", "updated"],
  "is_archived": false,
  "created_at": "2024-01-20T12:00:00Z",
  "updated_at": "2024-01-20T12:00:00Z"
}
```

### Toggle Archive Status

```http
PATCH /notes/:id/archive
```

**Request Body:**

```json
{
  "is_archived": true
}
```

**Response:** `200 OK`

```json
{
  "id": "uuid",
  "title": "My Note",
  "content": "Note content",
  "tags": ["work", "important"],
  "is_archived": true,
  "created_at": "2024-01-20T12:00:00Z",
  "updated_at": "2024-01-20T12:00:00Z"
}
```

### Delete Note

```http
DELETE /notes/:id
```

**Response:** `204 No Content`

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request

```json
{
  "error": {
    "message": "Validation error message",
    "status": 400
  }
}
```

### 401 Unauthorized

```json
{
  "error": {
    "message": "Not authenticated",
    "status": 401
  }
}
```

### 404 Not Found

```json
{
  "error": {
    "message": "Note not found",
    "status": 404
  }
}
```

### 500 Internal Server Error

```json
{
  "error": {
    "message": "Internal Server Error",
    "status": 500
  }
}
```
