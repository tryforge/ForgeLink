import { BaseEventHandler, ForgeClient } from '@tryforge/forgescript'
import { ForgeLink } from '@structures/ForgeLink'

type LavalinkEventNames = 
  | 'trackStart'
  | 'trackEnd'
  | 'trackStuck'
  | 'trackError'
  | 'queueEnd'
  | 'playerCreate'
  | 'playerDestroy'
  | 'playerMove'
  | 'playerDisconnect'
  | 'playerUpdate'
  | 'playerVoiceJoin'
  | 'playerVoiceLeave'
  | 'debug'
  | 'connect'
  | 'disconnect'
  | 'reconnecting'
  | 'create'
  | 'destroy'
  | 'error'
  | 'resumed'
  ;

export class LavalinkEventHandler<T extends LavalinkEventNames = LavalinkEventNames> extends BaseEventHandler<any, T> {
    register(client: ForgeClient): void {
        const forgeLink = client.getExtension(ForgeLink, true);
        if (forgeLink.lavalink) {
            forgeLink.lavalink.on(this.name as any, (...args: any[]) => {
                this.listener.apply(client, args);
            });
        } else {
            console.warn(`[ForgeLink] Attempted to register event "${this.name}" but lavalink manager is not initialized.`);
        }
    }
}