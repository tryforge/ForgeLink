"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$filters',
    description: 'Filters Test Setup',
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild '),
        forgescript_1.Arg.requiredString('filter', 'player filter.')
    ],
    output: forgescript_1.ArgType.String,
    execute: async function (ctx, [guild = ctx.guild, filter]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id));
        if (!player)
            return this.customError("No player found!");
        if (!filter)
            return this.customError("No Filters Found!");
        // @ts-ignore
        player.filters();
        return this.success();
    }
});
