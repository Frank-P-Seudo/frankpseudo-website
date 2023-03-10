const triggerSummonerEffecs = (player, uniqueCardID, myResolve) => {
  switch (uniqueCardID) {
    case 'S002':
      ageistBlock(false, player, uniqueCardID, 'pos', 'sky', false, findMatArrays(findVictim(player))[5], 'M', 22, '', myResolve);
      break;
    case 'S003':
      tooPersonal('S012', 'EE030', player, uniqueCardID, '', '', true, myResolve);  // S012 哥羅‧加
      break;
    case 'S004':
      ageistBlock(false, player, uniqueCardID, 'pos', 'sky', false, findMatArrays(findVictim(player))[5], 'F', 22, '', myResolve);
      break;
    case 'S005':
      ageistBlock(false, player, uniqueCardID, 'pos', 'sky', false, findMatArrays(findVictim(player))[5], 'M', 22, '', myResolve);
      break;
    case 'S007':
      cardEffectS007(player, myResolve);
      break;
    case 'S008':
      ageistBlock(true, player, uniqueCardID, '', '', true, findMatArrays(findVictim(player))[5], 'M', 35, '', myResolve);
      break;
    case 'S011':
      cardEffectS011(player, uniqueCardID, myResolve);
      break;
    case 'S012':
      cardEffectS012(player, uniqueCardID, myResolve);
      break;
    case 'S013':
      helpPowerup(player, uniqueCardID, findMatArrays(player), '137', 'GG100', myResolve);  // 137 酒
      break;
    case 'S014':
      helpPowerup(player, uniqueCardID, findMatArrays(player), '137', 'DD100', myResolve);  // 137 酒
      break;
    case 'S015':
      blockEffect(player, uniqueCardID, 'monType', 'KK', false, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S016':
      tooPersonal('S017', 'XX000', player, uniqueCardID, '', '', true, myResolve);  // S017 羅露特
      break;
    case 'S018':
      helpPowerup(player, uniqueCardID, findMatArrays(player), '138', 'MM300', myResolve);  // 138 閃念
      break;
    case 'S020':
      blockEffect(player, uniqueCardID, 'monType', 'KK', false, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S021':
      cardEffectS021(player, uniqueCardID, myResolve);
      break;
    case 'S022':
      tooPersonal('S019', 'XX000', player, uniqueCardID, '', '', true, myResolve);  // S019 柏古‧蘭巴杜
      break;
    case 'S023':
      gettingExcited('M', '', '', '', player, uniqueCardID, 'FF080', myResolve);  // thatGender, thatType, thatTeam, thatSeries, player, uniqueCardID, powerUpString
      break;
    case 'S024':
      ageistBlock(false, player, uniqueCardID, 'pos', 'sky', false, findMatArrays(findVictim(player))[5], 'M', 45, '', myResolve);
      break;
    case 'S025':
      helpPowerup(player, uniqueCardID, findMatArrays(player), '137', 'GG100', myResolve);  // 137 酒
      break;
    case 'S026':
      gettingExcited('', 'LL', '', '', player, uniqueCardID, 'DD020', myResolve);  // thatGender, thatType, thatTeam, thatSeries, player, uniqueCardID, powerUpString
      break;
    case 'S027':
      blockEffect(player, uniqueCardID, 'monType', 'DD', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S031':
      blockEffect(player, uniqueCardID, 'monType', 'DD', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S033':
      blockEffect(player, uniqueCardID, 'monType', 'KK', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S034':
      mojoLost(findMatArrays(findVictim(player))[5], 'F', true, '', 22, player, uniqueCardID, 'monClass', 'DR', true, myResolve);
      break;
    case 'S035':
      tooPersonal('S022', 'XX000', player, uniqueCardID, 'monClass', 'DR', true, myResolve);  // S022 娜娜科普
      break;
    case 'S036':
      mojoLost(findMatArrays(findVictim(player))[5], 'F', true, '', 25, player, uniqueCardID, 'monClass', 'DR', true, myResolve);
      break;
    case 'S037':
      tooPersonal('S019', 'XX000', player, uniqueCardID, 'monClass', 'DR', true, myResolve);  // S019 柏古‧蘭巴杜
      break;
    case 'S039':
      cardEffectS039(player, uniqueCardID, myResolve);
      break;
    case 'S040':
      cardEffectS040(player, uniqueCardID, myResolve);
      break;
    case 'S041':
      cardEffectS041(player, uniqueCardID, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case 'S042':
      cardEffectS042(player, uniqueCardID, myResolve);
      break;
    case 'S046':
      cardEffectS046(player, uniqueCardID, myResolve);
      break;
    case 'S047':
      cardEffectS047(player, uniqueCardID, myResolve);
      break;
    case 'S047B':
      cardEffectS047(player, uniqueCardID, myResolve);
      break;
    case 'S048':
      cardEffectS048(player, uniqueCardID, myResolve);
      break;
    case 'S049':
      cardEffectS049(player, uniqueCardID, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case 'S050':
      cardEffectS050(player, uniqueCardID, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case 'S051':
      personalAttack('顧寧特', findMatArrays(findVictim(player))[5], true, player, uniqueCardID, 'monClass', 'DR', true, myResolve);
      break;
    case 'S052':
      blockEffect(player, uniqueCardID, 'monType', 'SS', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S053':
      cardEffectS053(player, uniqueCardID, myResolve);
      break;
    case 'S054':
      helpPowerup(player, uniqueCardID, findMatArrays(player), '153', 'KK100', myResolve);  // 153 大財寶
      break;
    case 'S055':
      cardEffectS055(player, uniqueCardID, myResolve);
      break;
    case 'S056':
      cardEffectS056(findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case 'S056B':
      cardEffectS056(findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case 'S056C':
      cardEffectS056(findMatArrays(player), findPowerBracket(player), myResolve);
      break;
    case 'S057':
      shellEffect('144', player, uniqueCardID, myResolve);  // 回力刀
      break;
    case 'S057B':
      shellEffect('144', player, uniqueCardID, myResolve);  // 回力刀
      break;
    case 'S058':
      shellEffect('145', player, uniqueCardID, myResolve);  // 援助軍團
      break;
    case 'S058B':
      shellEffect('145', player, uniqueCardID, myResolve);  // 援助軍團
      break;
    case 'S061':
      cardEffectS061(player, myResolve);
      break;
    case 'S062':
      blockEffect(player, uniqueCardID, 'monType', 'DD', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S063':
      summonerAdjPU(findSummonerAdjHist(findVictim(player)), 1, -80, false, myResolve);  // i = 0: allyFlatPU; i = 1: foeFlatPU
      break;
    case 'S064':
      cardEffectS064(player, uniqueCardID, myResolve);
      break;
    case 'S065':
      helpPowerup(player, uniqueCardID, findMatArrays(player), '248', 'FF100', myResolve);  // 248 火貝
      break;
    case 'S068':
      blockEffect(player, uniqueCardID, 'monClass', 'FH', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S069':
      blockEffect(player, uniqueCardID, 'monClass', 'BU', false, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S071':
      cardEffectS071(player, uniqueCardID, myResolve);
      break;
    case 'S072':
      cardEffectS072(player, uniqueCardID, myResolve);
      break;
    case 'S073A':
      fuEffect(player, uniqueCardID, 'FF', 'WW', myResolve);
      break;
    case 'S073B':
      fuEffect(player, uniqueCardID, 'WW', 'EE', myResolve);
      break;
    case 'S073C':
      fuEffect(player, uniqueCardID, 'GG', 'FF', myResolve);
      break;
    case 'S073D':
      fuEffect(player, uniqueCardID, 'EE', 'AA', myResolve);
      break;
    case 'S073E':
      fuEffect(player, uniqueCardID, 'AA', 'MM', myResolve);
      break;
    case 'S073F':
      fuEffect(player, uniqueCardID, 'DD', 'LL', myResolve);
      break;
    case 'S073G':
      cardEffectS073G(player, uniqueCardID, myResolve);
      break;
    case 'S073H':
      fuEffect(player, uniqueCardID, 'MM', 'GG', myResolve);
      break;
    case 'S073I':
      cardEffectS073I(player, uniqueCardID, myResolve);
      break;
    case 'S074':
      cardEffectS074(player, uniqueCardID, myResolve);
      break;
    case 'S076':
      personalAttack('古列特羅姆', findMatArrays(findVictim(player))[5], false, player, uniqueCardID, 'pos', 'help', false, myResolve);
      break;
    case 'S077':
      personalAttack('古列特羅姆', findMatArrays(findVictim(player))[5], false, player, uniqueCardID, 'pos', 'sky', false, myResolve);
      break;
    case 'S078':
      personalAttack('古列特羅姆', findMatArrays(findVictim(player))[5], false, player, uniqueCardID, 'pos', 'right', false, myResolve);
      break;
    case 'S079':
      personalAttack('古列特羅姆', findMatArrays(findVictim(player))[5], false, player, uniqueCardID, 'pos', 'left', false, myResolve);
      break;
    case 'S080':
      blockEffect(player, uniqueCardID, 'monClass', 'BI', false, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S081':
      typistBlock('DD', false, player, uniqueCardID, 'pos', 'right', false, myResolve);
      break;
    case 'S084':
      tooPersonal('S090', 'XX000', player, uniqueCardID, '', '', true, myResolve);  // S090 Dr.拉柯奇
      break;
    case 'S085':
      cardEffectS085(player, uniqueCardID, myResolve);
      break;
    case 'S086':
      cardEffectS086(player, myResolve);
      break;
    case 'S087':
      helpPowerup(player, uniqueCardID, findMatArrays(player), '290', 'GG100', myResolve);  // 290 森林朋友
      break;
    case 'S088':
      cardEffectS088(player, uniqueCardID, myResolve);
      break;
    case 'S091':
      cardEffectS091(findMatArrays(findVictim(player))[5], player, uniqueCardID, myResolve);
      break;
    case 'S092':
      cardEffectS092(player, uniqueCardID, myResolve);
      break;
    case 'S093':
      mojoLost4Lv(findMatArrays(findVictim(player))[5], true, '', 3, player, uniqueCardID, 'monClass', 'DR', true, myResolve);
      break;
    case 'S094':
      mojoLost4Lv(findMatArrays(findVictim(player))[5], true, '', 4, player, uniqueCardID, 'monClass', 'DR', true, myResolve);
      break;
    case 'S095':
      cardEffectS095(player, uniqueCardID, myResolve);
      break;
    case 'S096':
      cardEffectS096(player, uniqueCardID, myResolve);
      break;
    case 'S097':
      mojoLost(findMatArrays(findVictim(player))[5], 'F', false, '', 30, player, uniqueCardID, 'monType', 'KK', true, myResolve);
      break;
    case 'S098':
      cardEffectS098(player, uniqueCardID, myResolve);
      break;
    case 'S099':
      cardEffectS099(player, uniqueCardID, myResolve);
      break;
    case 'S100':
      helpPowerup(player, uniqueCardID, findMatArrays(player), '151', 'MM100', myResolve);  // 151 油
      break;
    case 'S101':
      monFactorEffect('022', 10, findMatArrays(player), findPowerBracket(player), myResolve);  // 針龜
      break;
    case 'S102':
      ageistBlock(false, player, uniqueCardID, 'pos', 'sky', false, findMatArrays(findVictim(player))[5], 'F', '', '', myResolve);
      break;
    case 'S103':
      ageistBlock(false, player, uniqueCardID, 'pos', 'sky', false, findMatArrays(findVictim(player))[5], 'M', '', '', myResolve);
      break;
    case 'S104':
      personalAttack('古列特羅姆', findMatArrays(findVictim(player))[5], false, player, uniqueCardID, 'monClass', 'DR', false, myResolve);
      break;
    case 'S105':
      cardEffectS105(player, uniqueCardID, myResolve);
      break;
    case 'S106':
      cardEffectS106(player, uniqueCardID, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case 'S107':
      xenophobic('kageshinobu', false, player, uniqueCardID, 'pos', 'sky', false, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case 'S108':
      cardEffectS108(player, uniqueCardID, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case 'S109':
      cardEffectS109(player, uniqueCardID, findMatArrays(findVictim(player))[5], myResolve);
      break;
    case 'S111':
      personalAttack('奇拉拉', findMatArrays(findVictim(player))[5], true, player, uniqueCardID, '', '', true, myResolve);
      break;
    case 'S112':
      monFactorEffect('061', 10, findMatArrays(player), findPowerBracket(player), myResolve);  // 種子象
      break;
    case 'S114':
      blockEffect(player, uniqueCardID, 'monType', 'NN', true, myResolve);  // player, uniqueCardID, blockMode, blockedItem, recoverability
      break;
    case 'S115':
      cardEffectS115(player, uniqueCardID, myResolve);
      break;
    case 'S116':
      monLevelupEffect('051', player, uniqueCardID, findMatArrays(player), myResolve);  // 寂寞龍
      break;
    case 'S118':
      mojoLost(findMatArrays(findVictim(player))[5], 'M', false, 50, '', player, uniqueCardID, 'monType', 'FF', true, myResolve);
      break;
    case 'S119':
      tooPersonal('S096', 'MM100', player, uniqueCardID, '', '', true, myResolve); // 洛磯思三世
      break;
    case 'S500':
      cardEffectS500(findMatArrays(findVictim(player))[5], player, uniqueCardID, myResolve);
      break;
    default:
      console.log(uniqueCardID, ' has no effect.');
      myResolve();
  }
}