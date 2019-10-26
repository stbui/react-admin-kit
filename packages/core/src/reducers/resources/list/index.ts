/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import { combineReducers } from 'redux';

import total from './total';
import params from './params';
import ids from './ids';
import loadedOnce from './loadedOnce';

export default combineReducers({ ids, params, total, loadedOnce });
