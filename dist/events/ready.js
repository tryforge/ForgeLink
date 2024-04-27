"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LavalinkOpCodes_1 = require("rawrlink/dist/typings/enums/LavalinkOpCodes");
const LavalinkEventHandler_1 = require("../structures/LavalinkEventHandler");
const __1 = require("..");
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new LavalinkEventHandler_1.LavalinkEventHandler({
    name: LavalinkOpCodes_1.LavalinkOpCodes.Ready,
    description: "Emitted when a lavalink node becomes operational",
    listener(node, data) {
        const commands = __1.LavaForge.Instance.commands.get(LavalinkOpCodes_1.LavalinkOpCodes.Ready);
        if (commands?.length) {
            for (const cmd of commands) {
                forgescript_1.Interpreter.run({
                    command: cmd,
                    client: __1.LavaForge.Instance.client,
                    data: cmd.compiled.code,
                    obj: node
                });
            }
        }
    },
});
//# sourceMappingURL=ready.js.map