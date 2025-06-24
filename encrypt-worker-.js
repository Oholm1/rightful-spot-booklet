const Piscina = require("piscina");
const path = require("path");

const pool = new Piscina({
  filename: path.resolve(__dirname, "encrypt-worker.js"),
  maxThreads: 8 // or tune to match your CPU layout
});

fastify.post("/encrypt", async (request, reply) => {
  const { data, password } = request.body;

  if (!data || !password) {
    return reply.status(400).send({ error: "Missing data or password" });
  }

  try {
    const startTime = Date.now();
    const result = await pool.run({ data, password });
    const duration = Date.now() - startTime;

    console.log(`🔒 Encryption completed in ${duration}ms`);
    reply.send(result);
  } catch (err) {
    reply.status(500).send({ error: "Encryption failed", detail: err.message });
  }
});
fastify.get("/status", async (request, reply) => {
  reply.send({
    threads: pool.threads.length,
    utilization: pool.utilization,
    queueSize: pool.queueSize,
    maxThreads: pool.options.maxThreads,
    idleThreads: pool.threads.filter(t => !t.task).length
  });
});
