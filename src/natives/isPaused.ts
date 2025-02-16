import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$isPaused',
    description: 'Check whether the given guild has a player is paused.',
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild to create the player to.')
    ],
    output: ArgType.Boolean,
    execute: async function(ctx, [guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id)); 
if (!player) return this.customError("No player found!");


        return this.success(player.paused)
    }
})