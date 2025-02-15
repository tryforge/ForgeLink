import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$trackInfoOf',
    description: 'Gets info on a track in a specific guild',
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild'),
        Arg.requiredNumber('Index', 'The track index to fetch.')
    ],
    output: ArgType.Json,
    execute: async function(ctx, [guild, index]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        const player = kazagumo.getPlayer(guild.id)
        if (!player) return this.customError("No player found!")

        return this.successJSON(player.queue.at(index).getRaw())
    }
})
