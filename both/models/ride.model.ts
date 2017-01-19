import { CollectionObject } from './collection-object.model';

export interface Ride extends CollectionObject {
  description: string;
  location: Location;
  date: Date;
  owner?: string;
  public: boolean;
}

interface Location {
  name: string
  lat?: number;
  lng?: number;
}
