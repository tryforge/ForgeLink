"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KazagumoEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../structures/ForgeLink");
class KazagumoEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo.on(this.name, this.listener.bind(client));
    }
}
exports.KazagumoEventHandler = KazagumoEventHandler;
