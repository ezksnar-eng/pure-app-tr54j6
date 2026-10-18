(function () {
'use strict';
const N = NERO;
const $ = s => document.querySelector(s);
const ta = $('#ta'), hl = $('#hl'), gin = $('#gin'), gutter = $('#gutter'), curEl = $('#cur');

/* ===== أيقونات ===== */
const P = {
  menu: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z',
  edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
  play: 'M8 5v14l11-7z',
  more: 'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
  close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  xc: 'M12 2a10 10 0 100 20 10 10 0 000-20zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z',
  undo: 'M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z',
  redo: 'M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z',
  search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
  save: 'M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7l-4-4zm-5 16a3 3 0 110-6 3 3 0 010 6zm3-10H5V5h10v4z',
  down: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z',
  left: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z',
  right: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z',
  up: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z',
  tab: 'M11.59 7.41L15.17 11H1v2h14.17l-3.58 3.59L13 18l6-6-6-6-1.41 1.41zM20 6v12h2V6h-2z',
  folder: 'M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z',
  file: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 7V3.5L18.5 9H13z',
  filepl: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 12h-3v3h-2v-3h-3v-2h3V9h2v3h3v2z',
  info: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z',
  book: 'M18 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2zM6 4h5v8l-2.5-1.5L6 12V4z',
  spark: 'M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2zM19 14l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z',
  gear: 'M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.5.5 0 00.12-.64l-1.92-3.32a.5.5 0 00-.6-.22l-2.39.96a7 7 0 00-1.62-.94l-.36-2.54a.5.5 0 00-.5-.42h-3.84a.5.5 0 00-.5.42l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.5.5 0 00-.6.22L2.74 8.84a.5.5 0 00.12.64l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58a.5.5 0 00-.12.64l1.92 3.32c.12.22.37.3.6.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.26.42.5.42h3.84c.24 0 .45-.18.5-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .6-.22l1.92-3.32a.5.5 0 00-.12-.64l-2.01-1.58zM12 15.6A3.6 3.6 0 1115.6 12 3.6 3.6 0 0112 15.6z',
  person: 'M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  refresh: 'M17.65 6.35A7.96 7.96 0 0012 4a8 8 0 108 8h-2a6 6 0 11-1.76-4.24L13 11h7V4l-2.35 2.35z',
  term: 'M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2zm2.5 3.5l3 3-3 3 1 1 4-4-4-4-1 1zM12 15h5v-1.5h-5V15z',
  trans: 'M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z',
  add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
  trash: 'M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
  copy: 'M16 1H4a2 2 0 00-2 2v14h2V3h12V1zm3 4H8a2 2 0 00-2 2v14a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2zm0 16H8V7h11v14z',
  hist: 'M13 3a9 9 0 00-9 9H1l3.89 3.89.07.14L9 12H6a7 7 0 117 7 6.96 6.96 0 01-4.95-2.05l-1.42 1.42A8.96 8.96 0 0013 21a9 9 0 000-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z',
  send: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z',
  dl: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
  help: 'M12 2a10 10 0 100 20 10 10 0 000-20zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z',
  list: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z',
  mvup: 'M12 4l-6 6h4v10h4V10h4l-6-6z',
  mvdn: 'M12 20l6-6h-4V4h-4v10H6l6 6z',
  pin: 'M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z',
  goto: 'M19 7v4H5.83l3.58-3.59L8 6l-6 6 6 6 1.41-1.41L5.83 13H21V7h-2z',
  clsr: 'M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6-1.41 1.41zM16 6h2v12h-2V6z',
  clsl: 'M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6 1.41-1.41zM6 6H4v12h2V6z',
  clso: 'M7 11v2h10v-2H7zm5-9a10 10 0 100 20 10 10 0 000-20z'
};
const svg = (k, s) => '<svg viewBox="0 0 24 24"' + (s ? ' style="width:' + s + 'px;height:' + s + 'px"' : '') + '><path d="' + P[k] + '"/></svg>';
function fileIcon(name) {
  const e = (/\.([a-z0-9]+)$/i.exec(name) || [])[1] || '';
  const k = e.toLowerCase();
  if (k === 'html' || k === 'htm') return '<svg class="fi" viewBox="0 0 24 24"><path fill="#e44d26" d="M3 2l1.7 19L12 23l7.3-2L21 2z"/><path fill="#fff" d="M7.5 7h9l-.2 2h-6.6l.2 2h6.2l-.5 5.5-3.6 1-3.6-1-.2-2.5h2l.1 1.2 1.7.5 1.7-.5.2-2.2H7.9z"/></svg>';
  const b = (c, t, tc) => '<svg class="fi" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="3" fill="' + c + '"/><text x="12" y="16.5" text-anchor="middle" font-size="10" font-weight="800" font-family="Arial" fill="' + (tc || '#fff') + '">' + t + '</text></svg>';
  if (k === 'css') return b('#2965f1', 'CSS');
  if (k === 'js' || k === 'mjs') return b('#f7df1e', 'JS', '#000');
  if (k === 'py') return b('#3776ab', 'PY');
  if (k === 'json') return b('#6b7280', '{}');
  return '<svg class="fi" viewBox="0 0 24 24" style="color:#9aa3b2"><path d="' + P.file + '"/></svg>';
}

/* ===== التخزين والحالة ===== */
const LSK = 'nero.v1';
const STARTER = `<!مستند html>
<صفحة لغة="ar" اتجاه="يمين">
<راس>
  <ميتا ترميز="utf-8">
  <ميتا اسم="منفذ_العرض" محتوى="width=device-width, initial-scale=1">
  <عنوان_الصفحة>اول برنامج بالعربي</عنوان_الصفحة>
  <ستايل>
    جسم {
      خلفية: تدرج-خطي(135درجة, #1f1c2c, #4b3f72);
      لون: ابيض;
      نوع-الخط: sans-serif;
      ظهور: مرن;
      محاذاة-العناصر: وسط;
      محاذاة-المحتوى: وسط;
      ادنى-ارتفاع: 100ارتفاع_الشاشة;
      هامش: 0;
    }
    .بطاقة {
      خلفية: #ffffff18;
      حشو: 24بكسل;
      استدارة-الحدود: 16بكسل;
      محاذاة-النص: وسط;
    }
    زر {
      خلفية: #ec4899;
      لون: ابيض;
      حدود: بدون;
      حشو: 12بكسل 24بكسل;
      استدارة-الحدود: 12بكسل;
      حجم-الخط: 18بكسل;
      مؤشر: يد;
    }
    زر:تمرير { خلفية: #db2777; }
  </ستايل>
</راس>
<جسم>
  <قسم فئة="بطاقة">
    <عنوان>اهلا بيك بنيرو 👋</عنوان>
    <فقرة معرف="رسالة">اضغط الزر وشوف السحر</فقرة>
    <زر عند_الضغط="سلم()">اضغطني</زر>
  </قسم>
  <سكربت>
    متغير عداد = 0;
    دالة سلم() {
      عداد++;
      وثيقة.عنصر_بالمعرف("رسالة").نص_داخلي = "ضغطت " + عداد + " مرة 🎉";
      اطبع("عداد =", عداد);
    }
  </سكربت>
</جسم>
</صفحة>
`;
let S;
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
function newFile(name, content) { return { id: uid(), name, content: content || '', saved: null, mode: 'auto', ro: false, t: Date.now(), sel: [0, 0], top: 0 }; }
function load() {
  try { S = JSON.parse(localStorage.getItem(LSK)); } catch (e) { S = null; }
  if (!S || !Array.isArray(S.files) || !S.files.length) {
    const f = newFile('index.html', STARTER);
    S = { files: [f], tabs: [f.id], active: f.id, set: {}, recent: [] };
  }
  S.tabs = (S.tabs || []).filter(id => S.files.some(f => f.id === id));
  if (!S.tabs.length) S.tabs = [S.files[0].id];
  if (!S.tabs.includes(S.active)) S.active = S.tabs[0];
  S.recent = S.recent || [];
  S.set = Object.assign({ fs: 14, auto: true, sug: true, model: 'gemini-3.5-flash-lite', prov: 'or', gkey: '', gmodel: 'gemini-3.5-flash-lite', orkey: '', ormodel: 'auto', snip: true, freq: {} }, S.set || {});
  if (!S.set.v3) { S.set.v3 = 1; S.set.prov = 'or'; }
  if (!/gemini/i.test(S.set.model || '')) S.set.model = 'gemini-3.5-flash-lite';
  S.prog = S.prog || {};
}
let pT;
function persist(now) {
  clearTimeout(pT);
  const go = () => { try { localStorage.setItem(LSK, JSON.stringify(S)); } catch (e) { toast('المساحة ممتلئة، نزّل ملفاتك'); } };
  if (now) go(); else pT = setTimeout(go, 500);
}
const cur = () => S.files.find(f => f.id === S.active);
const dirty = f => f.saved !== f.content;
const kind = f => N.kindOf(f.name, f.mode);

/* ===== مساعدات الواجهة ===== */
let toastT;
function toast(msg, actTxt, act) {
  const t = $('#toast');
  t.innerHTML = '';
  const s = document.createElement('span'); s.textContent = msg; t.appendChild(s);
  if (actTxt) { const b = document.createElement('button'); b.textContent = actTxt; b.onclick = () => { t.classList.remove('show'); act && act(); }; t.appendChild(b); }
  t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), actTxt ? 6000 : 2200);
}
const escH = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function modal(build) {
  return new Promise(res => {
    const d = $('#dlg'), card = d.querySelector('.card');
    card.innerHTML = '';
    const close = v => { d.classList.remove('open'); res(v); };
    build(card, close);
    d.classList.add('open');
    d.onclick = e => { if (e.target === d) close(null); };
  });
}
function btns(list, close) {
  const w = document.createElement('div'); w.className = 'acts';
  list.forEach(b => { const e = document.createElement('button'); e.textContent = b.t; if (b.c) e.className = b.c; e.onclick = () => close(b.v); w.appendChild(e); });
  return w;
}
function askText(title, val, ph) {
  return modal((card, close) => {
    card.innerHTML = '<h4>' + escH(title) + '</h4>';
    const i = document.createElement('input'); i.type = 'text'; i.value = val || ''; i.placeholder = ph || ''; card.appendChild(i);
    i.onkeydown = e => { if (e.key === 'Enter') close(i.value); };
    card.appendChild(btns([{ t: 'موافق', v: 'ok', c: 'p' }, { t: 'إلغاء', v: null }], v => close(v === 'ok' ? i.value : null)));
    setTimeout(() => { i.focus(); i.select(); }, 60);
  });
}
function askConfirm(title, msg, yes, no, danger) {
  return modal((card, close) => {
    card.innerHTML = '<h4>' + escH(title) + '</h4><p>' + escH(msg || '') + '</p>';
    card.appendChild(btns([{ t: yes || 'موافق', v: true, c: danger ? 'dz' : 'p' }, { t: no || 'إلغاء', v: false }], close));
  });
}
function pick(title, opts) {
  return modal((card, close) => {
    card.innerHTML = '<h4>' + escH(title) + '</h4>';
    opts.forEach((o, i) => {
      const b = document.createElement('button'); b.className = 'opt';
      b.innerHTML = (o.icon ? svg(o.icon) : '') + '<span>' + escH(o.t) + (o.s ? '<small>' + escH(o.s) + '</small>' : '') + '</span>';
      b.onclick = () => close(i); card.appendChild(b);
    });
    card.appendChild(btns([{ t: 'إلغاء', v: null }], close));
  });
}
function info(title, html) {
  return modal((card, close) => {
    card.innerHTML = '<h4>' + escH(title) + '</h4>' + html;
    card.appendChild(btns([{ t: 'تمام', v: true, c: 'p' }], close));
  });
}

