// define some variables
const p1Profile = JSON.parse(localStorage.getItem('p1Profile'));
const p2Profile = JSON.parse(localStorage.getItem('p2Profile'));
const playedPositions = ['sky', 'left', 'right', 'help', 'sp', 'summoner'];
const monTypes = ['AA', 'CC', 'DD' ,'EE', 'FF', 'GG', 'HH', 'KK', 'LL', 'MM', 'NN', 'OO', 'SS', 'WW', 'YY', 'ZZ'];
const monClasses = ['DR', 'BU' ,'FH', 'BE', 'BI', 'SH', 'ML', 'FL', 'SL'];
let hitByHammer = [];  // created for hammer effects (e.g., 298)
let shuffleBe4Draw = [];  // created for S048

let p1DeckBackImgPath;
let p1DeckBackImgPathH;
let p1Deck = [];
let p1Hand = [];
let p1Sky = [];
let p1Summoner = [];
let p1Left = [];
let p1Right = [];
let p1Help = [];
let p1SP = [];
let p1Hole = [];
let p1Custody = [];
let p1Used = [];
let p1Queue = [];
const p1MatArrays = [p1Sky, p1Left, p1Right, p1Help, p1SP, p1Summoner, p1Hole, p1Custody];
let p1PowerupHist = [];

let p1SkyOccupied = false;
let p1LeftOccupied = false;
let p1RightOccupied = false;
let p1HelpOccupied = false;
const p1OccupiedFlags = [p1SkyOccupied, p1LeftOccupied, p1RightOccupied, p1HelpOccupied];

let p1Power = 0;
let p1PowerAdj = 0;
let p1Score = 0;
let p1Name;
let p1Exp;

// to revisit whether we still need these five flags //
let p1SkyAttacked = false;
let p1LeftAttacked = false;
let p1RightAttacked = false;
let p1HelpAttacked = false;
let p1SPAttacked = false;

// if [...]RecoverableTier1 === false, then the card slot is blocked until the next summoner.
// if [...]RecoverableTier2 === false, then the card slot is blocked until game over!!!
let p1SkyRecoverableTier1 = true;
let p1LeftRecoverableTier1 = true;
let p1RightRecoverableTier1 = true;
let p1HelpRecoverableTier1 = true;
let p1SPRecoverableTier1 = true;
let p1SkyRecoverableTier2 = true;
let p1LeftRecoverableTier2 = true;
let p1RightRecoverableTier2 = true;
let p1HelpRecoverableTier2 = true;
let p1SPRecoverableTier2 = true;
const p1RecoverableTier1s = [p1SkyRecoverableTier1, p1LeftRecoverableTier1, p1RightRecoverableTier1, p1HelpRecoverableTier1, p1SPRecoverableTier1];
const p1RecoverableTier2s = [p1SkyRecoverableTier2, p1LeftRecoverableTier2, p1RightRecoverableTier2, p1HelpRecoverableTier2, p1SPRecoverableTier2];

// cardID of card whose effect can only be used once (in turn/game) will be added here after used
let p1BannedEffectInTurn = [];  // this one is for effect that is recoverable, e.g., 205's
let p1BannedEffectInTurnNR = [];  // this one is for effect that is not recoverable
let p1BannedEffectInGame = [];
let p1ChangedSpeed = false;  // this is changed to true when 139 effect is executed

let p1SafeHouse = [];  // cards that become invulnerable due to card effects (e.g., 316, 585)
let p1SkyBlockedPower1 = [];
let p1LeftBlockedPower1 = [];
let p1RightBlockedPower1 = [];
let p1BlockedPos1 = [];
let p1BlockedPos2 = [];
let p1BlockedType1 = [];
let p1BlockedType2 = [];
let p1BlockedPower1 = [];
let p1BlockedPower2 = [];
let p1BlockedClass1 = [];
let p1BlockedClass2 = [];
let p1BlockedCardID1 = [];
let p1BlockedCardID2 = [];

