// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {AppSchema, Database} from '@nozbe/watermelondb';
import Model from '@nozbe/watermelondb/Model';
import {Migration} from '@nozbe/watermelondb/Schema/migrations';
import {Class} from '@nozbe/watermelondb/utils/common';

import {IsolatedEntities, OperationType} from '../../app/database/admin/data_operator';
import {DatabaseType} from '../../app/database/admin/database_manager';

export type MigrationEvents = {
    onSuccess: () => void,
    onStarted: () => void,
    onFailure: (error: string) => void,
}

export type MMAdaptorOptions = {
    dbPath: string,
    schema: AppSchema,
    migrationSteps?: Migration [],
    migrationEvents?: MigrationEvents
}

export type MMDatabaseConnection = {
    actionsEnabled?: boolean,
    dbName: string,
    dbType?: DatabaseType.DEFAULT | DatabaseType.SERVER,
    serverUrl?: string,
}

export type DefaultNewServer = {
    databaseFilePath: string,
    displayName: string,
    serverUrl: string
}

// A database connection is of type 'Database'; unless it fails to be initialize and in which case it becomes 'undefined'
export type DatabaseInstance = Database | undefined

export type RawApp = {
    buildNumber: string,
    createdAt: number,
    id: string,
    versionNumber: string,
}

export type RawGlobal = {
    id: string,
    name: string,
    value: string,
}

export type RawServers = {
    dbPath: string,
    displayName: string,
    id: string,
    mentionCount: number,
    unreadCount: number,
    url: string
}

export type RawCustomEmoji = {
    id: string,
    name: string
}

export type RawRole = {
    id: string,
    name: string,
    permissions: []
}

export type RawSystem = {
    id: string,
    name: string,
    value: string
}

export type RawTermsOfService = {
    id: string,
    acceptedAt: number
}

export type RawEmbeds = [{ type: string, url: string, data: {} }]

export type RawEmojis = [{ id: string, creator_id: string, name: string, create_at: number, update_at: number, delete_at: number }]

export type RawFile = {
    create_at: number,
    delete_at: number,
    extension: string,
    has_preview_image: boolean,
    height: number,
    id: string,
    localPath?: string,
    mime_type: string,
    name: string,
    post_id: string,
    size: number,
    update_at: number,
    user_id: string,
    width: number,
}

export type RawReaction = {
    create_at: number
    emoji_name: string,
    post_id: string,
    user_id: string,
}

// The RawPost describes the shape of the object received from a getPosts request
export type RawPost = {
    channel_id: string,
    create_at: number,
    delete_at: number,
    edit_at: number,
    file_ids: string[],
    filenames: string[]
    hashtags: string,
    id: string,
    is_pinned?: boolean,
    last_reply_at?: number,
    message: string,
    original_id: string,
    parent_id: string,
    participants?: null,
    pending_post_id: string,
    prev_post_id?: string, // taken from getPosts API call; outside of post object
    props: object,
    reply_count?: 0,
    root_id: string,
    type: string,
    update_at: number,
    user_id: string,
    metadata: {
        embeds: RawEmbeds,
        emojis: RawEmojis,
        files: RawFile[],
        images: {},
        reactions: RawReaction[]
    }
}

export type RecordValue = RawApp | RawGlobal | RawServers | RawCustomEmoji | RawRole | RawSystem | RawTermsOfService | RawPost

export type DataFactory = {
    db: Database,
    generator?: (model: Model) => void,
    optType?: OperationType,
    tableName?: string,
    value: RecordValue,
}

export type Records = RecordValue | RecordValue[]

export type HandleBaseData = {
    optType: OperationType,
    tableName: string,
    values: Records,
    recordOperator: (recordOperator: DataFactory) => void
}

export type BatchOperations = { db: Database, models: Model[] }

export type HandleIsolatedEntityData = { optType: OperationType, tableName: IsolatedEntities, values: Records }

export type Models = Class<Model>[]

// The elements needed to create a new connection
export type DatabaseConnection = {
    databaseConnection: MMDatabaseConnection,
    shouldAddToDefaultDatabase: boolean
}

// The elements required to switch to another active server database
export type ActiveServerDatabase = { displayName: string, serverUrl: string }
