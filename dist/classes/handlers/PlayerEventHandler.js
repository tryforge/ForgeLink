"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LavalinkEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../structures/ForgeLink");
class LavalinkEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        const forgeLink = client.getExtension(ForgeLink_1.ForgeLink, true);
        if (forgeLink.lavalink) {
            forgeLink.lavalink.on(this.name, (...args) => {
                this.listener.apply(client, args);
            });
        }
        else {
            console.warn(`[ForgeLink] Attempted to register event "${this.name}" but lavalink manager is not initialized.`);
        }
    }
}
exports.LavalinkEventHandler = LavalinkEventHandler;
