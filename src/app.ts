import fastify from "fastify";
import cookie from "@fastify/cookie";


import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";
import { mealRoutes } from "./routes/meal";

export const app = fastify();

app.register(cookie);
app.register(authRoutes, { prefix: "auth" });
app.register(userRoutes, { prefix: "users" });
app.register(mealRoutes, { prefix: "meals" });
