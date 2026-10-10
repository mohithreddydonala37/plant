'use strict';

// Configure these values for the Ollama instance running on this computer.
const OLLAMA_CONFIG = {
  endpoint: 'http://localhost:11434/api/chat',
  model: 'gemma3:latest',
  timeoutMs: 45000
};

const missions = [
  {
    id: 'slow-noticing-walk',
    title: 'Take the long way to nowhere',
    category: 'A MOMENT TO NOTICE',
    duration: 15,
    difficulty: 'Easy',
    moods: ['calm', 'curious'],
    environments: ['anywhere', 'park', 'neighborhood'],
    instructions: 'Step outside and take a slow, unhurried walk. At every corner, choose the direction that feels least familiar. Notice one small detail you would usually pass by.',
    benefit: 'A gentle change of scenery can settle a busy mind and help familiar places feel new again.',
    challenge: 'Remember one detail from your walk. Keep it with you instead of taking a photo.'
  },
  {
    id: 'cloud-shapes',
    title: 'Make up a cloud story',
    category: 'LOOK UP FOR A WHILE',
    duration: 5,
    difficulty: 'Easy',
    moods: ['calm', 'curious'],
    environments: ['anywhere', 'park', 'neighborhood'],
    instructions: 'Find a safe spot to pause and look at the clouds. Pick one shape and imagine where it is going, or what it might become next.',
    benefit: 'Looking farther away gives your eyes a break from close-up screens and makes space for a little imagination.',
    challenge: 'Give your cloud a name before it drifts out of view.'
  },
  {
    id: 'color-hunt',
    title: 'Find five shades of green',
    category: 'A SMALL-WORLD SAFARI',
    duration: 15,
    difficulty: 'Easy',
    moods: ['curious'],
    environments: ['anywhere', 'park', 'garden', 'neighborhood'],
    instructions: 'Wander slowly and look for five different greens. Compare a new leaf, old grass, a shadow, or anything growing nearby. Look without picking.',
    benefit: 'A simple noticing game can make an ordinary route feel vivid and help you focus on the present.',
    challenge: 'Find the green you like best and describe it in three words.'
  },
  {
    id: 'garden-listen',
    title: 'Listen to the garden',
    category: 'TUNE IN TO NATURE',
    duration: 5,
    difficulty: 'Easy',
    moods: ['calm'],
    environments: ['anywhere', 'garden', 'park'],
    instructions: 'Pause somewhere comfortable. Let your eyes rest or close them if it is safe, and listen for three distinct sounds. Notice which one is closest.',
    benefit: 'A short listening pause can bring your attention out of your thoughts and back to where you are.',
    challenge: 'Carry one sound in your memory for the rest of the day.'
  },
  {
    id: 'brisk-loop',
    title: 'Walk one song’s worth',
    category: 'GET YOUR LEGS MOVING',
    duration: 15,
    difficulty: 'Easy',
    moods: ['energetic'],
    environments: ['anywhere', 'park', 'neighborhood'],
    instructions: 'Head out for a brisk walk for the length of a song or two. Leave your headphones behind if you can, and let your pace find its own rhythm.',
    benefit: 'A little movement outdoors can lift your energy without turning the moment into another workout to track.',
    challenge: 'On the way back, notice how your body feels compared with the start.'
  },
  {
    id: 'new-route',
    title: 'Take a street you’ve never taken',
    category: 'A FAMILIAR PLACE, NEW',
    duration: 30,
    difficulty: 'Easy',
    moods: ['curious', 'energetic'],
    environments: ['neighborhood'],
    instructions: 'Choose a safe, nearby street or path you have never walked. Go at an easy pace, stay on public routes, and turn back whenever you like.',
    benefit: 'Small doses of novelty can make a routine day feel more open and encourage curiosity.',
    challenge: 'Come back with one new landmark in mind, not on your camera roll.'
  },
  {
    id: 'sit-and-sketch',
    title: 'Sketch a tiny corner of the world',
    category: 'MAKE SOMETHING SLOWLY',
    duration: 30,
    difficulty: 'Easy',
    moods: ['calm', 'curious'],
    environments: ['anywhere', 'park', 'garden'],
    instructions: 'Sit somewhere safe with a scrap of paper. Draw one small thing nearby: a leaf, a bench, a crack in the path. It does not need to look like anything.',
    benefit: 'Drawing asks you to really look, giving your attention one gentle thing to stay with.',
    challenge: 'Leave your sketch untitled. Let the act of noticing be enough.'
  },
  {
    id: 'say-hello',
    title: 'Share a hello on your way',
    category: 'A LITTLE HUMAN CONNECTION',
    duration: 15,
    difficulty: 'Easy',
    moods: ['social'],
    environments: ['anywhere', 'park', 'neighborhood'],
    instructions: 'On a familiar, public route, offer a friendly hello or smile to someone who seems open to it. Keep it low-pressure and respect their space.',
    benefit: 'A small, welcome moment of connection can make a place feel friendlier and less hurried.',
    challenge: 'Notice one kind thing someone else does, even if it is not directed at you.'
  },
  {
    id: 'leaf-patterns',
    title: 'Spot the patterns in leaves',
    category: 'FOLLOW THE DETAILS',
    duration: 15,
    difficulty: 'Easy',
    moods: ['curious', 'calm'],
    environments: ['garden', 'park', 'anywhere'],
    instructions: 'Look closely at leaves on plants you can reach with your eyes, not your hands. Find a repeating pattern in the veins, edges, or way they catch the light.',
    benefit: 'Close observation is a grounding way to slow down and reconnect with the living things around you.',
    challenge: 'Find two leaves with a similar pattern but a different shape.'
  },
  {
    id: 'park-bench',
    title: 'Take a five-minute bench break',
    category: 'REST IS A REAL PLAN',
    duration: 5,
    difficulty: 'Easy',
    moods: ['calm', 'social'],
    environments: ['park', 'neighborhood', 'anywhere'],
    instructions: 'Find a safe place to sit outside. Let your hands rest, unclench your jaw, and watch the world move for five minutes without needing to respond to it.',
    benefit: 'A brief pause outdoors can ease the feeling that every spare moment needs to be filled.',
    challenge: 'Before you go, take one slow breath and notice the temperature of the air.'
  },
  {
    id: 'community-care',
    title: 'Leave a path a little better',
    category: 'CARE FOR YOUR PATCH',
    duration: 30,
    difficulty: 'Easy',
    moods: ['energetic', 'social'],
    environments: ['neighborhood', 'park'],
    instructions: 'Take a familiar public route and, only if it is safe and appropriate, pick up one piece of litter using a barrier such as a bag. Skip anything sharp or hazardous.',
    benefit: 'A small act of care builds connection to shared spaces and gives your walk a purpose.',
    challenge: 'Notice one place that is already being cared for by someone else.'
  },
  {
    id: 'garden-water',
    title: 'Give a plant a thoughtful hello',
    category: 'SLOW DOWN AND GROW',
    duration: 5,
    difficulty: 'Easy',
    moods: ['calm', 'social'],
    environments: ['garden', 'anywhere'],
    instructions: 'If you have permission and it is needed, water a plant in your own garden. Otherwise, simply pause to observe a plant nearby without touching it.',
    benefit: 'Caring for something living, even for a moment, can make the everyday feel more connected.',
    challenge: 'Find a new leaf or bud you had not noticed before.'
  },
  {
    id: 'garden-hello',
    title: 'Find one garden detail together',
    category: 'SHARE A SMALL DISCOVERY',
    duration: 5,
    difficulty: 'Easy',
    moods: ['social', 'curious'],
    environments: ['garden'],
    instructions: 'Invite someone you know to step into a garden with you. Choose one plant and take turns noticing a small detail. If no one is free, try the noticing part on your own.',
    benefit: 'Sharing a small discovery makes time outside feel more connected and helps you notice details you might miss alone.',
    challenge: 'Ask what detail they noticed first, then remember both answers.'
  },
  {
    id: 'nature-colors',
    title: 'Build a pocket-sized color palette',
    category: 'COLLECT WITH YOUR EYES',
    duration: 30,
    difficulty: 'Easy',
    moods: ['curious'],
    environments: ['park', 'garden', 'neighborhood', 'anywhere'],
    instructions: 'On a relaxed walk, find four colors in the natural world: perhaps bark, a flower, a stone, or the sky. Leave everything exactly where it is.',
    benefit: 'Searching for color sharpens attention and can turn a familiar path into a small creative expedition.',
    challenge: 'Remember the four colors in order and name the palette in your head.'
  },
  {
    id: 'long-park-wander',
    title: 'Wander until something catches your eye',
    category: 'LET CURIOSITY LEAD',
    duration: 60,
    difficulty: 'Easy',
    moods: ['curious', 'energetic'],
    environments: ['park', 'neighborhood'],
    instructions: 'Take an unhurried hour-long wander somewhere familiar and safe. Let a tree, path, or sound choose where you pause, while keeping track of how to get back.',
    benefit: 'Unstructured time outside can restore a sense of choice and make room for unexpected discoveries.',
    challenge: 'Return by a different safe route and remember one thing that surprised you.'
  },
  {
    id: 'invite-a-friend',
    title: 'Bring someone along for a loop',
    category: 'MAKE IT A SHARED MOMENT',
    duration: 30,
    difficulty: 'Easy',
    moods: ['social'],
    environments: ['park', 'neighborhood', 'anywhere'],
    instructions: 'Invite a friend, classmate, or family member for an easy walk somewhere public. Leave the big conversation topics at home and let the walk do the talking.',
    benefit: 'Moving side by side can make connection feel natural, without the pressure of a formal catch-up.',
    challenge: 'Ask what small thing they have noticed lately.'
  }
];

