export async function POST(req: Request) {
    const body = await req.json();
  
    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "grok-1",
        messages: [
          {
            role: "user",
            content: body.prompt
          }
        ]
      })
    });
  
    const data = await response.json();
  
    return Response.json(data);
  }