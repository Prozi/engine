'use strict'

/**
 * This is a Vector(x, y, z) with setPosition fuction
 */
class Vector3 {
  /**
   * Create and initialize
   * @param {number} x x-axis position, float
   * @param {number} y y-axis position, float
   * @param {number} z z-axis position, float
   */
  constructor(x = 0, y = 0, z = 0) {
    this.setPosition({ x, y, z })
  }
  /**
   * Set Vector position by object{x, y, z}
   * @param {object} position contains {x, y, z}
   */
  setPosition({ x, y, z }) {
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
   * @param {object} props contains {name, active, onEnable?, onDisable?, onStart?, onUpdate?}
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
   * Setter for active flag
   * calls onEnable / onDisable
   * @param {boolean} active active flag
   */
  set active(active) {
    this._active = active
    active ? this.onEnable() : this.onDisable()
  }
  /**
   * Dummy function for override
   */
  onEnable() {
  }
  /**
   * Dummy function for override
   */
  onDisable() {
  }
  /**
   * Dummy function for override
   */
  onStart() {
  }
  /**
   * Dummy function for override
   */
  onUpdate() {
  }
}

/**
 * To differentiate Scripts from simple Components
 */
class Script extends Component {
  /**
   * Initializes component with props
   * @param {object} props contains {name, active, onEnable?, onDisable?, onStart?, onUpdate?}
   */
  constructor(props) {
    super(Object.assign({name: 'Script'}, props))
  }
}

/**
 * Simple GameObject that has
 * children: GameObject[]
 * addChild(child: GameObject)
 * removeChild(child: GameObject)
 */
class GameObject extends Component {
  /**
   * Initializes component with props
   * @param {object} props contains {name, active, onEnable?, onDisable?, onStart?, onUpdate?}
   */
  constructor(props = {}) {
    super(Object.assign({name: 'GameObject'}, props))

    this.parent = props.parent || null
    this.children = props.children || []

    this.transform = new Vector3(0, 0, 0)
    props.position && this.transform.setPosition(props.position)
  }
  /**
   * propagate event to Children
   */
  onStart() {
    this.children.forEach((child) => child.onStart())
  }
  /**
   * propagate event to Children
   */
  onUpdate() {
    this.children.forEach((child) => child.onUpdate())
  }
  /**
   * Adds child
   * @param {GameObject} child Component/GameObject instance
   */
  addChild(child) {
    if (child instanceof Component && child.parent !== this) {
      child.parent && child.parent.removeChild(child)
      this.children.push(child)
      child.parent = this
    }
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
 * To differentiate Scenes from simple GameObjects
 */
class Scene extends GameObject {
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
