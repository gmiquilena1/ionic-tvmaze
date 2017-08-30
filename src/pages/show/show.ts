import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TvmazeProvider } from '../../providers/tvmaze';
import { Show } from '../../models/show';

@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {

  show:Show;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tvmaze: TvmazeProvider) {
    
    this.loadShow();
  }

  loadShow(){
    let id = this.navParams.get('id');
    this.show = this.tvmaze.getShowById(id);
  }

  ilike() {
    this.show.like = this.show.like != true ? true : false;
    this.tvmaze.modLike(this.show); 
  }

}
