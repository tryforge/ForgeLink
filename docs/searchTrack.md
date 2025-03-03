# $searchTrack
Searches for tracks in the guild and returns results.
## Usage
```
$searchTrack[guildID;query;limit?]
```
## Fields
|   Name   |               Description                |  Type  | Required | Rest |
|----------|------------------------------------------|--------|----------|------|
| Guild ID | The ID of the guild to search in.        | Guild  | Yes      | No   |
| Query    | The search query.                        | String | Yes      | No   |
| Limit    | The maximum number of results to return. | Number | No       | No   |

## Output
> Json
View source on [GitHub](https://github.com/tryforge/forgelink/blob/dev/src/natives/searchTrack.ts)