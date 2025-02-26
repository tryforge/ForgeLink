"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$searchTrack',
    description: 'Searches for tracks in the guild and returns results.',
    version: "1.0.3",
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild to search in.'),
        forgescript_1.Arg.requiredString('Query', 'The search query.'),
        forgescript_1.Arg.optionalNumber('Limit', 'The maximum number of results to return.')
    ],
    output: forgescript_1.ArgType.Json,
    execute: async function (ctx, [guild = ctx.guild, query, limit]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        if (!kazagumo)
            return this.customError("Kazagumo is not initialized.");
        const result = await kazagumo.search(query);
        if (!result.tracks.length)
            return this.customError("No results found!");
        let tracks = result.tracks;
        if (limit && limit > 0)
            tracks = tracks.slice(0, limit); // Apply limit if provided
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
