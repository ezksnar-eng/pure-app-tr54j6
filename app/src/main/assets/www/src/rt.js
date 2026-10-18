const fs=require('fs'),vm=require('vm');
const N=require('./core.js');
const ctx={};vm.createContext(ctx);
['course-html.js','course-css.js','course-js1.js','course-js2.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const C=vm.runInContext('COURSE',ctx);
let bad=0,n=0;
for(const tr of C)for(const L of tr.lessons){
  for(const k of ['html','css','js']){
    const v=L[k]; if(!v)continue; n++;
    const en1=N.convert(v,k), ar2=N.toArabic(en1,k), en2=N.convert(ar2,k);
    if(en1!==en2){bad++;console.log('UNSTABLE',L.id,k);
      const a=en1.split('\n'),b=en2.split('\n');for(let i=0;i<a.length;i++)if(a[i]!==b[i]){console.log('  EN1:',a[i]);console.log('  EN2:',b[i]);console.log('  AR :',ar2.split('\n')[i]);break}}
  }
}
// full coverage: every tag / attr / event in dictionaries, English->Arabic->English
const R=N._R;
let html='';
const voids=new Set(['area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr']);
const tags=[...new Set(Object.values(R.tags))];
tags.forEach(t=>{html+=voids.has(t)?'<'+t+'>\n':'<'+t+'></'+t+'>\n'});
const attrs=[...new Set(Object.values(R.attrs))];
attrs.forEach(a=>{html+='<div '+a+'="1"></div>\n'});
const en=html, ar=N.toArabic(en,'html'), back=N.convert(ar,'html');
const left=(ar.match(/<\/?([A-Za-z][\w-]*)/g)||[]).map(x=>x.replace(/[<\/]/g,''));
const leftTags=[...new Set(left)].filter(x=>x!=='div');
console.log('English tags left after reverse:',leftTags.join(' ')||'none');
const leftAttrs=[]; ar.split('\n').forEach(l=>{const m=/^<div ([^=]+)=/.exec(l); if(m&&/^[A-Za-z]/.test(m[1]))leftAttrs.push(m[1])});
console.log('English attrs left:',leftAttrs.join(' ')||'none');
console.log('html all-tags/attrs roundtrip:',back===en?'EXACT':'DIFF');
if(back!==en){const a=en.split('\n'),b=back.split('\n');let c=0;for(let i=0;i<a.length&&c<8;i++)if(a[i]!==b[i]){console.log('  ',a[i],'=>',b[i]);c++}}
// css
const props=[...new Set(Object.values(R.cssProps))];
const css='.a{'+props.map(p=>p+':1px').join(';')+'}';
const car=N.toArabic(css,'css'); const cleft=(car.match(/[;{]([A-Za-z-]+):/g)||[]).map(x=>x.slice(1,-1));
console.log('CSS English props left:',cleft.join(' ')||'none');
console.log('css roundtrip:',N.convert(car,'css')===css?'EXACT':'DIFF');
const evs=[...new Set(Object.values(R.jsEvents))];
const js=evs.map(e=>'el.addEventListener("'+e+'",f);').join('\n');
const jar=N.toArabic(js,'js');console.log('JS events left:',(jar.match(/"[a-z]+"/g)||[]).join(' ')||'none','roundtrip',N.convert(jar,'js')===js?'EXACT':'DIFF');
console.log('parts tested',n,'unstable',bad);
