import { HttpClient } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';
import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { IonRange } from '@ionic/angular';
import { ModalController, Platform } from '@ionic/angular';
import { Howl } from 'howler';
import { Observable } from 'rxjs';
import { Track } from './../../models/track.interface';
import { PlayerModalPage } from './../player-modal/player-modal.page';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  public tracks: any;
  public searchTerm: string;

  constructor(
    public modalController: ModalController,
    private elementRef: ElementRef,
    public http: HttpClient
  ) { 
    this.getTracks();
  }

  getTracks(){
    let url = 'http://107.191.98.73/fetch_audio/index.php';
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
        this.tracks = result;
    });
  }

  slideOptsThumbs = {
    spaceBetween: 0,
    slidesPerView: 1.50,
  };
  category = [
    { id: 1,
      name: 'Rap'
    },
    {
      id: 2,
      name: 'R&B'
    },
    {
      id: 3,
      name: 'Indie'
    },
    {
      id: 4,
      name: 'Rock'
    },
    {
      id: 4,
      name: 'Hip Hop'
    },
    { 
      id: 5,
      name: 'Blues'
    }
  ];

  track : any;
  counter: number = 1;
  isReturn: boolean = false;

  ngOnInit():void {
  }

  somethingsPlaying = false;
  fromModal = null;
  progress = 0;

  async presentModal(track: Track) {
    if (this.fromModal == null) {
      this.fromModal = null;
    } else {
      this.fromModal = this.fromModal;
    }
    
    const modal = await this.modalController.create({
      component: PlayerModalPage,
      componentProps: {
        'track': track,
        'playlist': this.tracks,
        'player': this.fromModal,
        'progress': this.progress,
        'playing': this.somethingsPlaying
      }
    });

    modal.onDidDismiss()
      .then((data) => {
        // const user = data['data']; // Here's your selected user!
        this.isReturn = true;
        this.track = data['data'].track;
        this.somethingsPlaying = data['data'].trackPlaying;
        this.fromModal = data['data'].play;
        this.progress = data['data'].prog;
        this.counter = this.counter + 1;
        console.log(this.progress);
        console.log(this.somethingsPlaying);
        console.log(this.track);
    });

    return await modal.present();
  }
}