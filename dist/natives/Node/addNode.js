"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new forgescript_1.NativeFunction({
    name: '$addNode',
    description: 'adds a player Nodes',
    brackets: false,
    unwrap: true,
    args: [
        forgescript_1.Arg.requiredString('Name', 'The name of the node to add to the player'),
        forgescript_1.Arg.requiredString('Authentication', 'The password to authenticate the node'),
        forgescript_1.Arg.requiredString('Host', 'The hostname or IP of the Lavalink server'),
        forgescript_1.Arg.requiredNumber('Port', 'The port lavalink is running on'),
        forgescript_1.Arg.requiredBoolean('Secure', 'Whether or not the node is secure.'),
    ],
    output: forgescript_1.ArgType.Boolean,
    execute: async function (ctx, [name, auth, host, port, secure]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        const newNode = {
            name,
            url: `${secure ? 'wss' : 'ws'}://${host}:${port}`,
            auth,
        };
        await kazagumo.shoukaku.addNode(newNode);
        return this.success();
    }
});
