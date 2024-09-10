import { FastifyInstance } from "fastify";

export async function mealRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    console.log("there's no meals yet!");
  });
}
