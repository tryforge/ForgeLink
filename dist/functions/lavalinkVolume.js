"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkVolume",
    description: "Sets volume of player, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to pause track on",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Guild
        },
        {
            name: "volume",
            description: "The volume to set",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Number
        }
    ],
    async execute(ctx, [g, v]) {
        const pl = __1.LavaForge.Instance.manager.players.get(g.id);
        if (!pl)
            return this.success(false);
        await pl.setVolume(v);
        return this.success(true);
    },
});
//# sourceMappingURL=lavalinkVolume.js.map