
export async function sendChatMessage(message: string): Promise<string> {
    try {
        const response = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Error ${response.status}: ${text}`);
        }

        // Get plain text response
        const replyText = await response.text();

        // Clean any surrounding quotes and whitespace
        const cleanedText = replyText.replace(/^["'\s]+|["'\s]+$/g, '').trim();

        return cleanedText;

    } catch (error) {
        console.error('Chat error:', error);
        throw new Error('Unable to connect to backend');
    }
}