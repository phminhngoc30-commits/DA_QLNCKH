import fetch from "node-fetch";

async function testSearch() {
    try {
        console.log("Fetching search...");
        const res = await fetch("http://localhost:5001/api/search/search?keyword=&department=&field=&page=1&limit=12", {
            method: "GET"
        });
        const text = await res.text();
        console.log("Status:", res.status);
        if (res.status === 500) console.log("Response:", text);
    } catch (e) {
        console.log("Fetch Error:", e.message);
    }
}

testSearch();
