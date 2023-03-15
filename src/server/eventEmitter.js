import { EventEmitter } from 'node:events';

export const ServerEventBus = new EventEmitter();

export const articleCreatedEvent = 'articleCreatedEvent';
export const articleRemovedEvent = 'articleRemovedEvent';
