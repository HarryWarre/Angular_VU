import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artist: any;
  albums: any[] = [];
  topSongs: any[] = [];
  songs:any[] = [];

  constructor(private route: ActivatedRoute, private spotifyService: SpotifyService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let artistId = params['id'];

      this.spotifyService.getArtists(artistId).subscribe(
        data => {
          this.artist = data;
        },
        error => {
          console.log(error);
        }
      );
      
      this.spotifyService.getAlbums(artistId).subscribe(
        data => {
          this.albums = data['items'];
        },
        error => {
          console.log(error);
        }
        );

      this.spotifyService.getTopSongs(artistId).subscribe(
        data => {
          this.topSongs = data.tracks;
          console.log(this.topSongs);
        },
        error => {
          console.log(error);
        }
      );    
    }); 
  }
  onAlbumClick(albumId: string) {
    const artistId = this.artist.id;
    this.router.navigate(['/artist/', artistId, albumId]);
    console.log(albumId);
  }
  
}
