/**
 * VDS API Client
 * All backend communication lives here.
 * Base URL is controlled by VITE_API_URL in .env
 */

const BASE = import.meta.env.VITE_API_URL ?? '';

// ── Measurements ──────────────────────────────────────────────────────────────
/**
 * POST /measurements/extract
 * Sends front image, side image, and user height.
 * Returns MeasurementResponse with shoulder, chest, waist, hip, arm, inseam in cm.
 */
export async function analyzeMeasurements(frontFile, sideFile, heightCm) {
  const fd = new FormData();
  fd.append('front_image', frontFile);
  fd.append('side_image', sideFile);
  fd.append('height_cm', String(heightCm));
  const res = await fetch(`${BASE}/measurements/extract`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(`Measurements HTTP ${res.status}`);
  return res.json();
}

// ── Skin Tone ─────────────────────────────────────────────────────────────────
/**
 * POST /skin-tone/detect
 * Sends the face selfie image.
 * Returns SkinToneResponse with skin_tone label, reference_hex, sampled_hex.
 */
export async function analyzeSkinTone(selfieFile) {
  const fd = new FormData();
  fd.append('person_image', selfieFile);
  const res = await fetch(`${BASE}/skin-tone/detect`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(`Skin tone HTTP ${res.status}`);
  return res.json();
}

// ── Recommendation ────────────────────────────────────────────────────────────
/**
 * POST /recommendation/get
 * Sends measurements + skin tone as JSON (not multipart).
 * Returns RecommendationResponse with shirt_size, pants_size, recommended_colors, avoid_colors.
 */
export async function getRecommendation({ chest_cm, waist_cm, hip_cm, inseam_cm, skin_tone }) {
  const res = await fetch(`${BASE}/recommendation/get`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chest_cm, waist_cm, hip_cm, inseam_cm, skin_tone }),
  });
  if (!res.ok) throw new Error(`Recommendation HTTP ${res.status}`);
  return res.json();
}

// ── Avatar ────────────────────────────────────────────────────────────────────
/**
 * POST /avatar/generate
 * Sends the front image only. skin_tone is intentionally omitted — avatar uses default mesh color.
 * Returns AvatarResponse with mesh_base64 (base64-encoded .obj file).
 */
export async function generateAvatar(frontFile) {
  const fd = new FormData();
  fd.append('person_image', frontFile);
  const res = await fetch(`${BASE}/avatar/generate`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(`Avatar HTTP ${res.status}`);
  return res.json();
}

// ── Virtual Try-On ────────────────────────────────────────────────────────────
/**
 * POST /tryon/generate
 * Sends user's front image + a garment image.
 * number_of_images is hardcoded to 1 — one result per request.
 * Returns TryOnResponse with images_base64 array and mime_type.
 */
export async function generateTryOn(personFile, garmentFile) {
  const fd = new FormData();
  fd.append('person_image', personFile);
  fd.append('garment_image', garmentFile);
  fd.append('number_of_images', '1');
  const res = await fetch(`${BASE}/tryon/generate`, { method: 'POST', body: fd });
  if (!res.ok) throw new Error(`Try-on HTTP ${res.status}`);
  return res.json();
}

// ── Utility ───────────────────────────────────────────────────────────────────
/**
 * Converts a base64 string to a browser Object URL.
 * Used for both avatar (.obj) and try-on result images.
 */
export function base64ToBlobUrl(base64, mimeType = 'text/plain') {
  const bytes = atob(base64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return URL.createObjectURL(new Blob([arr], { type: mimeType }));
}
