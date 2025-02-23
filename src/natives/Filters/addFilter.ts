import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'
import KazagumoPlugin from 'kazagumo-filter'


export default new NativeFunction({
    name: '$filters',
    description: 'Clears the queue/all tracks in a specific guild',
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

        console.log(player.filters)

        player.shoukaku.node.rest.updatePlayer({

            guildId: guild.id,
            playerOptions: {
                filters: {}
            }

        })
        
        return this.success();
    }
})