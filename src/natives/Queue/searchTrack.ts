import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLink } from '@structures/ForgeLink';

export default new NativeFunction({
    name: '$searchTrack',
    description: 'Searches for tracks in the guild and returns all results.',
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild to search in.'),
        Arg.requiredString('Query', 'The search query.')
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild = ctx.guild, query]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo;

        if (!kazagumo) return this.customError("Kazagumo is not initialized.");
        if (!kazagumo.shoukaku.nodes.size) return this.customError("No available Lavalink nodes.");

        const result = await kazagumo.search(query);
        if (!result.tracks.length) return this.customError("No results found!");

        return this.success(
            JSON.stringify({
                status: "success",
                type: result.type,
                message: result.type === "PLAYLIST"
                    ? `Found ${result.tracks.length} tracks from ${result.playlistName}`
                    : `Found ${result.tracks.length} tracks matching the query.`,
                playlistName: result.type === "PLAYLIST" ? result.playlistName : null,
                trackCount: result.tracks.length,
                tracks: result.tracks.map(track => ({
                    title: track.title,
                    author: track.author,
                    duration: track.length,
                    url: track.uri,
                    thumbnail: track.thumbnail
                }))
            }, null, 2)
        );
    }
});
