"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LavalinkManager = exports.handlerName = void 0;
const forgescript_1 = require("@tryforge/forgescript");
exports.handlerName = "ForgeLink";
class LavalinkManager extends forgescript_1.BaseCommandManager {
    handlerName = 'lavalinkCommands';
}
exports.LavalinkManager = LavalinkManager;
