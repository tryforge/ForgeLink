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
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");
if (!player.queue || !player.queue.length) return this.success("0");
        
const totalDuration = (player.queue.current?.length || 0) + 
Array.from({ length: player.queue.totalSize }, (_, i) => player.queue.at(i)?.length || 0)
    .reduce((acc, length) => acc + length, 0);


        return this.success(totalDuration);
    }
})