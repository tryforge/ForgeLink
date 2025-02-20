<img src="https://i.imgur.com/Ew9MXaP.jpeg" align="right" height=100 alt="isologo" />

# ForgeLink
Music made stronger with Lavalink for [ForgeScript](https://npmjs.com/package/@tryforge/forgescript).

<a href="https://github.com/tryforge/ForgeDB/"><img src="https://img.shields.io/github/package-json/v/tryforge/ForgeLink/main?label=@tryforge/forge.link&color=5c16d4" alt="@tryforge/forge.link"></a>
<a href="https://github.com/tryforge/ForgeScript/"><img src="https://img.shields.io/github/package-json/v/tryforge/ForgeScript/main?label=@tryforge/forgescript&color=5c16d4" alt="@tryforge/forgescript"></a>
<a href="https://discord.gg/hcJgjzPvqb"><img src="https://img.shields.io/discord/739934735387721768?logo=discord" alt="Discord"></a>

-----
## Features
- Easy to use functions.
- Various amount of events.
- Support for various filters.
- Support for all audio providers.
- Support for playlists.

----
## Contents
1. [Installation](#installation)
2. [Setup](#setup)
    1. [Listening Events](#listening-events)
        
    2. [Commands](#commands)
                    
3. [lavalink initiation](#lavalink-initiation)
4. [Tips](#tips)
    1. [Default Search Engine](#default-search-engine)
5. [Contributors](#contributors)
----
## Installation

> [!CAUTION]
> ForgeLink is in no way compatible with ForgeMusic at the moment so please chose to use this if you know what you are doing and know how to use lavalink.


In your project, navigate to your terminal and write the following command.
```bash
npm install @tryforge/forge.link
```
If you are using another package manager than npm, Google how to install Node.js dependencies.

----
## Setup
Now, you must require the `ForgeLink` class in your main file.
```js
const { ForgeLink } = require("@tryforge/forge.link");
```
As it is required, now you are allowed to create an instance of it.
```js
const lavalink = new ForgeLink({
    events: {}
});
```
Now, extension is defined and ready to be attached to the client.
```js
const client = new ForgeClient({
    extensions: [lavalink],
    // ...client options
});
```
> [!CAUTION]
> Your `ForgeClient` instance requires the following intent in order for most ForgeLink functions to work: **GuildVoiceStates**.
### Listening Events
ForgeLink provides a simple interface to declare the events to listen to.
First, we need to declare the `kazugomo` in our events.
```js
const lavalink = new ForgeLink({
    events: {
        kazagumo: [],
    },
});
```

Now that you have done that you can parse events into ForgeLink without any issue
```js
const lavalink = new ForgeLink({
    events: {
        kazagumo: ['playerStart']
    },
});
```
Current setup must look like this.
```js
const { ForgeLink } = require("@tryforge/forge.link");
const lavalink = new ForgeLink({
    events: {
        kazagumo: ['playerStart']
    },
});

const client = new ForgeClient({
    extensions: [lavalink],
    // ...client options
});
```

### Commands
To add event commands, ForgeLink provides an integrated command manager to take care of this.
You must define your commands after your ForgeClient definition to prevent errors.
```js
// Adding directly.
lavalink.commands.kazagumo.add({
    name: "eventName",
    code: "$log[A track started playing.]"
});
```
## Lavalink Initiation
When setting up forge link you must declare your lavalink server. there are a wide range of lavalink servers online. to declare your lavalink server modify your setup to include this

```js
const lavalink = new ForgeLink({
    events: {
        kazagumo: ['playerStart'],
    },
    nodes: [
        {
            name: 'INZEWORLD.COM (DE)',
            auth: 'saher.inzeworld.com',
            url: 'lava.inzeworld.com:3128',
            secure: false
        }
    ]
})
```

## Tips
### Default Search Engine
Lavalink includes various types of search engines pick one as follows
```js
const lavalink = new ForgeLink({
    // ...
        kazagumoOptions: {
        defaultSearchEngine: 'youtube'
    },
});
```

## Contributors
Many Thanks to the people who made this possible! ❤️

Special Thanks too [Cyberghost](https://github.com/Cyberghxst) for helping make the managers to make this work including event and command manager without him this would be impossible!

This package was made with ♥️ by [Econome](https://discord.com/users/838105973985771520)

We Hope you enjoy using ForgeLink
[![tryforge/ForgeLink](https://contrib.rocks/image?repo=tryforge/ForgeLink)](https://github.com/tryforge/ForgeLink)
