import {createNarrationTransport,createNarrationOwner,mergeStored} from './ext/demos/story-library/narration-transport.js';
import {PAGE_ART} from './scene-art.js';
import {TITLE as SOURCE_TITLE,ART,CALLINGS,FLAGS,byId,endings} from './story.js';
import {loadRecordedBManifest,getRecordedBPage} from './narration-b.js';
import {create,choose,back,serialize,restore,availability,replay} from './engine.js';
const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TITLE='Stolen Names';
const KEY='casey.borrowed-names.journey.v1',ENDINGS='casey.borrowed-names.endings.v1',OPTIONS='casey.borrowed-names.options.v1';
let state=null,calling='oathbinder',musicOn=true,narrationOn=true,playing=false,endingSet=new Set(),large=false,lastTrack='',saveHealthy=true,checkpoint=null,lastPositionTick=-1;
const audio=$('music'),dialog=$('dialog'),narration=document.createElement('audio');let voiceToken=0;
narration.hidden=true;document.body.append(narration);
const owner=createNarrationOwner({bookId:'borrowed-names',onSuspend:()=>stopSound()});
const transport=createNarrationTransport({audio:narration,isAllowed:()=>owner.active&&playing&&narrationOn&&!document.hidden&&!dialog.open&&!$('reader').hidden,
 onState:s=>{if(s.ready){$('audio-time').textContent=clockTime(s.time)+' / '+clockTime(s.duration);if(Math.floor(s.time/5)!==lastPositionTick){lastPositionTick=Math.floor(s.time/5);try{mergeStored(localStorage,KEY+'.audio',{[s.unit]:s});}catch{}}}},
 onError:()=>{stopSound();message('This exact recorded passage could not play. Your position was kept.');},onFinish:()=>{audio.volume=.14;message('This complete passage has finished. Choose what happens next.');}
});
const visibleState=()=>checkpoint||state;
function clockTime(seconds){const n=Math.floor(seconds||0);return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');}
function checkpoints(){if(!state)return;const states=Array.from({length:state.steps.length+1},(_,depth)=>replay(state.name,state.calling,state.steps.slice(0,depth)));
 $('route-checkpoints').innerHTML=states.map((p,i)=>'<option value="'+i+'">'+(i+1)+' · '+esc(byId[p.page].title)+(i===state.steps.length?' · current':'')+'</option>').join('');
 $('route-checkpoints').value=String(checkpoint?checkpoint.steps.length:state.steps.length);$('route-current').hidden=!checkpoint;
}
try{const saved=localStorage.getItem(KEY);if(saved)state=restore(saved);}catch{$('status').textContent='A previous save could not be read. You can import a backup or begin a new journey.';}
try{const list=JSON.parse(localStorage.getItem(ENDINGS)||'[]');if(Array.isArray(list))endingSet=new Set(list.filter(id=>byId[id]?.ending));large=JSON.parse(localStorage.getItem(OPTIONS)||'{}').large===true;}catch{}
document.documentElement.classList.toggle('large-type',large);$('continue').hidden=!state;
function message(text){$('status').textContent=text;}
function cancelVoice(clear=false){voiceToken++;transport.pause();if(clear)transport.clear();audio.volume=.14;}
function persist(){
 if(!state)return;
 try{localStorage.setItem(KEY,JSON.stringify(serialize(state)));saveHealthy=true;message('Saved in this browser. Export a journey for a backup.');}
 catch{saveHealthy=false;message('Browser storage is unavailable or full. Export your journey to keep it.');}
}
function discover(){
 if(!byId[state?.page]?.ending)return;
 endingSet.add(state.page);try{localStorage.setItem(ENDINGS,JSON.stringify([...endingSet]));}catch{message('This ending is discovered for this session. Browser storage is unavailable.');}
}
function open(title,html){stopSound();$('dialog-title').textContent=title;$('dialog-body').innerHTML=html;if(!dialog.open)dialog.showModal();}
function close(){dialog.close();}
async function speak(){
 const token=++voiceToken;transport.pause();if(!playing||!narrationOn||!state||document.hidden||dialog.open||$('reader').hidden)return;
 const p=byId[visibleState().page],m=await loadRecordedBManifest();if(token!==voiceToken||!playing||!owner.active)return;
 const entry=await getRecordedBPage(p,m);if(token!==voiceToken||!playing||!owner.active)return;
 if(!entry){transport.clear();message('Full narration for this page is awaiting review. The complete text remains readable.');return;}
 let position=null;try{position=JSON.parse(localStorage.getItem(KEY+'.audio')||'{}')[p.id];}catch{}
 transport.setQueue(p.id,[entry],{position});narration.volume=.86;audio.volume=.04;transport.play();
}
function track(){
 const next=['hunt','shelter','wolfman','chain'].includes(state?.page)?'hunt':'intro';
 if(next!==lastTrack){lastTrack=next;audio.pause();audio.src='ext/demos/top-secret/lantern-gate/audio/'+next+'.mp3';audio.volume=.14;}
 if(playing&&musicOn&&!document.hidden&&!dialog.open)audio.play().catch(()=>{musicOn=false;message('Music could not start. Press Play to try again.');});else audio.pause();
}
function soundControls(){
 $('play').textContent=playing?'Pause':'Play';$('play').setAttribute('aria-pressed',String(playing));$('play').setAttribute('aria-label',playing?'Pause narration and music':'Play narration and music');$('play').disabled=!state||$('reader').hidden;$('narration-tools').hidden=!state||$('reader').hidden;
}
function stopSound(){playing=false;audio.pause();cancelVoice();owner.release();soundControls();}
function render({focus=true}={}){
 cancelVoice();$('welcome').hidden=true;$('reader').hidden=false;$('journey-footer').hidden=false;
 const p=byId[visibleState().page],art=PAGE_ART[p.id]||ART[p.art];if(transport.snapshot().unit!==p.id)transport.clear();$('chapter').textContent=p.chapter;$('page-title').textContent=p.title;
 $('prose').innerHTML=p.text.map(t=>`<p>${esc(t)}</p>`).join('');$('prose').scrollTop=0;if(matchMedia('(max-width:699px)').matches)$('reader').scrollTop=0;
 $('illustration').className='illustration '+art.type;$('art').style.visibility='visible';$('art').alt=art.alt;
 $('art').onerror=()=>{$('art').style.visibility='hidden';$('art-caption').textContent='Illustration unavailable. Your story continues below.';};$('art').src=art.src;
 $('art-caption').textContent=art.caption||(art.type==='setting'?'The Mourning Crown · illustrated setting':'Creature concept art · '+(p.art==='bellwrought'?'The Bellwrought':p.art==='sexton'?'The Drowned Sexton':p.art==='cantor'?'The Hollow Cantor':'The Tallow Widow'));
 const costs=c=>{const parts=[];for(const[k,v]of Object.entries(c.cost||{}))parts.push('−'+v+' '+k);for(const[k,v]of Object.entries(c.change||{}))parts.push((v>=0?'+':'')+v+' '+k);return parts.join(' · ');};
 const available=(checkpoint?[]:p.choices).filter(c=>!c.absent?.some(f=>state.flags.includes(f))),choices=$('choices');
 $('choice-label').textContent=p.ending?'ENDING · '+p.ending.toUpperCase():'YOUR NEXT CHOICE';
 choices.innerHTML=p.ending?'<button class="primary" id="replay">Open another book</button><button id="ending-browser">See discovered endings</button>':available.map((c,i)=>{const a=availability(state,c);return `<button class="choice" data-choice="${c.id}" ${a.ok?'':'disabled'}><span class="number" aria-hidden="true">${i+1}</span><span><strong>${esc(c.label)}</strong><small>${esc([a.reason,costs(c)].filter(Boolean).join(" · "))}</small></span></button>`;}).join('');
 if(checkpoint)choices.textContent='Earlier checkpoint · your current choices and resources are unchanged.';checkpoints();choices.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>advance(b.dataset.choice));
 $('replay')?.addEventListener('click',creation);$('ending-browser')?.addEventListener('click',endingMenu);
 $('resources').innerHTML=`<span>Light <b>${state.light}</b></span><span>Memory <b>${state.memory}</b></span><span>Resolve <b>${state.resolve}</b></span>`;
 $('back').disabled=Boolean(checkpoint)||!state.steps.length;document.title=p.title+' · '+TITLE;
 if(!checkpoint)discover();soundControls();track();if(focus)$('page-title').focus({preventScroll:true});speak();
}
function advance(id){if(checkpoint)return;try{checkpoint=null;state=choose(state,id);persist();render();}catch(e){message(e.message);}}
function creation(){
 calling='oathbinder';
 open('Stolen Names',`<p>You travel the Nine Marches, where names have become debts and the Mourning Crown keeps its prisoners. Your calling opens distinct choices through the same haunted world.</p><dl class="resource-guide"><dt>Light · starts at 3</dt><dd>Lantern fuel for dark passages. Some choices spend it; others replenish it, up to 5.</dd><dt>Memory · starts at 3</dt><dd>Your connection to home. Bargains may cost a memory; you can hold up to 3.</dd><dt>Resolve · starts at 4</dt><dd>The will to face difficult choices. It can rise to 5.</dd><dt>Keepsakes</dt><dd>Relics, discoveries and promises can unlock later paths. Inspect what you carry at any time.</dd></dl><label>Your name<input id="name" maxlength="28" value="The Wayfarer" autocomplete="off"></label><div class="callings">${Object.entries(CALLINGS).map(([id,c])=>`<button class="calling" data-calling="${id}" aria-pressed="${id===calling}"><strong>${c.name}</strong><span>${c.detail}</span><small>${c.relic}</small></button>`).join('')}</div><p class="quiet">Choose a calling below; its special path and starting relic are shown on each card. Every choice lists its resource cost or gain. Back undoes your last choice and restores resources. There are no timed choices.${state?' Beginning again replaces this browser’s current journey; export it first if you want to keep it.':''}</p><p id="creation-error" role="alert"></p><div class="dialog-actions"><button id="begin" class="primary">Open the first page</button>${state?'<button id="creation-export">Export current journey</button>':''}</div>`);
 dialog.querySelectorAll('[data-calling]').forEach(b=>b.onclick=()=>{calling=b.dataset.calling;dialog.querySelectorAll('[data-calling]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));});
 $('begin').onclick=()=>{try{checkpoint=null;state=create($('name').value,calling);persist();close();render();$('continue').hidden=false;}catch(e){$('creation-error').textContent=e.message;}};
 $('creation-export')?.addEventListener('click',exportSave);$('name').focus();
}
function endingMenu(){open('The endings you found',`<p>${endingSet.size} of ${endings.length} endings discovered. A different road or bargain can change the last page.</p><div class="ending-list">${endings.map((p,i)=>`<article><strong>${endingSet.has(p.id)?esc(p.ending):'Unwritten ending '+(i+1)}</strong><small>${endingSet.has(p.id)?'Discovered in this browser':'A choice still waiting to be made'}</small></article>`).join('')}</div>`);}
function exportSave(){
 if(!state)return;const blob=new Blob([JSON.stringify(serialize(state),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='borrowed-names-journey.json';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);message('Journey exported. You can choose a shared folder or network drive in your browser’s save dialog.');
}
function menu(){
 open('Story settings',`<p>${state?esc(state.name)+' · '+CALLINGS[state.calling].name:'Stolen Names'}</p><div class="dialog-actions"><button id="music-toggle" aria-pressed="${musicOn}">Music ${musicOn?'on':'off'}</button><button id="voice-toggle" aria-pressed="${narrationOn}" >Recorded narration ${narrationOn?'on':'off'}</button><button id="type-toggle" aria-pressed="${large}">Larger type ${large?'on':'off'}</button></div><p class="quiet">Press Play in the top bar when you want narration and music. Opening a book or closing this menu stays silent. These switches choose which sounds Play includes.</p><h3>Keep your place</h3><p class="quiet">${saveHealthy?'Choices save in this browser.':'Browser saving is unavailable; export to keep your journey.'} Export JSON to a local shared folder or mapped network drive. Import brings that journey back. This game does not create a save server.</p><div class="dialog-actions"><button id="export" ${state?'':'disabled'}>Export journey</button><button id="import">Import journey</button><button id="ends">Discovered endings</button></div><h3>How to read the book</h3><p class="quiet">Scroll the story panel to read. Choose an embedded button or press its number. Back restores the previous page and its resources. Locked choices explain what they need. Each castle wing can be explored once. There are no timed choices.</p><div class="dialog-actions"><button id="new">New journey</button><button id="home">Book cover</button></div>`);
 $('music-toggle').onclick=()=>{musicOn=!musicOn;track();$('music-toggle').textContent='Music '+(musicOn?'on':'off');$('music-toggle').setAttribute('aria-pressed',String(musicOn));};
 $('voice-toggle').onclick=()=>{narrationOn=!narrationOn;if(!narrationOn)cancelVoice();close();speak();message('Recorded narration '+(narrationOn?'on.':'off.'));};
 $('type-toggle').onclick=()=>{large=!large;document.documentElement.classList.toggle('large-type',large);try{localStorage.setItem(OPTIONS,JSON.stringify({large}));}catch{}$('type-toggle').textContent='Larger type '+(large?'on':'off');$('type-toggle').setAttribute('aria-pressed',String(large));};
 $('export').onclick=exportSave;$('import').onclick=()=>{$('save-file').click();};$('ends').onclick=endingMenu;$('new').onclick=creation;
 $('home').onclick=()=>{close();stopSound();$('reader').hidden=true;$('journey-footer').hidden=true;$('welcome').hidden=false;$('continue').hidden=!state;document.title=TITLE;soundControls();};
}
$('save-file').onchange=async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;try{if(file.size>100000)throw Error('Choose a save smaller than 100 KB.');const imported=restore(await file.text());checkpoint=null;state=imported;persist();close();render();$('continue').hidden=false;message('Journey imported'+(saveHealthy?' and saved in this browser.':'. Export to keep it; browser storage is unavailable.'));}catch(error){message('Import failed: '+error.message);}};
$('play').onclick=()=>{if(playing)stopSound();else if(state&&!$('reader').hidden){if(!owner.claim())return;playing=true;soundControls();track();speak();}};soundControls();
$('rewind-audio').onclick=()=>transport.skip(-15);$('forward-audio').onclick=()=>transport.skip(15);
$('restart-page').onclick=()=>{transport.restart();if(!playing)$('play').onclick();else void speak();};
$('route-checkpoints').onchange=()=>{stopSound();const n=Number($('route-checkpoints').value);if(Number.isInteger(n)&&n>=0&&n<=state.steps.length){checkpoint=n===state.steps.length?null:replay(state.name,state.calling,state.steps.slice(0,n));render();}};
$('route-current').onclick=()=>{stopSound();checkpoint=null;render();};
$('return-library').onclick=()=>{stopSound();if(parent!==window)parent.postMessage({type:'storybook-library'},location.origin);else location.href='https://caseyshingledecker.com/demos/story-library/library.html';};
$('start').onclick=creation;$('continue').onclick=()=>{checkpoint=null;render();};$('menu').onclick=menu;$('welcome-import').onclick=()=>$('save-file').click();$('welcome-endings').onclick=endingMenu;
$('back').onclick=()=>{if(!checkpoint&&state?.steps.length){checkpoint=null;state=back(state);persist();render();}};
$('satchel').onclick=()=>{if(!state)return;open('What you carry',`<p>${CALLINGS[state.calling].relic}</p><ul class="keepsakes">${state.flags.filter(f=>!['archive','laboratory','wolfcourt'].includes(f)).map(f=>`<li>${esc(FLAGS[f])}</li>`).join('')||'<li>Your road has not yet offered a keepsake.</li>'}</ul><p class="quiet">Light is lantern fuel. Memory is what keeps home familiar. Resolve is what lets you hold a difficult choice. None of these changes without a choice that tells you its cost.</p>`);};
document.addEventListener('keydown',e=>{if(e.repeat||e.altKey||e.ctrlKey||e.metaKey||dialog.open||$('reader').hidden||/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(/^[1-9]$/.test(e.key)){const b=$('choices').querySelectorAll('.choice')[Number(e.key)-1];if(b&&!b.disabled){e.preventDefault();b.click();}}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSound();});
window.addEventListener('message',event=>{if(event.origin===window.location.origin&&event.source===window.parent&&event.data?.type==='storybook-suspend')stopSound();});
window.addEventListener('pagehide',stopSound);
audio.addEventListener('error',()=>{musicOn=false;message('The background track is unavailable. The story remains playable.');});
