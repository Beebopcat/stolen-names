import {EXPECTED_B} from './audio/expected-narration-b.js';
const B='qn_lorath_refined',SEED=93019;
const SHA=/^[a-f0-9]{64}$/;
export function authoredPageText(page){return page.title+'.\n\n'+page.text.join('\n\n');}
export async function getRecordedBPage(page,manifest){
 const expected=EXPECTED_B[page?.id],clip=manifest?.clips?.[page?.id];
 if(!expected||manifest?.version!==1||manifest.profileId!==B||manifest.samplingBaseSeed!==SEED
   ||!clip
   ||clip.status!=='ready'||clip.voice!==B||clip.id!==expected.id||clip.key!==expected.key
   ||clip.src!==expected.src||clip.textSha256!==expected.textSha256||!SHA.test(clip.audioSha256??'')
   ||clip.transcriptQA!=='passed'||clip.sampleRate!==24000||clip.channels!==1||clip.bits!==24
   ||!Number.isFinite(clip.durationSeconds)||clip.durationSeconds<=0)return null;
 if(!globalThis.crypto?.subtle)return null;
 const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(authoredPageText(page)));
 const actual=[...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,'0')).join('');
 return actual===expected.textSha256?clip:null;
}
export function loadRecordedBManifest(fetcher=globalThis.fetch){
 return fetcher?fetcher('./audio/narration-b-manifest.json',{cache:'no-store'})
  .then(response=>response.ok?response.json():null).catch(()=>null):Promise.resolve(null);
}
