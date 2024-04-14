import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// blogRouter.use('/*',(c,next)=>{
//   next()
// })

blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: 1,
    },
  });

  return c.text("signin route");
});

blogRouter.put("/", (c) => {
  return c.text("signin route");
});

blogRouter.get("/", (c) => {
  return c.text("get blog route");
});

blogRouter.get("/bulk", (c) => {
  return c.text("get blog route");
});
