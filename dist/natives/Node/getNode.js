"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$getNodes',
    description: 'Gets Player Nodes',
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild of the player to.'),
    ],
    output: forgescript_1.ArgType.Boolean,
    execute: async function (ctx, [guild = ctx.guild]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const nodes = Array.from(kazagumo.shoukaku.nodes.values()).map(node => ({
            name: node.name,
            auth: node.info.lavaplayer,
            url: node.ws.url
        }));
        return this.successJSON(nodes);
    }
});
