"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
const noop_1 = __importDefault(require("../noop"));
exports.default = new forgescript_1.NativeFunction({
    name: "$lavalinkSearch",
    description: "Performs a lavalink search, returns the load type, or nothing if failed",
    unwrap: true,
    args: [
        {
            name: "search",
            description: "Data to search with",
            rest: false,
            required: true,
            type: forgescript_1.ArgType.String
        },
        {
            name: "source",
            description: "The source to search on",
            rest: false,
            required: false,
            type: forgescript_1.ArgType.String
        }
    ],
    brackets: true,
    async execute(ctx, [data, source]) {
        const node = __1.LavaForge.Instance.manager.getLeastUsedNode();
        if (!node)
            return this.success();
        const search = await node.search({
            query: data,
            source: source || "ytsearch"
        }).catch(noop_1.default);
        if (!search)
            return this.success();
        Reflect.set(ctx, "tracks", search.tracks);
        return this.success(search.loadType);
    },
});
//# sourceMappingURL=lavalinkSearch.js.map