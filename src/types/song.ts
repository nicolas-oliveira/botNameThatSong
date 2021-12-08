export type SongResponse = {
  result: SongDetails;
};

export type SongDetails = {
  artist: string;
  title: string;
  album: string;
  deezer: Deezer;
};
