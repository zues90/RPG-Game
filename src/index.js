let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const Weapons = [
	{
		name: "stick",
		power: 5,
	},
	{
		name: "dagger",
		power: 30,
	},
	{
		name: "claw hammer",
		poer: 50,
	},
	{
		name: "sword",
		power: 100,
	},
];

const monsters = [
	{
		name: "slime",
		level: 2,
		health: 15,
	},
	{
		name: "beast",
		level: 8,
		health: 60,
	},
	{
		name: "dragon",
		level: 20,
		health: 300,
	},
];

const locations = [
	{
		name: "town square",
		"button text": ["Go to store", "Go to cave", "Fight dragon"],
		"button function": [goStore, goCave, fightDragon],
		text: "You are in town square. You see a sign that says store.",
	},
	{
		name: "store",
		"button text": [
			"Buy 10 health (10 gold)",
			"Buy Weapon (30 gold)",
			"Go to town square",
		],
		"button function": [buyHealth, buyWeapon, goTown],
		text: "You enter the store.",
	},
	{
		name: "cave",
		"button text": ["Fight slime", "Fight beast", "Go to town square"],
		"button function": [fightSlime, fightBeast, goTown],
		text: "You enter the cave. You see some monsters.",
	},
	{
		name: "fight",
		"button text": ["Attack", "Doge", "Run"],
		"button function": [attack, doge, goTown],
		text: "You are fighting a monster.",
	},
	{
		name: "kill monster",
		"button text": [
			"Go to town square",
			"Go to town square",
			"Go to town square",
		],
		"button function": [goTown, goTown, goTown],
		text: `The monster screams "Arg!" as it dies. You gain experiance points and find gold.`,
	},
	{
		name: "lose",
		"button text": ["Replay", "Replay", "Replay"],
		"button function": [restart, restart, restart],
		text: "You die.",
	},
	{
		name: "win",
		"button text": ["Replay", "Replay", "Replay"],
		"button function": [restart, restart, restart],
		text: "You defete the dragon! YOU WIN THE GAME.",
	},
];

const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");

const text = document.getElementById("text");
const xpText = document.getElementById("xpText");
const healthText = document.getElementById("healthText");
const goldText = document.getElementById("goldText");
const monsterStats = document.getElementById("monsterStats");
const monsterNameText = document.getElementById("monsterName");
const monsterHealthText = document.getElementById("monsterHealth");

// initialize butons

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
	monsterStats.style.display = "none";

	button1.innerText = location["button text"][0];
	button2.innerText = location["button text"][1];
	button3.innerText = location["button text"][2];

	button1.onclick = location["button function"][0];
	button2.onclick = location["button function"][1];
	button3.onclick = location["button function"][2];

	text.innerText = location.text;
}

function goTown() {
	update(locations[0]);
}

function goStore() {
	update(locations[1]);
}

function goCave() {
	update(locations[2]);
}

function buyHealth() {
	if (gold >= 10) {
		gold -= 10;
		health += 10;
		goldText.innerText = gold;
		healthText.innerText = health;
	} else {
		text.innerText = "You do not have enough gold to buy health";
	}
}

function buyWeapon() {
	if (currentWeapon < Weapons.length - 1) {
		if (gold >= 30) {
			gold -= 30;
			currentWeapon++;
			goldText.innerText = gold;
			let newWeapon = Weapons[currentWeapon].name;
			text.innerText = "You have a " + newWeapon + ".";
			inventory.push(newWeapon);
			text.innerText += "In your inventory you have: " + inventory;
		} else {
			text.innerText = "You do not have enough gold to weapn";
		}
	} else {
		text.innerText = "You already have most powerfull weapn";
		button2.innerText = "Sell weapon for 15 gold";
		button2.onclick = sellWeapon;
	}
}

function sellWeapon() {
	if (inventory.length > 1) {
		gold += 15;
		goldText.innerText = gold;
		let currentWeapon = inventory.shift();
		text.innerText = "You sold a " + currentWeapon + ".";
		text.innerText += "In your inventory you have: " + inventory;
	} else {
		text.innerText = "Don't sell your only weapon.";
	}
}
function fightSlime() {
	fighting = 0;
	goFight();
}
function fightBeast() {
	fighting = 1;
	goFight();
}
function fightDragon() {
	fighting = 2;
	goFight();
}

function goFight() {
	update(locations[3]);
	monsterHealth = monsters[fighting].health;
	monsterStats.style.display = "block";
	monsterNameText.innerText = monsters[fighting].name;
	monsterHealthText.innerText = monsters[fighting].health;
}
function attack() {
	text.innerText = "The " + monsters[fighting].name + ".";
	text.innerText +=
		" You attack it with your " + Weapons[currentWeapon].name + ".";
	health -= monsters[fighting].level;
	monsterHealth -=
		Weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
	healthText.innerText = health;
	monsterHealthText.innerText = monsterHealth;
	if (health <= 0) {
		lose();
	} else if (monsterHealth <= 0) {
		fighting === 2 ? winGame() : defetMonster();
	}
}
function doge() {
	text.innerText = "You doge the attack from the " + monsters[fighting].name;
}

function defetMonster() {
	gold += Math.floor(Math.random() * 6.7);
	xp += monsters[fighting].level;
	goldText.innerText = gold;
	xpText.innerText = xp;
	update(locations[4]);
}

function lose() {
	update(locations[5]);
}
function winGame() {
	update(locations[6]);
}
function restart() {
	xp = 0;
	health = 100;
	gold = 50;
	currentWeapon = 0;
	inventory = ["stick"];
	goldText.innerText = gold;
	healthText.innerText = health;
	xpText.innerText = xp;
	goTown();
}
