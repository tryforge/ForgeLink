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
        forgescript_1.Arg.requiredURL('URL', 'The url for the client node'),
        forgescript_1.Arg.requiredBoolean('Secure', 'Whether or not the node is secure.'),
    ],
    output: forgescript_1.ArgType.Boolean,
    execute: async function (ctx, [name, auth, url, secure]) {
        const kazagumo = ctx.client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo;
        await kazagumo.shoukaku.addNode({
            name: name,
            auth: auth,
            url: url,
            secure: secure
        });
        return this.success();
    }
});
