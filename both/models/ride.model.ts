import { CollectionObject } from './collection-object.model';

export interface Ride extends CollectionObject {
  name: string;
  description: string;
  location: string;
  owner?: string;
  public: boolean;
}
