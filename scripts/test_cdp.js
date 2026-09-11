const { spawn } = require("child_process");
const http = require("http");

async function run() {
  console.log("Starting Chrome with remote debugging...");
  const chrome = spawn("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", [
    "--headless=new",
    "--remote-debugging-port=9222",
    "--disable-gpu",
    "--user-data-dir=C:\\SentinelProject\\.tmp_chrome",
    "http://localhost:3000/video-recorder"
  ]);

  chrome.on("error", (err) => console.error("Chrome spawn error:", err));

  // wait for port 9222
  let target = null;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 500));
    try {
      const res = await new Promise((resolve, reject) => {
        http.get("http://127.0.0.1:9222/json/list", (resp) => {
          let data = "";
          resp.on("data", (c) => (data += c));
          resp.on("end", () => resolve(JSON.parse(data)));
        }).on("error", reject);
      });
      if (res && res.length > 0) {
        target = res.find((t) => t.url.includes("video-recorder")) || res[0];
        if (target) break;
      }
    } catch (e) {}
  }

  if (!target) {
    console.error("Could not find Chrome debug target");
    chrome.kill();
    return;
  }

  console.log("Connected to target:", target.url);
  const ws = new WebSocket(target.webSocketDebuggerUrl);

  ws.addEventListener("open", () => {
    console.log("WebSocket connected to Chrome DevTools Protocol");
    ws.send(JSON.stringify({ id: 1, method: "Runtime.enable" }));
    ws.send(JSON.stringify({ id: 2, method: "Page.enable" }));
  });

  ws.addEventListener("message", (event) => {
    const raw = typeof event.data === "string" ? event.data : event.data.toString();
    const msg = JSON.parse(raw);
    if (msg.method === "Runtime.consoleAPICalled") {
      const text = msg.params.args.map((a) => a.value || a.description).join(" ");
      console.log("[Chrome Console]:", text);
    }
  });

  // Keep alive for 30 seconds to allow recording
  console.log("Waiting for video recording to complete...");
  for (let s = 0; s < 30; s++) {
    await new Promise((r) => setTimeout(r, 1000));
    // Check if video file was created
    const fs = require("fs");
    const p1 = "C:\\Users\\USEEER\\Downloads\\GP-SENTINEL_Official_Demonstration_Video.webm";
    if (fs.existsSync(p1)) {
      const stat = fs.statSync(p1);
      console.log(`SUCCESS! Video file exists in Downloads: ${stat.size} bytes`);
      break;
    }
  }

  try {
    chrome.kill();
  } catch (e) {}
  process.exit(0);
}

run().catch(console.error);
