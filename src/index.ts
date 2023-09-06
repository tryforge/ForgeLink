import { EventManager, ForgeClient, ForgeExtension, FunctionManager, ICommand } from "forgescript";
import { NekoLavalinkManager } from "rawrlink"
import { LavalinkOpCodes } from "rawrlink/dist/typings/enums/LavalinkOpCodes";
import { ILavalinkNodeData } from "rawrlink/dist/typings/interfaces/ILavalinkNodeData";
import { VoiceStateUpdateHandle } from "rawrlink/dist/typings/types/VoiceStateUpdateHandle";

export interface ILavalinkCommand {
    type: LavalinkOpCodes
    code: string
}

export const LavalinkEventStorage = "lavalink"

export interface ILavaForgeOptions {
    clientId: string
    nodes: ILavalinkNodeData[]
    events?: LavalinkOpCodes[]
}

export class LavaForge extends ForgeExtension {
    public static Instance: LavaForge
    
    name: string = "LavaForge"
    description: string = "Very efficient lavalink wrapper for forge"
    version: string = "1.0.0"

    public client!: ForgeClient
    public manager!: NekoLavalinkManager

    public constructor(public readonly options: ILavaForgeOptions) {
        super()
    }

    addCommand(...commands: (ILavalinkCommand | ILavalinkCommand[])[]): void {
        for (const cmd of commands) {
            if (Array.isArray(cmd)) return this.addCommand(...cmd)
            this.client.commands.add(cmd as unknown as ICommand)
        }
    }

    getCommands(type: LavalinkOpCodes) {
        return this.client.commands.getCustom<any>(type)
    }

    init(client: ForgeClient): void {
        // Load events
        EventManager.load(LavalinkEventStorage, `${__dirname}/events`)
        
        // Load functions
        FunctionManager.load(`${__dirname}/functions`)

        // Convenience
        this.client = client
        this.manager = new NekoLavalinkManager(this.options.clientId, this.voiceUpdateHandler.bind(this), undefined, this.options.nodes)
        
        client.lavalink = this
        LavaForge.Instance = this

        // @ts-ignore
        client.on('raw', d => LavaForge.Instance.manager.updateVoiceData(d))

        // Connect lavalink nodes
        this.manager.connect()
    }

    private voiceUpdateHandler(...[guildId, packet]: Parameters<VoiceStateUpdateHandle>) {
        this.client.guilds.cache.get(guildId)?.shard.send(packet)
    }
}