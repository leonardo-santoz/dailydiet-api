import { app } from "./app";
// import { env } from './env'

app.listen({ port: 3000 }).then(() => {
  console.log("app is running");
});
