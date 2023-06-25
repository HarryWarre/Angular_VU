import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  genres: any[] = [];
  constructor(private spotifyService: SpotifyService,  private router: Router) { }

  ngOnInit() {
    this.spotifyService.getGenres().subscribe(
      data => {
        this.genres = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
