import { NgModule } from '@angular/core';
import { RandomizerContentComponent } from './randomizer-content/randomizer-content.component';
import { RulesetPickerComponent } from './ruleset-picker/ruleset-picker.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterComponent } from './character/character.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { ActivatedRoute } from '@angular/router';

@NgModule({
    declarations: [
      RandomizerContentComponent,
      RulesetPickerComponent,
      CharacterListComponent,
      CharacterComponent,
      ResultsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
    ],
    exports: [
        RandomizerContentComponent,
        RulesetPickerComponent,
        CharacterListComponent,
        CharacterComponent
    ]
})
export class ComponentsModule { }
