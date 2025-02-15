import { ShoukakuEventHandler } from '@handlers/ShoukakuEventHandler'
import { Interpreter } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

export default new ShoukakuEventHandler({
    name: 'reconnecting',
    description: '...',
    async listener(name, reconnectsLeft, reconnectInterval) {
        const commands = this.getExtension(ForgeLink, true).commands.shoukaku.get('reconnecting')
        if (!commands) return;
        
        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                environment: { name, reconnectsLeft, reconnectInterval }
            })
        }
    }
})