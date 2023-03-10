const triggerCardEffects = (player, uniqueCardID, viewedArray, myResolve, cardPlayMode) => {
  switch (uniqueCardID) {
    // Mon cards
    case '001':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S010', 40, myResolve);  // S010 烏寶利
      break;
    case '002':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S023', 10, myResolve);  // S023 洛芙蓮
      break;
    case '003':
      cardEffect003(player, uniqueCardID, '008', 100, viewedArray, findLevelUpBracket(player), myResolve);  // 008 火舞精
      break;
    case '004':
      helpTransformEffect(player, uniqueCardID, '015', '140', viewedArray, myResolve);  // 015 赤龍,　140 1000年
      break;
    case '005':
      blockEffect(player, uniqueCardID, 'cardID', '067', true, myResolve);  // 067 樹龍
      break;
    case '006':
      contVoidEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '007':
      cardEffect007(player, viewedArray, findMatArrays(player), uniqueCardID, findBannedInTurn(player), myResolve);
      break;
    case '008':
      mutualLevelUp(player, '003', 100, viewedArray, findLevelUpBracket(player), myResolve);  // 003 火之精
      break;
    case '010':
      mutualPowerUp(player, '013', true, -20, viewedArray, findPowerBracket(player), myResolve);  // 013 爆炎王
      break;
    case '012':
      cardEffect012(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '013':
      mutualPowerUp(player, '010', true, -30, viewedArray, findPowerBracket(player), myResolve);  // 010 紅色殺手
      break;
    case '014':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S002', 10, myResolve);  // S002 拉瑪‧雅芙
      break;
    case '016':
      cardEffect016(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '017':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S011', 7, myResolve);  // S011 林露
      break;
    case '018':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S022', 20, myResolve);  // S022 娜娜科普
      break;
    case '019':
      helpTransformEffect(player, uniqueCardID, '125', '140', viewedArray, myResolve);  // 125 貝龍,　140 1000年
      break;
    case '020':
      cardEffect020(player, uniqueCardID, viewedArray, findMatArrays(player), findMatArrays(findVictim(player)), myResolve);
      break;
    case '022':
      cardEffect022(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '024':
      mutualPowerUpStackable('025', '025', false, 2, viewedArray, findPowerBracket(player), findMatArrays(player), myResolve);  // 025 雌人魚
      break;
    case '025':
      blockEffect(player, uniqueCardID, 'cardID', '024', true, myResolve);  // 024 雄人魚
      break;
    case '026':
      blockEffect(player, uniqueCardID, 'cardID', '041', true, myResolve);  // 041 泰坦
      break;
    case '027':
      excitingClassEffect(uniqueCardID, viewedArray, true, 20, findPowerBracket(player), findMatArrays(player), 'FL', myResolve); 
      break;
    case '029':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S003', 30, myResolve);  // S003 布力舒華辛力‧加
      break;
    case '030':
      blockEffect(player, uniqueCardID, 'cardID', '066', true, myResolve);  // 066 死亡之花
      break;
    case '031':
      contVoidEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '032':
      mutualPowerUpStackable('035', '182', false, 10, viewedArray, findPowerBracket(player), findMatArrays(player), myResolve);  // 035 蛇龍 182 地震龍
      break;
    case '034':
      blockEffect(player, uniqueCardID, 'cardID', '028', true, myResolve);  // 028 藍龍
      break;
    case '036':
      blockEffect(player, uniqueCardID, 'cardID', '108', true, myResolve);  // 108 寶寶龍
      break;
    case '037':
      cardEffect037(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '039':
      blockEffect(player, uniqueCardID, 'cardID', '055', true, myResolve);  // 055 地獄翼妖
      break;
    case '040':
      blockEffect(player, uniqueCardID, 'cardID', '038', true, myResolve);  // 038 岩妖
      break;
    case '043':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S019', 50, myResolve);  // S019 柏古‧蘭巴杜
      break;
    case '044':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S004', 10, myResolve);  // S004 雷巴古
      break;
    case '045':
      blockEffect(player, uniqueCardID, 'cardID', '066', true, myResolve);  // 066 死亡之花
      break;
    case '046':
      blockEffect(player, uniqueCardID, 'monClass', 'FH', true, myResolve);
      break;
    case '048':
      blockEffect(player, uniqueCardID, 'monClass', 'BE', true, myResolve);
      break;
    case '049':
      blockEffect(player, uniqueCardID, 'cardID', '056', true, myResolve);  // 056 天龍
      break;
    case '050':
      cardEffect050(player, uniqueCardID, viewedArray, findLevelUpBracket(player), myResolve);
      break;
    case '053':
      mutualPowerUpStackable('047', '047', false, 10, viewedArray, findPowerBracket(player), findMatArrays(player), myResolve);  // 047 天馬
      break;
    case '055':
      blockEffect(player, uniqueCardID, 'cardID', '042', true, myResolve);  // 042 地龍
      break;
    case '057':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S005', 5, myResolve);  // S005
      break;
    case '058':
      cardEffect058(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '059':
      cardEffect059(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '061':
    mutualLevelUp(player, '065', 80, viewedArray, findLevelUpBracket(player), myResolve);  // 065 巨木寄生獸 
      break;
    case '062':
      mutualPowerUp(player, '140', false, 10, viewedArray, findPowerBracket(player), myResolve);  // 140 1000年
      break;
    case '063':
      blockEffect(player, uniqueCardID, 'monClass', 'BU', true, myResolve);
      break;
    case '064':
      blockEffect(player, uniqueCardID, 'monClass', 'BI', true, myResolve);
      break;
    case '065':
      mutualLevelUp(player, '061', 100, viewedArray, findLevelUpBracket(player), myResolve);  // 061 種子象
      break;
    case '068':
      cardEffect068(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '069':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S016', 10, myResolve);  // S016 邦吾
      break;
    case '070':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S026', 10, myResolve);  // S026 比捷‧古古
      break;
    case '071':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S006', 8, myResolve);  // S006 古圖
      break;
    case '073':
      excitingClassEffect(uniqueCardID, viewedArray, true, 20, findPowerBracket(player), findMatArrays(player), 'ML', myResolve); 
      break;
    case '075':
      cardEffect075(player, uniqueCardID, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case '076':
      cardEffect076(viewedArray, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '078':
      blockEffect(player, uniqueCardID, 'cardID', '090', true, myResolve);  // 090 救世木偶
      break;
    case '079':
      excitingClassEffect(uniqueCardID, viewedArray, true, 30, findPowerBracket(player), findMatArrays(player), 'FL', myResolve); 
      break;
    case '081':
      cardEffect081(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '082':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S007', 20, myResolve);  // S007 露露‧芭比
      break;
    case '084':
      blockEffect(player, uniqueCardID, 'monType', 'DD', true, myResolve);
      break;
    case '085':
      cardEffect085(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '086':
      contVoidEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '087':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S017', 10, myResolve);  // S017 羅露特
      break;
    case '088':
      cardEffect088(viewedArray, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '089':
      blockEffect(player, uniqueCardID, 'cardID', '076', true, myResolve);  // 076 獨眼蟲
      break;
    case '093':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S009', 10, myResolve);  // S009 黑格爾‧亞薩
      break;
    case '094':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S018', 5, myResolve);  // S018 史登‧斯派克
      break;
    case '095':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S032', 3, myResolve);  // S032 根迪治
      break;
    case '096':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S028', 5, myResolve);  // S028 亞路文‧烏
      break;
    case '102':
      blockEffect(player, uniqueCardID, 'monClass', 'FH', true, myResolve);
      break;
    case '103':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S001', 5, myResolve);  // S001 智夫達魯
      break;
    case '105':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S020', 10, myResolve);  // S020 杜魯‧文利
      break;
    case '109':
      blockEffect(player, uniqueCardID, 'monClass', 'BU', true, myResolve);
      break;
    case '111':
      blockEffect(player, uniqueCardID, 'monClass', 'BE', true, myResolve);
      break;
    case '116':
      cardEffect116(player, uniqueCardID, myResolve);
      break;
    case '117':
      autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
      break;
    case '118':
      autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
      break;
    case '122':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S056', 2, myResolve);  // S056 波尤
      break;
    case '172':
      cardEffect003(player, uniqueCardID, '173', 100, viewedArray, findLevelUpBracket(player), myResolve);  // 173 放火精
      break;
    case '173':
      mutualLevelUp(player, '172', 100, viewedArray, findLevelUpBracket(player), myResolve);  // 172 火山怪
      break;
    case '174':
      cardEffect174(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '175':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S022', 20, myResolve);  // S022 娜娜科普
      break;
    case '176':
      mutualPowerUpStackable('177', '177', false, 2, viewedArray, findPowerBracket(player), findMatArrays(player), myResolve);  // 177 華迪雅
      break;
    case '177':
      blockEffect(player, uniqueCardID, 'cardID', '176', true, myResolve);  // 176 戰士杜頓
      break;
    case '178':
      blockEffect(player, uniqueCardID, 'cardID', '185', true, myResolve);  // 185 加羅
      break;
    case '179':
      excitingClassEffect(uniqueCardID, viewedArray, true, 20, findPowerBracket(player), findMatArrays(player), 'FL', myResolve); 
      break;
    case '181':
      blockEffect(player, uniqueCardID, 'cardID', '180', true, myResolve);  // 180 北海龍
      break;
    case '184':
      blockEffect(player, uniqueCardID, 'cardID', '183', true, myResolve);  // 183 地岩人
      break;
    case '186':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S019', 50, myResolve);  // S019 柏古‧蘭巴杜
      break;
    case '188':
      blockEffect(player, uniqueCardID, 'monClass', 'BE', true, myResolve);
      break;
    case '189':
      blockEffect(player, uniqueCardID, 'cardID', '056', true, myResolve);  // 056 天龍
      break;
    case '190':
      mutualPowerUpStackable('187', '187', false, 10, viewedArray, findPowerBracket(player), findMatArrays(player), myResolve);  // 187 白獅精
      break;
    case '192':
      cardEffect192(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '193':
      blockEffect(player, uniqueCardID, 'monClass', 'BU', true, myResolve);
      break;
    case '195':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S002', 20, myResolve);  // S007 露露‧芭比
      break;
    case '196':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S009', 20, myResolve);  // S009 黑格爾‧亞薩
      break;
    case '197':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S018', 5, myResolve);  // S018 史登‧斯派克
      break;
    case '198':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S028', 5, myResolve);  // S028 亞路文‧烏
      break;
    case '201':
      cardEffect201(player, uniqueCardID, myResolve);
      break;
    case '202':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S001', 5, myResolve);  // S001 智夫達魯
      break;
    case '204':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S047', 10, myResolve);  // S047 壺特
      break;
    case '204B':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S047', 10, myResolve);  // S047 壺特
      break;
    case '205':
      contVoidEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '206':
      blockEffect(player, uniqueCardID, 'monType', 'WW', true, myResolve);
      break;
    case '207':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S021', 50, myResolve);  // S021 柏高‧費利
      break;
    case '208':
      blockEffect(player, uniqueCardID, 'monClass', 'BI', true, myResolve);
      break;
    case '210':
      autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
      break;
    case '211':
      contVoidEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '212':
      contVoidEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '213':
      blockEffect(player, uniqueCardID, 'monType', 'LL', true, myResolve);
      break;
    case '214':
      cardEffect214(player, uniqueCardID, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case '215':
      contVoidEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '216':
      cardEffect216(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '217':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S008', 10, myResolve);  // S008 羅拉‧古蘭普
      break;
    case '220':
      mutualLevelUp(player, '221', 100, viewedArray, findLevelUpBracket(player), myResolve);  // 221 寂羅
      break;
    case '221':
      mutualLevelUp(player, '220', 100, viewedArray, findLevelUpBracket(player), myResolve);  // 220 晶片蟲
      break;
    case '222':
      blockEffect(player, uniqueCardID, 'cardID', '170', true, myResolve);  // 170 神之障壁（右方）
      break;
    case '223':
      blockEffect(player, uniqueCardID, 'cardID', '171', true, myResolve);  // 171 神之障壁（左方）
      break;
    case '225':
      summonerFactorEffect(findMatArrays(player), findPowerBracket(player), viewedArray, 'S054', 10, myResolve);  // S054 積尼姆
      break;
    case '226':
      cardEffect226(player, myResolve, cardPlayMode);
      break;
    case '227':
      blockEffect(player, uniqueCardID, 'monPower', 50, true, myResolve);
      break;
    case '228':
      contVoidEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '229':
      mutualPowerUp(player, '247', false, 10, viewedArray, findPowerBracket(player), myResolve);  // 247 氣之秘石
      break;
    case '230':
      mutualPowerUp(player, '262', false, 5, viewedArray, findPowerBracket(player), myResolve);  // 262 貝獸仙人之咒語
      break;
    case '232':
      mutualPowerUp(player, '269', false, -5, viewedArray, findPowerBracket(player), myResolve);  // 269 Dr.拉柯奇之野心
      break;
    case '233':
      mutualPowerUp(player, '269', false, -5, viewedArray, findPowerBracket(player), myResolve);  // 269 Dr.拉柯奇之野心
      break;
    case '234':
      autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
      break;
    case '235':
      cardEffect235(player, uniqueCardID, myResolve);
      break;
    case '236':
      bombEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '237':
      blockEffect(player, uniqueCardID, 'monClass', 'ML', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case '274':
      cardEffect274(player, findMatArrays(player), findMatArrays(findVictim(player)), myResolve);
      break;
    case '275':
      cardEffect275(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '282':
      cardEffect282(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '287':
      cardEffect287(findMatArrays(player)[5], viewedArray, myResolve);
      break;
    case '288':
      cardEffect288(player, uniqueCardID, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case '289':
      cardEffect289(player, myResolve);
      break;
    case '304':
      cardEffect304(player, uniqueCardID, viewedArray, findMatArrays(player), myResolve);
      break;
    case '307':
      cardEffect307(player, uniqueCardID, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case '308':
      irrecoverableBlockEffect(player, uniqueCardID, findVictim(player), findMatArrays(findVictim(player)), myResolve);
      break;
    case '309':
      contVoidEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '311':
      cardEffect311(player, uniqueCardID, viewedArray, findMatArrays(player), myResolve);
      break;
    case '686':
      cardEffect686(player, uniqueCardID, viewedArray, findMatArrays(player), findLevelUpBracket(player), myResolve);
      break;
    case '688':
      blockEffect(player, uniqueCardID, 'monClass', 'SL', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case '476':
      autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
      break;
    case '477':
      autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
      break;
    case '478':
      autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
      break;
    case '479':
      bombEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '867':
      bombEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '874':
      autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
      break;
    case '1042':
      bombEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case 'M167':
      bombEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case 'N152':
      autoVoidEffect(player, viewedArray, findVictim(player), uniqueCardID, findMatArrays(findVictim(player)), myResolve);
      break;
    case 'N153':
      bombEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    
    // Help cards
    case '139':
      handChainEffect(player, uniqueCardID, myResolve);
      break;
    case '141':
      drawTillSevenEffect(player, uniqueCardID, 3, myResolve);
      break;
    case '142':
      summonersShuffleEffect(player, uniqueCardID, myResolve);
      break;
    case '144':
      cardEffect144(player, uniqueCardID, myResolve);
      break;
    case '144B':
      cardEffect144(player, uniqueCardID, myResolve);
      break;
    case '145':
      cardEffect145(player, uniqueCardID, myResolve);
      break;
    case '145B':
      cardEffect145(player, uniqueCardID, myResolve);
      break;
    case '146':
      targetPowerup(player, uniqueCardID, false, 2, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '147':
      targetPowerup(player, uniqueCardID, false, 3, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '148':
      targetPowerup(player, uniqueCardID, false, 3, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '149':
      targetPowerup(player, uniqueCardID, false, 3, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '150':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '151':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '152':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '153':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '154':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '155':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '156':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '157':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '158':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '242':
      irrecoverableBlockEffect(player, uniqueCardID, findVictim(player), findMatArrays(findVictim(player)), myResolve);
      break;
    case '243':
      cardEffect243(player, uniqueCardID, myResolve);
      break;
    case '244':
      cardEffect244(player, viewedArray, findMatArrays(player), uniqueCardID, findBannedInTurn(player), myResolve);
      break;
    case '245':
      cardEffect245(player, uniqueCardID, myResolve);
      break;
    case '246':
      cardEffect246(player, uniqueCardID, myResolve);
      break;
    /**
    case '247':
      monPowerup(player, '229', 100, myResolve); // 229 = 鎧甲龍
      break;
    */
    case '248':
      cardEffect248(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '249':
      targetPowerup(player, uniqueCardID, false, 2, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '250':
      targetPowerup(player, uniqueCardID, false, 2, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '251':
      targetPowerup(player, uniqueCardID, false, 3, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '252':
      targetPowerup(player, uniqueCardID, false, 2, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '253':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '254':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '255':
      allPowerup(uniqueCardID, 30, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '256':
      allPowerup(uniqueCardID, 50, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '257':
      targetPowerup(player, uniqueCardID, true, 100, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '258':
      targetPowerup(player, uniqueCardID, true, 100, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '259':
      targetPowerup(player, uniqueCardID, true, 100, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '260':
      targetPowerup(player, uniqueCardID, true, 100, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '261':
      targetPowerup(player, uniqueCardID, true, 100, myResolve);  // player, uniqueCardID, powerupFlat, powerupValue
      break;
    case '271':
      cardEffect271(player, findMatArrays(player), uniqueCardID, findBannedInTurn(player), myResolve);
      break;
    case '271':
      cardEffect271(player, findMatArrays(player), uniqueCardID, findBannedInTurn(player), myResolve);
      break;
    case '272':
      cardEffect272(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '290':
      cardEffect290(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '291':
      cardEffect291(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '293':
      cardEffect293(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '294':
      cardEffect294(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '295':
      cardEffect295(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '296':
      allPowerup(uniqueCardID, 50, findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case '312':
      cardEffect312(player, uniqueCardID, myResolve);
      break;
    case '314':
      cardEffect314(findMatArrays(player), myResolve);
      break;
    case '315':
      cardEffect315(player, uniqueCardID, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case '316':
      cardEffect316(player, findMatArrays(player), findSafeHouse(player), myResolve);
      break;
    case '317':
      contVoidEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '318':
      cardEffect318(player, uniqueCardID, myResolve);
      break;
    case '319':
      cardEffect319(findMatArrays(player), myResolve);
      break;
    case '689':
      cardEffect689(player, uniqueCardID, findMatArrays(player), myResolve);
      break;
    case '690':
      summonersSwapEffect(player, uniqueCardID, myResolve);
      break;
    case '691':
      cardEffect691(findMatArrays(player), myResolve);
      break;
    case '692':
      cardEffect692(findMatArrays(player), myResolve);
      break;
    case '693':
      cardEffect693(findMatArrays(player), myResolve);
      break;
    case '502':
      summonersShuffleEffect(player, uniqueCardID, myResolve);
      break;
    case '503':
      handChainEffect(player, uniqueCardID, myResolve);
      break;
    case '915':
      summonersShuffleEffect(player, uniqueCardID, myResolve);
      break;
    case '922':
      summonersSwapEffect(player, uniqueCardID, myResolve);
      break;
    case 'M200':
      summonersShuffleEffect(player, uniqueCardID, myResolve);
      break;
    case 'N156':
      summonersShuffleEffect(player, uniqueCardID, myResolve);
      break;
    case 'M205':
      summonersSwapEffect(player, uniqueCardID, myResolve);
      break;
    case 'PR005':
      summonersSwapEffect(player, uniqueCardID, myResolve);
      break;
    case 'PR022':
      summonersSwapEffect(player, uniqueCardID, myResolve);
      break;
    
    // SP cards
    case '159':
      miracleEffect(player, myResolve);
      break;
    case '160':
      blockEffect(player, uniqueCardID, 'monClass', 'DR', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case '161':
      exchangeEffect(player, uniqueCardID, myResolve);
      break;
    case '162':
      exchangeEffect(player, uniqueCardID, myResolve);
      break;
    case '163':
      nullEffect(player, uniqueCardID, myResolve);
      break;
    case '164':
      monGraveEffect(player, uniqueCardID, myResolve); 
      break;
    case '165':
      balanceEffect(player, -100, myResolve);
      break;
    case '266':
      balanceEffect(player, -200, myResolve);
      break;
    case '267':
      helpGraveEffect(player, myResolve);
      break;
    case '268':
      blockEffect(player, uniqueCardID, 'monType', 'NN', true, myResolve);
      break;
    case '298':
      hammerEffect(player, myResolve);
      break;
    case '299':
      typhoonBreakerEffect(player, uniqueCardID, myResolve); 
      break;
    case '521':
      nullEffect(player, uniqueCardID, myResolve);
      break;
    case '522':
      blockEffect(player, uniqueCardID, 'monClass', 'DR', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case '523':
      monGraveEffect(player, uniqueCardID, myResolve); 
      break;
    case '524':
      exchangeEffect(player, uniqueCardID, myResolve);
      break;
    case '528':
      miracleEffect(player, myResolve);
      break;
    case '955':
      blockEffect(player, uniqueCardID, 'monClass', 'DR', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case '959':
      monGraveEffect(player, uniqueCardID, myResolve); 
      break;
    case '963':
      miracleEffect(player, myResolve);
      break;
    case '964':
      miracleEffect(player, myResolve);
      break;
    case '965':
      nullEffect(player, uniqueCardID, myResolve);
      break;
    case '966':
      nullEffect(player, uniqueCardID, myResolve);
      break;
    case '967':
      nullEffect(player, uniqueCardID, myResolve);
      break;
    case '989':
      exchangeEffect(player, uniqueCardID, myResolve);
      break;
    case 'M221':
      blockEffect(player, uniqueCardID, 'monClass', 'DR', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'M224':
      miracleEffect(player, myResolve);
      break;
    case 'M255':
      nullEffect(player, uniqueCardID, myResolve);
      break;
    case 'M226':
      monGraveEffect(player, uniqueCardID, myResolve); 
      break;
    case 'M227':
      exchangeEffect(player, uniqueCardID, myResolve);
      break;
    case 'M230':
      exchangeEffect(player, uniqueCardID, myResolve);
      break;
    case 'M232':
      blockEffect(player, uniqueCardID, 'monClass', 'DR', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'N203':
      blockEffect(player, uniqueCardID, 'monClass', 'DR', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'N204':
      exchangeEffect(player, uniqueCardID, myResolve);
      break;
    case 'N205':
      exchangeEffect(player, uniqueCardID, myResolve);
      break;
    case 'N207':
      miracleEffect(player, myResolve);
      break;
    case 'N208':
      nullEffect(player, uniqueCardID, myResolve);
      break;
    
    // Help/SP cards
    case '166':
      oldManEffect(player, findVictim(player), uniqueCardID, myResolve);
      break;
    case '167':
      forcedDraw();
      break;
    case '168':
      cardEffect168(player, uniqueCardID, myResolve);
      break;
    case '169':
      blockEffect(player, uniqueCardID, 'monType', 'DD', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case '170':
      blockEffect(player, uniqueCardID, 'pos', 'right', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case '171':
      blockEffect(player, uniqueCardID, 'pos', 'left', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case '262':
      cardEffect262(player, findMatArrays(player), myResolve);
      break;
    case '263':
      cardEffect263(player, uniqueCardID, myResolve);
      break;
    case '264':
      cardEffect264(player, uniqueCardID, myResolve);
      break;
    case '265':
      cardEffect265(player, uniqueCardID, myResolve);
      break;
    case '695':
      cardEffect695(player, uniqueCardID, myResolve);
      break;
    case '699':
      forcedDraw();
      break;
    case '533':
      forcedDraw();
      break;
    case '641':
      forcedDraw();
      break;
    case '537':
      oldManEffect(player, uniqueCardID, myResolve);
      break;
    case '971':
      forcedDraw();
      break;
    case '982':
      oldManEffect(player, uniqueCardID, myResolve);
      break;
    case 'M216':
      forcedDraw();
      break;
    case 'N200':
      forcedDraw();
      break;

    // Ch cards
    case '119':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;
    case '120':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;
    case '121':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;
    case '123':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;
    case '124':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;
    case '126':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;
    case '127':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;
    case '238':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;
    case '239':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;
    case '240':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;
    case '241':
      CHcardEffect(player, uniqueCardID, myResolve);
      break;

    // R cards
    case '128':
      RcardEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '129':
      RcardEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '130':
      RcardEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '131':
      RcardEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '132':
      RcardEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '133':
      RcardEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '134':
      RcardEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '135':
      RcardEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '136':
      RcardEffect(player, uniqueCardID, viewedArray, myResolve);
      break;
    case '696':
      cardEffect696(player, uniqueCardID, viewedArray, myResolve);
      break;
    default:
      if (SPLockMons.includes(uniqueCardID) === true) {
        blockEffect(player, uniqueCardID, 'pos', 'sp', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      } else {
        console.log(uniqueCardID, ' has no effect.')
        myResolve();
      }
  }
}