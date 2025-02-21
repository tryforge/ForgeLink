"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$nodeExists',
    description: 'Checks if a node exists from the name.',
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString('Name', 'The name of the node'),
    ],
    output: forgescript_1.ArgType.Boolean,
    execute: async function (ctx, [name]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        if (!kazagumo)
            return this.customError("Kazagumo is not initialized.");
        return this.successJSON(kazagumo.shoukaku.nodes.has(name));
    }
});
