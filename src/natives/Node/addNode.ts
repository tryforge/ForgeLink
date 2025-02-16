import { Arg, ArgType, NativeFunction } from '@tryforge/forgescript'
import type { BaseChannel, VoiceBasedChannel } from 'discord.js'
import { ForgeLink } from '@structures/ForgeLink'
import { Kazagumo } from 'kazagumo'

export default new NativeFunction({
    name: '$addNode',
    description: 'adds a player Nodes',
    brackets: false,
    unwrap: true,
    args: [
        Arg.requiredString('Name', 'The name of the node to add to the player'),
        Arg.requiredString('Authentication', 'The password to authenticate the node'),
        Arg.requiredString('Host', 'The hostname or IP of the Lavalink server'),
        Arg.requiredNumber('Port', 'The port lavalink is running on'),
        Arg.requiredBoolean('Secure', 'Whether or not the node is secure.'),
    ],
    output: ArgType.Boolean,
    execute: async function(ctx, [name, auth, host, port, secure]) {
        const kazagumo = ctx.client.getExtension(ForgeLink, true).kazagumo


        const newNode = {
            name,
            url: `${secure ? 'wss' : 'ws'}://${host}:${port}`,
            auth,
        }
        
        await kazagumo.shoukaku.addNode(newNode)
   
        return this.success()
    }
})