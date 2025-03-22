"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerEventHandler_1 = require("../classes/handlers/PlayerEventHandler");
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../classes/structures/ForgeLink");
exports.default = new PlayerEventHandler_1.LavalinkEventHandler({
    name: 'queueEnd',
    description: '...',
    async listener(player, track, payload) {
        const commands = this.getExtension(ForgeLink_1.ForgeLink, true).commands.player.get("queueEnd");
        if (!commands)
            return;
        const guild = this.guilds.cache.get(player.guildId);
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: guild,
                client: this,
                command,
                data: command.compiled.code,
                environment: { player, track, payload }
            });
        }
    }
});
