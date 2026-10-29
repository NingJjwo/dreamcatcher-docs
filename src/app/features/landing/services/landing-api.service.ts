import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '../../../../environments/environment';

export interface Member {
  readonly id: number;
  readonly stageName: string;
  readonly realName: string;
  readonly nationality: string;
  readonly loreConcept: string;
  readonly imageUrl: string;
  readonly positions: readonly string[];
}

export interface Album {
  readonly id: number;
  readonly albumTitle: string;
  readonly trackCount: number;
  readonly releaseDate: number;
  readonly albumType: string;
  readonly albumImage: string;
}

@Injectable({
  providedIn: 'root',
})
export class LandingApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;

  readonly membersResource = rxResource({
    stream: () => this.http.get<Member[]>(`${this.baseUrl}/idols`),
  });

  readonly albumsResource = rxResource({
    stream: () => this.http.get<Album[]>(`${this.baseUrl}/albums`),
  });
}
