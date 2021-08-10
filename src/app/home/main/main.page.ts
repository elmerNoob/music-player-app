import { HttpClient } from '@angular/common/http';
import { Component, OnInit , ViewChild, ElementRef} from '@angular/core';
import { IonRange } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Howl } from 'howler';
import { Observable } from 'rxjs';
import { Track } from './../../models/track.interface';
import { PlayerModalPage } from './../player-modal/player-modal.page';


// export class Tracks {
//   public id: number;
//   public artist: String;
//   public title: String;
//   public thumb: String;
//   public path: String;
// }
// let URI = 'http://107.191.98.73/fetch_audio/';

// declare var playSample;
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
    public http: HttpClient,
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
  // playlist:Track[] = [
  //   {
  //     id: 1,
  //     artist: 'Força Suprema',
  //     title: 'Deixa O Clima Rolar',
  //     thumb: 'assets/tracks/albuns/Forca_Suprema/cover.jpg',
  //     path:'assets/tracks/albuns/Forca_Suprema/05_Deixa_O_Clima_Rolar.mp3'
  //   },
  //   {
  //     id: 2,
  //     artist: 'NGA',
  //     title: 'Quero o mundo',
  //     thumb: 'assets/tracks/albuns/NGA_KING/NGA-KING-DOWNLOAD.jpg',
  //     path:'assets/tracks/albuns/NGA_KING/12_Quero_o_mundo_ft_SP_Prod.mp3'
  //   },
  //   {
  //     id: 3,
  //     artist: 'Prodígio',
  //     title: 'O Melhor',
  //     thumb: 'assets/tracks/albuns/Prodígio_ProEvo2/cover.png',
  //     path:'assets/tracks/albuns/Prodígio_ProEvo2/06_O_Melhor.mp3'
  //   }
  // ];
  track : any;
  isReturn: boolean = false;
  // activeTrack : Track = null;
  // player: Howl = null;
  // isPlaying = false;
  // progress = 0;
  // @ViewChild('range', { static: false }) range: IonRange;
  //tracks: Track[];

  //myArray = [];
  //obj = {};

  
  ngOnInit():void {
    //this.getTracks();
  }
  // start(track: Track) {
    
  //   if(this.player)
  //     this.player.stop();

  //     this.player = new Howl({
  //       src: [track.path],
  //       html5: true,  
  //       onplay: () => {
  //         // this.presentModal(track);
  //         this.isPlaying = true;
  //         this.activeTrack = track;
  //         this.updateProgress();
  //       },
  //       onend: () => {
  //         console.log('finished')
  //       }
  //   });

  //   this.player.play();
  //   // playSample(track.path)

  // }

  // togglePlayer(pause){

  //   this.isPlaying = !pause;
  //   if(pause)
  //     this.player.pause();
  //   else
  //     this.player.play();

  // }

  // next(){
  //   let index = this.playlist.indexOf(this.activeTrack);
  //   if(index != this.playlist.length - 1)
  //     this.start(this.playlist[index + 1]);
  //   else
  //     this.start(this.playlist[0]);
  // }

  // prev(){
  //   let index = this.playlist.indexOf(this.activeTrack);
  //   if(index > 0)
  //     this.start(this.playlist[index - 1]);
  //   else
  //     this.start(this.playlist[this.playlist.length - 1]);
  // }

  // seek(){
  //   let newValue = +this.range;
  //   let duration = this.player.duration();
  //   this.player.seek(duration * (newValue / 100));
  // }

  // updateProgress(){
  //   let seek = this.player.seek();
  //   this.progress = ((seek / this.player.duration()) * 100 ||0);
    
  //   setTimeout(()=>{
  //     this.updateProgress();
      
  //   },1000);
  // }

  // getTracks() {
    
  //   this.httpClient.get<any>(`${URI}listdir.php`).subscribe(
  //     response => {
  //       response.forEach((element, index) => {
  //         let i = 0;

  //         this.myArray.push({
  //           id: index,
  //           artist: element.name,
  //           title: element.dir[i].song,
  //           thumb: `${URI}${element.name}/${element.dir[i+1].file}`,
  //           path: `${URI}${element.name}/${element.dir[i].song}`
  //         })
  //         // this.myArray['id'] = index;
  //         // this.myArray['artist'] = element.name;
  //         // this.myArray['title'] = element.dir[i].song;
  //         // this.myArray['thumb'] = `${URI}${element.name}/${element.dir[i+1].file}`;
  //         // this.myArray['path'] = `${URI}${element.name}/${element.dir[i].song}`;
  //         i++;
  //       });
  //     }
  //   );
  //   this.myArray.forEach(item => this.obj[item.id] = item.artist);

  //   // console.log(this.obj);
  //   console.log(this.myArray);  
  // }
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
        'progress': this.progress
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
    });

    return await modal.present();
  }
}