const defaultPreferences = { time: 15, mood: 'calm', environment: 'anywhere' };
let currentMission = null;
let previouslyShown = [];
let completedMissions = loadProgress();
let missionStarted = false;
let missionCompleted = false;

function loadProgress() {
  try {
    const saved = window.localStorage.getItem('outsideirl-completed');
    const count = Number.parseInt(saved || '0', 10);
    return Number.isFinite(count) && count >= 0 ? count : 0;
  } catch (error) {
    console.error('OutsideIRL could not read saved progress.', error);
    return 0;
  }
}

function saveProgress(count) {
  try {
    window.localStorage.setItem('outsideirl-completed', String(count));
    return true;
  } catch (error) {
    console.error('OutsideIRL could not save progress.', error);
    return false;
  }
}

function getPreferences() {
  const form = document.getElementById('mission-form');
  const values = new FormData(form);
  return {
    time: Number(values.get('time')) || defaultPreferences.time,
    mood: values.get('mood') || defaultPreferences.mood,
    environment: values.get('environment') || defaultPreferences.environment
  };
}

function rankMission(mission, preferences) {
  const moodMatch = mission.moods.includes(preferences.mood);
  const environmentScore = preferences.environment === 'anywhere'
    ? 1
    : mission.environments.includes(preferences.environment)
      ? 2
      : mission.environments.includes('anywhere') ? 1 : 0;
  return (moodMatch ? 2 : 0) + environmentScore;
}

