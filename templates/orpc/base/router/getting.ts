import { retry } from "@/middlewares/retry";
import { pub } from "@/orpc";
import { type } from "arktype";

export const echoHandler = pub
  .use(retry({ times: 3 }))
  .route({
    method: "GET",
    path: "/planets",
    summary: "List all planets",
    tags: ["Planets"],
  })
  .input(
    type({
      message: "string",
    })
  )
  .output(
    type({
      echoedMessage: "string",
    })
  )
  .handler(async ({ input, context }) => {
    return {
      echoedMessage: `Server received: ${input.message}`,
    };
  });
