// Netlify Function v2 — zero-config cloud sync backed by Netlify Blobs.
// Endpoint: /api/sync?code=YOUR_CODE
//   GET  -> returns stored JSON for that code ({} if none)
//   PUT  -> stores the JSON body for that code
// No database, no signup. Works automatically once the site is deployed on Netlify.

import { getStore } from "@netlify/blobs";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

function cleanCode(c) {
  return (c || "").trim().replace(/[^a-zA-Z0-9_\-]/g, "").slice(0, 64);
}

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("", { status: 204, headers: CORS });
  }

  const url = new URL(req.url);
  const code = cleanCode(url.searchParams.get("code"));

  if (!code) {
    return new Response(JSON.stringify({ error: "Missing or invalid 'code'." }), {
      status: 400,
      headers: CORS,
    });
  }

  let store;
  try {
    store = getStore("carousels");
  } catch (e) {
    return new Response(JSON.stringify({ error: "Storage unavailable: " + e.message }), {
      status: 500,
      headers: CORS,
    });
  }

  try {
    if (req.method === "GET") {
      const val = await store.get(code, { type: "json" });
      return new Response(JSON.stringify(val || {}), { status: 200, headers: CORS });
    }

    if (req.method === "PUT" || req.method === "POST") {
      const body = await req.text();
      // validate JSON before storing
      try { JSON.parse(body); } catch {
        return new Response(JSON.stringify({ error: "Body must be valid JSON." }), {
          status: 400, headers: CORS,
        });
      }
      await store.set(code, body);
      return new Response(JSON.stringify({ ok: true, savedAt: Date.now() }), {
        status: 200, headers: CORS,
      });
    }

    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405, headers: CORS,
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: CORS });
  }
};

export const config = { path: "/api/sync" };
