"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkCurrentTrackInfo",
    description: "Returns track info of current playing track",
    unwrap: true,
    args: [
        {
            name: "guild ID",
            description: "The guild to get player from",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.Guild
        },
        {
            name: "property",
            description: "The property to get of this info",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String
        }
    ],
    brackets: true,
    execute(ctx, [g, prop]) {
        const pl = __1.LavaForge.Instance.manager.players.get(g.id);
        if (!pl)
            return this.success();
        const track = pl.queue.current;
        if (!track)
            return this.success();
        return this.success(track.data.info[prop]);
    },
});
//# sourceMappingURL=lavalinkCurrentTrackInfo.js.map