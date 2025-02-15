"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoukakuEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const ForgeLink_1 = require("../structures/ForgeLink");
class ShoukakuEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        client.getExtension(ForgeLink_1.ForgeLink, true).kazagumo.shoukaku.on(this.name, this.listener.bind(client));
    }
}
exports.ShoukakuEventHandler = ShoukakuEventHandler;
