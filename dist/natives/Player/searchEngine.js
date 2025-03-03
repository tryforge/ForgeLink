"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$searchEngine',
    description: 'Sets the player\'s search engine.',
    version: "1.1.0",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'Engine',
            description: 'The engine to use (ytsearch, scsearch, spsearch).',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false
        }
    ],
    output: forgescript_1.ArgType.Json,
    execute: async function (ctx, [engine]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        if (!kazagumo)
            return this.customError("Kazagumo is not initialized.");
        kazagumo.KazagumoOptions.defaultSource = engine + ":";
        return this.successJSON({ message: `Search engine set to: ${engine}` });
    }
});
