"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$getNodes',
    description: 'Gets Player Nodes',
    brackets: false,
    unwrap: true,
    experimental: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild of the player to.'),
    ],
    output: forgescript_1.ArgType.Json,
    execute: async function (ctx, [guild = ctx.guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        if (!kazagumo)
            return this.customError("Kazagumo is not initialized.");
        if (!kazagumo.shoukaku)
            return this.customError("Shoukaku is not available.");
        if (!kazagumo.shoukaku.nodes.size)
            return this.customError("No available nodes.");
        const nodes = await Promise.all(Array.from(kazagumo.shoukaku.nodes.values()).map(async (node) => {
            const lavalinkInfo = await node.rest.getLavalinkInfo().catch(() => null);
            return {
                name: node.name,
                state: node.state,
                stats: node.stats,
                address: lavalinkInfo?.version || "Unknown",
            };
        }));
        return this.successJSON({ nodes });
    }
});