function chooseCuratedMission(preferences, avoidId) {
  const withinTime = missions.filter((mission) => mission.duration <= preferences.time);
  const pool = withinTime.length ? withinTime : missions.filter((mission) => mission.duration === 5);
  let sourcePool = pool;
  let bestScore = Math.max(...sourcePool.map((mission) => rankMission(mission, preferences)));
  let candidates = sourcePool.filter((mission) => rankMission(mission, preferences) === bestScore);
  const alternatives = candidates.filter((mission) => mission.id !== avoidId);
  if (alternatives.length) {
    candidates = alternatives;
  } else if (avoidId) {
    sourcePool = pool.filter((mission) => mission.id !== avoidId);
    if (sourcePool.length) {
      bestScore = Math.max(...sourcePool.map((mission) => rankMission(mission, preferences)));
      candidates = sourcePool.filter((mission) => rankMission(mission, preferences) === bestScore);
    }
  }
  const unseen = candidates.filter((mission) => !previouslyShown.includes(mission.id));
  if (unseen.length) candidates = unseen;
  const mission = candidates[Math.floor(Math.random() * candidates.length)];
  previouslyShown.push(mission.id);
  if (previouslyShown.length > missions.length) previouslyShown = previouslyShown.slice(-missions.length);
  return mission;
}

