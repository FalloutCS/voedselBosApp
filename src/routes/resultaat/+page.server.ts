import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
    console.log("🚀 Server load gestart...");

    try {
        const response = await fetch('http://localhost:5269/api/Plants');

        if (!response.ok) {
            console.error(`⚠️ API Error: ${response.status} ${response.statusText}`);
            return { plants: [] };
        }

        const plants = await response.json();
        console.log(`✅ ${plants.length} planten opgehaald uit de backend`);

        return {
            plants
        };

    } catch (error) {
        console.error("❌ Kon niet verbinden met de backend:", error);
        return {
            plants: []
        };
    }
}) satisfies PageServerLoad;