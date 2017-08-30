import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  param1 = { type: "all"}
  param2 = { type: "likes"};
  tab1Root = HomePage;
  tab2Root = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
