import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'
import { KazagumoQueue, KazagumoTrack } from 'kazagumo'

export default new NativeFunction({
    name: '$queue',
    description: 'displays the queue/all tracks in a specific guild',
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild '),
    ],
    output: ArgType.Json,
    execute: async function(ctx, [guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");

        
        const queueTracks = [];

        
        if (player.queue.current) {
            queueTracks.push({
                trackTitle: player.queue.current.getRaw().info.title,
                trackAuthor: player.queue.current.getRaw().info.author
            });
        }

        // Get the rest of the queued tracks
        const queueSize = Number(player.queue.totalSize.toFixed());
        for (let i = 0; i < queueSize; i++) {
            const track = player.queue.at(i);
            if (track) {
                queueTracks.push({
                    trackTitle: track.getRaw().info.title,
                    trackAuthor: track.getRaw().info.author
                });
            }
        }

        return this.successJSON({ guildId: guild.id, tracks: queueTracks });
    }
})