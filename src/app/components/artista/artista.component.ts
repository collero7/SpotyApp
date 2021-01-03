import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html'
})
export class ArtistaComponent implements OnInit {

  artista: any = {};
  topTracks: any[] = [];
  loading: boolean;

  constructor(private router: ActivatedRoute,
    private spotify: SpotifyService) {

    this.loading = true;

    this.router.params.subscribe(params => {
      console.log(params.id);
      this.getTopTracks(params.id);
      this.getArtista(params.id);
    })

  }

  ngOnInit(): void {
  }

  getArtista(id: string) {

    this.spotify.obtenerToken()
      .subscribe((data: any) => {
        this.spotify.setToken(data.access_token);
        this.spotify.getArtista(id)
          .subscribe(artista => {
            this.artista = artista;
          });
      });
  }

  getTopTracks(id: string) {

    this.spotify.obtenerToken()
      .subscribe((data: any) => {
        this.spotify.setToken(data.access_token);
        this.spotify.getTopTracks(id)
          .subscribe(topTracks => {
            this.topTracks = topTracks;
            this.loading = false;
          });
      });
  }

}
