import { Component, OnInit, Input } from "@angular/core";
import { Ruleset, Result } from "src/app/types";
import { Location } from "@angular/common";

@Component({
  selector: "randomizer-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit {
    @Input() result: Result;
    // tslint:disable-next-line: no-input-rename
    @Input("back") goBack: () => void;

    url: string;

    constructor(private location: Location) { }

    ngOnInit() {
        const domain = "https://tro.moe/three-houses-randomizer";
        // tslint:disable-next-line: max-line-length
        const params = `?route=${this.result.input.route.id}&viable=${this.result.input.flags.withClassTrees}&unique=${this.result.input.flags.includeSpecialClasses}&seed=${this.result.input.seed}`;

        this.url = `${domain}${params}`;

        this.location.go(`./${params}`);
    }
}
