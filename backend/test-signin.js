import fetch from "node-fetch";

async function testSignIn() {
    try {
        console.log("Fetching signin...");
        const res = await fetch("http://localhost:5001/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                msv: "11230002",
                password: "123456"
            })
        });
        const text = await res.text();
        console.log("Status:", res.status);
        console.log("Response:", text);
    } catch (e) {
        console.log("Fetch Error:", e.message);
    }
}

testSignIn();
