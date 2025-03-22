import { NodeEventHandler } from '@handlers/NodeEventHandler'
import { Interpreter } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

export default new NodeEventHandler({
    name: 'connect',
    description: '...',
    async listener(node) {
        const commands = this.getExtension(ForgeLink, true).commands.player.get("connect")
        if (!commands) return;

        const guild = this.guilds.cache.get(node.guildId)
        
        for (const command of commands) {
            Interpreter.run({
                obj: guild,
                client: this,
                command,
                data: command.compiled.code,
                environment: { node }
            })
        }
    }
})