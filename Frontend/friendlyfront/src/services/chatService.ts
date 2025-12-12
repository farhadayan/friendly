export async function sendChatMessage(
    message: string
): Promise<ReadableStream<Uint8Array>> {
    const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
    });

    if (!response.ok || !response.body) {
        throw new Error("Unable to connect to backend");
    }

    return response.body;
}
