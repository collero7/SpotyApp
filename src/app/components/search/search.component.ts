import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  artistas: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor(private spotify: SpotifyService) {
    this.error = false;
  }

  ngOnInit(): void {
  }

  buscar(termino: string) {
    if (termino) {
      this.loading = true;
    } else {
      this.artistas = [];
    }

    this.spotify.obtenerToken()
      .subscribe((data: any) => {
        this.spotify.setToken(data.access_token);
        this.spotify.getArtistas(termino)
          .subscribe((data: any) => {
            console.log(data);
            this.artistas = data;
            this.loading = false;
          }, (errorServicio) => {
            this.error = termino ? true : false;
            this.loading = false;
            this.mensajeError = errorServicio.error.error.message;
          });
      });
  }

}
