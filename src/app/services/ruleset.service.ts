import { Injectable } from "@angular/core";
import { Ruleset, Route, Flags } from "../types";

import routes from "../../assets/data/routes.json";
import characters from "../../assets/data/characters.json";

@Injectable({
  providedIn: "root"
})
export class RulesetService {
    private ruleset: Ruleset;

    constructor() {
        this.reset();
    }

    reset(){
        this.ruleset = {
            route: {
                id: 0,
                name: "Golden Deer",
                mainCharacter: 0,
                darkSeals: 4,
            },
            availableCharacters: characters.filter(x => x.availableOnRoutes.includes(0)),
            characters: [
                {
                    id: 1,
                    name: "Claude",
                    gender: "male",
                    availableOnRoutes: [
                        0
                    ],
                    uniqueClasses: [
                        2,
                        3
                    ],
                    forcedDeployOn: [
                        0,
                    ]
                }
            ],
            flags: {
                chosenCharacters: false,
                includeSpecialClasses: false,
                withClassTrees: true,
            }
        };
    }

    get rules() {
        return this.ruleset;
    }

    set rules(ruleset: Ruleset) {
        this.ruleset = this.ruleset;
    }
}
