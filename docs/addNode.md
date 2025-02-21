# $addNode
Adds a new Lavalink node.
## Usage
```
$addNode[name;authentication;host;port;secure]
```
## Fields
|      Name      |                Description                |  Type   | Required | Rest |
|----------------|-------------------------------------------|---------|----------|------|
| Name           | The name of the node to add to the player | String  | Yes      | No   |
| Authentication | The password to authenticate the node     | String  | Yes      | No   |
| Host           | The hostname or IP of the Lavalink server | String  | Yes      | No   |
| Port           | The port Lavalink is running on           | Number  | Yes      | No   |
| Secure         | Whether or not the node is secure.        | Boolean | Yes      | No   |

## Output
> Boolean
View source on [GitHub](https://github.com/tryforge/forgelink/blob/dev/src/natives/addNode.ts)