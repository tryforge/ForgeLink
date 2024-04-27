"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkRate",
    description: "Sets rate of player, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to add filter on",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Guild
        },
        {
            name: "rate",
            description: "The rate to set",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Number
        }
    ],
    async execute(ctx, [g, v]) {
        const pl = __1.LavaForge.Instance.manager.players.get(g.id);
        if (!pl)
            return this.success(false);
        pl.filters.timescale.setRate(v);
        return this.success(true);
    },
});
//# sourceMappingURL=lavalinkRate.js.map