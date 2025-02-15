# $createPlayer
Creates a new music player in the given guild.
## Usage
```
$createPlayer[guildID;voiceID;textID?]
```
## Fields
|   Name   |                 Description                  |    Type     | Required | Rest |
|----------|----------------------------------------------|-------------|----------|------|
| Guild ID | The ID of the guild to create the player to. | Guild       | Yes      | No   |
| Voice ID | The voice channel to connect to.             | Channel     | Yes      | No   |
| Text ID  | The text channel to send messages to.        | TextChannel | No       | No   |

## Output
> Boolean
View source on [GitHub](https://github.com/tryforge/forgelink/blob/dev/src/natives/createPlayer.ts)