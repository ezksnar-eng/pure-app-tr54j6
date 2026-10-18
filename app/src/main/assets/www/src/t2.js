const N=require('./core.js');
let fail=0;
function eq(name,got,exp){ if(got!==exp){fail++;console.log('FAIL',name,'\n got:',JSON.stringify(got),'\n exp:',JSON.stringify(exp));} else console.log('ok  ',name); }
// 1) English code must stay untouched (mixing is safe)
const enJS=`'use strict';
const re = /[a-z]+\\/x/gi; let n = 5 / 2;
class A extends B { constructor(x){ super(); this.x = x; } static make(){ return new A(1); } }
async function f(u){ try { const r = await fetch(u); return await r.json(); } catch(e){ console.error(e); } finally { } }
document.querySelectorAll('.card > button:hover').forEach(el => el.addEventListener('click', e => { e.preventDefault(); el.classList.toggle('on'); }));
const t = \`a \${n > 1 ? "x" : 'y'} b\`; if (a && !b || c) { for (const k of Object.keys(o)) console.log(k); }
label: for (let i=0;i<3;i++){ switch(i){ case 1: break label; default: continue; } }`;
eq('en-js',N.convert(enJS,'js'),enJS);
const enCSS=`:root{--c:#fff}body{margin:0;font:16px/1.5 "Segoe UI",sans-serif;background:linear-gradient(135deg,#000,rgba(0,0,0,.5))}
.a:hover>.b::before{content:"x";transform:translate(-50%,-50%) rotate(45deg)}@media (max-width:600px){.a{display:none!important}}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`;
eq('en-css',N.convert(enCSS,'css'),enCSS);
const enHTML=`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>T</title><style>a{color:red}</style></head>
<body class="x" onclick="go()"><input type="text" disabled><a href="#a" target="_blank">hi</a>
<svg viewBox="0 0 10 10"><path d="M0 0L10 10" stroke="red"/></svg><script>var a=1;</script></body></html>`;
eq('en-html',N.convert(enHTML,'html'),enHTML);
// 2) Arabic features
eq('regex-kept',N.convert('اذا (/اذا[ا-ي]+/.اختبر(س)) { اطبع(1) }','js'),'if (/اذا[ا-ي]+/.test(س)) { console.log(1) }');
eq('division',N.convert('ثابت ن = ٨ / ٢ / ١;','js'),'const ن = 8 / 2 / 1;');
eq('qs-selector',N.convert('وثيقة.استعلام_الكل("قسم.بطاقة > زر:تمرير")','js'),'document.querySelectorAll("div.بطاقة > button:hover")');
eq('createEl',N.convert('وثيقة.انشئ_عنصر("زر")','js'),'document.createElement("button")');
eq('setAttr',N.convert('س.عين_خاصية("فئة","أ")','js'),'س.setAttribute("class","أ")');
eq('owned-var',N.convert('ثابت عدد = 5; اطبع(عدد + 1);','js'),'const عدد = 5; console.log(عدد + 1);');
eq('owned-prop',N.convert('صنف س { منشئ(){ هذا.طول = 3; } دالة ق(){ ارجع هذا.طول; } }','js'),'class س { constructor(){ this.طول = 3; } ق(){ return this.طول; } }');
eq('operators',N.convert('اذا (ا وايضا ليس ب او ج) {}','js'),'if (ا && ! ب || ج) {}');
eq('smartq',N.convert('اطبع(“مرحبا”)','js'),'console.log("مرحبا")');
eq('bidi',N.convert('‏اطبع("x")‎','js'),'console.log("x")');
eq('attrdigit',N.convert('<ادخال عرض="٢٠٠">','html'),'<input width="200">');
eq('smartattr',N.convert('<رابط وجهة=“#a”>x</رابط>','html'),'<a href="#a">x</a>');
eq('svg',N.convert('<رسم_متجه منطقة_العرض="0 0 10 10"><مسار مسار_الرسم="M0 0L9 9" خط_الرسم="احمر"/></رسم_متجه>','html'),'<svg viewBox="0 0 10 10"><path d="M0 0L9 9" stroke="احمر"/></svg>');
eq('css-newprops',N.convert('.ا { مركز-العناصر: وسط; لون: الوان(255,0,0); نسبة-الابعاد: 16/9 }','css'),'.ا { place-items: center; color: rgb(255,0,0); aspect-ratio: 16/9 }');
eq('classList',N.convert('س.اضف_صنف("ا")','js'),'س.classList.add("ا")');
console.log(fail?'FAILS '+fail:'ALL PASS');
