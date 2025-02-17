"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$addTrack',
    description: 'Adds a track in a specific guild',
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild to create the player to.'),
        forgescript_1.Arg.requiredString('Query', 'Search query.')
    ],
    output: forgescript_1.ArgType.String,
    execute: async function (ctx, [guild, query]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer(guild.id);
        if (!player)
            return this.customError("No player found!");
        const result = await kazagumo.search(query);
        if (!result.tracks.length)
            return this.customError("No results found!");
        if (result.type === "PLAYLIST")
            player.queue.add(result.tracks);
        else
            player.queue.add(result.tracks[0]);
        if (!player.playing && !player.paused)
            player.play();
        return this.success(JSON.stringify({
            status: "success",
            type: result.type,
            message: result.type === "PLAYLIST"
                ? `Queued ${result.tracks.length} from ${result.playlistName}`
                : `Queued ${result.tracks[0].title}`,
            playlistName: result.type === "PLAYLIST" ? result.playlistName : null,
            trackCount: result.type === "PLAYLIST" ? result.tracks.length : 1,
            trackTitle: result.type !== "PLAYLIST" ? result.tracks[0].title : null,
            trackAuthor: result.type !== "PLAYLIST" ? result.tracks[0].author : null,
            trackImage: result.tracks[0].thumbnail
        }, null, 2));
    }
});
