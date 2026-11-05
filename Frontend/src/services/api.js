const API_BASE_URL = "http://127.0.0.1:8000";

export async function checkBackendHealth() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);

        if (!response.ok) {
            throw new Error("Backend request failed");
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error("Backend connection error:", error);
        throw error;
    }
}