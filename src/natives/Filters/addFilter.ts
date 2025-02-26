import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'


export default new NativeFunction({
    name: '$addFilter',
    description: 'Filters Test Setup',
    version: "1.0.3",
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild '),
        Arg.requiredString('Filter', 'The Filter to apply'),
    ],
    output: ArgType.Boolean,
    execute: async function(ctx, [guild = ctx.guild, filter]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");

         // @ts-ignore
        await player.filter(filter)

        return this.success();
    }
})