'use strict'

const {Scene, GameObject, Script} = require('../src')

/* global describe,it,expect*/

describe('Base TEST', () => {

  it('Should gracefully work', () => {
    expect(() => new Scene()).not.toThrow()
  })

  it('Should have hierarchy', () => {
    const scene = new Scene()
    const gameObject = new GameObject({name: 'TestGameObject'})
    const child = new Script({name: 'TestChild'})
    gameObject.addScript(child)
    scene.addScript(gameObject)
    scene.onStart()
    expect(scene.scripts[0].name).toEqual('TestGameObject')
    expect(gameObject.scripts[0].name).toEqual('TestChild')
  })

  it('Should run scripts in hierarchy', () => {
    const scene = new Scene()
    const gameObject = new GameObject({name: 'TestGameObject'})
    const child = new Script({name: 'TestScript', onStart () { this.started = true }})
    gameObject.addScript(child)
    scene.addScript(gameObject)
    scene.onStart()
    expect(gameObject.scripts[0].started).toEqual(true)
  })

})
