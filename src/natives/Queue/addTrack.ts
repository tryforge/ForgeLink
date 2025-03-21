import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript';
import type { BaseChannel, VoiceBasedChannel } from 'discord.js';
import { ForgeLink } from '@structures/ForgeLink';
import { User } from 'discord.js';

export default new NativeFunction({
    name: '$addTrack',
    description: 'Adds a track into the guild player to listen to.',
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild to create the player to.'),
        Arg.requiredString('Query', 'Search query.')
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild = ctx.guild, query]) {
        const lavalink = ctx.client.getExtension(ForgeLink, true).lavalink;
        
        let player = lavalink.getPlayer(guild.id) || await lavalink.createPlayer({
            guildId: guild.id,
            voiceChannelId: ctx.member.voice.channelId,
            textChannelId: ctx.channel.id,
            selfDeaf: true,
            selfMute: false
        });

        if (!player.connected) await player.connect();

        const result = await player.search({ query, source: "ytsearch" }, ctx.member);
        if (!result || !result.tracks.length) return this.customError("No results found!");
        
        if (result.loadType === "playlist") {
            player.queue.add(result.tracks);
        } else {
            player.queue.add(result.tracks[0]);
        }

        if (!player.playing) await player.play();
        
        const requester = result.tracks[0].requester as User;

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
