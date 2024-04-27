"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LavalinkEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
class LavalinkEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        __1.LavaForge.Instance.manager.on(this.name, this.listener);
    }
}
exports.LavalinkEventHandler = LavalinkEventHandler;
//# sourceMappingURL=LavalinkEventHandler.js.map