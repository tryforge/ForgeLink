"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkStop",
    description: "Destroys the player, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to destroy player",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Guild
        }
    ],
    async execute(ctx, [g]) {
        const pl = __1.LavaForge.Instance.manager.players.get(g.id);
        if (!pl)
            return this.success(false);
        return this.success(await pl.destroy());
    },
});
//# sourceMappingURL=lavalinkStop.js.map