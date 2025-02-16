import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$getNodes',
    description: 'Gets Player Nodes',
    brackets: false,
    unwrap: true,
    experimental:true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild of the player to.'),
    ],
    output: ArgType.Boolean,
    execute: async function(ctx, [guild = ctx.guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        if (!kazagumo) return this.customError("Kazagumo is not initialized.");
        if (!kazagumo.shoukaku) return this.customError("Shoukaku is not available.");

        const resolvedNode = kazagumo.shoukaku.options.nodeResolver(kazagumo.shoukaku.nodes);

        return this.successJSON(resolvedNode)
    }
})