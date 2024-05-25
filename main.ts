import inquirer from "inquirer"

// enemy Data
let enemies: string[] = ["skeletion", "zombie", "warrior", "assasin"];
let maxEnemyHealth: number = 75;
let maxEnemyAttackDamage: number = 25;

// player Data
let health: number = 100;
let attackDamage: number = 50;
let numHeathPotion: number = 3;
let healthPotionHealAmount: number = 30;
let healthPotionDropChance: number = 50; //percentage

let running: boolean = true;

console.log("Welcome to the Dungeon!")

GAME: while (running){
    console.log("---------------------------------------------");
    
    let enemyHealth = Math.floor(Math.random() * maxEnemyHealth);
    let enemy: string = enemies[Math.floor(Math.random() * enemies.length)];
    console.log("\t#" + enemy + " has appeared! #\n")

    while (enemyHealth > 0) {
        console.log("\tYour HP:" + health);
        console.log("\t" + enemy + "'s HP:" + enemyHealth);

        const decision = await inquirer.prompt([
            {
                type: "list",
                name: "playerDecision",
                message: "What would you like to do?",
                choices: ["Attack!", "Drink Health Potion", "Run!"]
            }
        ])
        if (decision.playerDecision == "Attack!") {
                let damageDealt = Math.floor(Math.random() * attackDamage);
                let damageTaken = Math.floor(Math.floor(Math.random() * maxEnemyAttackDamage));
                enemyHealth -= damageDealt;
                health -= damageTaken;
                console.log("\t> You strike the " + enemy + " for " + damageDealt + " damage.");
                console.log("\t> You recieved " + damageTaken + " in retaliation!");

                if (health < 1) {
                    console.log("\t> You have taken too much damage. You are too weak to go on.");
                    break;
                }
        }
        else if (decision.playerDecision == "Drink Health Potion") {
            if (numHeathPotion > 0) {
                health += healthPotionHealAmount;
                --numHeathPotion;
            console.log("\t> You are drinking healing potion. Healing yourself for " + healthPotionHealAmount + "." +
                        "\t> You now have " + health + "HP" +
                        "\t> You now have " + numHeathPotion + " number of healing potions left.\n");
            }
            else {
                console.log("\t> You have no Health Potion left! Defeat the enemies for a chance to get one.\n");
            }  
        }
        else if (decision.playerDecision == "Run!") {
            console.log("You have run from the" + enemy + "!");
            continue GAME;
        }
        else {
            console.log("\tInvalid command");
        }
    }
    if (health < 1) {
        console.log("You limp out of the dungeon, weak from battle.");
        break;
    }
    console.log("---------------------------------------------");
    console.log("# " + enemy + " was defeated! #");
    console.log("# You have " + health + "HP left. #");
    if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
        ++numHeathPotion
        console.log("# The" + enemy + " dropped a Health Potion #");
        console.log("# You have now " + numHeathPotion + " Health Potions #");
    }
    console.log("---------------------------------------------");
    
    const decision2 = await inquirer.prompt([
        {
            type: "list",
            name: "playerDecision2",
            message: "What would you like to do?",
            choices: ["Continue fighting?", "Exit Dungeon?"]
        }
    ])
    while (decision2.playerDecision2 != "Continue fighting?" && decision2.playerDecision2 != "Exit Dungeon?") {
        console.log("Invalid command");
        decision2.playerDecision2
    }
    if (decision2.playerDecision2 == "Continue fighting?") {
        console.log("You continue on your adventure!");
    }
    else if (decision2.playerDecision2 == "Exit Dungeon?") {
        console.log("You exit the Dungeon, successfull from your adventures");
        break;
    }
}
console.log("#################");
console.log("# THANKS FOR PLAYING");
console.log("#################");