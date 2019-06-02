/**
 * 由一个组件，向上找到最近的指定组件
 * @param {*} context 一般来说context为this(即为当前的组件)
 * @param {*} componentName
 * @returns {*} 返回一个组件
 */
function findComponentUpward (context, componentName) {
  let parent = context.$parent
  if (!parent) {
    return null
  }
  let name = parent.$options.name

  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent

    if (parent) {
      name = parent.$options.name
    }
  }
  return parent
}

export { findComponentUpward }

/**
 * 有一个组件，向上找到所有的指定组件
 * @param {*} context 一般来说context为this(即为当前的组件)
 * @param {*} componentName
 * @returns {*} 返回一组组件
 */
function findComponentsUpward (context, componentName) {
  let parents = []
  const parent = context.$parent
  let name = parent.$options.name
  if (parent) {
    if (name === componentName) {
      parents.push(parent)
    }
    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}

export { findComponentsUpward }

/**
 * 有一个组件，向下找到最近的指定组件
 * @param {*} context 一般来说context为this(即为当前的组件)
 * @param {*} componentName
 * @returns {*} 返回一组组件
 */
function findComponentDownward (context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name

      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}

export { findComponentDownward }

/**
 * 由一个组件，向下找到所有指定的组件
 * @param {*} context
 * @param {*} componentName
 */
function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)
    return components.concat(foundChilds)
  }, [])
}
export { findComponentsDownward }

/**
 * 由一个组件，找到指定组件的兄弟组件
 * @param {*} context
 * @param {*} componentName
 * @param {*} exceptMe 是否排除自己
 */
function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName
  })
  let index = res.findIndex(item => item._uid === context._uid)
  if (exceptMe) res.splice(index, 1)
  return res
}
export { findBrothersComponents }

function typeOf (obj) {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}
// deepCopy
export const deepCopy = data => {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

// 判断参数是否是其中一个
export const oneOf = (value, validList = []) => {
  return validList.includes(value)
}
// eslint-disable-next-line
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
export const camelCase = name => {
  return name
    .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter
    })
    .replace(MOZ_HACK_REGEXP, 'Moz$1')
}

export const getStyle = (element, styleName) => {
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') styleName = 'cssFloat'
  try {
    const computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (error) {
    return element.style[styleName]
  }
}
