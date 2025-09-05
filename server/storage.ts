// This app doesn't require database storage
// All functionality is handled through the Gemini API

export interface IStorage {
  // No storage methods needed for this prompt formatter
}

export class MemStorage implements IStorage {
  constructor() {
    // No storage needed
  }
}

export const storage = new MemStorage();
