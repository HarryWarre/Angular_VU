import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { __param } from 'tslib';
import { SpotifyService } from '../spotify.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers:[SpotifyService],
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  artists: Array<any> = []
  search!: string
  constructor(private spotifyService: SpotifyService, private router: Router) { this.loadData() }
  
  loadData() {
    this.spotifyService.getAllArtists(this.search).subscribe(
      data => this.artists = data.artists.items
    )
  }
  onArtistClick(artistId: string) {
    this.router.navigate(['/artist', artistId]);
  }
}
