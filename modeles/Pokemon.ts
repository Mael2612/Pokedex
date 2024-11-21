
export interface Pokemon {
  id: number;
  identifier: string;
  height: number;
  weight: number;
  base_experience: number;
}

export interface Types {
  id: number;
  identifier: string;
  generation_id: number;
  damage_class_id : number;
}