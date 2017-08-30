import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { Show } from '../models/show';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class TvmazeProvider {

  public listShows = new BehaviorSubject<Show[]>([]);

  constructor(private http: Http, private storage:Storage) { 
    this.getAllShows().subscribe(
      (data) => this.fetchAllShows(data),
      (error) => console.log(error)
    )
  }

  //http methods
  getAllShows(): Observable<Show[]> {
    return this.http.get('http://api.tvmaze.com/shows')
    .map(
      (data) => data.json(),
      (error) => console.log(error)
    )
  }

  getShowById(id): Show {
    return this.listShows.getValue().find( elem => elem.id == id);
  }

  //storage methods
  fetchAllShows(listShows: Show[]) {
    this.storage.get('LikeShows').then((val) => {
      let likeShows: Show[] = JSON.parse(val);

      listShows = listShows.sort(
        (a, b) => {
          if (a.name > b.name)
            return 1;

          if (a.name < b.name)
            return -1;

          return 0;
        }
      );

      if (likeShows == null) {
        this.listShows.next(listShows);
        return;
      }

      for (let like of likeShows) {
        let show = listShows.find(show => show.id == like.id);
        if(show!=null)
          show.like = like.like;
      }

      listShows.forEach((elem) => {
        elem.rating.average /= 2;
      })

      this.listShows.next(listShows);

    }).catch(error => {
      console.log(error);
    });

  }

  modLike(show:Show){
    let listAux = this.listShows.getValue();
    let auxShow = listAux.find(elem => elem.id == show.id)
    auxShow.like = show.like;
    this.listShows.next(listAux);
    this.storage.set('LikeShows', JSON.stringify(listAux));
  }

}
