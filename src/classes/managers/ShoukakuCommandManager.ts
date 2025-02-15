import { BaseCommandManager } from '@tryforge/forgescript'
import type { ShoukakuEvents } from 'shoukaku'

export class ShoukkauCommandManager extends BaseCommandManager<keyof ShoukakuEvents> {
    handlerName = 'shoukakuCommands'
}