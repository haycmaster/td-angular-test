import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { Test01Component } from "./test01/test01.component";
import { Test02Component } from "./test02/test02.component";
import { Test03Component } from "./test03/test03.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "test1", component: Test01Component },
  { path: "test2", component: Test02Component },
  { path: "test3", component: Test03Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
