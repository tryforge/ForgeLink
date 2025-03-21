import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$playerQueueTime',
    aliases: ["$queueTime", "$queueEstimatedTime"],
    description: 'Returns the total duration of all tracks in the player queue in milliseconds.',
    version: "1.1.0",
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild '),
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild = ctx.guild]) {
        const lavalink = ctx.client.getExtension(ForgeLink, true).lavalink

        const player = lavalink.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");
if (!player.queue || !player.queue.tracks.length) return this.success("0");
        
        return this.success(player.queue.utils.totalDuration());
    }
})