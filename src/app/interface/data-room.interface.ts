export interface IDataRoom {
  id: number;
  slug: string;
  title: string;
  detail: string;
  type: string;
  exam: boolean;
  progress: string;
  sidebar: ISidebar;
  backUrl: string;
  certificate: boolean;
  project: boolean;
  author: any[];
  objectId: string;
  valoration: string;
  resource: IResource;
  reservation: any[];
  sidebarPublicationsCampaign?: ISidebarPublicationsCampaign[];
  marketplace: boolean;
  partnerId: number;
  partnerKey: string;
  webinarId?: string; // add properties
  chatEnabled?: string;
  subscriptionEnabled: boolean;
  //
  message?: string;
  url?: string;

  learningTypeArt?: string;
  learningType?: string;
}

export interface ISidebar {
  type: string;
  publicationId: string;
  data: IDatum[];
}

export interface IDatum {
  key: null;
  slug: null;
  title: string;
  status: boolean;
  detail: string;
  mediaType: null;
  live: boolean;
  duration: string;
  user: IUser;
  attachments: IAttachments;
  statusDrip: boolean;
  totalSessions?: number;
  items?: Item[];
  existItems: boolean; // add properties
  isOpen?: boolean;
  dateAvailable?: string;
  dateStream?: string;
  timezone?: string;
  existMaterial?: boolean;
  streamState?: string;
  stream?: string;
  dripState?: boolean;

  // add app
  streamStateDesc?: string;
}

export interface IAttachments {
  task: any[];
  materials: boolean;
  schemes: boolean;
}

export interface Item {
  key: string;
  slug: string;
  title: string;
  status: boolean;
  detail: string;
  mediaType: string;
  live: boolean;
  duration: string;
  user: IUser;
  attachments: IAttachments;
  statusDrip: boolean;
  dateStream?: string; // add properties
  timezone?: string;
  existMaterial?: boolean;
  streamState?: string;
  stream?: string;
}

export interface IUser {
  viewed: boolean;
}

export interface ISidebarPublicationsCampaign {
  id: string;
  name: string;
  slug: string;
  state?: boolean; // add properties
  dateAvailable?: string;
  dripState?: boolean;
}

export interface IDataRoomResource {
  resource: IResource;
  reservation: any[];
}

export interface IResource {
  id: string;
  slug: string;
  access: boolean;
  pusherKey: string;
  title: string;
  detail: string;
  key: string;
  duration: string;
  thumbnail: null;
  type: string;
  media: IMedia;
  player?: IPlayer;
  webinarType?: string; // add properties
  message?: string;
  sourceType?: string;
  markers: IMarker[];

  //
  typeClassroom?: any;
}

export interface IMarker {
  time: string | number;
  title: string;
}
export interface IMedia {
  id: string;
  title: string;
  file: string | IFile[];
  image: string;
  sprite: string;
  size?: null;
  type?: string;
  provider: string;
  streamState: string | null;
  dateStream?: string; // add properties
  timezone?: string;
  // media image
  real?: string;
  large?: string;
  stream?: string;
  tumbnail?: string;
  dateStreamEnd?: string;
  uriRetransmission?: string;
  url?: string;
}

export interface IFile {
  file: string;
  label?: string;
  default?: boolean;
  size?: string;
  type?: string;
}

export interface IPlayer {
  auto: boolean;
  type: string;
  image: string;
  preload: string;
  primary: string;
  controls: boolean;
  playlist: IPlaylist[];
  autostart: boolean;
  localization: ILocalization;
  playbackRateControls: number[];
  duration?: string; //add properties
  dateStreamEnd?: Date;
}

export interface ILocalization {
  nextUp: string;
  playlist: string;
}

export interface IPlaylist {
  file: string;
  image: string;
  title: string;
  mediaid: string;
  provider: string;
  type?: string;
}

export interface IDataRoomAdvanced {
  sidebar: ISidebar;
  resource: IDataRoomResource;
  sidebarPublicationsCampaign: ISidebarPublicationsCampaign[];
}

// interface for to playerJS
export interface ISourcePlayers {
  src: string;
  type: string;
  label?: string;
  size?: string;
  image?: string;
}
