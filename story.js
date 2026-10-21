// Original illustrated adventure. Stable page, choice and creature IDs are portable world data.
export const ADVENTURE='borrowed-names-1';
export const TITLE='A Name Against the Dark';
export const ART={
 castle:{src:'ext/demos/top-secret/lantern-gate/assets/castle-cinematic.webp',alt:'The Mourning Crown, a Gothic castle above a fogbound country',type:'setting'},
 bellwrought:{src:'ext/demos/top-secret/lantern-gate/assets/bellwrought.webp',alt:'A terrifying transformed human, with an arched spine, long limbs, stretched skin and sparse hair',type:'creature'},
 sexton:{src:'ext/demos/top-secret/lantern-gate/assets/creatures/drowned-sexton.webp',alt:'The Drowned Sexton, a gaunt river creature with a twisted spine and elongated hands',type:'creature'},
 cantor:{src:'ext/demos/top-secret/lantern-gate/assets/creatures/hollow-cantor.webp',alt:'The Hollow Cantor, an emaciated human apparition with a distended jaw',type:'creature'},
 widow:{src:'ext/demos/top-secret/lantern-gate/assets/creatures/tallow-widow.webp',alt:'The Tallow Widow in a weathered funeral coat and mourning veil, carrying an unlit candle',type:'creature'}
};
export const CALLINGS={
 oathbinder:{name:'Oathbinder',relic:'Keeper’s thread',detail:'Bind a spoken promise. A thread can still a hunter and protect a name.'},
 echoartisan:{name:'Echo Artisan',relic:'Silver echo glass',detail:'Borrow a sound without stealing its owner. Answer voices and mislead a hunter.'},
 marrowgardener:{name:'Marrow Gardener',relic:'Living moonleaf root',detail:'Grow refuge where the earth remembers a grave. Read the life beneath a curse.'}
};
export const FLAGS={promise:'Promise to Mara',riverSeal:'River seal',owed:'A name owed to the river',proof:'Proof of the old bargain',seed:'Frankenstein’s living seed',bell:'The silent hunting bell',countername:'The Cantor’s countername',ward:'Ash ward',widowName:'Agnes remembered',widowDebt:'The Widow’s debt',wolfName:'Elias remembered',archive:'Archive explored',laboratory:'Laboratory explored',wolfcourt:'Wolf Court explored',mercy:'Mercy shown to the hunter'};
const c=(id,label,to,extra={})=>({id,label,to,...extra});
const n=(id,chapter,title,art,text,choices,extra={})=>({id,chapter,title,art,text:text.trim().split('\n\n'),choices,...extra});
export const pages=[
 n('arrival','I · The ninth bell','A name missing from the rain','castle',`
The first thing missing is the name on Mara’s door. The brass plate is still there, polished bright by her sleeve. The letters have become shallow pools of rainwater. She stands beside it with a bowl of soup she no longer knows how to offer.

Across Hearthwick, the bells ring eight times. Nobody asks why the ninth bell has been silent for sixty years. People have learned to leave one chair empty, to call a familiar neighbor “you,” to mistake forgetting for kindness. Tonight a child has drawn that empty chair at the family table, with a person sitting in it.

Mara gives you a lantern. “My brother was a keeper at the Mourning Crown. I remember his laugh. I remember that he hated pears. I cannot remember him.” The light warms your fingers. Whatever took the names has not yet learned to take the things that mattered.

Three roads lead north. Only one need bring you home.`,[
 c('promise','Promise to bring her brother’s name home','square',{set:['promise'],note:'Remember your promise to Mara.'}),
 c('prepare','Ask for oil before making a promise','square',{change:{light:1},note:'Gain 1 lantern light.'})
 ]),
 n('square','I · The ninth bell','Choose the way north','castle',`
At the square, the rain turns the map in your hand translucent. The country behind it looks like another country pressed against a window. A mill road follows the ridge to the castle gate. An orchard path descends among trees whose fruit has turned the color of old teeth. The river causeway runs past a drowned church.

An old roadwarden draws a mark beside the church. “The Sexton hears names. The Widow hears promises. The creature on the ridge hears everything else.” He watches the lantern until you turn it away.

You carry three measures of light, three memories of home and four measures of resolve. These are things you can spend, not tests of speed. Each choice tells you its cost. You can retrace a choice with the Back button; the book will return what you spent.

The roadwarden has one final kindness: “If a voice calls from a place you cannot see, ask whose voice it is.”`,[
 c('river','Take the causeway past the drowned church','river',{note:'A quieter route through the river’s debt.'}),
 c('orchard','Follow the orchard’s buried path','orchard',{note:'Meet the keeper of promises.'}),
 c('ridge','Take the exposed mill road','hunt',{note:'The Bellwrought hunts the ridge.'})
 ]),
 n('river','II · What the water keeps','The submerged steps','sexton',`
Only the top of the church tower rises above the river. A rope stretches from its bell window to a post on the bank. The rope moves although there is no wind. Below the water, something is climbing stairs that should end at the church door.

It surfaces without a splash. Its body has the long, strained outline of a man who has been pulled through a place too narrow for him. Sparse wet hair clings to its shoulders. Its hands reach the bank before its feet do. Pale eyes open beneath a film of river silt.

“One for crossing,” it says. The words sound as though somebody spoke them into a bottle a hundred years ago. You notice the rope is tied to neither tower nor post. It is tied around a name, written in a book that has swollen shut.

The river is charging the wrong person. You have time to decide how to tell it.`,[
 c('listen','Ask what the crossing used to cost','sexton',{note:'Listening costs nothing.'}),
 c('withdraw','Leave the bank and take the ridge','hunt',{note:'Avoid the river’s bargain.'})
 ]),
 n('sexton','II · What the water keeps','The Drowned Sexton','sexton',`
“One prayer,” the Sexton answers. Its jaw works long after the sound stops. “Then one penny. Then one name. The count improved the arrangement.” A thin line of riverwater runs up its arm, against gravity, into a crack in its throat.

On the bank are hundreds of small stones. Each carries a letter. No two beside each other make a word. The Sexton sorts them every night, trying to remember the congregation it rang awake. The count promised that no one would ever leave it again.

You could buy a crossing with light. You could give up a memory instead: your mother’s kitchen, a summer road, somebody calling you from another room. An Echo Artisan has another answer. The echo glass can return the tower’s old prayer without taking a living voice.

The Sexton holds out one dreadful hand. There is no hurry in it. The river has always known how to wait.`,[
 c('light','Pay with two measures of lantern light','crypt',{cost:{light:2},set:['riverSeal'],note:'Spend 2 light. Receive the river seal.'}),
 c('memory','Offer the memory of a road home','crypt',{cost:{memory:1},set:['riverSeal','owed'],note:'Spend 1 memory. The river will remember your debt.'}),
 c('prayer','Return the tower’s prayer through your glass','crypt',{calling:'echoartisan',set:['riverSeal'],change:{resolve:1},note:'Echo Artisan. Gain 1 resolve and the river seal.'}),
 c('leave','Refuse the bargain and return to the ridge','hunt',{note:'Keep your memories and light.'})
 ]),
 n('crypt','II · What the water keeps','A congregation of letters','sexton',`
The river parts above the church steps. The Sexton follows at a respectful distance, bent under a doorway that was once tall enough. Beyond the ruined altar, a copper plate records the keepers’ original promise: shelter in exchange for service, renewed by consent each winter. The last word has been hammered almost flat. Almost.

You rub ash across the metal until “consent” stands dark beneath your thumb. This is not a charm. It is evidence, which may prove more dangerous. You carry the rubbing beneath your coat.

At the door, the Sexton whispers, “I was called Tomas.” It is not asking you to pay again. It is risking the only thing the count cannot replace. You say the name once, where the water can hear. The stones on the bank begin, very slowly, to arrange themselves.

The submerged passage ends below the castle causeway. Behind you, one small bell rings with no command attached.`,[
 c('remember','Carry the proof and remember Tomas','gate',{set:['proof'],change:{resolve:1},note:'Gain proof of the bargain and 1 resolve.'})
 ]),
 n('orchard','II · What the earth remembers','The fruit that never falls','widow',`
The orchard trees bend away from a cottage whose door has been bricked closed from inside. Pears hang along the branches like pale fists. None lies on the ground. Beneath the leaves, little candles stand in the soil, every one unlit.

A woman in a funeral coat waits beside the cottage. Her veil shifts when you breathe, although you are ten paces away. Too much arm emerges from each sleeve. Her fingers hold a candle as carefully as if it were the last warm thing in the world.

“He promised to return before it burned down,” she tells you. “So I do not light it.” Behind her, the closed door makes a sound like a person clearing their throat.

You see the cruelty of the arrangement. If he returns, she must open the door. If she lights the candle, he is late. If she leaves, the promise is broken. The count has turned waiting into a room with no exits.`,[
 c('answer','Ask the Widow who made the promise','widow',{note:'Learn what holds her at the threshold.'}),
 c('detour','Leave the orchard for the mill road','hunt',{note:'The hunter’s road is still open.'})
 ]),
 n('widow','II · What the earth remembers','The Tallow Widow','widow',`
“My husband. My son. The keeper. I used to know.” Her clouded eyes find your lantern. “Promise that you will knock when you come back. I can let you pass.” The door behind her answers with three patient taps.

Promises matter here. You can pay with a memory of home and inherit a small part of her waiting. You can burn one measure of light to mark the doorway in ash, giving her a boundary the thing inside must respect. A Marrow Gardener can make that boundary from the roots beneath the cottage instead.

Under the veil, the bones of her face move into an expression that is almost embarrassment. “I had another name,” she says. “Before they called me Widow.” On a seed packet caught in the hedge, faded ink spells Agnes. It is a name nobody has thought useful to steal.

You cannot cure sixty years in an evening. You can stop helping the curse call her by its own name.`,[
 c('debt','Promise to return, and leave a memory at her door','widowname',{cost:{memory:1},set:['widowDebt'],note:'Spend 1 memory. The Widow remembers your promise.'}),
 c('ash','Mark a protective threshold in lantern ash','widowname',{cost:{light:1},set:['ward'],note:'Spend 1 light. Carry an ash ward.'}),
 c('roots','Wake the roots beneath the cottage','widowname',{calling:'marrowgardener',set:['ward'],change:{resolve:1},note:'Marrow Gardener. Gain an ash ward and 1 resolve.'}),
 c('refuse','Refuse her bargain and take the ridge','hunt',{note:'There is another way to the castle.'})
 ]),
 n('widowname','II · What the earth remembers','Agnes at the threshold','widow',`
You read the name from the packet. Agnes holds the candle to her chest. The door taps again, louder. For the first time, she turns away from it.

“I grew white flowers here,” she says. “He always trampled them.” Whether she means husband, keeper or count does not matter. The sentence belongs to her. Beneath the cottage, the roots tighten around the sealed door.

She gives you a ribbon from the seed packet. “The castle’s lower court used to be a garden. Frankenstein kept it. Tell him the flowers were white. He will know something survived.” Then she steps aside, and an old orchard stair reveals itself between two trees.

Halfway up, you look back. Agnes has lit the candle. A minute of its light is worth more than sixty years of waiting. The figure behind the door throws itself against the brickwork, but she does not turn around.`,[
 c('depart','Climb toward the castle with Agnes’s name','gate',{set:['widowName'],note:'Agnes remembered. The orchard has a way out.'})
 ]),
 n('hunt','II · The hunting bell','Something remembers your footsteps','bellwrought',`
On the ridge, a bell sounds from inside the fog. The first note is ordinary. The second seems to ring beneath your skin. Then you hear feet striking the road, an uneven rhythm correcting itself as it grows faster.

The Bellwrought emerges where the mill road narrows. It was human. That fact makes the long limbs, arched spine and stretched patches of skin worse, not better. Sparse hair trembles along its shoulders. The face protrudes as if bone continued growing after it should have stopped. Its eyes follow the lantern, then your throat.

There is no collar. The command is somewhere inside it. As the bell rings again, the creature winces before it moves. A ring hangs from one long finger, pressed almost through the skin.

An abandoned mill stands twenty paces downhill. You need one interruption, not a victory. Choose the interruption you can afford.`,[
 c('thread','Bind the bell’s command with keeper’s thread','shelter',{calling:'oathbinder',set:['bell','mercy'],note:'Oathbinder. Silence the bell and spare the hunter.'}),
 c('echo','Send your footsteps downhill through the glass','shelter',{calling:'echoartisan',set:['mercy'],note:'Echo Artisan. Make a decoy and reach shelter.'}),
 c('root','Raise a living refuge across the mill doorway','shelter',{calling:'marrowgardener',set:['ward','mercy'],note:'Marrow Gardener. Gain a ward and reach shelter.'}),
 c('flare','Break the lantern’s reserve into a blinding flare','shelter',{cost:{light:2},note:'Spend 2 light. Reach the mill before it can see.'}),
 c('name','Let the bell swallow a memory of your own name','shelter',{cost:{memory:1},set:['owed'],note:'Spend 1 memory. Its command briefly loses you.'})
 ]),
 n('shelter','II · The hunting bell','The miller’s ring','bellwrought',`
The mill door shuts beneath your shoulder. Outside, the hunter circles the building. Each time the bell rings it returns to the road, then comes back to the door, caught between two instructions. Through a split in the wood, you see its hand laid against the wall. The long nails are trembling.

The ring on that hand bears a scratched inscription: Elias, come home. Mara’s brother hated pears. He was a miller before he became a keeper. You understand why she cannot remember the part of him that matters.

You say “Elias” through the door. His footsteps stop. For a breath, there is only a man trying to recognize a voice that cannot belong to anyone he knows. Then the bell pulls him away.

You leave by the old flour chute, carrying neither a trophy nor a cure. You carry a name. In this country, that may become either one.`,[
 c('keep','Remember Elias and climb the castle stair','gate',{set:['wolfName'],change:{resolve:1},note:'Elias remembered. Gain 1 resolve.'})
 ]),
 n('gate','III · The Mourning Crown','The gate opens inward','castle',`
The Mourning Crown stands above a ravine filled with fog. Its windows shine amber, but none casts light on the ground. Four levels rise through the rock: the laboratory below, candleless galleries above it, a court built for the hunted, and a throne room open to the sky.

There is no guard at the gate. The doors stand just far enough apart to suggest an invitation. On the lintel, names have been carved so densely that newer letters cut through older ones. You find half of a familiar shape before losing it in the crowd.

Your lantern leans toward the entrance. A lantern should not be able to lean. From somewhere above, a voice says, “A visitor with something left to lose. How refreshing.”

You can still return to Hearthwick. The book will remember the journey you chose, even if it ends before the throne. If you enter, listening may prove more useful than courage.`,[
 c('enter','Enter the castle and seek the stolen ledger','courtyard',{note:'Explore three wings before facing the count.'}),
 c('leave','Turn back while the road still knows you','end-road',{note:'An ending: return without accepting the castle’s terms.'})
 ]),
 n('courtyard','III · The Mourning Crown','Three keepers of a bargain','castle',`
In the lower court, dead vines climb a fountain whose basin is full of warm soil. Somewhere below it, a spade scrapes stone. From the eastern gallery comes a voice rehearsing the word “welcome” in dozens of accents. A hunting bell shakes behind the iron door to the north.

You have reached a place built from unfinished obligations. The count rules it, but three people keep its machinery alive. One cultivates what the curse cannot kill. One remembers what it cannot speak. One carries a command he never agreed to obey.

Each wing can be explored once in this journey. Its keeper offers a different part of the answer. You may approach the ledger at any time, but preparation changes what you can ask of it. The court is safe enough to take a breath, check your belongings and choose deliberately.

Above the fountain, a bronze plaque says: A debt is not a name. Somebody has tried very hard to scratch it away.`,[
 c('archive','Follow the voices into the Candleless Galleries','cantor',{absent:['archive'],note:'Seek the countername and the terms of the bargain.'}),
 c('laboratory','Descend to Frankenstein’s laboratory','laboratory',{absent:['laboratory'],note:'Seek a living seed beneath the curse.'}),
 c('wolfcourt','Open the door to the Wolf Court','wolfman',{absent:['wolfcourt'],note:'Seek a way to stop the hunting bell.'}),
 c('ledger','Climb to the ledger and face the count','ledger',{note:'Your collected evidence changes the available endings.'}),
 c('retreat','Leave through the gate without a bargain','end-road',{note:'An ending: the road home remains open.'})
 ]),
 n('cantor','III · The Candleless Galleries','A choir of borrowed mouths','cantor',`
The gallery has portraits with blank faces. Beneath each hangs a brass speaking tube. When you pass, voices lift through them: a grocer asking after the weather, a child complaining about shoes, Mara telling somebody to eat before the soup gets cold. The stolen names have brought whole ordinary lives with them.

At the far end, the Hollow Cantor waits with its jaw open too wide. Its body strains around the sound it has been made to hold. Silver strands of hair quiver although no air moves. When it speaks, it uses your voice.

“Tell me who you are.” That is the trap. Every name spoken into the gallery becomes another instrument. A slate rests beneath its long fingers, covered with repeated marks. They are not words. They are rests in a piece of music.

The Cantor is trying to ask for silence in the only language the count allows it.`,[
 c('silence','Hold silence, even when it speaks in Mara’s voice','echochamber',{cost:{resolve:1},set:['countername','proof','archive'],note:'Spend 1 resolve. Learn the countername.'}),
 c('glass','Return a moment of silence through the echo glass','echochamber',{calling:'echoartisan',set:['countername','proof','archive'],note:'Echo Artisan. Free its voice without paying a name.'}),
 c('trade','Give up the sound of your own name','echochamber',{cost:{memory:1},set:['countername','proof','archive','owed'],note:'Spend 1 memory. Learn the countername at a cost.'}),
 c('withdraw','Close the gallery and leave it undisturbed','courtyard',{set:['archive'],note:'Mark this wing explored without taking its answer.'})
 ]),
 n('echochamber','III · The Candleless Galleries','The word between the notes','cantor',`
When you stop answering, the gallery’s voices begin to separate. The Cantor closes its mouth a little. A grocer becomes a grocer again. Mara’s voice moves to a speaking tube beside a portrait of a man with flour on his sleeves.

Between one breath and the next, you hear the countername: Unconsenting. The keepers who first made the bargain left it there as a release. A promise could bind only while it was freely renewed. The count covered the release with enough stolen voices that no living person could hear it.

The Cantor touches the slate. One of its long fingers writes a final rest. Then it lowers its head as if the weight of that single gesture were enormous.

You take a copy of the word and the old terms. Behind you, the gallery becomes quiet in a way no locked room ever is. Its silence has occupants.`,[
 c('return','Carry the countername back to the court','courtyard',{note:'The ledger can now be challenged.'})
 ]),
 n('laboratory','III · The Ossuary','A garden beneath the stone','castle',`
Frankenstein is kneeling beside a tray of seedlings, holding a cracked pot together with both hands. You had expected a laboratory full of machines. There are machines, but they have become shelves for soil, water and notes written in painstaking letters.

“Things grow here,” he says. “That is not the same as being allowed to live.” Beneath the tray, roots enter a drain that leads toward the throne. The count has made every death in the Marches pay interest. The garden feeds on what he cannot account for: gifts, accidents, forgiveness, things done without a bargain.

You tell Frankenstein what you have seen. He listens without moving the pot. If you remember Agnes, he smiles at the word “white,” then looks embarrassed by the shape of his smile.

He has one living seed ready to carry upstairs. It needs a reason to trust the hand that carries it.`,[
 c('memory','Give the seed a memory of home','seedling',{cost:{memory:1},set:['seed','laboratory'],note:'Spend 1 memory. Carry the living seed.'}),
 c('garden','Share life through your moonleaf root','seedling',{calling:'marrowgardener',set:['seed','laboratory'],note:'Marrow Gardener. Wake the seed through living roots.'}),
 c('agnes','Tell him Agnes has lit her candle','seedling',{require:['widowName'],set:['seed','laboratory'],note:'Agnes’s name is enough. Carry the seed.'}),
 c('leave','Leave the seed safe in his care','courtyard',{set:['laboratory'],note:'Mark this wing explored without spending a memory.'})
 ]),
 n('seedling','III · The Ossuary','A gift with no price','castle',`
The seed opens in your palm. A single white shoot curls around your smallest finger, not holding it, merely finding it. Frankenstein releases the broken pot and it remains whole. For a moment he looks like a man surprised by an ordinary kindness.

“The ledger cannot record a gift,” he says. “It can turn gifts into debts if you let it. Do not promise to repay this.” He gives you the tray’s cloth to keep the shoot warm. Somebody has embroidered a crooked white flower in one corner.

You ask why he has stayed. He looks at the seedlings, then at the drain beneath them. “Because leaving is not the only way to become free. But I would like the choice.”

The seed makes no light. Your lantern seems brighter beside it anyway. You leave the laboratory with something alive that the count has neither made nor bought.`,[
 c('return','Carry the gift back to the court','courtyard',{change:{resolve:1},note:'Gain 1 resolve. Keep the gift free of debt.'})
 ]),
 n('wolfman','III · The Wolf Court','A command with a pulse','bellwrought',`
The Wolf Man sits on the floor beside a bell fixed into an iron frame. He has arranged cushions around it, as if that could keep the sound from hurting anyone. Above him, a narrow window shows the ridge where Elias hunts.

“I agreed to keep the roads safe,” he says. “The count changed what safe meant.” Every keeper who failed to renew the bargain became another hunter. The bell tells them where a debt has escaped. It never tells them when the debt is paid.

He reaches toward the frame, then takes his hand away. The curse will not let its keeper release himself. He can show you the catch. He cannot ask you to open it.

There is a way to mute the command without killing the people it has remade. It takes resolve, a ward, or an oath spoken by somebody the bell does not own.`,[
 c('catch','Hold the catch while he breaks the bell’s command','chain',{cost:{resolve:2},set:['bell','wolfcourt','mercy'],note:'Spend 2 resolve. Silence the hunting bell.'}),
 c('ward','Wrap the bell in your protective ward','chain',{require:['ward'],set:['bell','wolfcourt','mercy'],note:'The ward shields the release.'}),
 c('oath','Bind the frame to its original promise','chain',{calling:'oathbinder',set:['bell','wolfcourt','mercy'],note:'Oathbinder. Roads must protect their travelers.'}),
 c('leave','Leave the command intact and close the door','courtyard',{set:['wolfcourt'],note:'Mark this wing explored without freeing the bell.'})
 ]),
 n('chain','III · The Wolf Court','The silence after the bell','bellwrought',`
The catch moves a finger’s width. That is all. The bell stops in the middle of a note, leaving a silence so sudden that you hear the roof settling overhead. The Wolf Man closes his eyes. He does not change into somebody else. Freedom arrives before a cure.

Far below, Elias lifts his head from the mill road. For the first time tonight, he can choose which way to walk. You cannot see whether he chooses the mill or the village. You have made that choice belong to him.

The Wolf Man gives you the bell’s small clapper. “Take it upstairs. A command without a voice still thinks it deserves one. The ledger will try to give it yours.” He smiles painfully. “You can say no.”

When you return to the court, the dead vines beside the fountain have one green leaf. The laboratory’s drain is beginning to carry water uphill.`,[
 c('return','Carry the silent bell back to the court','courtyard',{note:'A command can be ended without ending its victim.'})
 ]),
 n('ledger','IV · The Astral Throne','A book that knows your handwriting','castle',`
The throne room has no ceiling. Rain falls through a circle of clear sky, but it never reaches the book on the table. The ledger is bound in grey cloth. It looks disappointingly ordinary, like a shopkeeper’s account book left beside the evening tea.

Dracula stands at the window, looking over the Marches. “I kept their winter from eating them,” he says. “Their keepers offered service. Their children forgot to renew it. A promise should not grow weaker merely because people die.”

You open the ledger. It is written in your handwriting. Every name you have heard tonight appears beside a column of interest. Your own is at the bottom, waiting for a figure. Under the ink, somebody has left a row blank.

The count turns. He is not angry. A creature who has made cruelty look like arithmetic has little use for anger. “Shall we settle the account?”`,[
 c('hear','Ask what settling the account would mean','count',{note:'Hear every available bargain before choosing.'})
 ]),
 n('count','IV · The Astral Throne','The count’s arithmetic','castle',`
“A permanent keeper,” Dracula says. “Someone who can remember the terms, enforce the roads, speak for the dead. In return, Hearthwick gets its names back.” He lays a pen beside the ledger. “You would never need to be forgotten.”

The alternative is written between the lines. The living seed proves there are things the ledger cannot own. The silent bell proves a command can end. The countername proves consent was always part of the promise. With all three, you can challenge the account rather than inherit it.

There are smaller answers. You could give the book your name in exchange for the town’s. You could burn its pages, knowing a fire cannot distinguish a debt from the person written beside it. You could leave with what you have learned, and bring others back.

No answer is free. A price freely chosen is still different from a price imposed. The count waits for you to confuse them.`,[
 c('release','Speak the countername and open the seed inside the ledger','opening',{require:['countername','seed','bell'],cost:{light:1},note:'Need the countername, seed and silent bell. Spend 1 light.'}),
 c('keeper','Become the count’s permanent keeper','end-keeper',{cost:{memory:2},note:'Spend 2 memories. An ending: inherit the bargain.'}),
 c('name','Trade your own name for Hearthwick’s names','end-nameless',{cost:{memory:1},note:'Spend 1 memory. An ending: a freely chosen sacrifice.'}),
 c('fire','Set the ledger alight','sealing',{cost:{light:1},note:'Spend 1 light. Fire carries a different risk.'}),
 c('refuse','Refuse every bargain and carry the truth home','end-witness',{note:'An ending: return as a witness, with your remaining memories.'})
 ]),
 n('opening','IV · The Astral Throne','Consent is a door','castle',`
You speak the countername. The seed enters the blank row. Its roots find the spaces between letters, spreading through an account that has never left room for anything to grow. The silent clapper lies against the cover like a stone laid on a grave.

Dracula steps forward, then stops. The book is returning every borrowed thing to its owner. It cannot return his authority, because nobody offered it. For the first time, he must ask rather than command.

“There will be winter,” he says. His voice has become tired. “The roads will need keepers. Somebody must stay.” This is true. It is also smaller than the truth he has been selling. A country needs care. It does not need one person to own the people caring for it.

Names lift from the pages like breaths on glass. You can take them home now, or remain to help the castle’s prisoners leave. Neither choice gives the count another signature.`,[
 c('home','Bring the names home while the roads are open','end-home',{note:'An ending: the country returns to its people.'}),
 c('stay','Stay until every prisoner has a way out','end-garden',{cost:{resolve:1},note:'Spend 1 resolve. An ending: make the castle a place of refuge.'})
 ]),
 n('sealing','IV · The Astral Throne','A fire that reads','castle',`
The first page burns blue. Voices rise from it, speaking all at once. You have found a weapon that cannot tell the guilty from the captive. The count moves away from the table. For once he does not pretend to be protecting anyone.

The book tries to close. A root could hold its covers apart while the names escape. Without one, you can still smother the fire and leave enough of the ledger to become evidence. If you let it burn, the Marches will forget the bargain, but they will forget many of the people inside it too.

This is the last moment at which changing your mind is an action rather than a wish. The book’s cover grows hot beneath your hands. From the gallery below, the Cantor begins a single sustained note.

You have three answers to the fire. Read their prices before choosing.`,[
 c('root','Hold the covers open with Frankenstein’s living seed','end-home',{require:['seed','countername'],cost:{resolve:1},note:'Need the seed and countername. Spend 1 resolve to release the names.'}),
 c('smother','Smother the fire and escape with the surviving pages','end-witness',{note:'An ending: take evidence instead of a victory.'}),
 c('ashes','Let the whole account become ash','end-ashes',{note:'An ending: end the debt at a terrible cost.'})
 ]),
 n('end-road','V · The road home','The chair remains empty','castle',`
Hearthwick is still standing when you return. That feels like something you should be ashamed to celebrate. Mara brings you soup without asking whether you succeeded. She has become good at recognizing things no longer named.

You tell her what the roads contain. Where you found a closed door, where a voice asked for payment, where the gate opened of its own accord. She writes every detail down. A neighbor brings another lantern. The roadwarden finds a second map.

You did not free the Marches tonight. You did not give the count another keeper either. The country has survived worse beginnings than a frightened person returning with a description of the way.

The empty chair stays beside Mara’s table. Tomorrow there will be people willing to walk north together. For tonight, you put your lantern where it can help somebody find the door.`,[],{ending:'The Road Home'}),
 n('end-witness','V · The unclosed account','A country of witnesses','castle',`
You leave the Mourning Crown carrying what you know. The gate tries to speak in a voice you trust. You keep walking until the voice has to admit it does not know the road.

At Hearthwick, Mara spreads paper across the table. Names you remembered become questions beside blank spaces. The Sexton’s prayer, the Widow’s threshold, the command inside the hunting bell: each is a part of the curse that can be described. Described things can be argued with. The count has depended on people suffering separately.

The ninth bell remains silent. The ledger remains unfinished. But no one mistakes that silence for safety now. In the morning, a baker, a miller’s sister and an old roadwarden set out with tools as well as lanterns.

You have not written the last page. You have made sure the next one will have more than one author.`,[],{ending:'A Country of Witnesses'}),
 n('end-keeper','V · The signed account','The hand that holds the pen','castle',`
The pen is cold. You sign before you can hear the gallery trying to imitate your mother's voice. Across the Marches, brass plates fill with letters. Mara remembers Elias. The bells ring nine times. People call it a miracle because that is easier than asking what it cost.

Your room at the castle has a window over the road. The first winter is mild. The next is worse. Every time you ask the count for help, he shows you the clause beside your signature. You learn that a permanent keeper is a person whose consent is consulted only once.

Yet you can change small things. A hunter receives a day without a command. A gardener gets soil from outside the walls. A child is allowed to keep both a name and a birthday. The account accumulates errors.

You keep a second book beneath your bed. In it you write every kindness the ledger cannot price. One day, somebody will find that book and a pen that has not yet been used.`,[],{ending:'The Unending Keeper'}),
 n('end-nameless','V · A gift without a witness','Someone at the table','castle',`
The count accepts your name. He expects gratitude when the stolen names go free. You give him none. A sacrifice chosen under pressure is still a warning about the person making the offer.

You reach Hearthwick at dawn. Mara knows somebody has brought her brother back to memory. She cannot put a name to the traveler standing in the doorway. When you try to tell her, your mouth makes the shape of a word that no longer belongs to you.

She sets a bowl beside the empty chair. “You look cold,” she says. “Come inside.” You sit. You still remember why pears matter. You still know where the mill road bends. The book has taken a name, not every part of a person.

Somewhere in the castle, the ledger starts a new line. Somewhere at Mara’s table, a person without a name is given a place. The line and the place are not the same thing.`,[],{ending:'The Nameless Guest'}),
 n('end-home','V · Names under morning','Nine bells, freely rung','castle',`
At dawn the fog lifts from the river. Names return unevenly, like feeling returning to a hand. People laugh, then weep, then argue over who remembered first. It is a wonderfully ordinary argument.

Elias comes down the mill road. His body still carries the damage of the curse. Mara runs to him anyway. The bell has stopped telling him which way to go. Whatever healing comes next will have to belong to living people, with time, patience and the right to refuse.

Agnes opens the cottage gate. Tomas arranges the church stones into a single name. In the Candleless Galleries, a voice practices saying “I” without borrowing anybody else's mouth. The count stands at a window that gives him no authority over the view.

There will be winter. Hearthwick appoints its own keepers for one season at a time. When the ninth bell rings, somebody has chosen to ring it. You set your lantern on Mara’s table, and nobody asks you to sign anything before the soup is served.`,[],{ending:'Nine Bells at Morning'}),
 n('end-garden','V · What grows after','The castle that opens outward','castle',`
You stay until the last speaking tube is empty. Frankenstein carries the seedlings to the court. The Wolf Man opens every door he once guarded. When Dracula asks where he should go, you tell him that he is free to leave, and that being free does not make him welcome everywhere.

By spring, white flowers grow in the fountain. The laboratory becomes a place to mend things. The gallery becomes a place to tell the truth without being asked for proof of ownership. The throne room loses its throne. People keep the open roof because some rooms should remember the sky.

The Marches still have monsters. Some need to be kept at a distance. Some need to be heard. Nobody pretends those are simple judgments. The people making them can change their minds.

Mara visits with Elias on a clear morning. She brings pears by mistake, laughs, and takes them home again. You have given the country a castle with doors that open outward. It will have to decide what to do with it.`,[],{ending:'The Unpurchased Garden'}),
 n('end-ashes','V · An end without an answer','The missing season','castle',`
The ledger burns until there is no page left to turn. The count's window goes dark. Across the Marches, the ninth bell cracks through the silence and breaks. For one terrible moment you can hear the whole country trying to remember what it has lost.

By dawn, the castle is only a castle. The hunters have no command. The garden has no debt. Hearthwick is alive. Mara opens her door, looks at the empty chair and asks why she kept it there. You cannot find a kind answer that is also true.

Spring comes anyway. White flowers appear beside the cottage, but nobody knows who planted them. Children find a church tower in the river and invent a story about its bell. Life continues around the shape of what cannot return.

You keep the ash in a small jar. When somebody says every monster should be burned out of the world, you put the jar on the table. It is a poor argument. It is the one you have left.`,[],{ending:'The Missing Season'})
];
export const byId=Object.fromEntries(pages.map(p=>[p.id,p]));
export const endings=pages.filter(p=>p.ending);
