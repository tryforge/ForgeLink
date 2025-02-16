import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$getNodes',
    description: 'Gets Player Nodes',
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild of the player to.'),
    ],
    output: ArgType.Boolean,
    execute: async function(ctx, [guild = ctx.guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

       const nodes = Array.from(kazagumo.shoukaku.nodes.values()).map(node => ({
        name: node.name,
        auth: node.info.lavaplayer,
        url: node.ws.url

       }))

        return this.successJSON(nodes)
    }
})