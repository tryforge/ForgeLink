import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeLink } from '@structures/ForgeLink';

export default new NativeFunction({
    name: '$removeNode',
    description: 'removes a Lavalink node from the player.',
    brackets: true,
    unwrap: true,
    args: [
        Arg.requiredString('Name', 'The name of the node to remove from the player'),
        Arg.requiredString('Reason', 'The reason of the removal of the node'),
    ],
    output: ArgType.Boolean,
    execute: async function (ctx, [name, reason]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true)?.kazagumo;

        if (!kazagumo) return this.customError("Kazagumo is not initialized.");
        if (!kazagumo.shoukaku) return this.customError("Shoukaku is unavailable.");

        try {
            await kazagumo.shoukaku.removeNode(name, reason);
            return this.success();
        } catch (error) {
            console.error(`[Node Error] Failed to remove node "${name}":`, error);
            return this.customError(`Failed to remove node: ${error.message || 'Unknown error'}`);
        }
    }
});
