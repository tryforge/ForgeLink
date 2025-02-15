import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'
import { KazagumoQueue } from 'kazagumo'

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

const queue = player.queue.map((track, index) => ({
    position: index + 1,
    title: track.title,
    author: track.author,
    duration: track.length, 
    url: track.uri
}));

        return this.successJSON({ guildId: guild.id, tracks: queue });
    }
})