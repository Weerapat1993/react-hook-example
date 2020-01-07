/**
 * Random Number
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Number}
 */
export const random = (min, max) => Math.floor(Math.random() * max) + min;