let p1SPdecision = false;
let p1SummonerReady = false;

let p2DeckBackImgPath;
let p2DeckBackImgPathH;
let p2Deck = [];
let p2Hand = [];
let p2Sky = [];
let p2Summoner = [];
let p2Left = [];
let p2Right = [];
let p2Help = [];
let p2SP = [];
let p2Hole = [];
let p2Custody = [];
let p2Used = [];
let p2Queue = [];
const p2MatArrays = [p2Sky, p2Left, p2Right, p2Help, p2SP, p2Summoner, p2Hole, p2Custody];
let p2PowerupHist = [];

let p2SkyOccupied = false;
let p2LeftOccupied = false;
let p2RightOccupied = false;
let p2HelpOccupied = false;
const p2OccupiedFlags = [p2SkyOccupied, p2LeftOccupied, p2RightOccupied, p2HelpOccupied];

let p2Power = 0;
let p2PowerAdj = 0;
let p2Score = 0;
let p2Name;

// to revisit whether we still need these five flags //
let p2SkyAttacked = false;
let p2LeftAttacked = false;
let p2RightAttacked = false;
let p2HelpAttacked = false;
let p2SPAttacked = false;

let p2SkyRecoverableTier1 = true;
let p2LeftRecoverableTier1 = true;
let p2RightRecoverableTier1 = true;
let p2HelpRecoverableTier1 = true;
let p2SPRecoverableTier1 = true;
let p2SkyRecoverableTier2 = true;
let p2LeftRecoverableTier2 = true;
let p2RightRecoverableTier2 = true;
let p2HelpRecoverableTier2 = true;
let p2SPRecoverableTier2 = true;
const p2RecoverableTier1s = [p2SkyRecoverableTier1, p2LeftRecoverableTier1, p2RightRecoverableTier1, p2HelpRecoverableTier1, p2SPRecoverableTier1];
const p2RecoverableTier2s = [p2SkyRecoverableTier2, p2LeftRecoverableTier2, p2RightRecoverableTier2, p2HelpRecoverableTier2, p2SPRecoverableTier2];

let p2BannedEffectInTurn = [];
let p2BannedEffectInTurnNR = [];
let p2BannedEffectInGame = [];
let p2ChangedSpeed = false;  // this is changed to true when 139 effect is executed

let p2SafeHouse = [];
let p2SkyBlockedPower1 = [];
let p2LeftBlockedPower1 = [];
let p2RightBlockedPower1 = [];

let p2BlockedPos1 = [];
let p2BlockedPos2 = [];
let p2BlockedType1 = [];
let p2BlockedType2 = [];
let p2BlockedPower1 = [];
let p2BlockedPower2 = [];
let p2BlockedClass1 = [];
let p2BlockedClass2 = [];
let p2BlockedCardID1 = [];
let p2BlockedCardID2 = [];

let p2SummonerReady = false;
let p2SPdecision = false;

let currentTurn;
let turnSP = false;
let drawGame = false;
let winner = null;
let finalWinner = null;
let resultMsg;
// 'pre-prep' should only be used once. In the remaining of the game, it is  'prep', 'draw', 'play', 'discard', 'effect', 'choiceEffect'
let turnClass = 'pre-prep';
let forfeiter = []; // storing the player who has forfeited during the game 
let pile = [];

// Arrays that will come hand in several functions 
const SPLockMons = ['101', '219', '310', '386', '418', '636', '643', '644', '697', 
'781','782', '831', '848', '849', '880', '898', '1007', '1043', 'M003', 'M030', 'M046', 
'M075', 'M246', 'M278'];
const fuCardIDs = ['S073A', 'S073B', 'S073C', 'S073D', 'S073E', 'S073F', 'S073G', 'S073H', 'S073I', 'MS106', 'MS177', 'S444A', 'S444B'];

