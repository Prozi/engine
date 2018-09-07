'use strict'

const {GameObject, Scene, Script} = require('../src')

/* global describe,it,expect*/

describe('Base TEST', () => {

  it('Should gracefully work', () => {
    expect(() => new Scene()).not.toThrow()
  })

  it('Should have hierarchy', () => {
    const scene = new Scene()
    const go = new GameObject({name: 'TestGameObject'})
    const child = new GameObject({name: 'TestChild'})
    go.addChild(child)
    scene.addChild(go)
    scene.onStart()
    expect(scene.children[0].name).toEqual('TestGameObject')
    expect(go.children[0].name).toEqual('TestChild')
  })

  it('Should run scripts in hierarchy', () => {
    const scene = new Scene()
    const go = new GameObject({name: 'TestGameObject'})
    const script = new Script({name: 'TestScript', onStart () { this.started = true }})
    go.addChild(script)
    scene.addChild(go)
    scene.onStart()
    expect(script.started).toEqual(true)
  })

})