/* ===== المحرر ===== */
let LH = 20;
const H = {};
function applyFont() {
  const fs = S.set.fs; LH = Math.round(fs * 1.45);
  const r = document.documentElement.style;
  r.setProperty('--fs', fs + 'px'); r.setProperty('--lh', LH + 'px');
}
let lastLines = -1;
function codeHTML(code, k) { return splitHL(N.highlight(code, k)).map(l => '<div dir="auto">' + l + '</div>').join(''); }
function splitHL(html) {
  const lines = []; let open = '', cur = '';
  const re = /<span class="([^"]+)">|<\/span>|\n|[^<\n]+|</g; let m;
  while ((m = re.exec(html))) {
    const t = m[0];
    if (t === '\n') { lines.push(cur + (open ? '</span>' : '')); cur = open ? '<span class="' + open + '">' : ''; }
    else if (m[1]) { open = m[1]; cur += t; }
    else if (t === '</span>') { open = ''; cur += t; }
    else cur += t;
  }
  lines.push(cur + (open ? '</span>' : ''));
  return lines;
}
let lineH = [], lineT = [];
function render() {
  const f = cur(); if (!f) return;
  const v = ta.value;
  const rows = splitHL(N.highlight(v, kind(f)));
  const n = v.split('\n').length;
  while (rows.length < n) rows.push('');
  hl.innerHTML = rows.slice(0, n).map(r => '<div dir="auto">' + r + '</div>').join('');
  measure(n);
  syncScroll(); updCur();
}
function measure(n) {
  const kids = hl.children; lineH = new Array(n); lineT = new Array(n);
  let s = '';
  for (let i = 0; i < n; i++) {
    const el = kids[i];
    lineT[i] = el ? el.offsetTop : 8 + i * LH;
    lineH[i] = el ? Math.max(LH, el.offsetHeight) : LH;
    s += '<div style="height:' + lineH[i] + 'px">' + (i + 1) + '</div>';
  }
  gin.innerHTML = s;
  gutter.style.width = Math.max(46, 20 + String(n).length * (S.set.fs * 0.62)) + 'px';
  lastLines = n;
}
function syncScroll() {
  hl.scrollTop = ta.scrollTop;
  gin.style.transform = 'translateY(' + (-ta.scrollTop) + 'px)';
  updCur();
}
function lineOf(pos) { let c = 0, i = -1; const v = ta.value; while ((i = v.indexOf('\n', i + 1)) !== -1 && i < pos) c++; return c; }
function updCur() {
  const l = lineOf(ta.selectionStart);
  curEl.style.top = ((lineT[l] != null ? lineT[l] : 8 + l * LH) - ta.scrollTop) + 'px';
  curEl.style.height = (lineH[l] || LH) + 'px';
}
function reveal(pos) {
  const l = lineOf(pos), y = lineT[l] != null ? lineT[l] : 8 + l * LH, hh = lineH[l] || LH, h = ta.clientHeight;
  if (y < ta.scrollTop + LH) ta.scrollTop = Math.max(0, y - LH * 2);
  else if (y + hh > ta.scrollTop + h - LH) ta.scrollTop = y + hh - h + LH * 3;
  syncScroll();
}
function isRtlAt(pos) {
  const v = ta.value, s = v.lastIndexOf('\n', pos - 1) + 1;
  let e = v.indexOf('\n', pos); if (e < 0) e = v.length;
  const m = /[A-Za-z\u0600-\u06FF]/.exec(v.slice(s, e));
  return !!m && /[\u0600-\u06FF]/.test(m[0]);
}
function loadFile(id) {
  const f = S.files.find(x => x.id === id); if (!f) return;
  const prev = cur();
  if (prev && prev.id !== id) { prev.sel = [ta.selectionStart, ta.selectionEnd]; prev.top = ta.scrollTop; }
  S.active = id;
  if (!S.tabs.includes(id)) S.tabs.push(id);
  S.recent = [id].concat(S.recent.filter(x => x !== id)).slice(0, 15);
  ta.value = f.content; ta.readOnly = !!f.ro; lastLines = -1;
  if (!H[id]) H[id] = { s: [{ v: f.content, a: 0, b: 0 }], i: 0, t: 0 };
  render();
  ta.scrollTop = f.top || 0;
  try { ta.setSelectionRange(f.sel[0], f.sel[1]); } catch (e) {}
  syncScroll(); renderTabs(); renderHeader(); persist();
  hideSugg();
}
function renderHeader() {
  const f = cur();
  $('#fT').textContent = f.name;
  $('#fS').textContent = f.saved === null ? 'ملف جديد' : (dirty(f) ? 'غير محفوظ' : 'محفوظ');
  $('#svdot').style.display = dirty(f) ? 'block' : 'none';
}
function renderTabs() {
  const t = $('#tabs'); t.innerHTML = '';
  S.tabs.forEach(id => {
    const f = S.files.find(x => x.id === id); if (!f) return;
    const d = document.createElement('div');
    d.className = 'tab' + (id === S.active ? ' on' : '') + (dirty(f) ? ' d' : '');
    d.innerHTML = '<span class="dot"></span>' + fileIcon(f.name) + '<span class="nm">' + escH(f.name) + '</span>';
    const x = document.createElement('button'); x.className = 'x'; x.innerHTML = svg('xc'); x.onclick = e => { e.stopPropagation(); closeTab(id); };
    d.appendChild(x); d.onclick = () => { if (id !== S.active) loadFile(id); };
    t.appendChild(d);
    if (id === S.active) setTimeout(() => { t.scrollLeft = d.offsetLeft - t.clientWidth / 2 + d.clientWidth / 2; }, 0);
  });
}
function recordHist(force) {
  const f = cur(), h = H[f.id], now = Date.now();
  if (h.s[h.i].v === f.content) return;
  const e = { v: f.content, a: ta.selectionStart, b: ta.selectionEnd };
  if (!force && now - h.t < 700 && h.i > 0) h.s[h.i] = e;
  else { h.s = h.s.slice(0, h.i + 1); h.s.push(e); if (h.s.length > 300) h.s.shift(); h.i = h.s.length - 1; }
  h.t = now;
}
function commit(force) {
  const f = cur();
  f.content = ta.value; f.t = Date.now();
  recordHist(force); render(); renderHeader();
  $('#tabs .tab.on') && $('#tabs .tab.on').classList.toggle('d', dirty(f));
  persist();
}
function applyHist(h) {
  const f = cur(), e = h.s[h.i];
  ta.value = e.v; f.content = e.v; h.t = 0; lastLines = -1;
  try { ta.setSelectionRange(e.a, e.b); } catch (x) {}
  render(); renderHeader(); renderTabs(); reveal(e.a); persist();
}
function undo() { const h = H[S.active]; if (h.i > 0) { h.i--; applyHist(h); } else toast('لا يوجد تراجع'); }
function redo() { const h = H[S.active]; if (h.i < h.s.length - 1) { h.i++; applyHist(h); } else toast('لا يوجد إعادة'); }
function insert(text, caretBack) {
  if (ta.readOnly) { toast('الملف للقراءة فقط'); return; }
  const s = ta.selectionStart, e = ta.selectionEnd;
  ta.setRangeText(text, s, e, 'end');
  if (caretBack) { const p = s + text.length - caretBack; ta.setSelectionRange(p, p); }
  commit(true); reveal(ta.selectionStart);
}
function insertSnippet(str) {
  const k = str.indexOf('$0');
  if (k < 0) return insert(str);
  insert(str.replace('$0', ''), str.length - 2 - k);
}
function lineRange() {
  const v = ta.value; let s = ta.selectionStart, e = ta.selectionEnd;
  const st = v.lastIndexOf('\n', s - 1) + 1;
  if (e > s && v[e - 1] === '\n') e--;
  let en = v.indexOf('\n', e); if (en < 0) en = v.length;
  return [st, en];
}
function moveLines(dir) {
  if (ta.readOnly) return;
  const v = ta.value, s = ta.selectionStart, e = ta.selectionEnd, [st, en] = lineRange();
  const block = v.slice(st, en);
  if (dir < 0) {
    if (st === 0) return;
    const ps = v.lastIndexOf('\n', st - 2) + 1, prev = v.slice(ps, st - 1);
    ta.setRangeText(block + '\n' + prev, ps, en, 'preserve');
    ta.setSelectionRange(s - prev.length - 1, e - prev.length - 1);
  } else {
    if (en >= v.length) return;
    let ne = v.indexOf('\n', en + 1); if (ne < 0) ne = v.length;
    const next = v.slice(en + 1, ne);
    ta.setRangeText(next + '\n' + block, st, ne, 'preserve');
    ta.setSelectionRange(s + next.length + 1, e + next.length + 1);
  }
  commit(true); reveal(ta.selectionStart);
}
function copyLines(dir) {
  if (ta.readOnly) return;
  const v = ta.value, s = ta.selectionStart, e = ta.selectionEnd, [st, en] = lineRange();
  const block = v.slice(st, en);
  if (dir < 0) { ta.setRangeText(block + '\n', st, st, 'preserve'); ta.setSelectionRange(s, e); }
  else { ta.setRangeText('\n' + block, en, en, 'preserve'); ta.setSelectionRange(s + block.length + 1, e + block.length + 1); }
  commit(true); reveal(ta.selectionStart);
}
function indent(out) {
  if (ta.readOnly) return;
  const s = ta.selectionStart, e = ta.selectionEnd, v = ta.value;
  if (s === e && !out) return insert('  ');
  const [st, en] = lineRange();
  const lines = v.slice(st, en).split('\n');
  let first = 0, total = 0;
  const res = lines.map((l, i) => {
    if (out) { const m = /^( {1,2}|\t)/.exec(l); const r = m ? m[0].length : 0; if (i === 0) first = -r; total -= r; return l.slice(r); }
    if (i === 0) first = 2; total += 2; return '  ' + l;
  });
  ta.setRangeText(res.join('\n'), st, en, 'preserve');
  ta.setSelectionRange(Math.max(st, s + first), e + total);
  commit(true);
}
const mod = { ctrl: false, shift: false };
function setMod(k) { mod[k] = !mod[k]; paintMods(); }
function paintMods() { document.querySelectorAll('[data-mod]').forEach(b => b.classList.toggle('act', mod[b.dataset.mod])); }
function wordEdge(v, p, dir) {
  const isW = c => /[\w؀-ۿ]/.test(c || '');
  if (dir < 0) { while (p > 0 && !isW(v[p - 1])) p--; while (p > 0 && isW(v[p - 1])) p--; }
  else { while (p < v.length && !isW(v[p])) p++; while (p < v.length && isW(v[p])) p++; }
  return p;
}
function moveCaret(d) {
  if ((d === 'l' || d === 'r') && isRtlAt(ta.selectionStart)) d = d === 'l' ? 'r' : 'l';
  const v = ta.value, back = ta.selectionDirection === 'backward';
  let s = ta.selectionStart, e = ta.selectionEnd;
  let anchor = back ? e : s, focus = back ? s : e;
  if (!mod.shift && s !== e) {
    if (d === 'l' || d === 'u') focus = s; else focus = e;
    anchor = focus;
  } else {
    if (d === 'l') focus = mod.ctrl ? wordEdge(v, focus, -1) : Math.max(0, focus - 1);
    else if (d === 'r') focus = mod.ctrl ? wordEdge(v, focus, 1) : Math.min(v.length, focus + 1);
    else {
      const ls = v.lastIndexOf('\n', focus - 1) + 1, col = focus - ls;
      if (d === 'u') {
        if (ls === 0) focus = 0; else { const ps = v.lastIndexOf('\n', ls - 2) + 1; focus = Math.min(ps + col, ls - 1); }
      } else {
        let le = v.indexOf('\n', focus); if (le < 0) focus = v.length; else { let ne = v.indexOf('\n', le + 1); if (ne < 0) ne = v.length; focus = Math.min(le + 1 + col, ne); }
      }
    }
    if (!mod.shift) anchor = focus;
  }
  if (mod.shift) ta.setSelectionRange(Math.min(anchor, focus), Math.max(anchor, focus), focus < anchor ? 'backward' : 'forward');
  else ta.setSelectionRange(focus, focus);
  mod.ctrl = mod.shift = false; paintMods();
  reveal(focus); updCur();
}

