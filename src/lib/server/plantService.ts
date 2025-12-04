import { type Plant } from "$lib/types"

let plantsTest: Plant[] = []

export async function getPlants() {
    try {
        const response = await fetch('http://localhost:5269/api/Plants/FilterSearch')

        if (response.ok) {
            const data = await response.json()
            return data
        } else {
            console.error("Failed to fetch plants:", response.statusText)
            return []
        }

    } catch (error) {
        console.error("Error fetching plants:", error)
        return []
    }
}