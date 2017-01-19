import { CollectionObject } from './collection-object.model';

export interface Ride extends CollectionObject {
  name: string;
  description: string;
  location: Location;
  owner?: string;
  public: boolean;
}

interface Location {
  name: string
  lat?: number;
  lng?: number;
}
