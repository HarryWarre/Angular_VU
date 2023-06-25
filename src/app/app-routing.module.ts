import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistSongsComponent } from './artist-songs/artist-songs.component';
import { ArtistComponent } from './artist/artist.component';
import { CategoriesComponent } from './categories/categories.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:"", component:SearchComponent},
  {path: "artist/:id", component: ArtistComponent},
  {path:"categories", component: CategoriesComponent},
  {path:"artist/:id/:albumid", component: ArtistSongsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
