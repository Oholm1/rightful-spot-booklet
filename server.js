const crypto = require("crypto");
const path = require("path");
const fastify = require("fastify")({ logger: true });
const fastifyStatic = require("@fastify/static");

// Serve static files from /public
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/",
});

// Route: Home page
fastify.get("/", (request, reply) => {
  reply.sendFile("index.html");
});

// Route: About page
fastify.get("/about", (request, reply) => {
  reply.sendFile("about.html");
});

// ✅ Route: Engine status for dashboard
fastify.get("/status", async (request, reply) => {
  const threads = 8;
  const idleThreads = 5;
  const utilization = (threads - idleThreads) / threads;
  const queueSize = 2;

  return {
    threads,
    idleThreads,
    utilization,
    queueSize
  };
});

// Route: Encryption
fastify.post("/encrypt", (request, reply) => {
  const { data, password } = request.body;

  if (!data || !password) {
    return reply.status(400).send({ error: "Missing data or password" });
  }

  try {
    const key = crypto.scryptSync(password, "salt", 32);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");

    return reply.send({
      encrypted,
      iv: iv.toString("base64"),
      algorithm: "aes-256-cbc",
    });
  } catch (err) {
    return reply.status(500).