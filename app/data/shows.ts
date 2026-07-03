/**
 * Upcoming shows. Add events here — the Shows section renders them automatically.
 * Leave the array empty to show the "no upcoming shows" message.
 */

export interface Show {
  name: string;
  date: string; // YYYY-MM-DD
  venue: string;
  city: string;
  ticketUrl?: string;
}

export const shows: Show[] = [
  // Example:
  // {
  //   name: "Rhythmic Chaos Live",
  //   date: "2026-09-12",
  //   venue: "Club Name",
  //   city: "Nuremberg, DE",
  //   ticketUrl: "https://tickets.example.com",
  // },
];
