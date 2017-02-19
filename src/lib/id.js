/**
 * Модуль для генерации идентификаторов
 * @module id
 */

import { v4 } from 'uuid';

/**
 * Создаёт RFC4122 v4 UUID
 * @function
 * @returns {string}
 */
export const randomId = () => v4();
