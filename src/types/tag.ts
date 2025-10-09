export interface TagResponse {
  status: string;
  data: Tags[];
}
export interface Tags {
  _id: string;
  name: string;
  __v: number;
}

export interface TagCreateResponse {
  status: string;
  data: TagData;
}

export interface TagData {
  name: string;
  _id: string;
  __v: number;
}

export interface TagCreateRequest {
  name: string;
}
