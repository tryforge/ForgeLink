import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'


export default new NativeFunction({
    name: '$filters',
    description: 'Filters Test Setup',
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild '),
        Arg.requiredString('filter', 'player filter.')
    ],
    output: ArgType.String,
    execute: async function(ctx, [guild = ctx.guild, filter]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");

       
        if (!filter) return this.customError("No Filters Found!");
         // @ts-ignore
        player.filters()

        return this.success();
    }
})