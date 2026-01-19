// src/lib/simulationUtils.ts

export type SimulationMessageType = 'warning' | 'advice';

export type SimulationIssue = {
    id: string;
    warning: string;
    advice?: string;
};

// Helper to extract ID, Type, and Content from a raw message string
function parseMessage(msg: string): { locationId: number, type: SimulationMessageType, text: string } | null {
    // Matches: [101][WARN] The message text
    const match = msg.match(/\[(\d+)\]\[(WARN|ADVICE)\](.*)/);
    if (!match) return null;

    return {
        locationId: parseInt(match[1], 10),
        type: match[2] === 'WARN' ? 'warning' : 'advice',
        text: match[3].trim()
    };
}

export function getPairedIssuesForLocation(messages: string[], location: number): SimulationIssue[] {
    if (!messages || !Array.isArray(messages)) return [];

    const issues: SimulationIssue[] = [];
    let lastWarningIndex = -1;

    // We iterate through messages. Because the backend generates them sequentially 
    // (Warn then Advice), we can try to pair them.
    for (const msg of messages) {
        const parsed = parseMessage(msg);
        if (!parsed || parsed.locationId !== location) continue;

        if (parsed.type === 'warning') {
            // Start a new issue
            issues.push({
                id: crypto.randomUUID(), // Simple ID for Svelte loops
                warning: parsed.text,
                advice: undefined
            });
            lastWarningIndex = issues.length - 1;
        } else if (parsed.type === 'advice') {
            // If we have a recent warning, attach this advice to it
            if (lastWarningIndex >= 0) {
                issues[lastWarningIndex].advice = parsed.text;
            } else {
                // Orphaned advice (rare), create a standalone issue
                issues.push({
                    id: crypto.randomUUID(),
                    warning: "Advies:", // Generic header if no warning preceded
                    advice: parsed.text
                });
            }
        }
    }

    return issues;
}

export function getStressLevels(messages: string[]): Record<number, number> {
    const stressMap: Record<number, number> = {};
    if (!messages || !Array.isArray(messages)) return stressMap;

    for (const msg of messages) {
        // Only count [WARN] messages for the red overlay dots
        if (msg.includes("[WARN]")) {
            const match = msg.match(/\[(\d+)\]/);
            if (match) {
                const location = parseInt(match[1], 10);
                stressMap[location] = (stressMap[location] || 0) + 1;
            }
        }
    }
    return stressMap;
}