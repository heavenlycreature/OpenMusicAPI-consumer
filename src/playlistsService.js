const { Pool } = require('pg');

class PlaylistsService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylists(playlistId) {
        const query = {
            text: 'select id,name from playlists where id = $1',
            values: [playlistId],
        }

        const result = await this._pool.query(query);
        return result.rows[0];
    }

    async getSongs(playlistId) {
        const query = {
            text: 'select song.song_id, song.title, song.performer from song LEFT JOIN playlist_songs ON song.song_id = playlist_songs.song_id WHERE playlist_songs.playlist_id = $1',
            values: [playlistId]
        }

        const result = await this._pool.query(query);

        return result.rows;
    }
}
module.exports = PlaylistsService;