function createMissionSchema(allowedDurations) {
  return {
    type: 'object',
    additionalProperties: false,
    properties: {
      title: { type: 'string', minLength: 1, maxLength: 80 },
      category: { type: 'string', minLength: 1, maxLength: 40 },
      instructions: { type: 'string', minLength: 1, maxLength: 700 },
      duration: { type: 'integer', enum: allowedDurations },
      difficulty: { type: 'string', enum: ['Easy', 'Moderate'] },
      natureBenefit: { type: 'string', minLength: 1, maxLength: 300 },
      offlineChallenge: { type: 'string', minLength: 1, maxLength: 240 }
    },
    required: ['title', 'category', 'instructions', 'duration', 'difficulty', 'natureBenefit', 'offlineChallenge']
  };
}

function requiredText(value, field, maxLength) {
  if (typeof value !== 'string') throw new Error(`Gemma 3 returned an invalid ${field}.`);
  const text = value.trim();
  if (!text || text.length > maxLength) throw new Error(`Gemma 3 returned an invalid ${field}.`);
  return text;
}

function validateGeneratedMission(data, preferences) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Gemma 3 did not return a mission object.');
  }

  const allowedDurations = [5, 15, 30, 60].filter((duration) => duration <= preferences.time);
  if (!Number.isInteger(data.duration) || !allowedDurations.includes(data.duration)) {
    throw new Error('Gemma 3 returned a mission outside your available time.');
  }
  if (!['Easy', 'Moderate'].includes(data.difficulty)) {
    throw new Error('Gemma 3 returned an unsupported difficulty.');
  }

  return {
    id: `gemma-${Date.now()}`,
    title: requiredText(data.title, 'title', 80),
    category: requiredText(data.category, 'category', 40).toLocaleUpperCase(),
    instructions: requiredText(data.instructions, 'instructions', 700),
    duration: data.duration,
    difficulty: data.difficulty,
    benefit: requiredText(data.natureBenefit, 'nature benefit', 300),
    challenge: requiredText(data.offlineChallenge, 'offline challenge', 240),
    moods: [preferences.mood],
    environments: [preferences.environment]
  };
}

