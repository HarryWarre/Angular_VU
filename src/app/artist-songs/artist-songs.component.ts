import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SpotifyService } from '../spotify.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-artist-songs',
  templateUrl: './artist-songs.component.html',
  styleUrls: ['./artist-songs.component.css']
})
export class ArtistSongsComponent implements OnInit{
  albumId!: string;
  songNames$!: Observable<string[]>;
  albumDetails$!: Observable<any>;
  songs:any[] = [];

  audio: HTMLAudioElement = new Audio();

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.albumId = params['albumid'];
      console.log(this.albumId);
  
      if (this.albumId) {
        this.albumDetails$ = this.spotifyService.getAlbumDetails(this.albumId);

        this.spotifyService.getAlbumSongs(this.albumId).subscribe(
          data => {
          this.songs = data.items;
          }
        )
      }
    });
  } 
}
