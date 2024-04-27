"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkPitch",
    description: "Sets pitchness of player, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to add pitch on",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Guild
        },
        {
            name: "pitch",
            description: "The pitch to set",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Number
        }
    ],
    async execute(ctx, [g, v]) {
        const pl = __1.LavaForge.Instance.manager.players.get(g.id);
        if (!pl)
            return this.success(false);
        pl.filters.timescale.setPitch(v);
        return this.success(true);
    },
});
//# sourceMappingURL=lavalinkPitch.js.map