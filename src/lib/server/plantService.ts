import { type Plant } from "$lib/types"

let plantsTest: Plant[] = []

// let plantsTest: Plant[] = [
//     {
//         id: 0,
//         commonName: "Pear",
//         habit: "Tree",
//         latinName: "Latius applicius",
//         wind: 'M',
//     },
//     {
//         id: 1,
//         commonName: "Pear",
//         habit: "Tree",
//         latinName: "Latius applicius",
//         wind: 'M',
//     },
//     {
//         id: 2,
//         commonName: "Windhaag",
//         habit: "Perennial Climber",
//         latinName: "Latius applicius",
//         wind: 'M',
//     },
//     {
//         id: 3,
//         commonName: "Wallnut",
//         habit: "Tree",
//         latinName: "Latius applicius",
//         wind: 'M',
//     }
// ]

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

        // return plantsTest
    } catch (error) {
        console.error("Error fetching plants:", error)
        return []
    }
}