"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$addTrack',
    description: 'Adds a track into the guild player to listen to.',
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild to create the player to.'),
        forgescript_1.Arg.requiredString('Query', 'Search query.')
    ],
    output: forgescript_1.ArgType.String,
    execute: async function (ctx, [guild = ctx.guild, query]) {
        const lavalink = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).lavalink;
        let player = lavalink.getPlayer(guild.id) || await lavalink.createPlayer({
            guildId: guild.id,
            voiceChannelId: ctx.member.voice.channelId,
            textChannelId: ctx.channel.id,
            selfDeaf: true,
            selfMute: false
        });
        if (!player.connected)
            await player.connect();
        const result = await player.search({ query, source: "ytsearch" }, ctx.member);
        if (!result || !result.tracks.length)
            return this.customError("No results found!");
        if (result.loadType === "playlist") {
            player.queue.add(result.tracks);
        }
        else {
            player.queue.add(result.tracks[0]);
        }
        if (!player.playing)
            await player.play();
        const requester = result.tracks[0].requester;
        return this.successJSON({
            status: "success",
            type: result.loadType,
            message: result.loadType === "playlist"
                ? `Queued ${result.tracks.length} from ${result.playlist?.title}`
                : `Queued ${result.tracks[0].info.title}`,
            playlistName: result.loadType === "playlist" ? result.playlist?.title : null,
            trackCount: result.loadType === "playlist" ? result.tracks.length : 1,
            trackTitle: result.loadType !== "playlist" ? result.tracks[0].info.title : null,
            trackAuthor: result.loadType !== "playlist" ? result.tracks[0].info.author : null,
            trackImage: result.tracks[0].info.artworkUrl,
            requester: requester?.id || "Unknown"
        });
    }
});
