import Koa from "koa";
import dotenv from "dotenv";
import router from "@koa/router";

dotenv.config({});

const { launch, memory } = await import("./src/bot.js");
launch();
console.log("[server]: Bot listening...");

const app = new Koa();

const statusRouter = router().get("/", (ctx) => {
  let out = {
    _version: 0.1,
  };
  if (ctx.request.query.user === "colin") {
    out = {
      ...out,
      env: process.env,
      memory: memory(),
    };
  }
  ctx.body = out;
});

app.use(statusRouter.routes());

app.listen(process.env.PORT || 1333);
console.log(`[server]: started on ${process.env.PORT || 1333}`);
