import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLink } from '@structures/ForgeLink';

export default new NativeFunction({
    name: '$searchTrack',
    description: 'Searches for tracks in the guild and returns results.',
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild to search in.'),
        Arg.requiredString('Query', 'The search query.'),
        Arg.optionalNumber('Limit', 'The maximum number of results to return.')
    ],
    output: ArgType.Json,
    execute: async function(ctx, [guild = ctx.guild, query, limit]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo;

        if (!kazagumo) return this.customError("Kazagumo is not initialized.");

        const result = await kazagumo.search(query,{requester: ctx.member?.id});
        if (!result.tracks.length) return this.customError("No results found!");

        let tracks = result.tracks;
        if (limit && limit > 0) tracks = tracks.slice(0, limit); // Apply limit if provided

        return this.successJSON({
            status: "success",
            type: result.type,
            message: result.type === "PLAYLIST"
                ? `Found ${tracks.length} tracks from ${result.playlistName}`
                : `Found ${tracks.length} tracks matching the query.`,
            playlistName: result.type === "PLAYLIST" ? result.playlistName : null,
            trackCount: tracks.length,
            tracks: tracks.map(track => ({
                title: track.title,
                author: track.author,
                duration: track.length,
                url: track.uri,
                thumbnail: track.thumbnail
            }))
        });
    }
});
