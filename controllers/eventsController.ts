import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Event } from "../types";

const events: Event[] = [];

export const getEventById = (req: Request, res: Response) => {
  const { id } = req.params;
  const event = events.find((event) => event.id === id);
  if (!event) {
    res.status(404).json({ error: "Event not found" });
  } else {
    res.json(event);
  }
};

export const createEvent = (req: Request, res: Response) => {
  const newEvent: Event = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
};

export const updateEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    res.status(404).json({ error: "Event not found" });
  } else {
    const updatedEvent: Event = {
      ...events[eventIndex],
      ...req.body,
      updatedAt: new Date(),
    };
    events[eventIndex] = updatedEvent;
    res.json(updatedEvent);
  }
};

export const deleteEvent = (req: Request, res: Response) => {
  const { id } = req.params;
  const eventIndex = events.findIndex((event) => event.id === id);

  if (eventIndex === -1) {
    res.status(404).json({ error: "Event not found" });
  } else {
    const deletedEvent = events.splice(eventIndex, 1)[0];
    res.json(deletedEvent);
  }
};

export const listEvents = (req: Request, res: Response) => {
  const { eventName, organizer, sortBy } = req.query;

  let filteredEvents = [...events];

  // Apply filters if provided
  if (eventName) {
    filteredEvents = filteredEvents.filter(
      (event) =>
        typeof event.eventName === "string" &&
        event.eventName.toLowerCase().includes(eventName.toLowerCase())
    );
  }

  if (organizer) {
    filteredEvents = filteredEvents.filter(
      (event) =>
        typeof event.organizer === "string" &&
        event.organizer.toLowerCase().includes(organizer.toLowerCase())
    );
  }

  // Apply sorting if provided
  if (sortBy === "eventDate") {
    filteredEvents.sort(
      (a, b) => a.eventDate.getTime() - b.eventDate.getTime()
    );
  } else if (sortBy === "createdAt") {
    filteredEvents.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    );
  }

  res.json(filteredEvents);
};
