import { Component, OnInit, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RulesetService } from "src/app/services/ruleset.service";
import { Ruleset, Route, Character } from "src/app/types";

import routes from "../../../assets/data/routes.json";
import characters from "../../../assets/data/characters.json";

@Component({
  selector: "ruleset-picker",
  templateUrl: "./ruleset-picker.component.html",
  styleUrls: ["./ruleset-picker.component.scss"]
})
export class RulesetPickerComponent implements OnInit {
    @Output() continuePressed = new EventEmitter();

    routes: Route[];
    characters: Character[];
    ruleset: Ruleset;

    constructor(private rulesetService: RulesetService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.ruleset = this.rulesetService.rules;

        this.routes = routes;
        this.characters = characters;
        this.route.queryParams.subscribe((params) => {
            if (params.route && params.viable && params.unique && params.seed){
                this.ruleset.route = routes.find(x => x.id === Number(params.route));
                this.ruleset.flags.withClassTrees = (params.viable === "true");
                this.ruleset.flags.includeSpecialClasses = (params.unique === "true");
                this.ruleset.seed = params.seed;

                this.continue();
            }
            else{
                this.ruleset.route = routes.find(x => x.id === Number(params.route || 0));
                this.ruleset.flags.withClassTrees = (params.viable === "true");
                this.ruleset.flags.includeSpecialClasses = (params.unique === "true");
                this.ruleset.seed = params.seed;
            }
        });
    }

    compareRoutes(a: Route, b: Route){
        if (!a || !b){
            return false;
        }
        return a.id === b.id;
    }

    updateRuleset() {
        this.rulesetService.rules = this.ruleset;
    }

    continue() {
        this.continuePressed.emit(this.ruleset);
    }
}
