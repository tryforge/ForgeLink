import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { NekoLavalinkManager } from "rawrlink";
import { LavalinkOpCodes } from "rawrlink/dist/typings/enums/LavalinkOpCodes";
import { ILavalinkNodeData } from "rawrlink/dist/typings/interfaces/ILavalinkNodeData";
import { LavalinkCommandManager } from "./structures/LavalinkCommandManager";
export interface ILavalinkCommand {
    type: LavalinkOpCodes;
    code: string;
}
export declare const LavalinkEventStorage = "lavalink";
export interface ILavaForgeOptions {
    clientId: string;
    nodes: ILavalinkNodeData[];
    events?: LavalinkOpCodes[];
}
export declare class LavaForge extends ForgeExtension {
    readonly options: ILavaForgeOptions;
    static Instance: LavaForge;
    name: string;
    description: string;
    version: string;
    commands: LavalinkCommandManager;
    client: ForgeClient;
    manager: NekoLavalinkManager;
    constructor(options: ILavaForgeOptions);
    init(client: ForgeClient): void;
    private voiceUpdateHandler;
}
//# sourceMappingURL=index.d.ts.map