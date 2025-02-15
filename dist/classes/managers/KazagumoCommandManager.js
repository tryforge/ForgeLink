"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KazagumoCommandManager = exports.handlerName = void 0;
const forgescript_1 = require("@tryforge/forgescript");
exports.handlerName = "ForgeLink";
class KazagumoCommandManager extends forgescript_1.BaseCommandManager {
    handlerName = 'kazagumoCommands';
}
exports.KazagumoCommandManager = KazagumoCommandManager;