/* 
format of powerBracket[0/1/2]: [
  original power value (default: 0),
  ally/foe's PosSum/Pos0/Pos1/Pos2/PosH/PosSP flat power-up (default: 0),
  ally/foe's PosSum/Pos0/Pos1/Pos2/PosH/PosSP multipling power-up (default: 1),
  absorbed power-up (default: 0)
]
[0] = sky, [1] = left, [2] = right, [3] = help, [4] = sp
*/

let p1SkyLevelUp = {monPower: 0, monType: '', monClass: '', cardPic: '', source: '', sourcePlayer: '', recoverable: true};
let p1LeftLevelUp = {monPower: 0, monType: '', monClass: '', cardPic: '', source: '', sourcePlayer: '', recoverable: true};
let p1RightLevelUp = {monPower: 0, monType: '', monClass: '', cardPic: '', source: '', sourcePlayer: '', recoverable: true};
const p1LevelUpBracket = [p1SkyLevelUp, p1LeftLevelUp, p1RightLevelUp];

let p2SkyLevelUp = {monPower: 0, monType: '', monClass: '', cardPic: '', source: '', sourcePlayer: '', recoverable: true};
let p2LeftLevelUp = {monPower: 0, monType: '', monClass: '', cardPic: '', source: '', sourcePlayer: '', recoverable: true};
let p2RightLevelUp = {monPower: 0, monType: '', monClass: '', cardPic: '', source: '', sourcePlayer: '', recoverable: true};
const p2LevelUpBracket = [p2SkyLevelUp, p2LeftLevelUp, p2RightLevelUp];

let p1PowerBracket = [{
  OGP: 0,
  allyPosSumflatPU: 0,
  allyPosSummPU: 1,
  allyPos0flatPU: 0,
  allyPos0mPU: 1,
  allyPos1flatPU: 0,
  allyPos1mPU: 1,
  allyPos2flatPU: 0,
  allyPos2mPU: 1,
  allyPosHflatPU: 0,
  allyPosHmPU: 1,
  allyPosSPflatPU: 0,
  allyPosSPmPU: 1,
  foePosSumflatPU: 0,
  foePosSummPU: 1,
  foePos0flatPU: 0,
  foePos0mPU: 1,
  foePos1flatPU: 0,
  foePos1mPU: 1,
  foePos2flatPU: 0,
  foePos2mPU: 1,
  foePosHflatPU: 0,
  foePosHmPU: 1,
  foePosSPflatPU: 0,
  foePosSPmPU: 1,
  absorbedPU: 0
}, {
  OGP: 0,
  allyPosSumflatPU: 0,
  allyPosSummPU: 1,
  allyPos0flatPU: 0,
  allyPos0mPU: 1,
  allyPos1flatPU: 0,
  allyPos1mPU: 1,
  allyPos2flatPU: 0,
  allyPos2mPU: 1,
  allyPosHflatPU: 0,
  allyPosHmPU: 1,
  allyPosSPflatPU: 0,
  allyPosSPmPU: 1,
  foePosSumflatPU: 0,
  foePosSummPU: 1,
  foePos0flatPU: 0,
  foePos0mPU: 1,
  foePos1flatPU: 0,
  foePos1mPU: 1,
  foePos2flatPU: 0,
  foePos2mPU: 1,
  foePosHflatPU: 0,
  foePosHmPU: 1,
  foePosSPflatPU: 0,
  foePosSPmPU: 1,
  absorbedPU: 0
}, {
  OGP: 0,
  allyPosSumflatPU: 0,
  allyPosSummPU: 1,
  allyPos0flatPU: 0,
  allyPos0mPU: 1,
  allyPos1flatPU: 0,
  allyPos1mPU: 1,
  allyPos2flatPU: 0,
  allyPos2mPU: 1,
  allyPosHflatPU: 0,
  allyPosHmPU: 1,
  allyPosSPflatPU: 0,
  allyPosSPmPU: 1,
  foePosSumflatPU: 0,
  foePosSummPU: 1,
  foePos0flatPU: 0,
  foePos0mPU: 1,
  foePos1flatPU: 0,
  foePos1mPU: 1,
  foePos2flatPU: 0,
  foePos2mPU: 1,
  foePosHflatPU: 0,
  foePosHmPU: 1,
  foePosSPflatPU: 0,
  foePosSPmPU: 1,
  absorbedPU: 0
}, {
  allyFlatPU: 0,
  foeFlatPU: 0,
  absorbedPU: 0
}, {
  allyFlatPU: 0,
  foeFlatPU: 0,
  absorbedPU: 0
}, {
  allyFlatPU: 0,
  foeFlatPU: 0
}];
// the first adjValue informs powerBracket[5].allyFlatPU
let p1SummonerAdjHist = [{adjValue: 0, recoverable: true}, {adjValue: 0, recoverable: true}];

