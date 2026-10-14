const win = document.getElementById("window");
const title = document.getElementById("window-title");
const content = document.getElementById("window-content");
const status = document.getElementById("status");

function updateClock() {
  document.getElementById("clock").textContent =
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
}

updateClock();
setInterval(updateClock, 1000);

function openApp(app) {
  win.classList.remove("hidden");

  if (app === "terminal") {
    title.textContent = "⌘ Terminal";

    content.innerHTML = `
      <h2>NEXUS Terminal</h2>
      <p style="color:#86efac">System ready.</p>
      <div id="output" style="white-space:pre-wrap;font-family:monospace"></div>
      <form id="terminal-form" style="display:flex;gap:8px">
        <input id="command" placeholder="Type help..." autocomplete="off" required>
        <button type="submit">Run</button>
      </form>
    `;

    document.getElementById("terminal-form").onsubmit = function(e) {
      e.preventDefault();

      const input = document.getElementById("command");
      const output = document.getElementById("output");
      const cmd = input.value.trim();
      const line = document.createElement("p");
      let result = "";

      switch (cmd.split(" ")[0].toLowerCase()) {
        case "help":
          result = "Commands: help, date, time, whoami, about, echo, clear";
          break;
        case "date":
          result = new Date().toDateString();
          break;
        case "time":
          result = new Date().toLocaleTimeString();
          break;
        case "whoami":
          result = "guest";
          break;
        case "about":
          result = "NEXUS OS Web Edition 1.0";
          break;
        case "echo":
          result = cmd.slice(4).trim();
          break;
        case "clear":
          output.replaceChildren();
          input.value = "";
          return;
        default:
          result = "Command not found. Type help.";
      }

      line.style.color = "#c4b5fd";
      line.textContent = "> " + cmd + "\n" + result;
      output.appendChild(line);
      input.value = "";
    };
  }

  else if (app === "files") {
    title.textContent = "▤ File Manager";

    content.innerHTML = `
      <h2>Workspace</h2>
      <p>📁 Documents</p>
      <p>📁 Projects</p>
      <p>📄 README.txt</p>
      <hr>
      <p style="color:#aaa;font-size:12px">
        Demo files only. Real device files are not accessed.
      </p>
    `;
  }

  else if (app === "about") {
    title.textContent = "◈ About NEXUS";

    content.innerHTML = `
      <h2>NEXUS OS</h2>
      <p>Version 1.0 — Web Edition</p>
      <p>A browser-based desktop environment.</p>
      <p>Built using HTML, CSS and JavaScript.</p>
      <p style="color:#a78bfa">Designed for the next generation.</p>
    `;
  }

  status.textContent = "APPLICATION OPEN";
}

function closeApp() {
  win.classList.add("hidden");
  status.textContent = "SYSTEM READY";
}
