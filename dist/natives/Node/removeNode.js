"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$removeNode',
    description: 'removes a Lavalink node from the player.',
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString('Name', 'The name of the node to remove from the player'),
        forgescript_1.Arg.requiredString('Reason', 'The reason of the removal of the node'),
    ],
    output: forgescript_1.ArgType.Boolean,
    execute: async function (ctx, [name, reason]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true)?.kazagumo;
        if (!kazagumo)
            return this.customError("Kazagumo is not initialized.");
        if (!kazagumo.shoukaku)
            return this.customError("Shoukaku is unavailable.");
        try {
            await kazagumo.shoukaku.removeNode(name, reason);
            return this.success();
        }
        catch (error) {
            console.error(`[Node Error] Failed to remove node "${name}":`, error);
            return this.customError(`Failed to remove node: ${error.message || 'Unknown error'}`);
        }
    }
});
