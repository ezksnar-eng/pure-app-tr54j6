// وسيط نيرو (Cloudflare Worker): يخبي مفاتيح OpenRouter عن التطبيق.
// الإعداد: Workers → Create → الصق هذا الكود → Settings → Variables and Secrets
// → أضف Secret باسم OR_KEYS وقيمته مفاتيحك يفصل بينها فراغ أو سطر جديد.
export default {
  async fetch(req, env) {
    const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' };
    const json = (o, status) => new Response(JSON.stringify(o), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return new Response('Nero proxy OK', { headers: cors });
    let body;
    try { body = await req.json(); } catch (e) { return json({ error: { message: 'bad json' } }, 400); }
    const model = String(body.model || '');
    // مجاني فقط: يمنع أي استهلاك لرصيد حسابك
    if (!(model.endsWith(':free') || model === 'openrouter/free')) return json({ error: { message: 'free models only' } }, 403);
    body.max_tokens = Math.min(+body.max_tokens || 4096, 4096);
    const keys = String(env.OR_KEYS || '').split(/[\s,;]+/).filter(Boolean);
    if (!keys.length) return json({ error: { message: 'no keys configured' } }, 500);
    const start = Math.floor(Math.random() * keys.length);
    let last = null;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[(start + i) % keys.length];
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key, 'HTTP-Referer': 'https://nero.app', 'X-Title': 'Nero' },
        body: JSON.stringify(body)
      });
      if ([401, 402, 403, 429].includes(r.status)) { last = r; continue; }
      return new Response(r.body, { status: r.status, headers: { ...cors, 'Content-Type': r.headers.get('Content-Type') || 'application/json' } });
    }
    return new Response(last ? last.body : 'no keys', { status: last ? last.status : 500, headers: cors });
  }
};
