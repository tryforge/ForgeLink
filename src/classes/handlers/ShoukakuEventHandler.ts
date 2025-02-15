import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'
import { ShoukakuEvents } from 'shoukaku'

export class ShoukakuEventHandler<Events extends ShoukakuEvents = ShoukakuEvents, Names extends keyof Events = keyof Events> extends BaseEventHandler<Events, Names> {
    register(client: ForgeClient): void {
        client.getExtension(ForgeLink, true).kazagumo.shoukaku.on(this.name as keyof ShoukakuEvents, this.listener.bind(client))
    }
}