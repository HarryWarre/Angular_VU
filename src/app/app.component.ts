import { Component } from '@angular/core';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar/>
    <div class="p-5 bg-dark">
      <router-outlet></router-outlet>
    </div>

  `
})
export class AppComponent {
  artists: Array<any> = []
  search!: string
  constructor(private spotifyService: SpotifyService) { this.loadData() }

  loadData() {
    this.spotifyService.getAllArtists(this.search).subscribe(
      data => this.artists = data.artists.items
    )
  }
}
