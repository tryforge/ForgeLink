import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$getNodes',
    description: 'Gets the lavalink nodes.',
    brackets: false,
    unwrap: true,
    experimental:true,
    args: [
        Arg.requiredGuild('Guild ID', 'The ID of the guild of the player to.'),
    ],
    output: ArgType.Json,
    execute: async function(ctx, [guild = ctx.guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo

        if (!kazagumo) return this.customError("Kazagumo is not initialized.");
        if (!kazagumo.shoukaku) return this.customError("Shoukaku is not available.");
        if (!kazagumo.shoukaku.nodes.size) return this.customError("No available nodes.");

       
        const nodes = await Promise.all(
            Array.from(kazagumo.shoukaku.nodes.values()).map(async (node) => {
                const lavalinkInfo = await node.rest.getLavalinkInfo().catch(() => null); 
                return {
                    name: node.name,
                    state: node.state,
                    stats: node.stats, 
                    address: lavalinkInfo?.version || "Unknown",
                };
            })
        );

        return this.successJSON({nodes})
    }
})