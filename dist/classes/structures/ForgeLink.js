"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeLink = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const lavalink_client_1 = require("lavalink-client");
const LavalinkCommandManager_1 = require("../managers/LavalinkCommandManager");
const path_1 = require("path");
// Fixed CustomStore implementation with required methods
class CustomStore {
    storage = new Map();
    async get(guildId) {
        return this.storage.get(guildId) || null;
    }
    async set(guildId, data) {
        this.storage.set(guildId, data);
    }
    async delete(guildId) {
        this.storage.delete(guildId);
    }
    // Fixed to match QueueStoreManager interface
    stringify(value) {
        if (typeof value === 'string') {
            return Promise.resolve(value);
        }
        return Promise.resolve(JSON.stringify(value));
    }
    // Fixed to match QueueStoreManager interface
    parse(data) {
        return Promise.resolve(JSON.parse(data));
    }
}
// Fixed CustomWatcher implementation with required methods
class CustomWatcher {
    client;
    manager;
    constructor(client) {
        this.client = client;
    }
    setManager(manager) {
        this.manager = manager;
    }
    // Fixed to match QueueChangesWatcher interface
    tracksAdd(guildId, tracks, position, oldStoredQueue, newStoredQueue) {
        const player = this.manager?.players.get(guildId);
        if (!player)
            return;
        // Implementation with player and tracks
        // You can convert this.manager.players.get(guildId) to get the Player object
    }
    // Fixed to match QueueChangesWatcher interface
    tracksRemoved(guildId, tracks, position, oldStoredQueue, newStoredQueue) {
        const player = this.manager?.players.get(guildId);
        if (!player)
            return;
        // Implementation with player and tracks
    }
    // Fixed to match QueueChangesWatcher interface
    shuffled(guildId, oldStoredQueue, newStoredQueue) {
        const player = this.manager?.players.get(guildId);
        if (!player)
            return;
        // Implementation
    }
}
class ForgeLink extends forgescript_1.ForgeExtension {
    options;
    name = 'ForgeLink';
    description = 'ForgeScript integration with lavalink-client';
    version = '1.0.0';
    #e = null;
    #kc;
    #store;
    #watcher;
    constructor(options) {
        super();
        this.options = options;
        this.#store = new CustomStore();
    }
    init(client) {
        this.#watcher = new CustomWatcher(client);
        this.#e = new lavalink_client_1.LavalinkManager({
            nodes: this.options.nodes,
            sendToShard: (guildId, payload) => {
                const guild = client.guilds.cache.get(guildId);
                if (guild)
                    guild.shard.send(payload);
                return Promise.resolve();
            },
            // Auto-skip options
            autoSkip: this.options.autoSkip ?? true,
            autoSkipOnResolveError: this.options.autoSkipOnResolveError ?? true,
            emitNewSongsOnly: this.options.emitNewSongsOnly ?? true,
            // Player configuration
            playerOptions: {
                maxErrorsPerTime: {
                    threshold: 10000,
                    maxAmount: 3
                },
                minAutoPlayMs: 10000,
                applyVolumeAsFilter: this.options.playerOptions?.applyVolumeAsFilter ?? false,
                clientBasedPositionUpdateInterval: this.options.playerOptions?.clientBasedPositionUpdateInterval ?? 50,
                defaultSearchPlatform: this.options.playerOptions?.defaultSearchPlatform ?? "ytsearch",
                volumeDecrementer: this.options.playerOptions?.volumeDecrementer ?? 0.75,
                useUnresolvedData: this.options.playerOptions?.useUnresolvedData ?? true,
                // Requester transformer
                requesterTransformer: this.options.requesterTransformer,
                // Disconnect behavior
                onDisconnect: {
                    autoReconnect: this.options.playerOptions?.onDisconnect?.autoReconnect ?? true,
                    destroyPlayer: this.options.playerOptions?.onDisconnect?.destroyPlayer ?? false
                },
                // Empty queue behavior
                onEmptyQueue: {
                    destroyAfterMs: this.options.playerOptions?.onEmptyQueue?.destroyAfterMs ?? 30000,
                    autoPlayFunction: this.options.autoPlayFunction
                }
            },
            // Queue configuration
            queueOptions: {
                maxPreviousTracks: this.options.queueOptions?.maxPreviousTracks ?? 10,
                queueStore: this.#store,
                queueChangesWatcher: this.#watcher
            },
            // Link filtering options
            linksAllowed: this.options.linksAllowed ?? true,
            linksBlacklist: this.options.linksBlacklist ?? [],
            linksWhitelist: this.options.linksWhitelist ?? [],
            // Advanced debug options
            advancedOptions: {
                enableDebugEvents: true,
                maxFilterFixDuration: 600000,
                debugOptions: {
                    noAudio: false,
                    playerDestroy: {
                        dontThrowError: false,
                        debugLog: false
                    },
                    logCustomSearches: false
                }
            }
        });
        this.#watcher.setManager(this.#e);
        this.#kc = new LavalinkCommandManager_1.LavalinkManager(client);
        client.on('raw', (packet) => {
            if (packet &&
                ['VOICE_SERVER_UPDATE', 'VOICE_STATE_UPDATE'].includes(packet.t)) {
                const nodes = this.#e?.nodeManager?.nodes;
                if (nodes) {
                    for (const [, node] of nodes) {
                        node.updatePlayer({
                            guildId: packet.d.guild_id,
                            playerOptions: {},
                            voiceChannelId: packet.d.channel_id,
                            ...packet.d
                        });
                    }
                }
            }
        });
        forgescript_1.FunctionManager.load('ForgeLink', (0, path_1.join)(__dirname, '../../natives'));
        forgescript_1.EventManager.load('lavalinkEvents', (0, path_1.join)(__dirname, '../../events'));
        if (this.options.events?.player?.length) {
            for (const event of this.options.events.player) {
                this.#e.on(event, (...args) => {
                    client.emit(`lavalink${event.charAt(0).toUpperCase() + event.slice(1)}`, ...args);
                });
            }
        }
        client.events.load('lavalinkEvents', this.options.events?.player ?? []);
    }
    get lavalink() {
        return this.#e;
    }
    get commands() {
        return {
            player: this.#kc
        };
    }
}
exports.ForgeLink = ForgeLink;
