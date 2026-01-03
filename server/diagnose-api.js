require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function diagnose() {
    console.log("--- Starting AI Diagnostics ---");
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("❌ No API Key found in .env");
        return;
    }
    console.log(`🔑 Key found (starts with: ${key.substring(0, 8)}...)`);

    // Test 1: Fetch Models via REST (Bypassing SDK to rule out SDK version issues)
    console.log("\n--- Test 1: Raw REST API List Models ---");
    try {
        const fetch = (await import('node-fetch')).default || require('node-fetch'); // Handling fetch import
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);

        if (!response.ok) {
            console.error(`❌ REST Request Failed: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error("Response Body:", errorBody);
        } else {
            const data = await response.json();
            console.log("✅ REST Request Successful. Available Models:");
            if (data.models) {
                data.models.forEach(m => console.log(` - ${m.name} (${m.supportedGenerationMethods})`));
            } else {
                console.log("No models returned in list.");
            }
        }
    } catch (e) {
        // Fallback if node-fetch missing (available in Node 18+ natively usually)
        console.log("Skipping REST test (fetch error):", e.message);
        try {
            // Node 18+ native fetch
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
            const data = await response.json();
            console.log("✅ REST Request Successful (Native Fetch). Available Models:");
            if (data.models) {
                data.models.forEach(m => console.log(` - ${m.name}`));
            }
        } catch (nativeErr) {
            console.error("Native fetch failed too:", nativeErr.message);
        }
    }
}

diagnose();
