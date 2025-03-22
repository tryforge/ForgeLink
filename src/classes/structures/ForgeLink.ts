import { EventManager, ForgeClient, ForgeExtension, FunctionManager } from '@tryforge/forgescript'
import { 
    LavalinkManager,
    ManagerOptions, 
    LavalinkNodeOptions, 
    PlayerEvents,
    SearchPlatform,
    QueueStoreManager,
    QueueChangesWatcher,
    Player,
    Track,
    StoredQueue,
    UnresolvedTrack,
    LyricsResult,
    LyricsLine
} from 'lavalink-client'
import { LavalinkManager as CommandManager } from '@managers/LavalinkCommandManager'
import { join } from 'path'

// Fixed CustomStore implementation with required methods
class CustomStore implements QueueStoreManager {
    private storage = new Map<string, string>();
    
    async get(guildId: string): Promise<string | null> {
        return this.storage.get(guildId) || null;
    }
    
    async set(guildId: string, data: string): Promise<void> {
        this.storage.set(guildId, data);
    }
    
    async delete(guildId: string): Promise<void> {
        this.storage.delete(guildId);
    }
    
    // Fixed to match QueueStoreManager interface
    stringify(value: string | StoredQueue): Promise<string | StoredQueue> {
        if (typeof value === 'string') {
            return Promise.resolve(value);
        }
        return Promise.resolve(JSON.stringify(value));
    }
    
    // Fixed to match QueueStoreManager interface
    parse(data: string): Promise<StoredQueue> {
        return Promise.resolve(JSON.parse(data));
    }
}

// Fixed CustomWatcher implementation with required methods
class CustomWatcher implements QueueChangesWatcher {
    private manager: LavalinkManager;
    
    constructor(private client: ForgeClient) {}
    
    setManager(manager: LavalinkManager) {
        this.manager = manager;
    }
    
    // Fixed to match QueueChangesWatcher interface
    tracksAdd(guildId: string, tracks: (Track | UnresolvedTrack)[], position: number, oldStoredQueue: StoredQueue, newStoredQueue: StoredQueue): void {
        const player = this.manager?.players.get(guildId);
        if (!player) return;
        
        // Implementation with player and tracks
        // You can convert this.manager.players.get(guildId) to get the Player object
    }
    
    // Fixed to match QueueChangesWatcher interface
    tracksRemoved(guildId: string, tracks: (Track | UnresolvedTrack)[], position: number | number[], oldStoredQueue: StoredQueue, newStoredQueue: StoredQueue): void {
        const player = this.manager?.players.get(guildId);
        if (!player) return;
        
        // Implementation with player and tracks
    }
    
    // Fixed to match QueueChangesWatcher interface
    shuffled(guildId: string, oldStoredQueue: StoredQueue, newStoredQueue: StoredQueue): void {
        const player = this.manager?.players.get(guildId);
        if (!player) return;
        
        // Implementation
    }
}

export interface ForgeLinkSetupOptions {
    /**
     * The events the extension should listen to.
     */
    events?: {
        player?: (keyof PlayerEvents)[]
    }
    
    /**
     * The lavalink nodes to connect.
     * @example
     * nodes: [{
     *     host: 'localhost',
     *     port: 2333,
     *     authorization: 'youshallnotpass',
     *     id: 'main',
     *     secure: false
     * }]
     */
    nodes: LavalinkNodeOptions[]
    
    /**
     * Default volume for players
     * @default 100
     */
    defaultVolume?: number
    
    /**
     * Whether to autoSkip on error
     * @default true
     */
    autoSkip?: boolean
    
    /**
     * Whether to skip songs when resolving errors occur
     * @default true
     */
    autoSkipOnResolveError?: boolean
    
    /**
     * Whether to only emit new songs and not looping ones
     * @default true
     */
    emitNewSongsOnly?: boolean
    
    /**
     * Optional function to transform requester data
     */
    requesterTransformer?: (requester: unknown) => unknown
    
    /**
     * Optional autoplay function
     */
    autoPlayFunction?: (player: Player, lastPlayedTrack: Track) => Promise<void>
    
    /**
     * Player options
     */
    playerOptions?: {
        applyVolumeAsFilter?: boolean
        clientBasedPositionUpdateInterval?: number
        defaultSearchPlatform?: SearchPlatform
        volumeDecrementer?: number
        useUnresolvedData?: boolean
        onDisconnect?: {
            autoReconnect?: boolean
            destroyPlayer?: boolean
        }
        onEmptyQueue?: {
            destroyAfterMs?: number
        }
    }
    
    /**
     * Queue options
     */
    queueOptions?: {
        maxPreviousTracks?: number
    }
    
    /**
     * Whether to allow links
     * @default true
     */
    linksAllowed?: boolean
    
    /**
     * List of blacklisted links
     */
    linksBlacklist?: string[]
    
    /**
     * List of whitelisted links
     */
    linksWhitelist?: string[]
}

export class ForgeLink extends ForgeExtension {
    name = 'ForgeLink'
    description = 'ForgeScript integration with lavalink-client'
    version = '1.0.0'
    
    #e: LavalinkManager | null = null
    #kc: CommandManager
    #store: CustomStore
    #watcher: CustomWatcher
    
    constructor(public options: ForgeLinkSetupOptions) {
        super()
        this.#store = new CustomStore()
    }
    
    init(client: ForgeClient): void {
        this.#watcher = new CustomWatcher(client);
        
        this.#e = new LavalinkManager({
            nodes: this.options.nodes,
            
            sendToShard: (guildId, payload) => {
                const guild = client.guilds.cache.get(guildId);
                if (guild) guild.shard.send(payload);
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
                defaultSearchPlatform: this.options.playerOptions?.defaultSearchPlatform ?? "ytsearch" as SearchPlatform,
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
        this.#kc = new CommandManager(client);

        client.on('raw', (packet) => {
            if (
                packet && 
                ['VOICE_SERVER_UPDATE', 'VOICE_STATE_UPDATE'].includes(packet.t)
            ) {const nodes = this.#e?.nodeManager?.nodes;
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
        
        FunctionManager.load('ForgeLink', join(__dirname, '../../natives'));
        EventManager.load('lavalinkEvents', join(__dirname, '../../events/player'));
        EventManager.load('lavalinkNodeEvents', join(__dirname, '../../events/node'));
        
        if (this.options.events?.player?.length) {
            for (const event of this.options.events.player) {
                this.#e.on(event as any, (...args) => {
                    client.emit(`lavalink${event.charAt(0).toUpperCase() + event.slice(1)}`, ...args);
                });
            }
        }
        client.events.load('lavalinkEvents', this.options.events?.player ?? []);
        client.events.load('lavalinkNodeEvents', this.options.events?.player ?? []);
    }
    
    get lavalink(): LavalinkManager | null {
        return this.#e;
    }
    
    get commands() {
        return {
            player: this.#kc
        };
    }
}