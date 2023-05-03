import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }

  getQuery( query: string ) {

    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQDc8iDDf0W6CH8r2yRwB06E07FoiJ49VQD9P1fqjvf-CDB02kSO5wka8cfg5tlyjdyWlaQVytcmZkQCN_-Ier-p5wpcxjYMs3pFJcdkzFrK_gCdW3-T'
    });
  
    return this.http.get(url, { headers });
   
  }

 
  getNewReleases() {
  
    return this.getQuery('browse/new-releases?limit=5')
              .pipe( map( data => data['albums'].items ));
              
            
  }

  getArtistas( termino: string ) {

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
                .pipe( map( data => data['artists'].items));

  }

  getArtista( id: string ) {

    return this.getQuery(`artists/${ id }`);
                // .pipe( map( data => data['artists'].items));

  }

  getTopTracks( id: string ) {

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks']));

  }

}
