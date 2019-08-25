import { Injectable } from "@angular/core";
import { Ruleset, Result, Character, CharacterClassResult,
         BeginnerClass, IntermediateClass, AdvancedClass, MasterClass, Route } from "../types";

import {Md5} from "ts-md5";
import seedrandom from "seedrandom";

import characters from "../../assets/data/characters.json";
import classes from "../../assets/data/classes.json";
import routes from "../../assets/data/routes.json";

@Injectable({
  providedIn: "root"
})
export class ResultService {

    constructor() { }

    getResult(ruleset: Ruleset) {
        if (!ruleset.seed) {
            ruleset.seed = Md5.hashStr(JSON.stringify(ruleset) + new Date().getDate()).toString();
        }

        const existingCharacters = [...characters.filter(x => x.availableOnRoutes.includes(ruleset.route.id))];
        const existingClasses = {
            ...classes
        };

        let randomizedCharacters: Character[] = [];

        const rng = seedrandom(ruleset.seed);

        if (ruleset.flags.chosenCharacters) {
            if (ruleset.characters.length > 10) {
                randomizedCharacters = ruleset.characters.slice(0, 9);
            }
        }
        else {
            const forcedDeploy = characters.filter(x => x.forcedDeployOn.includes(ruleset.route.id));
            randomizedCharacters.push(...forcedDeploy);

            for (let i = 0; i < 10 - forcedDeploy.length; i++){
                if (existingCharacters.length > 0) {
                    const index = Math.floor(rng() * existingCharacters.length);

                    if (randomizedCharacters.find(x => x.id === existingCharacters[index].id)){
                        existingCharacters.splice(index, 1);
                        i--;
                        continue;
                    }
                    else{
                        const char = existingCharacters.splice(index, 1);
                        randomizedCharacters.push(...char);
                    }

                }
            }
        }

        const res: Result = {
            input: ruleset,
            characters: [],
        };

        const usedSeals = 0;

        for (const character of randomizedCharacters){
            const characterClass: CharacterClassResult = {
                character,
                classes: {}
            };

            if (ruleset.flags.includeSpecialClasses){
                // Check if character has available unique classes OR dancer exists
                if (character.uniqueClasses.length > 0){
                    const availableUnique = [
                        ...character.uniqueClasses.map(x => existingClasses.unique.find(y => y.id === x)),
                    ];

                    const index = Math.floor(rng() * availableUnique.length);
                    const unique = availableUnique.splice(index, 1);
                    if (unique[0]){
                        characterClass.classes.unique = unique[0] || null;

                        const existingIndex = existingClasses.unique.findIndex(x => x.id === unique[0].id);
                        existingClasses.unique.splice(existingIndex, 1);
                    }
                }
            }

            if (ruleset.flags.withClassTrees){
                const beginner = existingClasses.beginner.filter(x => this.characterCanGetClass(characterClass, x, ruleset.route))
                                                                [Math.floor(rng() * existingClasses.beginner.length)];
                characterClass.classes.beginner = beginner;


                const viableIntermediate = existingClasses.intermediate
                    .filter(x => beginner.viableUpgrades.includes(x.id) && this.characterCanGetClass(characterClass, x, ruleset.route));
                const intermediate = viableIntermediate[Math.floor(rng() * viableIntermediate.length)];
                characterClass.classes.intermediate = intermediate;


                const viableAdvanced = existingClasses.advanced
                    .filter(x => intermediate.viableUpgrades.includes(x.id) && this.characterCanGetClass(characterClass, x, ruleset.route));
                const advanced = viableAdvanced[Math.floor(rng() * viableAdvanced.length)];
                characterClass.classes.advanced = advanced;

                const viableMaster = existingClasses.master
                    .filter(x => advanced.viableUpgrades.includes(x.id) && this.characterCanGetClass(characterClass, x, ruleset.route));
                const master = viableMaster[Math.floor(rng() * viableMaster.length)];
                characterClass.classes.master = master;
            }
            else{
                let filtered = existingClasses.beginner.filter(x => this.characterCanGetClass(characterClass, x, ruleset.route));

                characterClass.classes.beginner = filtered[Math.floor(rng() * filtered.length)];

                filtered = existingClasses.intermediate.filter(x => this.characterCanGetClass(characterClass, x, ruleset.route));
                characterClass.classes.intermediate = filtered[Math.floor(rng() * filtered.length)];

                filtered = existingClasses.advanced.filter(x => this.characterCanGetClass(characterClass, x, ruleset.route));
                characterClass.classes.advanced = filtered[Math.floor(rng() * filtered.length)];

                filtered = existingClasses.master.filter(x => this.characterCanGetClass(characterClass, x, ruleset.route));
                characterClass.classes.master = filtered[Math.floor(rng() * filtered.length)];
            }

            res.characters.push(characterClass);
        }

        // This is a mess im tired dont look at this part
        const dancer = existingClasses.unique.find(x => x.id === 0);

        const charactersWithoutUnique = res.characters.filter(x => !x.classes.unique);
        const randomCharacter = charactersWithoutUnique[Math.floor(rng() * charactersWithoutUnique.length)];

        for (const i in charactersWithoutUnique){
            if (charactersWithoutUnique[i]){
                if (charactersWithoutUnique[i].character.id === randomCharacter.character.id){
                    charactersWithoutUnique[i].classes.unique = dancer;
                }
            }
        }


        return res;
    }

    private characterCanGetClass(char: CharacterClassResult, newClass: BeginnerClass | IntermediateClass | AdvancedClass | MasterClass,
                                 route: Route){
        for (const requirement of newClass.requires){
            switch (requirement){
                case "female":
                    if (char.character.gender !== "female"){
                        return false;
                    }
                    continue;
                case "male":
                    if (char.character.gender !== "male"){
                        return false;
                    }
                    continue;
                case "darkmage":
                    if (route.usedSeals === route.darkSeals){
                        return false;
                    }
                    continue;
                case "darkseal":
                    if (route.usedSeals === route.darkSeals){
                        return false;
                    }
                    if (char.classes.intermediate && char.classes.intermediate.id !== 9){
                        return false;
                    }
                    continue;
                default:
                    continue;
            }
        }
        return true;
    }
}
