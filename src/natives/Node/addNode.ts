import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLink } from '@structures/ForgeLink';

export default new NativeFunction({
    name: '$addNode',
    description: 'Adds a new Lavalink node.',
    version: "1.0.2",
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredString('Name', 'The name of the node to add to the player'),
        Arg.requiredString('Authentication', 'The password to authenticate the node'),
        Arg.requiredString('Host', 'The hostname or IP of the Lavalink server'),
        Arg.requiredNumber('Port', 'The port Lavalink is running on'),
        Arg.requiredBoolean('Secure', 'Whether or not the node is secure.'),
    ],
    output: ArgType.Boolean,
    execute: async function (ctx, [name, auth, host, port, secure]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true)?.kazagumo;

        if (!kazagumo) return this.customError("Kazagumo is not initialized.");
        if (!kazagumo.shoukaku) return this.customError("Shoukaku is unavailable.");

        const newNode = {
            name,
            url: `${host}:${port}`,
            auth,
            secure
        };



        try {
            await kazagumo.shoukaku.addNode(newNode);
            return this.success();
        } catch (error) {
            console.error(`[Node Error] Failed to add node "${name}":`, error);
            return this.customError(`Failed to add node: ${error.message || 'Unknown error'}`);
        }
    }
});