async function requestGemmaMission({ preferences, seedMission, avoidTitle }) {
  const endpoint = new URL(OLLAMA_CONFIG.endpoint, window.location.href);
  if (window.location.protocol === 'file:') {
    throw new Error('A file:// page cannot call Ollama. Open this project through a local web server to use Gemma 3.');
  }
  if (window.location.protocol === 'https:' && endpoint.protocol === 'http:') {
    throw new Error('An HTTPS-hosted page cannot call this plain-HTTP Ollama endpoint. This site is using its curated fallback.');
  }

  const allowedDurations = [5, 15, 30, 60].filter((duration) => duration <= preferences.time);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), OLLAMA_CONFIG.timeoutMs);
  const requestBody = {
    model: OLLAMA_CONFIG.model,
    stream: false,
    format: createMissionSchema(allowedDurations),
    options: { temperature: 0.4, num_predict: 520 },
    messages: [
      {
        role: 'system',
        content: 'You create practical, low-pressure outdoor missions. Return only the JSON object matching the supplied schema. Write plain text without Markdown. Follow the chosen mood and environment, and make the activity clearly fit both. Keep the stated duration consistent with the instructions. Keep activities safe, legal, accessible, and suitable for an ordinary public or personal outdoor space. Never require a purchase, trespassing, touching wildlife, collecting plants, or using a phone. Avoid traffic, water hazards, isolated places, and risky exercise. Give specific, kind instructions and a genuinely useful nature-related benefit.'
      },
      {
        role: 'user',
        content: `Create one original outdoor mission inspired by this preference-matched seed. Preserve its core activity, adapt the details to the selected mood and environment, and do not switch to an unrelated activity. Seed: ${JSON.stringify({
          title: seedMission.title,
          instructions: seedMission.instructions,
          benefit: seedMission.benefit,
          challenge: seedMission.challenge,
          duration: seedMission.duration,
          moods: seedMission.moods,
          environments: seedMission.environments
        })}. Preferences: ${JSON.stringify({
          availableMinutes: preferences.time,
          mood: preferences.mood,
          environment: preferences.environment,
          avoidRepeating: avoidTitle || null,
          allowedDurations
        })}. Return all seven required properties as non-empty strings or a permitted duration. Keep title under 80 characters, category under 40, instructions under 700, natureBenefit under 300, and offlineChallenge under 240. The duration must be one of the allowed values, no longer than the available time, and consistent with the seed activity. Use difficulty Easy or Moderate. Keep the mission safe and doable without equipment.`
      }
    ]
  };

  try {
    const response = await fetch(endpoint.href, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Ollama returned HTTP 404. Check that "${OLLAMA_CONFIG.model}" is installed.`);
      }
      throw new Error(`Ollama returned HTTP ${response.status}.`);
    }
    const payload = await response.json();
    const content = payload && payload.message && payload.message.content;
    if (typeof content !== 'string') throw new Error('Ollama returned no message content.');
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      throw new Error('Gemma 3 response was not valid JSON.');
    }
    const mission = validateGeneratedMission(parsed, preferences);
    if (avoidTitle && mission.title.toLocaleLowerCase() === avoidTitle.toLocaleLowerCase()) {
      throw new Error('Gemma 3 repeated the previous mission.');
    }
    return mission;
  } catch (error) {
    if (error && error.name === 'AbortError') {
      throw new Error('Gemma 3 took too long to respond.');
    }
    if (error instanceof TypeError) {
      throw new Error('Ollama is unavailable or blocked by this page’s CORS origin. Use the local-server setup provided with this demo.');
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

const missionGeneratorAdapter = {
  provider: 'ollama-gemma3',
  generate: requestGemmaMission
};

async function generateMission(options = {}) {
  const preferences = getPreferences();
  const avoidId = options.avoidId || null;
  const seedMission = chooseCuratedMission(preferences, avoidId);
  let fallbackReason = '';
  try {
    const modelMission = await missionGeneratorAdapter.generate({
      preferences,
      seedMission,
      avoidTitle: currentMission && currentMission.title
    });
    if (modelMission && typeof modelMission.title === 'string') {
      return { mission: modelMission, source: 'gemma' };
    }
    fallbackReason = 'Ollama returned no mission.';
  } catch (error) {
    fallbackReason = error instanceof Error ? error.message : 'The local model could not generate a mission.';
  }

  return { mission: seedMission, source: 'fallback', fallbackReason };
}

function setMissionStatus(message, tone = 'default') {
  const status = document.getElementById('mission-status');
  status.textContent = message;
  status.dataset.tone = tone;
}

function renderMission(mission, source) {
  currentMission = mission;
  missionStarted = false;
  missionCompleted = false;
  const card = document.getElementById('mission-card');
  card.dataset.state = 'ready';
  card.setAttribute('aria-busy', 'false');
  document.getElementById('mission-title').textContent = mission.title;
  document.getElementById('mission-category').textContent = mission.category;
  document.getElementById('mission-number').textContent = source === 'gemma'
    ? 'GEMMA 3 MISSION'
    : `FIELD NOTE ${String(missions.indexOf(mission) + 1).padStart(2, '0')}`;
  document.getElementById('mission-instructions').textContent = mission.instructions;
  document.getElementById('mission-duration').textContent = `${mission.duration} ${mission.duration === 1 ? 'minute' : 'minutes'}`;
  document.getElementById('mission-difficulty').textContent = mission.difficulty;
  document.getElementById('mission-benefit').textContent = mission.benefit;
  document.getElementById('mission-challenge').textContent = mission.challenge;
  const sourceNote = document.getElementById('mission-source');
  sourceNote.dataset.source = source;
  sourceNote.lastChild.textContent = source === 'gemma'
    ? ` Gemma 3 · ${OLLAMA_CONFIG.model} via Ollama`
    : ' Curated mission fallback';
  document.getElementById('start-button').disabled = false;
  document.getElementById('start-button').setAttribute('aria-pressed', 'false');
  document.getElementById('start-button').querySelector('.button-label').textContent = 'Start Mission';
  document.getElementById('done-button').disabled = false;
  document.getElementById('done-button').querySelector('.button-label').textContent = 'I Did It!';
  document.getElementById('done-button').setAttribute('aria-label', 'Mark this mission complete');
}

async function showMission(options = {}) {
  const card = document.getElementById('mission-card');
  const anotherButton = document.getElementById('another-button');
  const submitButton = document.querySelector('.generate-button');
  const submitLabel = submitButton.querySelector('.button-label');
  card.setAttribute('aria-busy', 'true');
  card.dataset.state = currentMission ? 'loading' : 'empty';
  anotherButton.disabled = true;
  submitButton.disabled = true;
  submitLabel.textContent = 'Finding a mission…';
  document.getElementById('start-button').disabled = true;
  document.getElementById('done-button').disabled = true;
  setMissionStatus('Finding a mission that fits your day.', 'loading');

  try {
    const result = await generateMission(options);
    renderMission(result.mission, result.source);
    if (result.fallbackReason) {
      setMissionStatus(`Showing a curated fallback. ${result.fallbackReason}`, 'fallback');
    } else if (!options.initial) {
      setMissionStatus('A new mission, picked for your time, mood, and surroundings.', 'success');
    } else {
      setMissionStatus('', 'default');
    }
  } catch (error) {
    console.error('OutsideIRL could not choose a mission.', error);
    currentMission = null;
    card.dataset.state = 'error';
    card.setAttribute('aria-busy', 'false');
    document.getElementById('mission-category').textContent = 'A SMALL PAUSE';
    document.getElementById('mission-number').textContent = 'TRY AGAIN';
    document.getElementById('mission-title').textContent = 'Your next idea is just a moment away';
    document.getElementById('mission-instructions').textContent = 'We could not find a mission this time. Try again, or adjust your time and place.';
    document.getElementById('mission-duration').textContent = '—';
    document.getElementById('mission-difficulty').textContent = '—';
    document.getElementById('mission-benefit').textContent = 'A fresh start is always available.';
    document.getElementById('mission-challenge').textContent = 'Choose what feels right for you today.';
    document.getElementById('start-button').disabled = true;
    document.getElementById('done-button').disabled = true;
    setMissionStatus('The mission could not load. Change a preference or try again.', 'error');
  } finally {
    anotherButton.disabled = false;
    submitButton.disabled = false;
    submitLabel.textContent = 'Find My Outdoor Mission';
  }
}

function updateCompletionCount() {
  document.getElementById('completion-count').textContent = String(completedMissions);
  document.getElementById('header-count').textContent = String(completedMissions);
  document.getElementById('completion-word').textContent = completedMissions === 1
    ? 'little adventure completed'
    : 'little adventures completed';
}

document.getElementById('mission-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  await showMission({ avoidId: currentMission && currentMission.id });
});

document.getElementById('another-button').addEventListener('click', async () => {
  await showMission({ avoidId: currentMission && currentMission.id });
});

document.getElementById('start-button').addEventListener('click', () => {
  if (!currentMission || missionStarted || missionCompleted) return;
  missionStarted = true;
  const button = document.getElementById('start-button');
  button.setAttribute('aria-pressed', 'true');
  button.querySelector('.button-label').textContent = 'Mission in progress';
  setMissionStatus(`You’re on your way. Take ${currentMission.duration} minutes outside, at your own pace.`, 'success');
});

document.getElementById('done-button').addEventListener('click', () => {
  if (!currentMission || missionCompleted) return;
  missionCompleted = true;
  completedMissions += 1;
  const saved = saveProgress(completedMissions);
  updateCompletionCount();
  document.getElementById('mission-card').dataset.state = 'completed';
  document.getElementById('start-button').disabled = true;
  document.getElementById('done-button').disabled = true;
  document.getElementById('done-button').querySelector('.button-label').textContent = 'Completed';
  document.getElementById('done-button').setAttribute('aria-label', 'Mission completed');
  setMissionStatus(saved
    ? 'That counts. Nice work showing up for yourself and the world outside.'
    : 'Mission complete! Progress could not be saved on this device, but your effort still counts.',
  saved ? 'success' : 'error');
});

window.addEventListener('storage', (event) => {
  if (event.key !== 'outsideirl-completed') return;
  const count = Number.parseInt(event.newValue || '0', 10);
  if (Number.isFinite(count) && count >= 0) {
    completedMissions = count;
    updateCompletionCount();
  }
});

updateCompletionCount();
showMission({ initial: true });
