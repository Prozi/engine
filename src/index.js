'use strict'

/**
 * This is a Vector(x, y, z) with set(position) fuction
 */
class Vector3 {
  /**
   * Create and initialize
   * @param {number} x x-axis position, float
   * @param {number} y y-axis position, float
   * @param {number} z z-axis position, float
   */
  constructor(x = 0, y = 0, z = 0) {
    this.set({ x, y, z })
  }
  /**
   * Set Vector position by object{x, y, z}
   * @param {object} position contains {x, y, z}
   */
  set({ x, y, z }) {
    this.x = x
    this.y = y
    this.z = z  
  }
}

/**
 * This is a basic Component class with
 * name: string
 * active: boolean (defaults to true)
 * handlers: onEnable, onDisable, onStart, onUpdate
 */
class Component {
  /**
   * Initializes component with props
   * @param {object} props
   * @param {string} [props.name=Component]
   * @param {boolean} [props.active=true]
   * @param {function} [props.onEnable]
   * @param {function} [props.onDisable]
   * @param {function} [props.onStart]
   * @param {function} [props.onUpdate]
   */
  constructor(props = {}) {
    this.name = props.name || 'Component'
    // defaults to true, but can be set to false at creation
    this.active = props.hasOwnProperty('active') ? props.active : true;
    // bind event handlers
    ['onEnable', 'onDisable', 'onStart', 'onUpdate']
      .filter((handlerName) => props[handlerName])
      .forEach((handlerName) => { this[handlerName] = props[handlerName].bind(this) })
  }
  /**
   * Getter for active flag
   */
  get active() {
    return this._active || false
  }
  /**
   * Setter for active flag + calls onEnable / onDisable
   * @param {boolean} active active flag
   */
  set active(active) {
    this._active = active
    active ? this.onEnable() : this.onDisable()
  }
  /**
   * Dummy onEnable function to override
   */
  onEnable() {
  }
  /**
   * Dummy onDisable function to override
   */
  onDisable() {
  }
  /**
   * Dummy onStart function to override
   */
  onStart() {
  }
  /**
   * Dummy onUpdate function to override
   */
  onUpdate() {
  }
  /**
   * Dummy onAfterUpdate function to override
   */
  afterStart() {
  }
  /**
   * Dummy onAfterUpdate function to override
   */
  afterUpdate() {
  }
}

/**
 * To differentiate Scripts from simple Components
 */
class Script extends Component {
  /**
   * Initializes component with props
   * @extends Component
   * @param {object} props
   * @param {string} [props.name=Script]
   * @param {boolean} [props.active=true]
   * @param {function} [props.onEnable]
   * @param {function} [props.onDisable]
   * @param {function} [props.onStart]
   * @param {function} [props.onUpdate]
   */
  constructor(props) {
    super(Object.assign({name: 'Script'}, props))
  }
}

/** 
 * Mockup/base transform for engine
 * - has children
 * - can add children
 * - can remove children
 * this class may be/is overwritten in child repositories by DRAWABLE instance
 */
class Transform {
  constructor(gameObject) {
    this.children = []
    this.parent = null
    this.gameObject = gameObject
    this.position = new Vector3(0, 0, 0)
  }
  /**
   * Adds child
   * @param {GameObject} child Component/GameObject instance
   */
  addChild(child) {
    if (child.parent) {
      child.parent.removeChild(child)
    }
    this.children.push(child)
  }
  /**
   * Removes child
   * @param {GameObject} child Component/GameObject instance
   */
  removeChild(child) {
    const index = this.children.indexOf(child)
    if (index !== -1) {
      this.children.splice(index, 1)
    }
  }
}

/**
 * Simple GameObject API
 */
class GameObject extends Component {
  /**
   * Initializes component with props
   * @extends Component
   * @param {object} props
   * @param {string} [props.name=GameObject]
   * @param {boolean} [props.active=true]
   * @param {function} [props.onEnable]
   * @param {function} [props.onDisable]
   * @param {function} [props.onStart]
   * @param {function} [props.onUpdate]
   */
  constructor(props = {}) {
    super(Object.assign({name: 'GameObject'}, props))

    this.scripts = props.scripts || []
    this.transform = this.createTransform()

    if (props.children) {
      props.children.forEach((child) => this.transform.addChild(child))
    }
    if (props.position) {
      this.transform.position.set(props.position)
    }
  }
  /**
   * overwritten in child repositories
   */
  createTransform() {
    return new Transform(this)
  }
  /**
   * propagate event to Children
   */
  onStart() {
    const children = this.scripts.filter((script) => script.active)
    children.forEach((script) => script.onStart())
    children.forEach((script) => script.afterUpdate())
  }
  /**
   * propagate event to Children
   */
  onUpdate() {
    const children = this.scripts.filter((script) => script.active)
    children.forEach((script) => script.onUpdate())
    children.forEach((script) => script.afterUpdate())
  }
  /**
   * adds a script to scripts
   * @param {Component} script
   */
  addScript(script) {
    if (script.parent) script.parent.removeScript(script)
    script.parent = this
    this.scripts.push(script)
  }
  /**
   * adds a script to scripts
   * @param {Component} script
   */
  removeScript(script) {
    const index = this.scripts.indexOf(script)
    if (index !== 0) this.scripts.splice(index, 1)
  }
}

/**
 * To differentiate Scenes from simple GameObjects
 */
class Scene extends GameObject {
  /**
   * Creates a new scene with props
   * @extends GameObject
   * @param {object} props
   * @param {string} [props.name=Scene]
   * @param {boolean} [props.active=true]
   * @param {function} [props.onEnable]
   * @param {function} [props.onDisable]
   * @param {function} [props.onStart]
   * @param {function} [props.onUpdate]
   */
  constructor(props) {
    super(Object.assign({name: 'Scene'}, props))
  }
}

/*global module*/
if (typeof module !== 'undefined') {
  module.exports = {
    Scene, GameObject, Script
  }
}
