import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$playerElapsedTime',
    aliases: ["$elapsedTime"],
    description: 'Returns the elapsed time of the current song in milliseconds.',
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild '),
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");

        
        return this.success(player.position);
    }
})