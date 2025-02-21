import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$trackInfoOf',
    description: 'Gets info on a track from a guild player',
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild'),
        Arg.requiredNumber('Position', 'The track position/index to fetch from.')
    ],
    output: ArgType.Json,
    execute: async function(ctx, [guild = ctx.guild, position]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id))
        if (!player) return this.customError("No player found!")

            const index = position - 1;

            if (isNaN(index) || index < 0 || index >= player.queue.length) {
                return this.customError(`Invalid position! Please Provide a number between 1 and ${player.queue.length}.`);
            }


        return this.successJSON(player.queue.at(index).getRaw())
    }
})
