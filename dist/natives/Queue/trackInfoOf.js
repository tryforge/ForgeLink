"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$trackInfoOf',
    description: 'Gets info on a track from a guild player',
    version: "1.0.0",
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild'),
        forgescript_1.Arg.requiredNumber('Position', 'The track position/index to fetch from.')
    ],
    output: forgescript_1.ArgType.Json,
    execute: async function (ctx, [guild = ctx.guild, position]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id));
        if (!player)
            return this.customError("No player found!");
        const index = position - 1;
        if (isNaN(index) || index < 0 || index >= player.queue.length) {
            return this.customError(`Invalid position! Please Provide a number between 1 and ${player.queue.length}.`);
        }
        return this.successJSON(player.queue.at(index).getRaw());
    }
});