let p2PowerBracket = [{
  OGP: 0,
  allyPosSumflatPU: 0,
  allyPosSummPU: 1,
  allyPos0flatPU: 0,
  allyPos0mPU: 1,
  allyPos1flatPU: 0,
  allyPos1mPU: 1,
  allyPos2flatPU: 0,
  allyPos2mPU: 1,
  allyPosHflatPU: 0,
  allyPosHmPU: 1,
  allyPosSPflatPU: 0,
  allyPosSPmPU: 1,
  foePosSumflatPU: 0,
  foePosSummPU: 1,
  foePos0flatPU: 0,
  foePos0mPU: 1,
  foePos1flatPU: 0,
  foePos1mPU: 1,
  foePos2flatPU: 0,
  foePos2mPU: 1,
  foePosHflatPU: 0,
  foePosHmPU: 1,
  foePosSPflatPU: 0,
  foePosSPmPU: 1,
  absorbedPU: 0
}, {
  OGP: 0,
  allyPosSumflatPU: 0,
  allyPosSummPU: 1,
  allyPos0flatPU: 0,
  allyPos0mPU: 1,
  allyPos1flatPU: 0,
  allyPos1mPU: 1,
  allyPos2flatPU: 0,
  allyPos2mPU: 1,
  allyPosHflatPU: 0,
  allyPosHmPU: 1,
  allyPosSPflatPU: 0,
  allyPosSPmPU: 1,
  foePosSumflatPU: 0,
  foePosSummPU: 1,
  foePos0flatPU: 0,
  foePos0mPU: 1,
  foePos1flatPU: 0,
  foePos1mPU: 1,
  foePos2flatPU: 0,
  foePos2mPU: 1,
  foePosHflatPU: 0,
  foePosHmPU: 1,
  foePosSPflatPU: 0,
  foePosSPmPU: 1,
  absorbedPU: 0
}, {
  OGP: 0,
  allyPosSumflatPU: 0,
  allyPosSummPU: 1,
  allyPos0flatPU: 0,
  allyPos0mPU: 1,
  allyPos1flatPU: 0,
  allyPos1mPU: 1,
  allyPos2flatPU: 0,
  allyPos2mPU: 1,
  allyPosHflatPU: 0,
  allyPosHmPU: 1,
  allyPosSPflatPU: 0,
  allyPosSPmPU: 1,
  foePosSumflatPU: 0,
  foePosSummPU: 1,
  foePos0flatPU: 0,
  foePos0mPU: 1,
  foePos1flatPU: 0,
  foePos1mPU: 1,
  foePos2flatPU: 0,
  foePos2mPU: 1,
  foePosHflatPU: 0,
  foePosHmPU: 1,
  foePosSPflatPU: 0,
  foePosSPmPU: 1,
  absorbedPU: 0
}, {
  allyFlatPU: 0,
  foeFlatPU: 0,
  absorbedPU: 0
}, {
  allyFlatPU: 0,
  foeFlatPU: 0,
  absorbedPU: 0
}, {
  allyFlatPU: 0,
  foeFlatPU: 0
}];
let p2SummonerAdjHist = [{adjValue: 0, recoverable: true}, {adjValue: 0, recoverable: true}];