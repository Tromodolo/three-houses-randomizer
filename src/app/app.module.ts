import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ComponentsModule } from "./components/components.module";
import { CommonModule } from "@angular/common";
import { RulesetService } from "./services/ruleset.service";
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
    { path: "**", component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    CommonModule,
    RouterModule.forRoot(
        appRoutes,
    )
  ],
  providers: [
      RulesetService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
