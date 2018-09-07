# @minininja/engine

A simple zero-dependency modular game engine for bootstrapping games.

## Installation

`npm i --save @minininja/engine`


## Documentation

https://prozi.github.io/engine/


## Contents

✅ `Scene`: class

✅ `GameObject`: class

✅ `Script`: class


## About

Changes from `Scene` / `GameObject` propagate to its children

All constructors eat a `JSON` with parameters:

✅ `name`: string

✅ `active`: boolean

and four optional handlers:

✅ `onEnable`: function

✅ `onDisable`: function

✅ `onStart`: function

✅ `onUpdate`: function


## License

MIT


## Author

Jacek Pietal <prozi85@gmail.com>
