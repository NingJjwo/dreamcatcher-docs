
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { RouterLink } from '@angular/router';
import { Highlight } from 'ngx-highlightjs';

export interface SchemaRow {
  key: string;
  type: string;
  description: string;
}

export interface EndpointDoc {
  id: string;
  title: string;
  method: string;
  path: string;
  description: string;
  response: string;
}

export interface ResourceDoc {
  id: string;
  title: string;
  schemaLabel: string;
  summary: string;
  schema: SchemaRow[];
  endpoints: EndpointDoc[];
}

type AnchorMenuItem = MenuItem & { anchor?: string };

const apiBaseUrl = 'https://dreamcatcher-api-4hw4.onrender.com/api';
const assetBaseUrl = 'https://dreamcatcher-api-4hw4.onrender.com';

const sampleIdol = {
  id: 1,
  stageName: 'JiU',
  realName: 'Kim Minji',
  nationality: 'South Korean',
  loreConcept: 'Nightmare of being chased',
  imageUrl: `${assetBaseUrl}/images/dreamcatcher/idols/jiu.png`,
  positions: ['Leader'],
};

const sampleGroup = {
  id: 1,
  groupName: 'Dreamcatcher',
  agencyName: 'Dreamcatcher Company',
  concept: 'Dark fantasy with rock influences',
  groupImage: `${assetBaseUrl}/images/dreamcatcher/dreamcatcher_logo.jpg`,
};

const sampleAlbum = {
  id: 1,
  albumTitle: 'Dystopia: The Tree of Language',
  trackCount: 14,
  releaseDate: 2020,
  albumType: 'Full Album',
  albumImage: `${assetBaseUrl}/images/dreamcatcher/albums/album1.jpeg`,
};

function formatJson(response: unknown): string {
  return JSON.stringify(response, null, 2) ?? '';
}

@Component({
  selector: 'app-docs',
  imports: [CommonModule, Menu, TableModule, RouterLink, Highlight],
  templateUrl: './docs.component.html',
})
export class DocsComponent {
  protected readonly apiBaseUrl = apiBaseUrl;

  protected readonly resources: ResourceDoc[] = [
    {
      id: 'groups',
      title: 'Groups',
      schemaLabel: 'Group schema',
      summary: 'K-pop groups and their member lineups.',
      schema: [
        { key: 'id', type: 'long', description: 'Unique group identifier.' },
        { key: 'groupName', type: 'string', description: 'Name of the group.' },
        { key: 'agencyName', type: 'string', description: 'Agency representing the group.' },
        { key: 'concept', type: 'string', description: 'The group’s concept.' },
        { key: 'groupImage', type: 'string (URL)', description: 'Absolute URL of the group image.' },
        { key: 'members', type: 'Idol[]', description: 'Included by the group detail endpoint.' },
      ],
      endpoints: [
        {
          id: 'groups-list',
          title: 'Get all groups',
          method: 'GET',
          path: '/groups',
          description: 'Returns the available groups.',
          response: formatJson([sampleGroup]),
        },
        {
          id: 'group-detail',
          title: 'Get group by ID',
          method: 'GET',
          path: '/groups/1',
          description: 'Returns one group with its members.',
          response: formatJson({ ...sampleGroup, members: [sampleIdol] }),
        },
      ],
    },
    {
      id: 'albums',
      title: 'Albums',
      schemaLabel: 'Album schema',
      summary: 'Releases in the group’s discography.',
      schema: [
        { key: 'id', type: 'long', description: 'Unique album identifier.' },
        { key: 'albumTitle', type: 'string', description: 'Album or release title.' },
        { key: 'trackCount', type: 'integer', description: 'Number of tracks.' },
        { key: 'releaseDate', type: 'integer', description: 'Release year.' },
        { key: 'albumType', type: 'string', description: 'Release format or album type.' },
        { key: 'albumImage', type: 'string (URL)', description: 'Absolute URL of the album artwork.' },
      ],
      endpoints: [
        {
          id: 'albums-list',
          title: 'Get all albums',
          method: 'GET',
          path: '/albums',
          description: 'Returns the available albums.',
          response: formatJson([sampleAlbum]),
        },
        {
          id: 'album-detail',
          title: 'Get album by ID',
          method: 'GET',
          path: '/albums/1',
          description: 'Returns one album by its identifier.',
          response: formatJson(sampleAlbum),
        },
        {
          id: 'albums-by-group',
          title: 'Get albums by group ID',
          method: 'GET',
          path: '/albums/group/1',
          description: 'Returns albums associated with the selected group.',
          response: formatJson([sampleAlbum]),
        },
      ],
    },
    {
      id: 'idols',
      title: 'Idols',
      schemaLabel: 'Idol schema',
      summary: 'Members, their stage identities, positions, and group membership.',
      schema: [
        { key: 'id', type: 'long', description: 'Unique idol identifier.' },
        { key: 'stageName', type: 'string', description: 'Stage name or public alias.' },
        { key: 'realName', type: 'string', description: 'Idol’s real name.' },
        { key: 'nationality', type: 'string', description: 'Nationality.' },
        { key: 'loreConcept', type: 'string', description: 'Lore concept associated with the idol.' },
        { key: 'imageUrl', type: 'string (URL)', description: 'Absolute URL of the idol image.' },
        { key: 'positions', type: 'string[]', description: 'Positions held in the group.' },
      ],
      endpoints: [
        {
          id: 'idols-list',
          title: 'Get all idols',
          method: 'GET',
          path: '/idols',
          description: 'Returns all idols.',
          response: formatJson([sampleIdol]),
        },
        {
          id: 'idols-search',
          title: 'Search idols by stage name',
          method: 'GET',
          path: '/idols?name=JiU',
          description: 'Filters idols by a partial, case-insensitive stage name.',
          response: formatJson([sampleIdol]),
        },
        {
          id: 'idol-detail',
          title: 'Get idol by ID',
          method: 'GET',
          path: '/idols/1',
          description: 'Returns one idol by its identifier.',
          response: formatJson(sampleIdol),
        },
        {
          id: 'idols-by-group',
          title: 'Get idols by group ID',
          method: 'GET',
          path: '/idols/group/1',
          description: 'Returns members associated with the selected group.',
          response: formatJson([sampleIdol]),
        },
      ],
    },
  ];

  protected readonly menuItems: AnchorMenuItem[] = [
    {
      label: 'Overview',
      items: [{ label: 'REST introduction', anchor: 'rest-introduction' }],
    },
    ...this.resources.map((resource) => ({
      label: resource.title,
      items: [
        { label: resource.schemaLabel, anchor: `${resource.id}-schema` },
        ...resource.endpoints.map((endpoint) => ({
          label: endpoint.title,
          anchor: endpoint.id,
        })),
      ],
    })),
  ];
}