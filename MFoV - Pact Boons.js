var iFileName = "Warlock - Pact Boons [MFoV].js";
RequiredSheetVersion(12.999);

SourceList["MFoV:PB"] = {
	name : "Middle Finger of Vecna: Pact Boons",
	abbreviation : "MFoV:PB",
	group : "Middle Finger of Vecna",
	url : "http://mfov.magehandpress.com/2015/07/pact-boons.html",
	date : "2015/06/21"
};

//New Pact Boons:
var AddWarlockPactBoon = function(boonName, boonObj) {
	var warInv = ClassList.warlock.features["pact boon"];
	if (!warInv || (warInv.choices.indexOf(boonName) !== -1 && warInv[boonName.toLowerCase()].source && boonObj.source && warInv[boonName.toLowerCase()].source.toSource() === boonObj.source.toSource())) return; // the exact same thing is being added again, so skip it
	var useName = boonName;
	var suffix = 1;
	while (warInv.choices.indexOf(useName) !== -1) {
		suffix += 1;
		useName = boonName + " [" + suffix + "]";
	};
	warInv.choices.push(useName);
	warInv[useName.toLowerCase()] = boonObj;
};
AddWarlockPactBoon("Pact of the Bone", {
    name : "Pact of the Bone",
    source : ["MFoV: PB", 0],
    description : "\n   " + "I can cast Animate Dead once without expending a spell slot or components (PHB 212)" + "\n   " + "When I cast it this way I can animate 1 corpse or reassert control over 1 creature" + "\n   " + "Undead animated with this ability have half their normal hit point maximum" + "\n   " + "After using this ability, I must take a long rest before I can use it again",
    spellcastingBonus : {
        name : "Pact of the Bone",
        spells : ["animate dead"],
        selection : ["animate dead"],
        oncelr : true,
    }
});
AddWarlockPactBoon("Pact of the Flame", {
    name : "Pact of the Flame",
    source : ["MFoV: PB", 0],
    description : "\n   " + "When I cast a damaging cantrip, I can empower it with additional fire damage" + "\n   " + "As a bonus action, I sacrifice a number of hit points up to half my level (max 5)" + "\n   " + "When I do so, the cantrip deals extra fire damage equal to the hit points sacrificed" + "\n   " + "Hit points sacrificed for this ability cannot be regained with magic",
    action : ["bonus action", ""],
});
AddWarlockPactBoon("Pact of the Key", {
    name : "Pact of the Key",
    source : ["MfoV: PB", 0],
    description : "\n   " + "As an action on my turn, I can teleport a distance up to half my movement speed" + "\n   " + "If I teleport into an occupied space, I take force damage equal to the distance traveled" + "\n   " + "I am then shunted to the nearest unoccupied space",
    action : ["action", ""],
});

AddWarlockInvocation("The Dead Walk (prereq: Pact of the Bone, Warlock level: 5)", {
    name : "The Dead Walk",
    source : ["MFoV: PB", 0],
    description : "\n   " + "When casting Animate Dead with my pact boon, each creature gains the following benefits:" + "\n   " + "◆ The creature's hit point maximum equals its normal maximum, plus my warlock level" + "\n   " + "◆ The creature adds my proficiency bonus to its weapon attack rolls",
    prereqeval : "classes.known.warlock.level >= 5 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the bone') !== -1"
});

AddWarlockInvocation("Crown of the Lich Lord (prereq: Pact of the Bone, Warlock level: 12)", {
    name : "Crown of the Lich Lord",
    source : ["MFoV: PB", 0],
    description : "\n   " + "When casting Animate Dead with my pact boon, I can animate or control 3 creatures" + "\n   " + "Additionally, each undead under my control deals an extra 1d6 poison damage",
    prereqeval : "classes.known.warlock.level >= 12 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the bone') !== -1"
});

AddWarlockInvocation("Hellfire (prereq: Pact of the Flame)", {
    name : "Hellfire",
    source : ["MFoV: PB", 0],
    description : "\n   " + "When sacrificing HP to empower my cantrips, I can also change the base damage to fire" + "\n   " + "When I do so, I ignore fire resistance and treat immunity as resistance",
    prereqeval : "What('Class Features Remember').indexOf('warlock,pact boon,pact of the flame') !== -1"
});

AddWarlockInvocation("Baator Blast (prereq: Pact of the Flame, Warlock level: 12)", {
    name: "Baator Blast",
    source : ["MFoV: PB",0],
    description : "\n   " + "When I empower a cantrip, I can instead deal damage equal to twice the HP sacrificed" + "\n   " + "After using this feature, I can't use it again until after a short or long rest",
    usages : 1,
    recovery : "short rest",
    action : ["bonus action", ""],
    prereqeval : "classes.known.warlock.level >= 12 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the flame') !== -1"
});

AddWarlockInvocation("Flee the Scene (prereq: Pact of the Key, Warlock level: 5)", {
    name : "Flee the Scene",
    source : ["MFoV: PB", 0],
    description : "\n   " + "When I teleport with my pact boon, an illusory double appears where I was standing" + "\n   " + "◆ The double disappears at the beginning of my next turn, or when it takes damage" + "\n   " + "◆ The double cannot speak, gesture, or move from the space it originated in" + "\n   " + "Additionally, my teleport range increases by an amount equal to half my speed",
    prereqeval : "classes.known.warlock.level >= 5 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the key') !== -1"
});

AddWarlockInvocation("Hasty Departure (prereq: Pact of the Key, Warlock level: 12)", {
    name : "Hasty Departure",
    source : ["MFoV: PB", 0],
    description : "\n   " + "I can choose to teleport as a bonus action, rather than an action, on my turn" + "\n   " + "I can use this feature a number of times equal to my Charisma modifier (min. 1)" + "\n   " + "I can continue to teleport as an action, and regain expended uses after a long rest" + "\n   " + "Additionally, my teleport range increases by an amount equal to half my speed",
    usages : "Cha mod per ",
    usagescalc : "event.value = Math.max(1, tDoc.getField('Cha Mod').value);",
    recovery : "long rest",
    action : ["bonus action", ""],
    prereqeval : "classes.known.warlock.level >= 12 && What('Class Features Remember').indexOf('warlock,pact boon,pact of the key') !== -1"
});