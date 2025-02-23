"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$addFilter',
    description: 'Filters Test Setup',
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredGuild('Guild ID', 'The ID of the guild '),
        forgescript_1.Arg.requiredString('Filter', 'The Filter to apply'),
    ],
    output: forgescript_1.ArgType.Boolean,
    execute: async function (ctx, [guild = ctx.guild, filter]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const player = kazagumo.getPlayer((guild.id ?? ctx.guild.id));
        if (!player)
            return this.customError("No player found!");
        // @ts-ignore
        player.filter("karaoke");
        return this.success();
    }
});
