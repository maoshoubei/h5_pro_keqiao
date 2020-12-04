import { EventEmitter } from 'events';

// 事件对象
export const emitter = new EventEmitter();

/**
 * 获取Navar标题
 */
export const getTitle = func => emitter.on('showTitle', title => func(title));

/**
 * 设置NavBar标题
 * @param {string} title
 */
export const setTitle = title => emitter.emit('showTitle', title);
