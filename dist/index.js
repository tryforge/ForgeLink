"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LavaForge = exports.LavalinkEventStorage = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const rawrlink_1 = require("rawrlink");
const LavalinkCommandManager_1 = require("./structures/LavalinkCommandManager");
exports.LavalinkEventStorage = "lavalink";
class LavaForge extends forgescript_1.ForgeExtension {
    options;
    static Instance;
    name = "LavaForge";
    description = "Very efficient lavalink wrapper for forge";
    version = "1.0.0";
    commands;
    client;
    manager;
    constructor(options) {
        super();
        this.options = options;
    }
    init(client) {
        this.commands = new LavalinkCommandManager_1.LavalinkCommandManager(client);
        // Load events
        forgescript_1.EventManager.load(exports.LavalinkEventStorage, `${__dirname}/events`);
        // Load functions
        this.load(`${__dirname}/functions`);
        // Convenience
        this.client = client;
        this.manager = new rawrlink_1.NekoLavalinkManager(this.options.clientId, this.voiceUpdateHandler.bind(this), undefined, this.options.nodes);
        client.lavalink = this;
        LavaForge.Instance = this;
        // Load events specified in client options
        client.events.load(exports.LavalinkEventStorage, ...(this.options.events ?? []));
        // @ts-ignore
        client.on('raw', d => LavaForge.Instance.manager.updateVoiceData(d));
        // Connect lavalink nodes
        this.manager.connect();
    }
    voiceUpdateHandler(...[guildId, packet]) {
        this.client.guilds.cache.get(guildId)?.shard.send(packet);
    }
}
exports.LavaForge = LavaForge;
//# sourceMappingURL=index.js.map