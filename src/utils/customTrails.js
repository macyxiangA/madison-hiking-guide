import { getCityOptions, getRegionOptions, isSupportedCountry } from "../data/locationOptions";

const CUSTOM_TRAILS_KEY = "madison-hiking-guide-custom-trails";

export const CUSTOM_TRAIL_THEMES = {
  forest: {
    label: "Forest",
    gradient: "linear-gradient(135deg, #0f5132 0%, #2f7d4f 100%)"
  },
  lake: {
    label: "Lake",
    gradient: "linear-gradient(135deg, #0f5f76 0%, #3f97b5 100%)"
  },
  sunset: {
    label: "Sunset",
    gradient: "linear-gradient(135deg, #9a4f1f 0%, #d9823b 100%)"
  },
  moss: {
    label: "Moss",
    gradient: "linear-gradient(135deg, #4d6b2f 0%, #88a85a 100%)"
  },
  slate: {
    label: "Slate",
    gradient: "linear-gradient(135deg, #34495e 0%, #64788f 100%)"
  },
  earth: {
    label: "Earth",
    gradient: "linear-gradient(135deg, #6f4e37 0%, #a9794f 100%)"
  },
  pine: {
    label: "Pine",
    gradient: "linear-gradient(135deg, #143d2c 0%, #1f6b4d 100%)"
  }
};

const THEME_KEYS = Object.keys(CUSTOM_TRAIL_THEMES);

function randomTheme() {
  return THEME_KEYS[Math.floor(Math.random() * THEME_KEYS.length)];
}

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function parseDistanceValue(trail) {
  const normalizeNumber = (value) => {
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue) || numericValue <= 0 || numericValue > 200) {
      return "";
    }

    return String(numericValue);
  };

  if (typeof trail?.distanceValue === "string") {
    return normalizeNumber(trail.distanceValue.trim());
  }

  if (typeof trail?.distance === "string") {
    const match = trail.distance.trim().match(/^(\d+(?:\.\d+)?)/);
    return match ? normalizeNumber(match[1]) : "";
  }

  return "";
}

function parseDistanceUnit(trail) {
  if (trail?.distanceUnit === "km") {
    return "km";
  }

  if (typeof trail?.distance === "string" && /\bkm\b/i.test(trail.distance)) {
    return "km";
  }

  return "mi";
}

function normalizeLocation(trail) {
  const storedLocation =
    trail?.location && typeof trail.location === "object" ? trail.location : {};
  const legacyLocation =
    typeof trail?.location === "string" ? trail.location.trim() : "";
  const country =
    cleanString(storedLocation.country) ||
    cleanString(trail?.country);
  const state =
    cleanString(storedLocation.state) ||
    cleanString(storedLocation.stateProvince) ||
    cleanString(trail?.state) ||
    cleanString(trail?.stateProvince);
  const city =
    cleanString(storedLocation.city) ||
    cleanString(trail?.city) ||
    legacyLocation;

  if (isSupportedCountry(country)) {
    const regionOptions = getRegionOptions(country);

    if (state && !regionOptions.includes(state)) {
      return {
        country: "",
        state: "",
        city: "",
        customCountry: "",
        customState: "",
        customCity: ""
      };
    }

    const cityOptions = getCityOptions(country, state);
    const normalizedCity = cityOptions.length > 0 && city && !cityOptions.includes(city)
      ? ""
      : city;

    return {
      country,
      state,
      city: normalizedCity,
      customCountry: cleanString(storedLocation.customCountry),
      customState: cleanString(storedLocation.customState),
      customCity: cleanString(storedLocation.customCity)
    };
  }

  return {
    country,
    state,
    city,
    customCountry: cleanString(storedLocation.customCountry),
    customState: cleanString(storedLocation.customState),
    customCity: cleanString(storedLocation.customCity)
  };
}

function normalizeTrail(trail) {
  const distanceValue = parseDistanceValue(trail);
  const distanceUnit = parseDistanceUnit(trail);
  const location = normalizeLocation(trail);

  return {
    id: typeof trail?.id === "string" && trail.id ? trail.id : crypto.randomUUID(),
    name: cleanString(trail?.name),
    location,
    country: location.country,
    stateProvince: location.state,
    city: location.city,
    difficulty: cleanString(trail?.difficulty),
    distanceValue,
    distanceUnit,
    plannedDate: cleanString(trail?.plannedDate),
    goal: cleanString(trail?.goal),
    imageUrl: cleanString(trail?.imageUrl),
    theme: THEME_KEYS.includes(trail?.theme) ? trail.theme : randomTheme(),
    notes: cleanString(trail?.notes),
    updatedAt:
      typeof trail?.updatedAt === "string" && trail.updatedAt
        ? trail.updatedAt
        : new Date().toISOString()
  };
}

export function getCustomTrails() {
  const stored = localStorage.getItem(CUSTOM_TRAILS_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored);
    const normalized = Array.isArray(parsed)
      ? parsed.map(normalizeTrail).filter((trail) => trail.name)
      : [];

    localStorage.setItem(CUSTOM_TRAILS_KEY, JSON.stringify(normalized));
    return normalized;
  } catch {
    return [];
  }
}

export function saveCustomTrails(trails) {
  const normalized = Array.isArray(trails)
    ? trails.map(normalizeTrail).filter((trail) => trail.name)
    : [];

  localStorage.setItem(CUSTOM_TRAILS_KEY, JSON.stringify(normalized));
  return normalized;
}

export function createCustomTrail(trail) {
  const customTrails = getCustomTrails();
  const nextTrail = normalizeTrail({
    ...trail,
    id: crypto.randomUUID(),
    updatedAt: new Date().toISOString()
  });

  return saveCustomTrails([nextTrail, ...customTrails]);
}

export function updateCustomTrail(id, trail) {
  const customTrails = getCustomTrails();

  return saveCustomTrails(
    customTrails.map((currentTrail) =>
      currentTrail.id === id
        ? normalizeTrail({
            ...currentTrail,
            ...trail,
            id,
            updatedAt: new Date().toISOString()
          })
        : currentTrail
    )
  );
}

export function deleteCustomTrail(id) {
  return saveCustomTrails(
    getCustomTrails().filter((trail) => trail.id !== id)
  );
}
