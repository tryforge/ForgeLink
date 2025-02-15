import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'
import { KazagumoEvents } from 'kazagumo'

export class KazagumoEventHandler<Events extends KazagumoEvents = KazagumoEvents, Names extends keyof Events = keyof Events> extends BaseEventHandler<Events, Names> {
    register(client: ForgeClient): void {
        client.getExtension(ForgeLink, true).kazagumo.on(this.name as keyof KazagumoEvents, this.listener.bind(client))
    }
}