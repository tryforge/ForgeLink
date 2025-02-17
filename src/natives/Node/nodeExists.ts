import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$nodeExists',
    description: 'Gets Player Nodes',
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredString('Name', 'The name of the node'),
    ],
    output: ArgType.Boolean,
    execute: async function(ctx, [name]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        if (!kazagumo) return this.customError("Kazagumo is not initialized.");

     return this.successJSON(kazagumo.shoukaku.nodes.has(name))
    }
})