import { Component, OnInit } from "@angular/core";
import { ResultService } from "src/app/services/result.service";
import { Result, Ruleset } from "src/app/types";

@Component({
  selector: "randomizer-content",
  templateUrl: "./randomizer-content.component.html",
  styleUrls: ["./randomizer-content.component.scss"]
})
export class RandomizerContentComponent implements OnInit {
    status: "rules" | "results";

    result: Result;

    constructor(private results: ResultService) { }

    ngOnInit() {
        this.status = "rules";
    }

    continue(ruleset: Ruleset) {
        this.result = this.results.getResult(ruleset);
        this.status = "results";
    }

    reset(){
        window.location.href = "./";
        this.status = "rules";
    }
}
