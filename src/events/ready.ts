import { LavalinkOpCodes } from "rawrlink/dist/typings/enums/LavalinkOpCodes";
import { LavalinkEventHandler } from "../structures/LavalinkEventHandler";
import { LavaForge } from "..";
import { Interpreter } from "forgescript";

export default new LavalinkEventHandler(
    {
        name: LavalinkOpCodes.Ready,
        description: "Emitted when a lavalink node becomes operational",
        listener(node, data) {
            const commands = LavaForge.Instance.commands.get(LavalinkOpCodes.Ready)
            
            if (commands?.length) {
                for (const cmd of commands) {
                    Interpreter.run({
                        command: cmd,
                        client: LavaForge.Instance.client,
                        data: cmd.compiled.code,
                        obj: node as any
                    })
                }
            }
        },
    }
)