/* ===== مساعد الكتابة (إكمال ذكي + قوالب + كلمات الملف) ===== */
const sg = $('#sugg');
function hideSugg() { sg.classList.remove('open'); sg.innerHTML = ''; sg._first = null; }
const SN = typeof SNIPS !== 'undefined' ? SNIPS.map(x => Object.assign({ ks: x.k.split('|').map(N.norm) }, x)) : [];
let dictSet = null, fwCache = { v: null, list: [] };
function dictWords() {
  if (dictSet) return dictSet;
  dictSet = new Set();
  ['tags', 'attrs', 'props', 'vals', 'pseudo', 'at', 'kw', 'gl', 'mem', 'units', 'ev'].forEach(k => (N.W[k] || []).forEach(x => dictSet.add(x.n)));
  return dictSet;
}
function fileWords() {
  const v = ta.value;
  if (fwCache.v === v) return fwCache.list;
  const cnt = new Map(), dict = dictWords();
  (v.match(/[؀-ۿA-Za-z_$][؀-ۿ\w$-]{2,}/g) || []).forEach(w => { if (!dict.has(N.norm(w))) cnt.set(w, (cnt.get(w) || 0) + 1); });
  const list = [...cnt.entries()].sort((a, b) => b[1] - a[1]).map(x => ({ ar: x[0], n: N.norm(x[0]), en: '', file: true }));
  fwCache = { v, list };
  return list;
}
function bumpFreq(w) { const f = S.set.freq || (S.set.freq = {}); f[w] = (f[w] || 0) + 1; persist(); }
function expandSnippet(code, from, to) {
  const v = ta.value, ls = v.lastIndexOf('\n', from - 1) + 1;
  const ind = /^[ \t]*/.exec(v.slice(ls, from))[0];
  const k = code.indexOf('$0');
  let txt = (k < 0 ? code : code.replace('$0', '')).split('\n').map((l, i) => i ? ind + l : l).join('\n');
  let caret = txt.length;
  if (k >= 0) { const head = code.slice(0, k).split('\n').map((l, i) => i ? ind + l : l).join('\n'); caret = head.length; }
  ta.setRangeText(txt, from, to, 'end');
  const p = from + caret; ta.setSelectionRange(p, p);
  commit(true); reveal(p);
}
function updateSugg() {
  if (!S.set.sug || ta.readOnly || document.activeElement !== ta || ta.selectionStart !== ta.selectionEnd) return hideSugg();
  const f = cur(), kn = kind(f);
  if (kn !== 'html' && kn !== 'css' && kn !== 'js') return hideSugg();
  const pos = ta.selectionStart, v = ta.value, before = v.slice(0, pos);
  const m = /([؀-ۿA-Za-z_$][؀-ۿ\w$\-]*)$/.exec(before);
  const w = m ? m[1] : '';
  const head = before.slice(0, pos - w.length), prev = head.slice(-1);
  const ctx = N.contextAt(head, kn);
  if (!w) {
    const emptyOk = (ctx === 'tag' && /<\/?$/.test(head)) || (ctx === 'js' && prev === '.') || (ctx === 'attr' && prev === ' ') || (ctx === 'css-sel' && (prev === '@' || prev === ':')) || ((ctx === 'css-prop') && /[;{]\s*$/.test(head) && /\s$/.test(head)) || ctx.indexOf('val:') === 0;
    if (!emptyOk) return hideSugg();
  }
  const pre = N.norm(w), latin = /^[A-Za-z]/.test(w), afterDot = ctx === 'js' && prev === '.';
  const freq = S.set.freq || {};
  const fr = x => freq[x.ar] || 0;
  const dict = N.wordsFor(ctx, afterDot, prev);
  const out = [], seen = new Set();
  const add = (x, tag) => { const key = (x.sn ? '⚡' : '') + x.ar; if (seen.has(key) || out.length >= 36) return; seen.add(key); out.push(Object.assign({ tag }, x)); };
  const P = dict.filter(x => x.n.startsWith(pre) && x.n !== pre).sort((a, b) => fr(b) - fr(a) || a.n.length - b.n.length);
  const lineStart = /(^|\n)[ \t]*$/.test(head);
  const SS = (S.set.snip !== false && pre && !afterDot)
    ? SN.filter(x => x.c === ctx && (ctx !== 'text' || lineStart) && !(latin && !/html5/i.test(x.k)) && x.ks.some(t => t.startsWith(pre))).map(x => ({ ar: x.n, sn: x })) : [];
  const E = (latin && pre) ? dict.filter(x => x.en && x.en.toLowerCase().startsWith(w.toLowerCase())).sort((a, b) => a.en.length - b.en.length) : [];
  const C = (!latin && pre.length >= 2) ? dict.filter(x => x.n.indexOf(pre) > 0).sort((a, b) => a.n.length - b.n.length) : [];
  const F = (pre && (ctx === 'js' || ctx === 'css-sel' || ctx === 'css-val' || ctx === 'names') && !(ctx === 'js' && afterDot)) ? fileWords().filter(x => x.n.startsWith(pre) && x.n !== pre).slice(0, 8) : [];
  P.slice(0, 6).forEach(x => add(x, 'p'));
  F.slice(0, 5).forEach(x => add(x, 'f'));
  SS.forEach(x => add(x, 's'));
  P.slice(6).forEach(x => add(x, 'p'));
  E.forEach(x => add(x, 'e'));
  F.slice(5).forEach(x => add(x, 'f'));
  C.forEach(x => add(x, 'c'));
  if (!w) dict.slice().sort((a, b) => fr(b) - fr(a)).slice(0, 36).forEach(x => add(x, 'p'));
  if (!out.length) return hideSugg();
  sg.innerHTML = ''; sg._first = null;
  out.forEach(x => {
    const b = document.createElement('button');
    if (x.sn) { b.className = 'sn'; b.textContent = '⚡ ' + x.ar; }
    else {
      b.textContent = x.ar;
      if (x.en && !x.file) { const sm = document.createElement('small'); sm.textContent = x.en; b.appendChild(sm); }
      if (x.file) b.className = 'fw';
    }
    b.onmousedown = e => e.preventDefault();
    b.onclick = () => {
      const from = pos - w.length;
      if (x.sn) { hideSugg(); ta.focus(); expandSnippet(x.sn.code, from, pos); return; }
      let t = x.ar, back = 0;
      if (ctx === 'attr') { t += '=""'; back = 1; } else if (ctx === 'css-prop') t += ': ';
      ta.setRangeText(t, from, pos, 'end');
      if (back) { const p = ta.selectionStart - back; ta.setSelectionRange(p, p); }
      if (!x.file) bumpFreq(x.ar);
      commit(true); hideSugg(); ta.focus(); setTimeout(updateSugg, 0);
    };
    if (!sg._first) sg._first = b;
    sg.appendChild(b);
  });
  sg.classList.add('open'); sg.scrollLeft = 0;
}
function dedupClose() {
  const pos = ta.selectionStart, v = ta.value, m = /<\/([^\s<>\/]+)>$/.exec(v.slice(0, pos));
  if (!m) return false;
  const tag = '</' + m[1] + '>';
  if (v.slice(pos, pos + tag.length) === tag) { ta.setRangeText('', pos, pos + tag.length, 'preserve'); ta.setSelectionRange(pos, pos); return true; }
  return false;
}
function tryCloseTag() {
  if (!S.set.auto || kind(cur()) !== 'html') return;
  const pos = ta.selectionStart, v = ta.value, before = v.slice(0, pos);
  const lt = before.lastIndexOf('<'); if (lt < 0) return;
  const seg = before.slice(lt);
  if (/^<[\/!?]/.test(seg) || /\/>$/.test(seg) || /<[^>]*>[^<]*>$/.test(seg) && seg.indexOf('>') !== seg.length - 1) return;
  const m = /^<([؀-ۿA-Za-z][^\s>\/<]*)/.exec(seg); if (!m) return;
  if ((seg.match(/["']/g) || []).length % 2) return;
  if (N.isVoid(N.tagEn(m[1]))) return;
  if (v.slice(pos).startsWith('</' + m[1])) return;
  ta.setRangeText('</' + m[1] + '>', pos, pos, 'preserve');
  ta.setSelectionRange(pos, pos);
}
function autoIndent() {
  const p = ta.selectionStart, v = ta.value;
  if (v[p - 1] !== '\n') return;
  const ps = v.lastIndexOf('\n', p - 2) + 1, prev = v.slice(ps, p - 1);
  const ind = /^[ \t]*/.exec(prev)[0];
  let extra = '';
  const tr = prev.trim();
  if (/[{\[(]$/.test(tr)) extra = '  ';
  else if (kind(cur()) === 'html') {
    const m = /<([؀-ۿA-Za-z][^\s>\/<]*)[^<>]*>$/.exec(tr);
    if (m && !tr.startsWith('</') && !N.isVoid(N.tagEn(m[1])) && !/\/>$/.test(tr)) extra = '  ';
  }
  const next = v.slice(p, p + 2);
  const brk = extra && (/^(<\/|\}|\]|\))/.test(next));
  const t = ind + extra + (brk ? '\n' + ind : '');
  if (!t) return;
  ta.setRangeText(t, p, p, 'end');
  const np = p + ind.length + extra.length; ta.setSelectionRange(np, np);
}
ta.addEventListener('input', e => {
  if (ta.readOnly) return;
  const t = e.inputType || '';
  if (t === 'insertLineBreak' || t === 'insertParagraph') autoIndent();
  else if (t === 'insertText' && e.data === '>') { if (!dedupClose()) tryCloseTag(); }
  commit(false); updateSugg(); reveal(ta.selectionStart);
});
ta.addEventListener('beforeinput', e => {
  if (e.inputType === 'historyUndo') { e.preventDefault(); undo(); }
  else if (e.inputType === 'historyRedo') { e.preventDefault(); redo(); }
});
ta.addEventListener('scroll', syncScroll);
['keyup', 'click', 'focus', 'touchend'].forEach(ev => ta.addEventListener(ev, () => setTimeout(() => { updCur(); updateSugg(); }, 0)));
document.addEventListener('selectionchange', () => { if (document.activeElement === ta) updCur(); });
ta.addEventListener('blur', () => setTimeout(() => { if (document.activeElement !== ta) hideSugg(); }, 200));
ta.addEventListener('keydown', e => {
  const c = e.ctrlKey || e.metaKey;
  if (c && e.key === 's') { e.preventDefault(); saveFile(); }
  else if (c && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo(); }
  else if (c && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo(); }
  else if (c && e.key === 'f') { e.preventDefault(); toggleFind(true); }
  else if (c && e.key === 'Enter') { e.preventDefault(); runPreview(); }
  else if (e.key === 'Tab') { e.preventDefault(); if (!e.shiftKey && sg.classList.contains('open') && sg._first) sg._first.click(); else indent(e.shiftKey); }
});

/* ===== الملفات ===== */
function saveFile() {
  const f = cur(); f.saved = f.content; persist(true); renderHeader(); renderTabs(); toast('تم الحفظ ✓');
}
function uniqueName(base) {
  const names = new Set(S.files.map(f => f.name));
  if (!names.has(base)) return base;
  const m = /^(.*?)(\.[^.]*)?$/.exec(base); let i = 2;
  while (names.has(m[1] + '-' + i + (m[2] || ''))) i++;
  return m[1] + '-' + i + (m[2] || '');
}
async function newFileDlg() {
  const n = await askText('ملف جديد', uniqueName('index.html'), 'اسم الملف');
  if (n === null || !n.trim()) return;
  const f = newFile(uniqueName(n.trim()), '');
  S.files.push(f); loadFile(f.id); ta.focus();
}
async function closeTab(id) {
  const f = S.files.find(x => x.id === id); if (!f) return;
  if (id === S.active) { f.content = ta.value; }
  if (dirty(f)) {
    const r = await modal((card, close) => {
      card.innerHTML = '<h4>تعديلات غير محفوظة</h4><p>تبي تحفظ «' + escH(f.name) + '» قبل الإغلاق؟</p>';
      card.appendChild(btns([{ t: 'حفظ', v: 's', c: 'p' }, { t: 'تجاهل', v: 'd', c: 'dz' }, { t: 'إلغاء', v: null }], close));
    });
    if (!r) return;
    if (r === 's') f.saved = f.content;
    else { if (f.saved === null) S.files = S.files.filter(x => x.id !== id); else f.content = f.saved; }
  }
  const i = S.tabs.indexOf(id);
  S.tabs = S.tabs.filter(x => x !== id);
  delete H[id];
  if (!S.tabs.length) { const nf = newFile(uniqueName('index.html'), ''); S.files.push(nf); S.tabs = [nf.id]; S.active = nf.id; loadFile(nf.id); return; }
  if (id === S.active) loadFile(S.tabs[Math.min(i, S.tabs.length - 1)]);
  else { renderTabs(); persist(); }
}
function download(name, text) {
  try {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    toast('جاري تنزيل ' + name);
  } catch (e) { toast('التنزيل غير مدعوم هنا، استخدم النسخ'); }
}
async function copyText(t) {
  try { await navigator.clipboard.writeText(t); toast('تم النسخ ✓'); return true; }
  catch (e) {
    try { const x = document.createElement('textarea'); x.value = t; document.body.appendChild(x); x.select(); document.execCommand('copy'); x.remove(); toast('تم النسخ ✓'); return true; }
    catch (e2) { toast('تعذر النسخ'); return false; }
  }
}
async function renameFile() {
  const f = cur(); const n = await askText('إعادة تسمية', f.name);
  if (n === null || !n.trim() || n.trim() === f.name) return;
  f.name = uniqueName(n.trim()); persist(); render(); renderTabs(); renderHeader();
}
async function saveAs() {
  const f = cur();
  const r = await pick('حفظ باسم', [
    { t: 'تنزيل الملف كما هو (عربي)', s: f.name, icon: 'dl' },
    { t: 'تنزيل النسخة الإنجليزية', s: 'بعد التحويل', icon: 'trans' },
    { t: 'حفظ نسخة داخل التطبيق', s: 'باسم جديد', icon: 'save' }]);
  if (r === 0) download(f.name, ta.value);
  else if (r === 1) { const o = N.convert(ta.value, kind(f)); if (o === null) toast('هذا النوع ما يتحول'); else download(f.name, o); }
  else if (r === 2) {
    const n = await askText('حفظ باسم', uniqueName(f.name)); if (n === null || !n.trim()) return;
    const nf = newFile(uniqueName(n.trim()), ta.value); nf.saved = nf.content; S.files.push(nf); loadFile(nf.id); toast('تم الحفظ ✓');
  }
}
function openFromDevice() { $('#fileIn').click(); }
$('#fileIn').addEventListener('change', e => {
  [...e.target.files].forEach(file => {
    const r = new FileReader();
    r.onload = () => { const f = newFile(uniqueName(file.name), String(r.result)); f.saved = f.content; S.files.push(f); loadFile(f.id); toast('تم فتح ' + file.name); };
    r.readAsText(file);
  });
  e.target.value = '';
});
async function gotoLine() {
  const v = await askText('الذهاب إلى السطر', '', 'رقم السطر'); if (v === null) return;
  const n = parseInt(String(v).replace(/[٠-٩]/g, d => d.charCodeAt(0) - 1632), 10); if (!n) return;
  const lines = ta.value.split('\n'); const t = Math.min(Math.max(n, 1), lines.length);
  let p = 0; for (let i = 0; i < t - 1; i++) p += lines[i].length + 1;
  ta.focus(); ta.setSelectionRange(p, p); reveal(p);
}
function formatCode() {
  const f = cur(); const k = kind(f);
  if (ta.readOnly) return toast('الملف للقراءة فقط');
  if (k === 'text') return toast('التنسيق للـ HTML و CSS و JS');
  ta.value = N.reindent(ta.value, k); commit(true); toast('تم التنسيق ✓');
}

/* ===== التحويل ===== */
async function convertDlg(rev) {
  const f = cur(), k = kind(f);
  rev = rev === true;
  let out = rev ? N.toArabic(ta.value, k) : N.convert(ta.value, k);
  if (out === null) { toast('التحويل متاح حالياً لـ HTML و CSS و JS'); return; }
  if (out === ta.value) {
    const alt = rev ? null : N.toArabic(ta.value, k);
    if (alt && alt !== ta.value) { rev = true; out = alt; }
    else { toast(rev ? 'ما لقيت كلمات إنجليزية للتحويل' : 'ما لقيت كلمات عربية للتحويل'); return; }
  }
  const lang = rev ? 'العربية' : 'الإنجليزية';
  const r = await pick('تحويل الكود إلى ' + lang, [
    { t: 'استبدال كودي بالنسخة ' + (rev ? 'العربية' : 'الإنجليزية'), s: 'تقدر ترجع بزر التراجع', icon: 'trans' },
    { t: 'فتحها بتبويب جديد', s: 'يبقى كودك الحالي كما هو', icon: 'filepl' },
    { t: 'تنزيل الملف', s: f.name, icon: 'dl' },
    { t: 'نسخ الكود', icon: 'copy' }]);
  if (r === 0) {
    if (ta.readOnly) return toast('الملف للقراءة فقط');
    ta.value = out; commit(true);
    toast('تم التحويل ✓', 'تراجع', undo);
  } else if (r === 1) {
    const nf = newFile(uniqueName(f.name.replace(/(\.[^.]*)?$/, (rev ? '-ar' : '-en') + '$1')), out); S.files.push(nf); loadFile(nf.id); toast(rev ? 'فتحت النسخة العربية' : 'فتحت النسخة الإنجليزية');
  } else if (r === 2) download(f.name, out);
  else if (r === 3) copyText(out);
}

/* ===== البحث داخل الملف ===== */
const fb = $('#findbar'), fIn = $('#fIn'), rIn = $('#rIn');
function toggleFind(open) {
  const o = open === undefined ? !fb.classList.contains('open') : open;
  fb.classList.toggle('open', o);
  if (o) { const sel = ta.value.slice(ta.selectionStart, ta.selectionEnd); if (sel && !sel.includes('\n')) fIn.value = sel; fIn.focus(); fIn.select(); countFind(); }
  else ta.focus();
}
function allMatches() {
  const q = fIn.value; if (!q) return [];
  const v = ta.value.toLowerCase(), ql = q.toLowerCase(), r = []; let i = -1;
  while ((i = v.indexOf(ql, i + 1)) !== -1) r.push(i);
  return r;
}
function countFind() { const m = allMatches(); const p = ta.selectionStart; const idx = m.findIndex(x => x === ta.selectionStart - 0 || (x <= ta.selectionStart && ta.selectionStart <= x + fIn.value.length)); $('#findcount').textContent = fIn.value ? (m.length ? (idx >= 0 ? idx + 1 : '-') + '/' + m.length : '0') : ''; }
function findStep(dir) {
  const m = allMatches(); if (!m.length) { $('#findcount').textContent = '0'; return toast('ما لقيت شي'); }
  const p = dir > 0 ? ta.selectionEnd : ta.selectionStart - 1;
  let t;
  if (dir > 0) t = m.find(x => x >= p); else { const b = m.filter(x => x <= p); t = b.length ? b[b.length - 1] : undefined; }
  if (t === undefined) t = dir > 0 ? m[0] : m[m.length - 1];
  ta.setSelectionRange(t, t + fIn.value.length); reveal(t); updCur(); countFind();
}
function replaceOne() {
  if (ta.readOnly) return;
  const q = fIn.value; if (!q) return;
  if (ta.value.slice(ta.selectionStart, ta.selectionEnd).toLowerCase() === q.toLowerCase()) {
    ta.setRangeText(rIn.value, ta.selectionStart, ta.selectionEnd, 'end'); commit(true);
  }
  findStep(1);
}
function replaceAll() {
  if (ta.readOnly) return;
  const m = allMatches(); if (!m.length) return toast('ما لقيت شي');
  const q = fIn.value, v = ta.value; let o = '', last = 0;
  m.forEach(i => { o += v.slice(last, i) + rIn.value; last = i + q.length; }); o += v.slice(last);
  ta.value = o; commit(true); countFind(); toast('تم استبدال ' + m.length);
}
fIn.addEventListener('input', () => { findStep(1); });
fIn.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); findStep(1); } });

/* ===== شريط الأدوات السفلي ===== */
const qt = $('#qt');
const PAGES = [];
function qb(html, fn, cls, extra) { return { html, fn, cls: cls || '', extra: extra || '' }; }
function buildQT() {
  PAGES.length = 0;
  PAGES.push([
    [qb('CTRL', () => setMod('ctrl'), '', 'data-mod="ctrl"'), qb(svg('tab'), () => indent(mod.shift), ''), qb('SHFT', () => setMod('shift'), '', 'data-mod="shift"'),
     qb(svg('undo'), undo), qb(svg('redo'), redo), qb(svg('search'), () => toggleFind()), qb(svg('save') + '<i id="svdot"></i>', saveFile), qb('ESC', escKey)],
    [qb(svg('left'), () => moveCaret('l')), qb(svg('right'), () => moveCaret('r')), qb(svg('up'), () => moveCaret('u')), qb(svg('down'), () => moveCaret('d')),
     qb(svg('mvup') + '<b class="sm">M</b>', () => moveLines(-1)), qb(svg('mvdn') + '<b class="sm">M</b>', () => moveLines(1)),
     qb(svg('mvup') + '<b class="sm">C</b>', () => copyLines(-1)), qb(svg('mvdn') + '<b class="sm">C</b>', () => copyLines(1))]
  ]);
  const sy = c => qb(c, () => insert(c), 'sy');
  PAGES.push([
    ['{', '}', '[', ']', '(', ')', '<', '>'].map(sy),
    [';', "'", '"', '&', '|', '=', '/', '!'].map(sy)
  ]);
  const sn = (t, s) => qb(t, () => insertSnippet(s), 'sn');
  PAGES.push([
    [sn('قسم', '<قسم>$0</قسم>'), sn('فقرة', '<فقرة>$0</فقرة>'), sn('زر', '<زر عند_الضغط="$0"></زر>'), sn('رابط', '<رابط وجهة="$0"></رابط>'),
     sn('صورة', '<صورة مصدر="$0">'), sn('ادخال', '<ادخال نوع="نص" نص_توضيحي="$0">'), sn('ستايل', '<ستايل>\n  $0\n</ستايل>'), sn('سكربت', '<سكربت>\n  $0\n</سكربت>')],
    [sn('قائمة', '<قائمة>\n  <عنصر>$0</عنصر>\n</قائمة>'), sn('عنوان', '<عنوان>$0</عنوان>'), sn('دالة', 'دالة اسم() {\n  $0\n}'), sn('اذا', 'اذا ($0) {\n  \n}'),
     sn('اطبع', 'اطبع($0);'), sn('مستمع', 'عنصر.اضف_مستمع("نقر", () => {\n  $0\n});'), sn('، ؛ ؟', '،'), sn('قالب', '<!مستند html>\n<صفحة لغة="ar" اتجاه="يمين">\n<راس>\n  <ميتا ترميز="utf-8">\n  <ميتا اسم="منفذ_العرض" محتوى="width=device-width, initial-scale=1">\n  <عنوان_الصفحة>$0</عنوان_الصفحة>\n</راس>\n<جسم>\n  \n</جسم>\n</صفحة>\n')]
  ]);
}
let page = 0;
function renderQT() {
  qt.innerHTML = '';
  PAGES[page].forEach(row => {
    const r = document.createElement('div'); r.className = 'qr on';
    row.forEach(b => {
      const e = document.createElement('button'); e.className = 'qb ' + b.cls; e.innerHTML = b.html;
      if (b.extra) { const m = /data-mod="(\w+)"/.exec(b.extra); if (m) e.dataset.mod = m[1]; }
      e.onclick = () => { b.fn(); if (document.activeElement !== ta && !fb.classList.contains('open') && b.html !== 'ESC') {} };
      r.appendChild(e);
    });
    qt.appendChild(r);
  });
  paintMods(); renderHeader();
  $('#fab').classList.toggle('up', page !== 0);
}
['pointerdown', 'mousedown'].forEach(ev => qt.addEventListener(ev, e => e.preventDefault()));
['pointerdown', 'mousedown'].forEach(ev => $('#fab').addEventListener(ev, e => e.preventDefault()));
$('#fab').onclick = () => { page = (page + 1) % PAGES.length; renderQT(); };
function escKey() {
  if ($('#pv').classList.contains('open')) return closePreview();
  if ($('#ai').classList.contains('open')) return closeAI();
  if ($('#drawer').classList.contains('open')) return closeDrawer();
  if (fb.classList.contains('open')) return toggleFind(false);
  closeMenu(); ta.blur();
}

/* ===== القوائم ===== */
let menuEl = null, shade = null;
function closeMenu() { if (menuEl) { menuEl.remove(); shade.remove(); menuEl = shade = null; } }
function showMenu(items, side) {
  closeMenu();
  shade = document.createElement('div'); shade.className = 'shade'; shade.onclick = closeMenu; document.body.appendChild(shade);
  menuEl = document.createElement('div'); menuEl.className = 'menu';
  menuEl.style.top = '52px'; if (side === 'r') menuEl.style.right = '8px'; else menuEl.style.left = '8px';
  items.forEach(it => {
    if (it === '-') { const s = document.createElement('div'); s.className = 'msep'; menuEl.appendChild(s); return; }
    const b = document.createElement('button'); b.className = 'mi' + (it.off ? ' off' : '');
    let right = it.icon ? svg(it.icon) : '';
    if (it.check !== undefined) right = '<span class="chk' + (it.check ? ' on' : '') + '"></span>';
    b.innerHTML = '<span class="lb">' + escH(it.t) + (it.s ? '<small>' + escH(it.s) + '</small>' : '') + '</span>' + right;
    b.onclick = () => { if (it.off) return; closeMenu(); it.fn && it.fn(); };
    menuEl.appendChild(b);
  });
  document.body.appendChild(menuEl);
}
function fileMenu() {
  const f = cur();
  showMenu([
    { t: 'خصائص الملف', icon: 'info', fn: fileProps, off: false },
    '-',
    { t: 'إعادة تسمية', fn: renameFile },
    { t: 'تمييز الصيغة (Syntax Highlighting)', s: kind(f), fn: chooseMode },
    { t: 'ترميز النص', s: 'UTF-8', off: true },
    { t: 'للقراءة فقط', check: !!f.ro, fn: () => { f.ro = !f.ro; ta.readOnly = f.ro; persist(); } },
    { t: 'تنسيق', fn: formatCode },
    { t: 'تحويل للإنجليزية', icon: 'trans', fn: () => convertDlg(false) },
    { t: 'تحويل للعربية (من الإنجليزي)', icon: 'trans', fn: () => convertDlg(true) },
    '-',
    { t: 'إغلاق التبويبات الأخرى', icon: 'clso', fn: closeOthers },
    '-',
    { t: 'بحث', icon: 'search', fn: () => toggleFind(true) },
    { t: 'الذهاب إلى السطر', icon: 'goto', fn: gotoLine }
  ], 'l');
}
function mainMenu() {
  showMenu([
    { t: 'ملف جديد', icon: 'filepl', fn: newFileDlg },
    { t: 'حفظ', icon: 'save', fn: saveFile },
    { t: 'حفظ باسم', icon: 'save', fn: saveAs },
    { t: 'فتح ملف من الجهاز', icon: 'dl', fn: openFromDevice },
    { t: 'الملفات', icon: 'folder', fn: () => openDrawer('files') },
    { t: 'إغلاق الملف', icon: 'close', fn: () => closeTab(S.active) },
    { t: 'الملفات الأخيرة', icon: 'hist', fn: recentDlg },
    { t: 'البحث عن ملف', icon: 'search', fn: () => openDrawer('search') },
    { t: 'وحدة التحكم', icon: 'term', fn: () => runPreview(true) },
    { t: 'الدورة الكاملة', icon: 'book', fn: () => openAI('course') },
    { t: 'المعلم الذكي', icon: 'spark', fn: () => openAI('chat') },
    '-',
    { t: 'الإعدادات', icon: 'gear', fn: settingsDlg },
    { t: 'مساعدة', icon: 'help', fn: helpDlg }
  ], 'r');
}
function closeOthers() { const id = S.active; S.tabs = [id]; renderTabs(); persist(); }
async function chooseMode() {
  const f = cur(); const ms = ['auto', 'html', 'css', 'js', 'text'];
  const r = await pick('تمييز الصيغة', [{ t: 'تلقائي (حسب الامتداد)' }, { t: 'HTML' }, { t: 'CSS' }, { t: 'JavaScript' }, { t: 'نص عادي' }]);
  if (r === null) return; f.mode = ms[r]; persist(); render(); toast('الصيغة: ' + kind(f));
}
function fileProps() {
  const f = cur(); const lines = ta.value.split('\n').length;
  info('خصائص الملف', '<p>الاسم: <b style="direction:ltr;display:inline-block">' + escH(f.name) + '</b></p><p>النوع: ' + kind(f) + '</p><p>عدد الأسطر: ' + lines + '</p><p>عدد الأحرف: ' + ta.value.length + '</p><p>الحالة: ' + (f.saved === null ? 'ملف جديد' : dirty(f) ? 'غير محفوظ' : 'محفوظ') + '</p>');
}
async function recentDlg() {
  const list = S.recent.map(id => S.files.find(f => f.id === id)).filter(Boolean);
  if (!list.length) return toast('ما في ملفات أخيرة');
  const r = await pick('الملفات الأخيرة', list.map(f => ({ t: f.name, s: f.saved === null ? 'ملف جديد' : 'محفوظ' })));
  if (r !== null) loadFile(list[r].id);
}

/* ===== القائمة الجانبية ===== */
let panel = 'files';
const RAILS = [['files', 'folder'], ['search', 'search'], ['ref', 'book'], ['ai', 'spark'], ['set', 'gear']];
function openDrawer(p) { panel = p || panel; $('#drawer').classList.add('open'); renderRail(); renderPanel(); }
function closeDrawer() { $('#drawer').classList.remove('open'); }
$('#dscrim').onclick = closeDrawer;
function renderRail() {
  const r = $('#rail'); r.innerHTML = '';
  RAILS.forEach(([k, ic]) => {
    const b = document.createElement('button'); b.className = 'rb' + (k === panel ? ' on' : ''); b.innerHTML = svg(ic);
    b.onclick = () => {
      if (k === 'ai') { closeDrawer(); openAI(); }
      else if (k === 'set') { closeDrawer(); settingsDlg(); }
      else { panel = k; renderRail(); renderPanel(); }
    };
    r.appendChild(b);
  });
  const av = document.createElement('div'); av.className = 'av';
  av.innerHTML = '<button>' + svg('person') + '</button>';
  av.firstChild.onclick = () => info('نيرو', '<p>نيرو v1.0 — محرر برمجة بالعربي.</p><p>اكتب كودك بالعربي، وبضغطة زر يتحول للإنجليزي الحقيقي. ابدأ بـ HTML وCSS وJavaScript، وPython قريباً.</p>');
  r.appendChild(av);
}
function renderPanel() {
  const b = $('#pbody'); b.innerHTML = '';
  if (panel === 'files') panelFiles(b);
  else if (panel === 'search') panelSearch(b);
  else panelRef(b);
}
function head(b, title, acts) {
  const h = document.createElement('div'); h.className = 'ph'; h.innerHTML = '<h3>' + title + '</h3>';
  (acts || []).forEach(a => { const x = document.createElement('button'); x.className = 'ib'; x.innerHTML = svg(a[0]); x.onclick = a[1]; h.appendChild(x); });
  b.appendChild(h);
}
function panelFiles(b) {
  head(b, 'الملفات', [['filepl', () => { closeDrawer(); newFileDlg(); }], ['dl', () => { closeDrawer(); openFromDevice(); }]]);
  const l = document.createElement('div'); l.className = 'plist'; b.appendChild(l);
  [...S.files].sort((a, c) => c.t - a.t).forEach(f => {
    const r = document.createElement('div'); r.className = 'pi'; r.style.cursor = 'pointer';
    r.innerHTML = fileIcon(f.name) + '<div class="t"><b>' + escH(f.name) + '</b><small>' + (f.saved === null ? 'ملف جديد' : dirty(f) ? 'غير محفوظ' : 'محفوظ') + (S.tabs.includes(f.id) ? ' · مفتوح' : '') + '</small></div>';
    const d = document.createElement('button'); d.className = 'ib'; d.innerHTML = svg('trash');
    d.onclick = async e => {
      e.stopPropagation();
      if (await askConfirm('حذف الملف', 'تبي تحذف «' + f.name + '» نهائياً؟', 'حذف', 'إلغاء', true)) {
        S.files = S.files.filter(x => x.id !== f.id); S.tabs = S.tabs.filter(x => x !== f.id); delete H[f.id];
        if (!S.files.length) { const nf = newFile('index.html', ''); S.files.push(nf); }
        if (!S.tabs.length) S.tabs = [S.files[0].id];
        if (f.id === S.active) { S.active = S.tabs[0]; loadFile(S.active); } else { renderTabs(); persist(); }
        renderPanel();
      }
    };
    r.appendChild(d); r.onclick = () => { closeDrawer(); loadFile(f.id); }; l.appendChild(r);
  });
}
function panelSearch(b) {
  head(b, 'بحث في الملفات');
  const i = document.createElement('input'); i.className = 'pin'; i.placeholder = 'اكتب كلمة…'; b.appendChild(i);
  const l = document.createElement('div'); l.className = 'plist'; b.appendChild(l);
  const run = () => {
    l.innerHTML = ''; const q = i.value.trim().toLowerCase();
    if (!q) { l.innerHTML = '<div class="empty">ابحث بأسماء الملفات أو بمحتواها</div>'; return; }
    let n = 0;
    S.files.forEach(f => {
      const content = f.id === S.active ? ta.value : f.content;
      const lines = content.split('\n'); const hits = [];
      lines.forEach((ln, ix) => { if (ln.toLowerCase().includes(q) && hits.length < 3) hits.push([ix, ln]); });
      if (!hits.length && !f.name.toLowerCase().includes(q)) return;
      n++;
      const r = document.createElement('button'); r.className = 'sr';
      r.innerHTML = '<b>' + escH(f.name) + '</b>' + hits.map(h => '<code>' + (h[0] + 1) + ': ' + escH(h[1].trim().slice(0, 60)) + '</code>').join('');
      r.onclick = () => { closeDrawer(); loadFile(f.id); if (hits.length) { let p = 0; const ls = f.content.split('\n'); for (let k = 0; k < hits[0][0]; k++) p += ls[k].length + 1; ta.setSelectionRange(p, p); reveal(p); } };
      l.appendChild(r);
    });
    if (!n) l.innerHTML = '<div class="empty">ما لقيت نتائج</div>';
  };
  i.oninput = run; run(); setTimeout(() => i.focus(), 100);
}
function panelRef(b) {
  head(b, 'مرجع الكلمات');
  const i = document.createElement('input'); i.className = 'pin'; i.placeholder = 'ابحث بالعربي أو الإنجليزي…'; b.appendChild(i);
  const l = document.createElement('div'); l.className = 'plist'; b.appendChild(l);
  const data = N.reference();
  const open = new Set();
  const run = () => {
    l.innerHTML = ''; const q = N.norm(i.value.trim());
    data.forEach((g, gi) => {
      const items = q ? g.items.filter(x => N.norm(x.ar).includes(q) || x.en.toLowerCase().includes(q)) : g.items;
      if (!items.length) return;
      const h = document.createElement('button'); h.className = 'grp';
      const isOpen = q || open.has(gi);
      h.innerHTML = '<span>' + g.title + '</span><span>' + items.length + (isOpen ? ' ▴' : ' ▾') + '</span>';
      h.onclick = () => { open.has(gi) ? open.delete(gi) : open.add(gi); run(); };
      l.appendChild(h);
      if (isOpen) items.forEach(x => {
        const r = document.createElement('button'); r.className = 'ri';
        r.innerHTML = '<span class="a">' + escH(x.ar) + '</span><span class="e">' + escH(x.en) + '</span>';
        r.onclick = () => { closeDrawer(); ta.focus(); insert(x.ins); toast('أُدرجت: ' + x.ins); };
        l.appendChild(r);
      });
    });
    if (!l.children.length) l.innerHTML = '<div class="empty">ما لقيت كلمة</div>';
  };
  i.oninput = run; run();
}

/* ===== الإعدادات والمساعدة ===== */
function settingsDlg() {
  modal((card, close) => {
    card.innerHTML = '<h4>الإعدادات</h4>';
    const row = (label, el) => { const d = document.createElement('div'); d.className = 'fld'; const s = document.createElement('span'); s.textContent = label; d.appendChild(s); d.appendChild(el); card.appendChild(d); };
    const rg = document.createElement('input'); rg.type = 'range'; rg.min = 11; rg.max = 22; rg.value = S.set.fs;
    rg.oninput = () => { S.set.fs = +rg.value; applyFont(); lastLines = -1; render(); persist(); };
    row('حجم الخط: ' + S.set.fs, rg);
    const sw = (key) => { const b = document.createElement('button'); b.className = 'sw' + (S.set[key] ? ' on' : ''); b.onclick = () => { S.set[key] = !S.set[key]; b.classList.toggle('on', S.set[key]); persist(); if (!S.set.sug) hideSugg(); }; return b; };
    row('مساعد الكتابة (إكمال ذكي)', sw('sug')); row('قوالب الكتابة السريعة ⚡', sw('snip')); row('إغلاق الوسوم تلقائياً', sw('auto'));
    const pv = document.createElement('select'); pv.style.cssText = 'width:55%;height:38px;border-radius:10px;border:1px solid #4a4f58;background:#1b1e22;color:#fff;padding:0 8px;font:inherit;font-size:14px';
    [['or', 'OpenRouter (مدمج، تلقائي)'], ['gemini', 'Gemini بمفتاحك المجاني'], ['puter', 'Puter (نافذة تسجيل)']].forEach(o => { const op = document.createElement('option'); op.value = o[0]; op.textContent = o[1]; if (S.set.prov === o[0]) op.selected = true; pv.appendChild(op); });
    pv.onchange = () => { S.set.prov = pv.value; persist(); };
    row('مزود المعلم', pv);
    const ok_ = document.createElement('input'); ok_.type = 'text'; ok_.value = S.set.orkey || ''; ok_.placeholder = 'sk-or-v1-… (اختياري)'; ok_.autocomplete = 'off';
    ok_.oninput = () => { S.set.orkey = ok_.value.trim(); persist(); };
    row('مفاتيح OpenRouter إضافية', ok_);
    const px_ = document.createElement('input'); px_.type = 'text'; px_.value = S.set.proxy || ''; px_.placeholder = 'https://….workers.dev (اختياري)'; px_.autocomplete = 'off';
    px_.oninput = () => { S.set.proxy = px_.value.trim(); persist(); };
    row('رابط الوسيط (يخبي المفاتيح)', px_);
    const om = document.createElement('input'); om.type = 'text'; om.value = S.set.ormodel || 'auto'; om.placeholder = 'auto'; om.oninput = () => { S.set.ormodel = om.value.trim() || 'auto'; persist(); };
    row('نموذج OpenRouter (auto = الأفضل)', om);
    const gk = document.createElement('input'); gk.type = 'text'; gk.value = S.set.gkey || ''; gk.placeholder = 'AIza…'; gk.autocomplete = 'off';
    gk.oninput = () => { S.set.gkey = gk.value.trim(); persist(); };
    row('مفتاح Gemini', gk);
    const gm = document.createElement('input'); gm.type = 'text'; gm.value = S.set.gmodel || ''; gm.oninput = () => { S.set.gmodel = gm.value.trim() || 'gemini-3.5-flash-lite'; persist(); };
    row('نموذج Gemini', gm);
    const pm = document.createElement('input'); pm.type = 'text'; pm.value = S.set.model; pm.oninput = () => { S.set.model = pm.value.trim() || 'gemini-3.5-flash-lite'; persist(); };
    row('نموذج Puter', pm);
    const note = document.createElement('p'); note.style.cssText = 'font-size:13px;color:#aeb4bf;line-height:1.7;margin:8px 0';
    note.textContent = 'OpenRouter: مفتاحك المجاني من openrouter.ai/keys (تلصقه هنا مرة وحدة وينحفظ على جهازك فقط، يمديك تحط عدة مفاتيح بفراغ بينها). يختار تلقائياً أقوى موديل مجاني للبرمجة ويبدّل المفتاح إذا وصل حده. إذا عندك رابط وسيط (Worker) الصقه وما تحتاج مفاتيح داخل التطبيق.';
    card.appendChild(note);
    const kb = btns([{ t: 'احصل على مفتاح مجاني', v: 'k' }, { t: 'اختبار الاتصال', v: 't' }], async v => {
      if (v === 'k') { try { window.open('https://openrouter.ai/keys', '_blank'); } catch (e) {} copyText('https://openrouter.ai/keys'); }
      else {
        toast('جاري الاختبار…');
        try { const r = await (S.set.prov === 'gemini' && (S.set.gkey || '').trim() ? viaGemini : viaOR)([{ role: 'user', content: 'قل كلمة وحدة: جاهز' }], () => {}); toast('اشتغل ✓ ' + r.slice(0, 20)); }
        catch (e) { toast(e.message || 'فشل الاتصال'); }
      }
    });
    kb.querySelectorAll('button').forEach(b => { const orig = b.onclick; b.onclick = () => { orig(); }; });
    card.appendChild(kb);
    const a = btns([{ t: 'تم', v: 1, c: 'p' }, { t: 'مسح كل البيانات', v: 2, c: 'dz' }], async v => {
      if (v === 2) { if (await askConfirm('مسح كل البيانات', 'راح تنحذف كل ملفاتك من التطبيق. متأكد؟', 'امسح', 'إلغاء', true)) { localStorage.removeItem(LSK); location.reload(); } else settingsDlg(); }
      else close(1);
    });
    card.appendChild(a);
  });
}
function helpDlg() {
  info('كيف تستخدم نيرو', `
<p><b>1.</b> اكتب كودك بالعربي (مثلاً <code style="direction:ltr;display:inline-block">&lt;قسم&gt;</code> و <code>لون: احمر;</code>).</p>
<p><b>2.</b> اضغط زر <b>EN</b> الملون فوق، فيتحول كودك لإنجليزي حقيقي. وإذا كودك إنجليزي أصلاً، نفس الزر يحوله للعربي (أو من قائمة الملف: «تحويل للعربية»).</p>
<p><b>3.</b> زر ▶ يشغّل الصفحة (يحوّل تلقائياً ويعرضها).</p>
<p><b>4.</b> الكلمات الغير معروفة تنترك كما هي، فتقدر تخلط عربي وإنجليزي.</p>
<p><b>5.</b> من القائمة الجانبية: <b>مرجع الكلمات</b> فيه كل الكلمات، و<b>الدورة الكاملة</b> تعلمك من الصفر (32 درس)، و<b>المعلم</b> يجاوب أسئلتك.</p>
<p>قواعد سريعة: الوسوم <code>&lt;قسم&gt;</code> · الخصائص <code>فئة="…"</code> · CSS <code>حجم-الخط: 20بكسل;</code> · JS <code>دالة</code> <code>اذا</code> <code>اطبع()</code>.</p>
<p>العنوان الكبير <code>&lt;عنوان&gt;</code> = h1، وعنوان الصفحة <code>&lt;عنوان_الصفحة&gt;</code> = title.</p>`);
}

/* ===== المعاينة ===== */
const CAP = '<script>(function(){var p=function(t,a){try{parent.postMessage({nero:1,t:t,m:Array.prototype.map.call(a,function(x){try{return typeof x==="object"?JSON.stringify(x):String(x)}catch(e){return String(x)}}).join(" ")},"*")}catch(e){}};["log","info","warn","error"].forEach(function(k){var o=console[k];console[k]=function(){p(k,arguments);try{o.apply(console,arguments)}catch(e){}}});window.addEventListener("error",function(e){p("error",[e.message+" (سطر "+e.lineno+")"])});window.addEventListener("unhandledrejection",function(e){p("error",[String(e.reason)])});["localStorage","sessionStorage"].forEach(function(n){try{window[n].getItem("x")}catch(e){var m={};try{Object.defineProperty(window,n,{configurable:true,value:{getItem:function(k){return k in m?m[k]:null},setItem:function(k,v){m[k]=String(v)},removeItem:function(k){delete m[k]},clear:function(){m={}},key:function(i){return Object.keys(m)[i]||null},get length(){return Object.keys(m).length}}})}catch(e2){}}})})();<\/script>';
let pvCode = '';
function runPreview(showConsole) {
  const f = cur(), k = kind(f);
  if (k !== 'html') { toast('التشغيل متاح لملفات HTML'); return; }
  previewDoc(ta.value, showConsole);
}
function previewDoc(arabicSrc, showConsole) {
  let code = N.convert(arabicSrc, 'html');
  if (/<head[^>]*>/i.test(code)) code = code.replace(/<head[^>]*>/i, m => m + CAP);
  else if (/<!doctype[^>]*>/i.test(code)) code = code.replace(/<!doctype[^>]*>/i, m => m + CAP);
  else code = CAP + code;
  pvCode = code; $('#pvl').innerHTML = '';
  $('#pvf').srcdoc = code;
  $('#pv').classList.add('open');
  $('#pvc').classList.toggle('open', !!showConsole === true);
}
function closePreview() { $('#pv').classList.remove('open'); $('#pvf').srcdoc = ''; }
window.addEventListener('message', e => {
  const d = e.data; if (!d || !d.nero) return;
  const l = $('#pvl'), row = document.createElement('div'); row.className = d.t; row.textContent = d.m; l.appendChild(row); l.scrollTop = l.scrollHeight;
  if (d.t === 'error') $('#pvc').classList.add('open');
});

/* ===== المعلم الذكي (Puter - مجاني بدون API) ===== */
const SYS = 'أنت «معلم نيرو»، معلم برمجة ودود يشرح بالعربي البسيط (يمكنك استخدام لمسة عراقية خفيفة). نيرو محرر يسمح بكتابة HTML وCSS وJavaScript بكلمات عربية، وبضغطة زر يحوّلها لكود إنجليزي حقيقي. يوجد داخل التطبيق كورس كامل (HTML ثم CSS ثم JavaScript ثم مشاريع) بتبويب «الدورة الكاملة»، وجّه المستخدم له وساعده بأي درس. هدفك أن تعلّم المستخدم البرمجة خطوة بخطوة، وتربط دائماً بين الكلمة العربية ومقابلها الإنجليزي لأن هذا هو الكود الحقيقي. المستخدم يريد أن يصير محترف HTML بلا حدود: علّمه كما يعلّم مهندس واجهات محترف (وسوم دلالية، إتاحة، تصميم متجاوب، Flexbox وGrid، متغيرات CSS، حركات، نماذج، DOM والأحداث، تنظيم المشاريع، أفضل الممارسات)، صحّح أخطاءه بلطف مع السبب، واذا طلب بناء صفحة أو مشروع اعطه كوداً كاملاً جاهزاً للتشغيل بدون نقاط حذف أو أجزاء ناقصة. اكتب بالعربي الواضح ولا تطل بلا داعٍ.\n' +
  'قواعد: 1) في الأمثلة استخدم فقط كلمات القاموس أدناه بالضبط، وإذا لم توجد كلمة عربية اكتب الكلمة الإنجليزية كما هي. 2) ضع الكود داخل ```html أو ```css أو ```js. 3) بعد المثال العربي اعرض النسخة الإنجليزية الناتجة باختصار. 4) اجعل الشرح قصيراً ومركزاً وخطوة خطوة، واقترح تمريناً صغيراً. 5) صيغة الكود: الوسوم <قسم>…</قسم>، الخصائص فئة="س"، CSS: جسم { لون: احمر; حجم-الخط: 20بكسل; }، JS: دالة اسم() { اذا (س > 1) { اطبع("مرحبا") } }. العنوان الكبير <عنوان> = h1 وعنوان الصفحة <عنوان_الصفحة> = title.\n\nالقاموس:\n' + N.promptDict();
let chat = [], busy = false;
const aim = $('#aim');
let aiTab = 'course', curLesson = null, lpart = 'html', lenv = false;
function openAI(tab) { $('#ai').classList.add('open'); setTab(tab || aiTab); }
function closeAI() { $('#ai').classList.remove('open'); }
function setTab(t) {
  aiTab = t;
  document.querySelectorAll('#aitabs button').forEach(b => b.classList.toggle('on', b.dataset.t === t));
  $('#course').classList.toggle('on', t === 'course'); $('#chatwrap').classList.toggle('on', t === 'chat');
  if (t === 'course') renderCourse();
  else {
    if (!aim.children.length) addBub('a', 'أهلاً! أنا معلم نيرو 👋\nاسألني أي شي عن البرمجة بالعربي، أو افتح تبويب «الدورة الكاملة» وابدأ من الدرس الأول. أكتب لك أمثلة بكلمات عربية وأوضح لك مقابلها الإنجليزي.');
    renderChips();
  }
}
function md(text) {
  if ((text.match(/```/g) || []).length % 2) text += '\n```';
  const parts = text.split(/```/); let html = '';
  parts.forEach((p, i) => {
    if (i % 2 === 0) {
      html += escH(p).replace(/`([^`\n]+)`/g, '<code>$1</code>').replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>').replace(/^#{1,4}\s*(.+)$/gm, '<b>$1</b>').replace(/\n/g, '<br>');
    } else {
      const m = /^([\w+-]*)\n?([\s\S]*)$/.exec(p); const lang = (m[1] || '').toLowerCase(), code = m[2].replace(/\n$/, '');
      const k = lang === 'html' ? 'html' : lang === 'css' ? 'css' : (lang === 'js' || lang === 'javascript') ? 'js' : 'text';
      html += '<div class="cb" data-i="' + i + '"><div class="cbh"><span><button data-a="copy">نسخ</button><button data-a="ins">ادرج بالمحرر</button></span><span>' + (lang || 'code') + '</span></div><pre>' + codeHTML(code, k) + '</pre></div>';
    }
  });
  return { html, parts };
}
function addBub(role, text) {
  const b = document.createElement('div'); b.className = 'bub ' + role;
  if (role === 'u') b.textContent = text; else fillBub(b, text);
  aim.appendChild(b); aim.scrollTop = aim.scrollHeight; return b;
}
function fillBub(b, text) {
  const r = md(text); b.innerHTML = r.html;
  b.querySelectorAll('.cb').forEach(cb => {
    const code = (r.parts[+cb.dataset.i] || '').replace(/^[\w+-]*\n?/, '').replace(/\n$/, '');
    cb.querySelector('[data-a=copy]').onclick = () => copyText(code);
    cb.querySelector('[data-a=ins]').onclick = () => { closeAI(); ta.focus(); insert(code); toast('أُدرج الكود بالمحرر'); };
  });
}
function renderChips() {
  const c = $('#aic'); c.innerHTML = '';
  [['اشرح الكود الحالي', 'اشرح لي هذا الكود سطر بسطر وبشكل بسيط، ووضح مقابل كل كلمة عربية بالإنجليزي:', true],
   ['لاقي الأخطاء', 'راجع هذا الكود ودلني على الأخطاء وصححها:', true],
   ['علمني HTML من الصفر', 'علمني HTML من الصفر خطوة بخطوة بكلمات نيرو العربية، ابدأ بالدرس الأول فقط.'],
   ['علمني CSS', 'علمني CSS من الصفر بكلمات نيرو العربية، ابدأ بالدرس الأول فقط.'],
   ['علمني JavaScript', 'علمني JavaScript من الصفر بكلمات نيرو العربية، ابدأ بالدرس الأول فقط.'],
   ['منهج المحترفين', 'ضع لي منهجاً مرتباً لأصير محترف HTML وCSS وJavaScript بنيرو (مراحل واضحة)، وابدأ بالمرحلة الأولى فقط مع تمرين.'],
   ['ابنِ لي صفحة', 'ابنِ لي صفحة ويب كاملة احترافية (متجاوبة وجميلة) بكلمات نيرو العربية، واسألني أولاً عن نوعها إن لم أحدد.'],
   ['اعطني تمرين', 'اعطني تمرين صغير مناسب لمستواي بكلمات نيرو العربية.'],
   ['شلون أسوي زر؟', 'شلون أسوي زر يسوي شي لما أضغط عليه؟ بكلمات نيرو العربية.']
  ].forEach(([t, q, withCode]) => {
    const b = document.createElement('button'); b.textContent = t;
    b.onclick = () => send(q + (withCode ? '\n```\n' + ta.value.slice(0, 6000) + '\n```' : ''), t);
    c.appendChild(b);
  });
}
function extract(r) {
  if (typeof r === 'string') return r;
  const c = r && r.message && r.message.content;
  if (typeof c === 'string') return c;
  if (Array.isArray(c)) return c.map(x => x.text || '').join('');
  return (r && r.text) || '';
}
const GM_FALLBACK = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];
class Fatal extends Error {}
async function viaGemini(msgs, onTok) {
  const key = (S.set.gkey || '').trim();
  const models = [S.set.gmodel].concat(GM_FALLBACK).filter((m, i, a) => m && a.indexOf(m) === i);
  let last = null;
  for (const m of models) {
    const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/' + m + ':streamGenerateContent?alt=sse', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: SYS }] }, contents: msgs.map(x => ({ role: x.role === 'assistant' ? 'model' : 'user', parts: [{ text: x.content }] })), generationConfig: { temperature: 0.6 } })
    });
    if (!res.ok) {
      const t = await res.text().catch(() => '');
      if (res.status === 404) { last = new Error('model ' + m + ' not found'); continue; }
      if (res.status === 400 && /API key/i.test(t)) throw new Fatal('المفتاح غير صحيح. انسخه من Google AI Studio وتأكد ما فيه فراغات.');
      if (res.status === 403) throw new Fatal('المفتاح غير مسموح له. تأكد إنك فعّلته بمشروع Google AI Studio.');
      if (res.status === 429) throw new Fatal('وصلت حد الاستخدام المجاني لـ Gemini. انتظر شوي وجرب مرة ثانية.');
      throw new Fatal('خطأ من Gemini (' + res.status + ')');
    }
    if (S.set.gmodel !== m) { S.set.gmodel = m; persist(); }
    const rd = res.body.getReader(), dec = new TextDecoder(); let buf = '', acc = '';
    for (;;) {
      const { value, done } = await rd.read(); if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
        if (!line.startsWith('data:')) continue;
        try {
          const j = JSON.parse(line.slice(5));
          const parts = (j.candidates && j.candidates[0] && j.candidates[0].content && j.candidates[0].content.parts) || [];
          const txt = parts.map(p => p.text || '').join('');
          if (txt) { acc += txt; onTok(acc); }
        } catch (e) {}
      }
    }
    if (!acc.trim()) throw new Fatal('رد فاضي من Gemini');
    return acc;
  }
  throw last || new Fatal('ما لقيت نموذج Gemini متاح لمفتاحك');
}
/* ===== OpenRouter (موديلات مجانية، مفاتيح متعددة بالتدوير) ===== */
const OR_B64 = [];
const NERO_PROXY = '';
const OR_URL = 'https://openrouter.ai/api/v1/';
const OR_PREF = [/qwen3-coder/, /glm-(4\.[5-9]|[5-9])/, /deepseek/, /gpt-oss-120b/, /kimi/, /nemotron-3-ultra/, /laguna-m/, /nemotron-3-super/, /qwen3-next/, /llama-3\.3-70b/, /gemma-4-31b/, /hermes-3.*405b/, /gpt-oss-20b/, /laguna-xs/];
const OR_BAD = /safety|guard|embed|lyria|-vl|omni|lfm|[-/]3b|1\.2b|image|audio|venice|dolphin|nano-9b|nano-12b/i;
const OR_STATIC = ['qwen/qwen3-coder:free', 'z-ai/glm-4.5-air:free', 'openai/gpt-oss-120b:free', 'nvidia/nemotron-3-ultra-550b-a55b:free', 'poolside/laguna-m.1:free', 'meta-llama/llama-3.3-70b-instruct:free', 'google/gemma-4-31b-it:free', 'openrouter/free'];
const proxyUrl = () => String(S.set.proxy || NERO_PROXY || '').trim();
const orKeys = () => {
  const own = String(S.set.orkey || '').split(/[\s,;]+/).filter(k => /^sk-or-/.test(k));
  const built = OR_B64.map(x => { try { return atob(x); } catch (e) { return ''; } }).filter(Boolean);
  return own.concat(built).filter((k, i, a) => a.indexOf(k) === i);
};
let orCache = null;
async function orModels() {
  if (orCache) return orCache;
  let ids = [];
  try {
    const ctl = new AbortController(); const tm = setTimeout(() => ctl.abort(), 6000);
    const r = await fetch(OR_URL + 'models', { signal: ctl.signal }); clearTimeout(tm);
    const j = await r.json();
    ids = (j.data || []).filter(m => {
      const p = m.pricing || {}, out = (m.architecture && m.architecture.output_modalities) || ['text'];
      const free = /:free$/.test(m.id) || (+p.prompt === 0 && +p.completion === 0);
      return free && out.length === 1 && out[0] === 'text' && (m.context_length || 0) >= 32000 && !OR_BAD.test(m.id) && m.id !== 'openrouter/free';
    }).map(m => m.id);
    const rank = id => { const i = OR_PREF.findIndex(re => re.test(id)); return i < 0 ? 99 : i; };
    ids = ids.map((id, n) => [id, rank(id), n]).sort((a, b) => a[1] - b[1] || a[2] - b[2]).map(x => x[0]);
    ids.push('openrouter/free');
  } catch (e) { ids = []; }
  if (ids.length < 2) ids = OR_STATIC.slice();
  return (orCache = ids);
}
async function orOnce(model, key, msgs, onTok) {
  const ctl = new AbortController(); let tm = setTimeout(() => ctl.abort(), 30000);
  let res; const px = proxyUrl();
  try {
    res = await fetch(px || (OR_URL + 'chat/completions'), {
      method: 'POST', signal: ctl.signal,
      headers: px ? { 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key, 'HTTP-Referer': (location.origin && location.origin !== 'null') ? location.origin : 'https://nero.app', 'X-Title': 'Nero' },
      body: JSON.stringify({ model, stream: true, temperature: 0.5, max_tokens: 4096, messages: [{ role: 'system', content: SYS }].concat(msgs) })
    });
  } catch (e) { clearTimeout(tm); const er = new Error('net'); er.status = 0; throw er; }
  if (!res.ok) { clearTimeout(tm); const er = new Error('http' + res.status); er.status = res.status; throw er; }
  const rd = res.body.getReader(), dec = new TextDecoder(); let buf = '', acc = '';
  try {
    for (;;) {
      clearTimeout(tm); tm = setTimeout(() => ctl.abort(), 30000);
      const { value, done } = await rd.read(); if (done) break;
      buf += dec.decode(value, { stream: true });
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
        if (!line.startsWith('data:')) continue;
        const d = line.slice(5).trim(); if (d === '[DONE]') continue;
        let j; try { j = JSON.parse(d); } catch (e) { continue; }
        if (j.error) { const er = new Error('stream'); er.status = +j.error.code || 500; throw er; }
        const t = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
        if (t) { acc += t; onTok(acc.replace(/<think>[\s\S]*?(<\/think>|$)/g, '').replace(/^\s+/, '')); }
      }
    }
  } catch (e) { if (e.status === undefined) e.status = 0; throw e; }
  finally { clearTimeout(tm); }
  acc = acc.replace(/<think>[\s\S]*?(<\/think>|$)/g, '').trim();
  if (!acc) { const er = new Error('empty'); er.status = 204; throw er; }
  return acc;
}
async function viaOR(msgs, onTok) {
  const keys = proxyUrl() ? [''] : orKeys();
  if (!keys.length) throw new Fatal('المعلم يحتاج مفتاح مجاني. افتح الإعدادات وحط مفتاح OpenRouter (openrouter.ai/keys)، أو رابط الوسيط إذا عندك.');
  let models = await orModels();
  const pick = (S.set.ormodel || 'auto').trim();
  if (pick && pick !== 'auto') models = [pick].concat(models);
  models = models.filter((m, i, a) => a.indexOf(m) === i).slice(0, 7);
  const dead = new Set(); let ki = Math.floor(Math.random() * keys.length), last = null;
  for (const m of models) {
    let kt = 0;
    while (kt < keys.length) {
      const k = keys[ki % keys.length];
      if (dead.has(k)) { ki++; kt++; continue; }
      try { return await orOnce(m, k, msgs, onTok); }
      catch (e) {
        last = e; const s = e.status;
        if (s === 401 || s === 402 || s === 403) { dead.add(k); ki++; kt++; continue; }
        if (s === 429) { ki++; kt++; if (kt >= 2) break; continue; }
        break;
      }
    }
    if (dead.size >= keys.length) break;
  }
  if (dead.size >= keys.length) throw new Fatal('مفاتيح OpenRouter ما اشتغلت (منتهية أو ممسوحة). حط مفتاح جديد من الإعدادات.');
  throw new Fatal(last && last.status === 0 ? 'ما كدرت أوصل لـ OpenRouter. تأكد من الإنترنت.' : 'الموديلات المجانية مشغولة هسه. جرب بعد دقيقة.');
}
async function ensurePuter() {
  if (typeof puter === 'undefined' || !puter.ai) throw new Error('no-puter');
  try { if (puter.auth && puter.auth.isSignedIn && puter.auth.isSignedIn()) return; } catch (e) {}
  if (!S.set.puterOk) {
    const ok = await askConfirm('ربط Gemini بدون مفتاح', 'راح تظهر نافذة صغيرة من Puter مرة وحدة، تسوي لك حساب مؤقت مجاني بضغطة وترجع للتطبيق. بعدها المعلم يشتغل بدون مفتاح ولا تسجيل ثاني.', 'تابع', 'إلغاء');
    if (!ok) throw new Fatal('cancel');
  }
  await puter.auth.signIn({ attempt_temp_user_creation: true });
  S.set.puterOk = true; persist();
}
async function viaPuter(msgs, onTok) {
  await ensurePuter();
  const model = S.set.model || 'gemini-3.5-flash-lite';
  const r = await puter.ai.chat([{ role: 'system', content: SYS }].concat(msgs), { model, stream: true });
  let acc = '';
  if (r && typeof r[Symbol.asyncIterator] === 'function') {
    for await (const part of r) {
      if (part && part.type === 'error') throw new Error(part.message || 'puter-error');
      acc += (part && part.text) || ''; onTok(acc);
    }
  } else { acc = extract(r); onTok(acc); }
  if (!acc.trim()) throw new Error('empty');
  return acc;
}
async function send(q, shown) {
  if (busy) return;
  q = (q || '').trim(); if (!q) return;
  if (aiTab !== 'chat') setTab('chat');
  busy = true; $('#aiSend').style.opacity = .5;
  addBub('u', shown || q);
  chat.push({ role: 'user', content: q }); if (chat.length > 10) chat = chat.slice(-10);
  const bub = addBub('a', ''); bub.innerHTML = '<span class="typing">…</span>';
  let acc = '';
  const tok = t => { acc = t; fillBub(bub, t); aim.scrollTop = aim.scrollHeight; };
  const hasKey = !!(S.set.gkey || '').trim();
  try {
    const order = S.set.prov === 'gemini' ? ['gemini', 'or', 'puter'] : S.set.prov === 'puter' ? ['puter', 'or', 'gemini'] : ['or', 'gemini', 'puter'];
    let lastErr = new Error('none');
    for (const p of order) {
      if (p === 'gemini' && !hasKey) continue;
      if (p === 'puter' && S.set.prov !== 'puter' && !S.set.puterOk && (orKeys().length || proxyUrl() || hasKey)) continue;
      acc = '';
      try { acc = await (p === 'or' ? viaOR : p === 'gemini' ? viaGemini : viaPuter)(chat, tok); lastErr = null; break; }
      catch (e) { lastErr = e; if (e instanceof Fatal && e.message === 'cancel') break; }
    }
    if (lastErr && !(orKeys().length || proxyUrl() || hasKey) && !(lastErr instanceof Fatal)) lastErr = new Fatal('المعلم يحتاج مفتاح مجاني. افتح الإعدادات وحط مفتاح OpenRouter (openrouter.ai/keys) أو رابط الوسيط.');
    if (lastErr) throw lastErr;
    chat.push({ role: 'assistant', content: acc });
  } catch (e) {
    chat.pop();
    let msg;
    if (e instanceof Fatal) msg = e.message === 'cancel' ? 'تم الإلغاء. تقدر تضيف مفتاح Gemini المجاني من الإعدادات بدل Puter.' : e.message;
    else msg = 'ما قدرت أتصل بالمعلم ❌\nتأكد من الإنترنت وجرب مرة ثانية. إذا استمرت المشكلة افتح الإعدادات وحط مفتاح OpenRouter أو Gemini خاص بك.';
    fillBub(bub, acc || msg);
  }
  busy = false; $('#aiSend').style.opacity = 1; aim.scrollTop = aim.scrollHeight;
}
/* ===== الكورس ===== */
const TRACKS = typeof COURSE !== 'undefined' ? COURSE : [];
const allLessons = () => TRACKS.reduce((a, t) => a.concat(t.lessons.map(l => Object.assign({ track: t }, l))), []);
const isDone = id => !!(S.prog && S.prog[id]);
const openTrk = new Set();
function indentBlock(s) { return String(s).split('\n').map(l => '    ' + l).join('\n'); }
function lessonDoc(L) {
  if (L.full) return L.html;
  return '<!مستند html>\n<صفحة لغة="ar" اتجاه="يمين">\n<راس>\n  <ميتا ترميز="utf-8">\n  <ميتا اسم="منفذ_العرض" محتوى="width=device-width, initial-scale=1">\n  <عنوان_الصفحة>' + L.t.replace(/[<>]/g, '') + '</عنوان_الصفحة>\n' +
    (L.css ? '  <ستايل>\n' + indentBlock(L.css) + '\n  </ستايل>\n' : '') + '</راس>\n<جسم>\n' + (L.html ? indentBlock(L.html) + '\n' : '') +
    (L.js ? '  <سكربت>\n' + indentBlock(L.js) + '\n  </سكربت>\n' : '') + '</جسم>\n</صفحة>\n';
}
function renderCourse() {
  const c = $('#course'); c.innerHTML = '';
  if (!S.prog) S.prog = {};
  if (curLesson) return renderLesson(c);
  const all = allLessons(), dn = all.filter(l => isDone(l.id)).length;
  const hd = document.createElement('div'); hd.className = 'exb';
  hd.innerHTML = '<b>كورس نيرو الكامل</b><br>من الصفر لين تبني تطبيقات حقيقية: HTML ثم CSS ثم JavaScript ثم مشاريع. كل درس فيه شرح ومثال عربي وإنجليزي وتمرين واختبار، والمعلم جاهز يشرح لك أي نقطة.<div class="bar"><i style="width:' + (all.length ? Math.round(dn * 100 / all.length) : 0) + '%"></i></div><small style="color:var(--dim)">أنجزت ' + dn + ' من ' + all.length + ' درس</small>';
  c.appendChild(hd);
  if (!openTrk.size) { const t = TRACKS.find(t => t.lessons.some(l => !isDone(l.id))) || TRACKS[0]; if (t) openTrk.add(t.id); }
  TRACKS.forEach(tr => {
    const box = document.createElement('div'); box.className = 'trk';
    const d = tr.lessons.filter(l => isDone(l.id)).length;
    const h = document.createElement('button');
    h.innerHTML = '<span class="ic">' + tr.ic + '</span><span class="tt"><b>' + escH(tr.t) + '</b><small>' + escH(tr.d) + ' · ' + d + '/' + tr.lessons.length + '</small><div class="bar"><i style="width:' + Math.round(d * 100 / tr.lessons.length) + '%"></i></div></span><span>' + (openTrk.has(tr.id) ? '▴' : '▾') + '</span>';
    h.onclick = () => { openTrk.has(tr.id) ? openTrk.delete(tr.id) : openTrk.add(tr.id); renderCourse(); };
    box.appendChild(h);
    if (openTrk.has(tr.id)) tr.lessons.forEach((l, i) => {
      const b = document.createElement('button'); b.className = 'les' + (isDone(l.id) ? ' done' : '');
      b.innerHTML = '<span class="n">' + (isDone(l.id) ? '✓' : i + 1) + '</span><span style="flex:1">' + escH(l.t) + '</span>';
      b.onclick = () => { curLesson = l.id; lpart = l.html ? 'html' : (l.css ? 'css' : 'js'); lenv = false; renderCourse(); $('#course').scrollTop = 0; };
      box.appendChild(b);
    });
    c.appendChild(box);
  });
}
function renderLesson(c) {
  const all = allLessons(), idx = all.findIndex(l => l.id === curLesson), L = all[idx];
  if (!L) { curLesson = null; return renderCourse(); }
  const v = document.createElement('div'); v.className = 'lv';
  const back = document.createElement('button'); back.className = 'back'; back.textContent = '→ كل الدروس'; back.onclick = () => { curLesson = null; renderCourse(); };
  v.appendChild(back);
  v.insertAdjacentHTML('beforeend', '<h2>' + escH(L.t) + '</h2><div class="tx">' + L.body + '</div>');
  const parts = [['html', 'HTML'], ['css', 'CSS'], ['js', 'JS']].filter(p => L[p[0]]);
  if (parts.length && !parts.some(p => p[0] === lpart)) lpart = parts[0][0];
  const pt = document.createElement('div'); pt.className = 'pt';
  parts.forEach(p => { const b = document.createElement('button'); b.textContent = p[1]; if (p[0] === lpart) b.className = 'on'; b.onclick = () => { lpart = p[0]; renderCourse(); }; pt.appendChild(b); });
  const en = document.createElement('button'); en.textContent = lenv ? 'EN ✓' : 'EN'; en.className = lenv ? 'on' : ''; en.style.marginRight = 'auto'; en.onclick = () => { lenv = !lenv; renderCourse(); };
  pt.appendChild(en); v.appendChild(pt);
  const kindP = lpart === 'js' ? 'js' : lpart === 'css' ? 'css' : 'html';
  const src = L.full && lpart === 'html' ? L.html : L[lpart];
  const shown = lenv ? N.convert(src, kindP) : src;
  const cb = document.createElement('div'); cb.className = 'cb';
  cb.innerHTML = '<div class="cbh"><span><button data-a="copy">نسخ</button></span><span>' + (lenv ? 'English' : 'عربي') + '</span></div><pre>' + codeHTML(shown, kindP) + '</pre>';
  cb.querySelector('[data-a=copy]').onclick = () => copyText(shown);
  v.appendChild(cb);
  const ac = document.createElement('div'); ac.className = 'lacts';
  const mkb = (t, fn, p) => { const b = document.createElement('button'); b.textContent = t; if (p) b.className = 'p'; b.onclick = fn; ac.appendChild(b); };
  mkb('▶ جرّبها', () => { previewDoc(lessonDoc(L), L.js ? true : false); }, true);
  mkb('✏️ افتحها بالمحرر', () => {
    const f = newFile(uniqueName('درس-' + L.id + '.html'), lessonDoc(L)); S.files.push(f); closeAI(); loadFile(f.id); toast('فتحت الدرس بالمحرر، عدّل عليه وجرّب');
  });
  mkb('🤖 اشرح لي الدرس', () => send('أنا بدرس درس «' + L.t + '» من كورس نيرو. اشرح لي فكرته بأسلوب مبسط ومثال جديد مختلف عن مثال الدرس، ثم اعطني تمرين صغير.\nكود الدرس:\n```\n' + src.slice(0, 2500) + '\n```', 'اشرح لي درس «' + L.t + '»'));
  v.appendChild(ac);
  v.insertAdjacentHTML('beforeend', '<div class="exb"><b>✍️ التمرين:</b> ' + escH(L.ex || '') + '</div>');
  if (L.q) {
    const qz = document.createElement('div'); qz.className = 'qz'; qz.innerHTML = '<b>🧠 اختبار سريع:</b><br>' + escH(L.q.q);
    L.q.o.forEach((o, i) => {
      const b = document.createElement('button'); b.textContent = o;
      b.onclick = () => {
        qz.querySelectorAll('button').forEach(x => x.className = '');
        if (i === L.q.a) { b.className = 'ok'; if (!isDone(L.id)) { S.prog[L.id] = 1; persist(); toast('إجابة صحيحة! تم تسجيل الدرس ✓'); } }
        else b.className = 'no';
      };
      qz.appendChild(b);
    });
    v.appendChild(qz);
  }
  const nav = document.createElement('div'); nav.className = 'lnav';
  const doneB = document.createElement('button'); doneB.textContent = isDone(L.id) ? '✓ مكتمل (إلغاء)' : 'أكملت الدرس ✓';
  doneB.onclick = () => { if (isDone(L.id)) delete S.prog[L.id]; else S.prog[L.id] = 1; persist(); renderCourse(); };
  nav.appendChild(doneB);
  if (idx < all.length - 1) { const nx = document.createElement('button'); nx.className = 'p'; nx.textContent = 'التالي ←'; nx.onclick = () => { if (!isDone(L.id)) { S.prog[L.id] = 1; persist(); } curLesson = all[idx + 1].id; lpart = all[idx + 1].html ? 'html' : (all[idx + 1].css ? 'css' : 'js'); lenv = false; renderCourse(); $('#course').scrollTop = 0; }; nav.appendChild(nx); }
  v.appendChild(nav); c.appendChild(v);
}
$('#aiSend').onclick = () => { const i = $('#aiIn'); const v = i.value; i.value = ''; send(v); };
$('#aiIn').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey && (e.ctrlKey || e.metaKey)) { e.preventDefault(); $('#aiSend').click(); } });

