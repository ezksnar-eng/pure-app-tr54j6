const fs=require('fs'),vm=require('vm');
const N=require('./core.js');
const ctx={};vm.createContext(ctx);
['course-html.js','course-css.js','course-js1.js','course-js2.js'].forEach(f=>vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:f}));
const C=vm.runInContext('COURSE',ctx);
let bad=0,count=0;
const arab=/[؀-ۿ]/;
for(const tr of C)for(const L of tr.lessons){
  count++;
  const parts={html:L.html,css:L.css,js:L.js};
  for(const [k,v] of Object.entries(parts)){
    if(!v)continue;
    const out=N.convert(v,k);
    if(k==='html'){
      // arabic tag names / attr names left?
      (out.match(/<\/?([^\s>\/!]+)/g)||[]).forEach(t=>{const nm=t.replace(/[<\/]/g,'');if(arab.test(nm)&&!nm.includes('-')){bad++;console.log(L.id,'TAG left:',nm)}});
      (out.match(/<[^>]+>/g)||[]).forEach(tag=>{const m=tag.replace(/"[^"]*"/g,'""').match(/\s([^\s=>\/]+)/g)||[];m.forEach(a=>{a=a.trim();if(arab.test(a)){bad++;console.log(L.id,'ATTR left:',a,'in',tag.slice(0,60))}})});
    }
    if(k==='css'){
      out.split(/[{};]/).forEach(d=>{const i=d.indexOf(':');if(i>0){const p=d.slice(0,i).trim();if(arab.test(p)&&!p.startsWith('--')&&!/[.#]/.test(p)&&!/\s/.test(p)){bad++;console.log(L.id,'PROP left:',p)}}});
      const vals=out.replace(/\.[^\s{,:>]+|#[^\s{,:>]+/g,'');
      // look for arabic words in values
      out.replace(/:\s*([^;{}]+)[;}]/g,(m,v)=>{const w=v.match(/[؀-ۿ_][؀-ۿ\w_-]*/g);if(w&&!/@keyframes|animation/.test(m)){w.forEach(x=>{if(!/^--/.test(x)){bad++;console.log(L.id,'VAL left:',x,'in',m.slice(0,50))}})}});
    }
    if(k==='js'){
      try{new Function(out)}catch(e){bad++;console.log(L.id,'JS SYNTAX',e.message)}
    }
  }
}
console.log('lessons',count,'issues',bad);
