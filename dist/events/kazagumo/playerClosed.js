"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KazagumoEventHandler_1 = require("../../classes/handlers/KazagumoEventHandler");
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../../classes/structures/ForgeLink");
exports.default = new KazagumoEventHandler_1.KazagumoEventHandler({
    name: 'playerClosed',
    description: '...',
    async listener(player) {
        const commands = this.getExtension(ForgeLink_1.ForgeLink, true).commands.kazagumo.get('playerClosed');
        if (!commands)
            return;
        const guild = this.guilds.cache.get(player.guildId);
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: guild,
                client: this,
                command,
                data: command.compiled.code,
                environment: { player }
            });
        }
    }
});
