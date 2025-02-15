import { ShoukakuEventHandler } from '@handlers/ShoukakuEventHandler'
import { Interpreter } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

export default new ShoukakuEventHandler({
    name: 'close',
    description: '...',
    async listener(name, code, reason) {
        const commands = this.getExtension(ForgeLink, true).commands.shoukaku.get('close')
        if (!commands) return;
        
        for (const command of commands) {
            Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                environment: { name, code, reason }
            })
        }
    }
})