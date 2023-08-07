import express from "express";
import {
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
  listEvents,
} from "../controllers/eventsController";

const router = express.Router();

// Route to create a new event
router.post("/events", createEvent);

// Route to update an existing event
router.put("/events/:id", updateEvent);

// Route to delete an event by its ID
router.delete("/events/:id", deleteEvent);

// Route to retrieve a single event by its ID
router.get("/events/:id", getEventById);

// Route to retrieve a list of events (with filters and sorting)
router.get("/events", listEvents);

export default router;
