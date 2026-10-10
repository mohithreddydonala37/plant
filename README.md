# OutsideIRL

OutsideIRL turns a spare few minutes into a small invitation to go outside. Choose your available time, mood, and setting to get a practical outdoor mission.

## Features

- Time, mood, and environment preferences shape each mission.
- Generates a structured mission with instructions, estimated duration, difficulty, a nature benefit, and an offline challenge.
- Uses a locally running Gemma 3 model through Ollama when the browser can reach it.
- Validates model output before rendering. If Ollama is unavailable, returns a clearly labelled mission from the curated fallback library.
- Start and complete actions, an accessible status message, and a completion count saved in browser local storage.
- Responsive HTML and CSS, with no framework, package manager, API key, or build step.

## Run locally

The simplest demo is to open `index.html` directly in a browser. The interface and curated mission fallback work without a web server. A `file://` page cannot call Ollama from this prototype, so it uses the labelled fallback. Use the local web-server instructions below to test Gemma 3.

### Enable local Gemma 3 inference

1. Install and start [Ollama](https://ollama.com/download/), then download the model:

   ```powershell
   ollama pull gemma3:latest
   ```

2. Start a static server from the project directory:

   ```powershell
   py -m http.server 8000
   ```

3. Allow that exact browser origin in Ollama's `OLLAMA_ORIGINS` setting:

   ```text
   http://localhost:8000
   ```

   On Windows, add or update the user environment variable `OLLAMA_ORIGINS`, quit Ollama from the system tray, and reopen Ollama so it inherits the setting. Keep the Ollama server bound to localhost; do not expose it publicly. See [Ollama's CORS and server configuration guidance](https://docs.ollama.com/faq#how-do-i-configure-ollama-server).

4. Visit <http://localhost:8000>. The app posts to `http://localhost:11434/api/chat` using the model configured near the top of `script.js`. Change `OLLAMA_CONFIG.endpoint`, `OLLAMA_CONFIG.model`, or `OLLAMA_CONFIG.timeoutMs` there to use a different local Ollama setup.

If the model is missing, Ollama is stopped, the request times out, CORS blocks the origin, or the response fails validation, the app visibly identifies the curated fallback and explains the reason. No browser API key is used.

## Architecture

- `index.html`: semantic page structure and preference controls.
- `style.css`: responsive visual system, focus states, and loading, completed, and error styling.
- `script.js`: curated catalog, preferences and fallback ranking, Ollama adapter, JSON Schema request, response validation, rendering, and local progress.

`missionGeneratorAdapter` is the inference boundary. The Ollama adapter sends time, mood, and environment to `/api/chat`; Ollama's structured-output format constrains the response. JavaScript validates the required strings, supported difficulty, and duration against the selected time before updating the page. It renders model text with `textContent`. The curated catalog is the explicit fallback, not a model response.

## Deployment on Render

This is a static frontend. Create a **Static Site** connected to this repository and set:

- **Root Directory:** leave blank (repository root)
- **Build Command:** leave blank
- **Publish Directory:** `.`

No `render.yaml`, backend, or environment variables are needed for the static deployment.

The Render site will use curated fallback missions by default. A deployed HTTPS page cannot automatically reach your personal computer's Ollama service: its `localhost` refers to the visitor's computer, and an HTTPS page cannot call Ollama over plain HTTP because browsers block mixed content. Enabling remote inference would require a separately hosted, HTTPS model endpoint and suitable CORS/security controls, or a backend proxy. Do not expose a personal Ollama server to the public internet. No remote model service is configured by this project.

## Limitations and safety

- Live inference is local to a running Ollama server; it is not bundled with the static site and is not available to visitors by default.
- The duration, difficulty, and required response fields are validated, but generated advice is not independently verified for safety. Use judgment, follow local guidance, stay aware of your surroundings, and respect nature.
- Completion progress is a count stored only in this browser's local storage. It is not an account, backup, or cross-device record.
- No automated test suite or package dependencies are included.
