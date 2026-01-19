import { forestStore } from "$lib/server/db/forestStore.js";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const name = String(data.get("name"));
    const location = String(data.get("location"));
    const width = Number(data.get("width"));
    const height = Number(data.get("height"));

    forestStore.create(name, width, height, location);

    redirect(307, "/builder");
  },
};