/* ===== ربط الأزرار ===== */
function wire() {
  $('#bMenu').innerHTML = svg('menu'); $('#bMenu').onclick = () => openDrawer();
  $('#bConv').innerHTML = svg('trans') + 'EN'; $('#bConv').onclick = () => convertDlg();
  $('#bEdit').innerHTML = svg('edit'); $('#bEdit').onclick = mainMenu;
  $('#bRun').innerHTML = svg('play'); $('#bRun').onclick = () => runPreview(false);
  $('#bMore').innerHTML = svg('more'); $('#bMore').onclick = fileMenu;
  $('#fPrev').innerHTML = svg('up'); $('#fNext').innerHTML = svg('down'); $('#fX').innerHTML = svg('close');
  $('#fPrev').onclick = () => findStep(-1); $('#fNext').onclick = () => findStep(1); $('#fX').onclick = () => toggleFind(false);
  $('#rOne').onclick = replaceOne; $('#rAll').onclick = replaceAll;
  $('#fab').innerHTML = svg('down');
  $('#pvX').innerHTML = svg('close'); $('#pvX').onclick = closePreview;
  $('#pvR').innerHTML = svg('refresh'); $('#pvR').onclick = () => { $('#pvl').innerHTML = ''; $('#pvf').srcdoc = pvCode; };
  $('#pvC').innerHTML = svg('term'); $('#pvC').onclick = () => $('#pvc').classList.toggle('open');
  $('#pvClr').onclick = () => { $('#pvl').innerHTML = ''; };
  $('#aiX').innerHTML = svg('close'); $('#aiX').onclick = closeAI;
  $('#aiClr').innerHTML = svg('trash'); $('#aiClr').onclick = () => { chat = []; aim.innerHTML = ''; setTab('chat'); };
  document.querySelectorAll('#aitabs button').forEach(b => { b.onclick = () => setTab(b.dataset.t); });
  $('#aiSend').innerHTML = svg('send');
}
function fitViewport() {
  const vv = window.visualViewport, app = $('#app');
  const h = vv ? vv.height : window.innerHeight;
  app.style.height = h + 'px'; app.style.top = (vv ? vv.offsetTop : 0) + 'px';
  setTimeout(() => { reveal(ta.selectionStart); }, 50);
}
if (window.visualViewport) { window.visualViewport.addEventListener('resize', fitViewport); window.visualViewport.addEventListener('scroll', fitViewport); }
window.addEventListener('resize', fitViewport);
window.addEventListener('beforeunload', () => { const f = cur(); if (f) { f.content = ta.value; f.sel = [ta.selectionStart, ta.selectionEnd]; f.top = ta.scrollTop; } persist(true); });
document.addEventListener('visibilitychange', () => { if (document.hidden) { const f = cur(); if (f) { f.content = ta.value; } persist(true); } });
window.addEventListener('error', e => { try { console.error(e.message); } catch (x) {} });

load(); applyFont(); wire(); buildQT(); renderQT(); fitViewport(); loadFile(S.active);
window.NeroApp = { S, convertDlg, runPreview, loadFile, cur, commit, send, openAI, openDrawer, settingsDlg, mainMenu, fileMenu, undo, redo, saveFile, moveLines, copyLines, indent, moveCaret, insertSnippet, toggleFind, findStep, formatCode };
})();
