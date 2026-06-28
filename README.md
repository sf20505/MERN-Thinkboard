# MERN Thinkboard

A notes API built with the MERN stack. The backend provides CRUD endpoints for notes, backed by MongoDB Atlas, with Upstash Redis rate limiting.

## Tech Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **Upstash Redis** (rate limiting)
- **dotenv** (environment variables)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster
- An [Upstash Redis](https://upstash.com/) database (for rate limiting)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sf20505/MERN-Thinkboard.git
cd MERN-Thinkboard
```

### 2. Install dependencies

```bash
cd Backend
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

Edit `Backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token
```

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `PORT` | Port the server runs on (use `5001` on macOS — port 5000 is often used by AirPlay) |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |

### 4. Run the development server

```bash
npm run dev
```

You should see:

```
Connected to MongoDB
Server is running on port 5001
```

## API Endpoints

Base URL: `http://localhost:5001/api/notes`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Get all notes |
| `GET` | `/:id` | Get a note by ID |
| `POST` | `/create` | Create a new note |
| `PUT` | `/update/:id` | Update a note |
| `DELETE` | `/delete/:id` | Delete a note |

### Example requests

**Create a note**

```http
POST /api/notes/create
Content-Type: application/json

{
  "title": "My first note",
  "content": "Hello from Thinkboard"
}
```

**Get all notes**

```http
GET /api/notes
```

**Get note by ID**

```http
GET /api/notes/<note_id>
```

**Update a note**

```http
PUT /api/notes/update/<note_id>
Content-Type: application/json

{
  "title": "Updated title",
  "content": "Updated content"
}
```

**Delete a note**

```http
DELETE /api/notes/delete/<note_id>
```

> **Note:** JSON field names are case-sensitive. Use lowercase `title` and `content`.

## Rate Limiting

The API uses Upstash Redis to limit requests to **5 per 10 seconds** per IP address. If you exceed the limit, you'll receive:

```json
{
  "message": "too many requests"
}
```

Status code: `429`

## Project Structure

```
MERN-Thinkboard/
├── Backend/
│   ├── Src/
│   │   ├── Controller/
│   │   │   └── notesController.js   # Route handlers
│   │   ├── Routes/
│   │   │   └── notesRoutes.js       # API routes
│   │   ├── models/
│   │   │   └── Note.js              # Mongoose schema
│   │   ├── middleware/
│   │   │   └── ratelimiter.js       # Rate limiting middleware
│   │   ├── config/
│   │   │   ├── db.js                # MongoDB connection
│   │   │   └── upstash.js           # Upstash Redis config
│   │   └── server.js                # Express app entry point
│   ├── .env.example
│   └── package.json
└── Frontend/                        # (coming soon)
```

## Troubleshooting

**Port already in use (`EADDRINUSE`)**

On macOS, port 5000 is often taken by AirPlay Receiver. Either change `PORT` to `5001` in `.env`, or disable AirPlay in **System Settings → General → AirDrop & Handoff → AirPlay Receiver**.

**`req.body` is undefined**

Make sure requests include `Content-Type: application/json` and a valid JSON body. In Postman, use **Body → raw → JSON**.

**MongoDB connection timeout**

Check that your MongoDB Atlas cluster is running and your IP address is allowed in **Network Access** settings.

## License

ISC
