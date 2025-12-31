/**
 * Parses raw simulation messages, filters them by location, and removes duplicates.
 * Handles formats where the location ID is anywhere in the string, e.g.:
 * - "[26] Wind stress detected"
 * - "Wind stress detected for [26]."
 */
export function getUniqueMessagesForLocation(messages: string[], location: number): string[] {
  if (!messages || !Array.isArray(messages)) return [];

  const uniqueMessages = new Set<string>();

  for (const msg of messages) {
    // Updated Regex:
    // \[      -> Matches literal '['
    // (\d+)   -> Capture Group 1: Matches the digits (the location)
    // \]      -> Matches literal ']'
    // We do NOT anchor with ^ or $ so it finds this pattern anywhere in the text.
    const match = msg.match(/\[(\d+)\]/);
    
    if (match) {
      const msgLocation = parseInt(match[1], 10);

      // Check if this message belongs to the requested location
      if (msgLocation === location) {
        // Remove the [ID] part to clean up the message
        // Example: "Wind stress detected for [26]." -> "Wind stress detected for ."
        const cleanMessage = msg.replace(match[0], '').trim();
        
        uniqueMessages.add(cleanMessage);
      }
    }
  }

  return Array.from(uniqueMessages);
}
export function getStressLevels(messages: string[]): Record<number, number> {
  const stressMap: Record<number, number> = {};
  if (!messages || !Array.isArray(messages)) return stressMap;

  for (const msg of messages) {
    const match = msg.match(/\[(\d+)\]/);
    if (match) {
      const location = parseInt(match[1], 10);
      stressMap[location] = (stressMap[location] || 0) + 1;
    }
  }
  return stressMap;
}