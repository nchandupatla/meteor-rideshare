import { CollectionObject } from './collection-object.model';

export interface Ride extends CollectionObject {
  description: string;
  from_location: Location;
  to_location: Location;
  date: Date;
  price: number;
  owner?: string;
  public: boolean;
  car_rules?:CarRules;
}

interface Location {
  name: string
  lat?: number;
  lng?: number;
}

interface CarRules{
smoking: boolean;
music: boolean;
foodDrinks: boolean;
}
