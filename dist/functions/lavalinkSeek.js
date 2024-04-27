"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkSeek",
    description: "Seeks the current played song to given position, returns bool",
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to seek song at",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Guild
        },
        {
            name: "position",
            description: "The new pos for the player",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Time
        }
    ],
    async execute(ctx, [g, t]) {
        const pl = __1.LavaForge.Instance.manager.players.get(g.id);
        if (!pl)
            return this.success(false);
        const seek = await pl.seek(t);
        return this.success(true);
    },
});
//# sourceMappingURL=lavalinkSeek.js.map