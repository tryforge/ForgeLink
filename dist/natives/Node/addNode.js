"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$addNode',
    description: 'Adds a new Lavalink node to the player.',
    brackets: true,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString('Name', 'The name of the node to add to the player'),
        forgescript_1.Arg.requiredString('Authentication', 'The password to authenticate the node'),
        forgescript_1.Arg.requiredString('Host', 'The hostname or IP of the Lavalink server'),
        forgescript_1.Arg.requiredNumber('Port', 'The port Lavalink is running on'),
        forgescript_1.Arg.requiredBoolean('Secure', 'Whether or not the node is secure.'),
    ],
    output: forgescript_1.ArgType.Boolean,
    execute: async function (ctx, [name, auth, host, port, secure]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true)?.kazagumo;
        if (!kazagumo)
            return this.customError("Kazagumo is not initialized.");
        if (!kazagumo.shoukaku)
            return this.customError("Shoukaku is unavailable.");
        const newNode = {
            name,
            url: `${host}:${port}`,
            auth,
            secure
        };
        try {
            await kazagumo.shoukaku.addNode(newNode);
            return this.success();
        }
        catch (error) {
            console.error(`[Node Error] Failed to add node "${name}":`, error);
            return this.customError(`Failed to add node: ${error.message || 'Unknown error'}`);
        }
    }
});
