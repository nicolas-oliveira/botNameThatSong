export type SongResponse = {
  result: SongDetails;
};

export type SongDetails = {
  artist: string;
  title: string;
  album: string;
  song_link: string;
  spotify: Spotify;
};
