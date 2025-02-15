"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$trackInfo',
    description: 'Gets info on a track in a specific guild',
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild'),
        forgescript_1.Arg.requiredNumber('Index', 'The track index to fetch.')
    ],
    output: forgescript_1.ArgType.String,
    execute: async function (ctx, [guild, index]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer(guild.id);
        if (!player)
            return this.customError("No player found!");
        return this.successJSON(player.queue.at(index).getRaw());
    }
});
