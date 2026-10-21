import {ADVENTURE,byId,CALLINGS,FLAGS} from './story.js';
export const MAX_STEPS=48;
const limits={light:5,memory:3,resolve:5};
export function create(name,calling){
 if(typeof calling!=='string'||!Object.hasOwn(CALLINGS,calling))throw Error('Choose a calling.');
 name=String(name??'').trim();if(!name||name.length>28||/[\u0000-\u001f]/.test(name))throw Error('Use a name of 1 to 28 characters.');
 return {name,calling,page:'arrival',light:3,memory:3,resolve:4,flags:[],steps:[]};
}
export function availability(s,c){
 if(c.calling&&c.calling!==s.calling)return {ok:false,reason:CALLINGS[c.calling].name+' only'};
 if(c.require?.some(f=>!s.flags.includes(f)))return {ok:false,reason:'Need '+c.require.filter(f=>!s.flags.includes(f)).map(f=>FLAGS[f]).join(', ')};
 if(c.absent?.some(f=>s.flags.includes(f)))return {ok:false,reason:'Already explored'};
 for(const[k,v]of Object.entries(c.cost||{}))if(s[k]<v)return {ok:false,reason:`Need ${v} ${k}`};
 return {ok:true,reason:c.note||'Continue'};
}
export function choose(s,id){
 const page=byId[s.page],choice=page?.choices.find(c=>c.id===id);if(!choice)throw Error('That choice is not on this page.');
 const access=availability(s,choice);if(!access.ok)throw Error(access.reason);
 if(s.steps.length>=MAX_STEPS)throw Error('This journey has exceeded its chapter limit.');
 const out={...s,flags:[...s.flags],steps:[...s.steps,id],page:choice.to};
 for(const[k,v]of Object.entries(choice.cost||{}))out[k]-=v;
 for(const[k,v]of Object.entries(choice.change||{}))out[k]=Math.max(0,Math.min(limits[k],out[k]+v));
 for(const f of choice.set||[])if(!out.flags.includes(f))out.flags.push(f);
 return out;
}
export function replay(name,calling,steps){
 if(!Array.isArray(steps)||steps.length>MAX_STEPS||steps.some(x=>typeof x!=='string'||x.length>32))throw Error('Invalid journey history.');
 let s=create(name,calling);for(const id of steps)s=choose(s,id);return s;
}
export function back(s){return replay(s.name,s.calling,s.steps.slice(0,-1));}
export function serialize(s){return {format:'casey-storybook',version:1,adventure:ADVENTURE,name:s.name,calling:s.calling,steps:[...s.steps],savedAt:new Date().toISOString()};}
export function restore(input){
 if(typeof input==='string'){if(input.length>100000)throw Error('Choose a save smaller than 100 KB.');input=JSON.parse(input);}
 if(!input||input.format!=='casey-storybook'||input.version!==1||input.adventure!==ADVENTURE)throw Error('This file is not a compatible Borrowed Names journey.');
 return replay(input.name,input.calling,input.steps);
}
