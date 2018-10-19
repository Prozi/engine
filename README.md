# @minininja/engine

A simple zero-dependency modular game engine for bootstrapping games.

## Installation

`npm i --save @minininja/engine`


## Documentation

https://prozi.github.io/engine/


## Base concept

1. You create `GameObject`s + `Script`s / `Component`s.

2. Each `GameObject` has a `Transform` property which is either a base `Vector3` instance some kind of i.e. `pixi.js` or `three.js` object.

3. Scripts have a `many to one` relationship with a `GameObject`.

4. You append a script's `Transform` to a `GameObject`'s `Transform`. Once you call one `GameObject`s `onUpdate` it propagates to all its children.

5. You can reference a `Transform`'s parent `GameObject` by `this.gameObject` accessor and `GameObject`'s `Transform` by `this.transform` in `GameObject` context.


## Classes

✅ `Vector3`: class

* Recommended read: [Vector3](https://docs.unity3d.com/ScriptReference/Vector3.html)

✅ `Component`: class

* Recommended read: [Component](https://docs.unity3d.com/510/Documentation/Manual/TheGameObject-ComponentRelationship.html)

✅ `Script`: Component

✅ `Transform`: Vector3

* Recommended read: [Transform](https://docs.unity3d.com/Manual/Transforms.html)

* This is a `transform` property in a `GameObject`.

* This is to be replaced in child class with an instance of any child of [PIXI.DisplayObject](http://pixijs.download/dev/docs/PIXI.DisplayObject.html)

✅ `GameObject`: Component

* Recommended read: [GameObject](https://docs.unity3d.com/Manual/class-GameObject.html)

✅ `Scene`: GameObject

* transform = [PIXI.Container](http://pixijs.download/dev/docs/PIXI.Container.html)

✅ `Vector3`: class

Recommended read: [Vector3](https://docs.unity3d.com/ScriptReference/Vector3.html)


## TL; DR

All constructors eat a `JSON` with parameters:

✅ `name`: string

✅ `active`: boolean

and four optional handlers:

✅ `onEnable`: function

✅ `onDisable`: function

✅ `onStart`: function

✅ `onUpdate`: function

✅ `transform`: property (Vector3, source of position you can overwrite with anything)


## Notable Mentions

https://www.npmjs.com/package/@minininja/pixijs -> for use of this library with `pixi.js`

https://prozi.github.io/engine-pixijs/demo/ -> benchmark / demo of the above


## License

MIT


## Author

Jacek Pietal <prozi85@gmail.com>
