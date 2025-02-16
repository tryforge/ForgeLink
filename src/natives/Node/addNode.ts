import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'

export default new NativeFunction({
    name: '$addNode',
    description: 'adds a player Nodes',
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredString('Name', 'The name of the node to add to the player'),
        Arg.requiredString('Authentication', 'The password to authenticate the node'),
        Arg.requiredURL('URL', 'The url for the client node'),
        Arg.requiredBoolean('Secure', 'Whether or not the node is secure.'),
    ],
    output: ArgType.Boolean,
    execute: async function(ctx, [name, auth, url, secure]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo


    await kazagumo.shoukaku.addNode({
            name: name,
            auth: auth,
            url: url,
            secure: secure
        })

        return this.success()
    }
})