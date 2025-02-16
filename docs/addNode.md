# $addNode
adds a player Nodes
## Usage
```
$addNode[name;authentication;url;secure]
```
## Fields
|      Name      |                Description                |  Type   | Required | Rest |
|----------------|-------------------------------------------|---------|----------|------|
| Name           | The name of the node to add to the player | String  | Yes      | No   |
| Authentication | The password to authenticate the node     | String  | Yes      | No   |
| URL            | The url for the client node               | URL     | Yes      | No   |
| Secure         | Whether or not the node is secure.        | Boolean | Yes      | No   |

## Output
> Boolean
View source on [GitHub](https://github.com/tryforge/forgelink/blob/dev/src/natives/addNode.ts)