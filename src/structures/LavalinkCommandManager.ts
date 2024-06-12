import { BaseCommandManager } from "@tryforge/forgescript";
import { LavalinkOpCodes } from "rawrlink/dist/typings/enums/LavalinkOpCodes";

export class LavalinkCommandManager extends BaseCommandManager<LavalinkOpCodes> {
    handlerName: string = "ForgeLinkCommands"
}