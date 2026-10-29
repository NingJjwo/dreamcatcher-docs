import { Component, computed, inject } from '@angular/core';
import { Card } from 'primeng/card';
import { Message } from 'primeng/message';
import { Skeleton } from 'primeng/skeleton';
import { LandingApiService } from './services/landing-api.service';

const ALBUM_PREVIEW_COUNT = 6;

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

@Component({
  selector: 'app-landing',
  imports: [Card, Message, Skeleton],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  protected readonly landingService = inject(LandingApiService);
  protected readonly skeletonCards = Array.from({ length: 7 });
  protected readonly skeletonAlbums = Array.from({ length: ALBUM_PREVIEW_COUNT });

  protected readonly albums = computed(() => {
    const resource = this.landingService.albumsResource;

    return resource.hasValue()
      ? shuffle(resource.value()).slice(0, ALBUM_PREVIEW_COUNT)
      : [];
  });
}