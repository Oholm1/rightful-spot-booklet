const path = require("path")
const fastify = require("fastify")({ logger: true })
const fastifyStatic = require("@fastify/static")

// Serve static files from the project root
fastify.register(fastifyStatic, {
  root: path.join(__dirname),
  prefix: "/", // optional but good for structure
})

// Route for homepage
fastify.get("/", (request, reply) => {
  reply.sendFile("index.html") // Looks for index.html in root
})

// Route for about page
fastify.get("/about", (request, reply) => {
  reply.sendFile("about.html")
})

// Start server
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, "0.0.0.0")
    console.log(`✅ Server is live at http://0.0.0.0:${process.env.PORT || 3000}`)
  } catch (err) {
    console.error("❌ Failed to start server:", err)
    process.exit(1)
  }
}

start()
