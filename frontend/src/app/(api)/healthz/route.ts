export async function GET() {
    // Perform any necessary health checks here
    // For example, check database connectivity, external dependencies, etc.
    
    // Respond with a 200 status code if the server is healthy
    return new Response(undefined, {status: 200})
  }
  