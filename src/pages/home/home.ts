import { Component } from '@angular/core';
import { App, NavParams } from 'ionic-angular';
import { TvmazeProvider } from '../../providers/tvmaze';
import { Show } from '../../models/show';
import { ShowPage } from '../show/show';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  search:string = "";
  listShows: Show[] = [];

  constructor(private app: App, private tvmaze: TvmazeProvider,
    private navParams: NavParams) {
    tvmaze.listShows.subscribe(
      (data) => {
        if (navParams.data.type == "likes") {
          let list = data;
          if(this.search.trim()!="")
            list = data.filter( elem => elem.like && elem.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
          
          if (list.filter(elem => elem.like).length == 0)
            this.listShows.splice(0, 1);
          else
            this.listShows = list.filter(elem => elem.like);
        }
        else{
          if(this.search.trim()!="")
            return;
          this.listShows = data;
        }
      }
    )
  }
  
  identify(index, club) {
    return club.id;
  }
  goToDetails(idShow: number) {
    this.app.getRootNav().push(ShowPage, { id: idShow });
  }

  ilike(show: Show) {
    show.like = show.like != true ? true : false;
    this.tvmaze.modLike(show); 
  }

  onInputSearch(event){
    let list
    if(this.navParams.data == "likes"){
      list = this.tvmaze.listShows.getValue()
          .filter( elem => elem.like && elem.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
        }
    else
      list= this.tvmaze.listShows.getValue().filter( elem => elem.name.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
    
    if(list.length>0)
      this.listShows = list; 
    else
      this.listShows.splice(0,this.listShows.length);
  }

  onCancelSearch(event){
    this.listShows = this.tvmaze.listShows.getValue();
  }

}
