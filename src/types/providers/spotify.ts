type Spotify = {
  album: any
  preview_url: string
};

type SpotifyAlbum = {
  images: SpotifyAlbumImage[]
}

type SpotifyAlbumImage = {
  url: string
}
