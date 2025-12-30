/**
 * Parses raw simulation messages, filters them by location, and removes duplicates.
 * Expected format: "[<integer for location>] <string>"
 */
export function getUniqueMessagesForLocation(messages: string[], location: number): string[] {
  if (!messages || !Array.isArray(messages)) return [];

  const pattern = /^\[(\d+)\]\s*(.*)$/;
  const uniqueMessages = new Set<string>();

  for (const msg of messages) {
    const match = msg.match(pattern);
    
    if (match) {
      const msgLocation = parseInt(match[1], 10);
      const msgContent = match[2].trim();

      if (msgLocation === location) {
        uniqueMessages.add(msgContent);
      }
    }
  }

  return Array.from(uniqueMessages);
}