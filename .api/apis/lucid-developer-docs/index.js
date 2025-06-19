"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var oas_1 = __importDefault(require("oas"));
var core_1 = __importDefault(require("api/dist/core"));
var openapi_json_1 = __importDefault(require("./openapi.json"));
var SDK = /** @class */ (function () {
    function SDK() {
        this.spec = oas_1.default.init(openapi_json_1.default);
        this.core = new core_1.default(this.spec, 'lucid-developer-docs/1.0.0 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    SDK.prototype.config = function (config) {
        this.core.setConfig(config);
    };
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    SDK.prototype.auth = function () {
        var _a;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        (_a = this.core).setAuth.apply(_a, values);
        return this;
    };
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    SDK.prototype.server = function (url, variables) {
        if (variables === void 0) { variables = {}; }
        this.core.setServer(url, variables);
    };
    /**
     * Create or Refresh Access Token
     *
     */
    SDK.prototype.createOrRefreshAccessToken = function (body) {
        return this.core.fetch('/oauth2/token', 'post', body);
    };
    /**
     * Introspect Access Token
     *
     */
    SDK.prototype.introspectAccessToken = function (body) {
        return this.core.fetch('/oauth2/token/introspect', 'post', body);
    };
    /**
     * Revoke Access Token
     *
     */
    SDK.prototype.revokeAccessToken = function (body) {
        return this.core.fetch('/oauth2/token/revoke', 'post', body);
    };
    /**
     * Get Account Information
     *
     */
    SDK.prototype.getAccountInformation = function (metadata) {
        return this.core.fetch('/accounts/me', 'get', metadata);
    };
    /**
     * Search Account Documents
     *
     */
    SDK.prototype.searchAccountDocuments = function (body, metadata) {
        return this.core.fetch('/accounts/me/documents/search', 'post', body, metadata);
    };
    /**
     * Create Legal Hold
     *
     */
    SDK.prototype.createLegalHold = function (body, metadata) {
        return this.core.fetch('/accounts/me/legalHolds', 'post', body, metadata);
    };
    /**
     * Get Legal Holds
     *
     */
    SDK.prototype.getLegalHolds = function (metadata) {
        return this.core.fetch('/accounts/me/legalHolds', 'get', metadata);
    };
    /**
     * Add Legal Hold Users
     *
     */
    SDK.prototype.addLegalHoldUsers = function (body, metadata) {
        return this.core.fetch('/accounts/me/legalHolds/{legalHoldId}/users/add', 'post', body, metadata);
    };
    /**
     * Remove Legal Hold Users
     *
     */
    SDK.prototype.removeLegalHoldUsers = function (body, metadata) {
        return this.core.fetch('/accounts/me/legalHolds/{legalHoldId}/users/remove', 'post', body, metadata);
    };
    /**
     * Edit Legal Hold
     *
     */
    SDK.prototype.editLegalHold = function (body, metadata) {
        return this.core.fetch('/accounts/me/legalHolds/{legalHoldId}', 'patch', body, metadata);
    };
    /**
     * Release Legal Hold
     *
     */
    SDK.prototype.releaseLegalHold = function (metadata) {
        return this.core.fetch('/accounts/me/legalHolds/{legalHoldId}/release', 'post', metadata);
    };
    /**
     * Get Legal Hold Users
     *
     */
    SDK.prototype.getLegalHoldUsers = function (metadata) {
        return this.core.fetch('/accounts/me/legalHolds/{legalHoldId}/users', 'get', metadata);
    };
    /**
     * Get Legal Hold Documents
     *
     */
    SDK.prototype.getLegalHoldDocuments = function (metadata) {
        return this.core.fetch('/accounts/me/legalHoldDocuments/{legalHoldId}', 'get', metadata);
    };
    /**
     * Get Document User Collaborator
     *
     */
    SDK.prototype.getDocumentUserCollaborators = function (metadata) {
        return this.core.fetch('/documents/{id}/shares/users/{userId}', 'get', metadata);
    };
    /**
     * Create/Update Document User Collaborator
     *
     */
    SDK.prototype.putDocumentUserCollaborators = function (body, metadata) {
        return this.core.fetch('/documents/{id}/shares/users/{userId}', 'put', body, metadata);
    };
    /**
     * Delete Document User Collaborator
     *
     */
    SDK.prototype.deleteDocumentUserCollaborators = function (metadata) {
        return this.core.fetch('/documents/{id}/shares/users/{userId}', 'delete', metadata);
    };
    /**
     * List Document User Collaborators
     *
     */
    SDK.prototype.listDocumentUserCollaborators = function (metadata) {
        return this.core.fetch('/documents/{id}/shares/users', 'get', metadata);
    };
    /**
     * Get Document Team Collaborator
     *
     */
    SDK.prototype.getDocumentTeamCollaborator = function (metadata) {
        return this.core.fetch('/documents/{id}/shares/teams/{teamId}', 'get', metadata);
    };
    /**
     * Create/Update Document Team Collaborator
     *
     */
    SDK.prototype.putDocumentTeamCollaborator = function (body, metadata) {
        return this.core.fetch('/documents/{id}/shares/teams/{teamId}', 'put', body, metadata);
    };
    /**
     * Delete Document Team Collaborator
     *
     */
    SDK.prototype.deleteDocumentTeamCollaborator = function (metadata) {
        return this.core.fetch('/documents/{id}/shares/teams/{teamId}', 'delete', metadata);
    };
    /**
     * Get Folder User Collaborator
     *
     */
    SDK.prototype.getFolderUserCollaborators = function (metadata) {
        return this.core.fetch('/folders/{id}/shares/users/{userId}', 'get', metadata);
    };
    /**
     * Create/Update Folder User Collaborator
     *
     */
    SDK.prototype.putFolderUserCollaborator = function (body, metadata) {
        return this.core.fetch('/folders/{id}/shares/users/{userId}', 'put', body, metadata);
    };
    /**
     * Delete Folder User Collaborator
     *
     */
    SDK.prototype.deleteFolderUserCollaborator = function (metadata) {
        return this.core.fetch('/folders/{id}/shares/users/{userId}', 'delete', metadata);
    };
    /**
     * List Folder User Collaborators
     *
     */
    SDK.prototype.listFolderUserCollaborators = function (metadata) {
        return this.core.fetch('/folders/{id}/shares/users', 'get', metadata);
    };
    /**
     * Get Folder Group Collaborator
     *
     */
    SDK.prototype.getFolderGroupCollaborator = function (metadata) {
        return this.core.fetch('/folders/{id}/shares/groups/{groupId}', 'get', metadata);
    };
    /**
     * Create/Update Folder Group Collaborator
     *
     */
    SDK.prototype.updateFolderGroupCollaborator = function (body, metadata) {
        return this.core.fetch('/folders/{id}/shares/groups/{groupId}', 'put', body, metadata);
    };
    /**
     * Delete Folder Group Collaborator
     *
     */
    SDK.prototype.deleteFolderGroupCollaborator = function (metadata) {
        return this.core.fetch('/folders/{id}/shares/groups/{groupId}', 'delete', metadata);
    };
    /**
     * List Folder Group Collaborators
     *
     */
    SDK.prototype.listFolderGroupCollaborators = function (metadata) {
        return this.core.fetch('/folders/{id}/shares/groups', 'get', metadata);
    };
    /**
     * Get Folder Team Collaborator
     *
     */
    SDK.prototype.getFolderTeamCollaborator = function (metadata) {
        return this.core.fetch('/folders/{id}/shares/teams/{teamId}', 'get', metadata);
    };
    /**
     * Create/Update Folder Team Collaborator
     *
     */
    SDK.prototype.putFolderTeamCollaborator = function (body, metadata) {
        return this.core.fetch('/folders/{id}/shares/teams/{teamId}', 'put', body, metadata);
    };
    /**
     * Delete Folder Team Collaborator
     *
     */
    SDK.prototype.deleteFolderTeamCollaborator = function (metadata) {
        return this.core.fetch('/folders/{id}/shares/teams/{teamId}', 'delete', metadata);
    };
    /**
     * Create/Copy/Import Document
     *
     */
    SDK.prototype.createOrCopyOrImportDocument = function (body, metadata) {
        return this.core.fetch('/documents', 'post', body, metadata);
    };
    /**
     * Get/Export Document
     *
     */
    SDK.prototype.getOrExportDocument = function (metadata) {
        return this.core.fetch('/documents/{id}', 'get', metadata);
    };
    /**
     * Trash Document
     *
     */
    SDK.prototype.trashDocument = function (metadata) {
        return this.core.fetch('/documents/{id}/trash', 'post', metadata);
    };
    /**
     * Search Documents
     *
     */
    SDK.prototype.searchDocuments = function (body, metadata) {
        return this.core.fetch('/documents/search', 'post', body, metadata);
    };
    /**
     * Document Contents
     *
     */
    SDK.prototype.getDocumentContent = function (metadata) {
        return this.core.fetch('/documents/{id}/contents', 'get', metadata);
    };
    /**
     * Embed Viewer
     *
     */
    SDK.prototype.documentEmbeds = function (metadata) {
        return this.core.fetch('/embeds', 'get', metadata);
    };
    /**
     * Generate Embed Session Token
     *
     */
    SDK.prototype.documentEmbedsToken = function (body, metadata) {
        return this.core.fetch('/embeds/token', 'post', body, metadata);
    };
    /**
     * Get Folder
     *
     */
    SDK.prototype.getFolder = function (metadata) {
        return this.core.fetch('/folders/{id}', 'get', metadata);
    };
    /**
     * Update Folder
     *
     */
    SDK.prototype.updateFolder = function (body, metadata) {
        return this.core.fetch('/folders/{id}', 'patch', body, metadata);
    };
    /**
     * Create Folder
     *
     */
    SDK.prototype.createFolder = function (body, metadata) {
        return this.core.fetch('/folders', 'post', body, metadata);
    };
    /**
     * Trash Folder
     *
     */
    SDK.prototype.trashFolder = function (metadata) {
        return this.core.fetch('/folders/{id}/trash', 'post', metadata);
    };
    /**
     * Restore Folder
     *
     */
    SDK.prototype.restoreFolder = function (metadata) {
        return this.core.fetch('/folders/{id}/restore', 'post', metadata);
    };
    /**
     * Search Folders
     *
     */
    SDK.prototype.searchFolders = function (body, metadata) {
        return this.core.fetch('/folders/search', 'post', body, metadata);
    };
    /**
     * List Folder Contents
     *
     */
    SDK.prototype.listFolderContents = function (metadata) {
        return this.core.fetch('/folders/{id}/contents', 'get', metadata);
    };
    /**
     * List Root Folder Contents
     *
     */
    SDK.prototype.listRootFolderContents = function (metadata) {
        return this.core.fetch('/folders/root/contents', 'get', metadata);
    };
    /**
     * Get Document Share Link
     *
     */
    SDK.prototype.getDocumentShareLink = function (metadata) {
        return this.core.fetch('/documents/{id}/shares/shareLinks/{shareLinkId}', 'get', metadata);
    };
    /**
     * Update Document Share Link
     *
     */
    SDK.prototype.updateDocumentShareLink = function (body, metadata) {
        return this.core.fetch('/documents/{id}/shares/shareLinks/{shareLinkId}', 'patch', body, metadata);
    };
    /**
     * Delete Document Share Link
     *
     */
    SDK.prototype.deleteDocumentShareLink = function (metadata) {
        return this.core.fetch('/documents/{id}/shares/shareLinks/{shareLinkId}', 'delete', metadata);
    };
    /**
     * Create Document Share Link
     *
     */
    SDK.prototype.createDocumentShareLink = function (body, metadata) {
        return this.core.fetch('/documents/{id}/shares/shareLinks', 'post', body, metadata);
    };
    /**
     * Accept Share Links
     *
     */
    SDK.prototype.acceptShareLink = function (metadata) {
        return this.core.fetch('/shareLink/{shareLinkId}/accept', 'post', metadata);
    };
    /**
     * Transfer User Content
     *
     */
    SDK.prototype.transferUserContent = function (body, metadata) {
        return this.core.fetch('/transferUserContent', 'post', body, metadata);
    };
    /**
     * Get User
     *
     */
    SDK.prototype.getUser = function (metadata) {
        return this.core.fetch('/users/{id}', 'get', metadata);
    };
    /**
     * List Users
     *
     */
    SDK.prototype.listUsers = function (metadata) {
        return this.core.fetch('/users', 'get', metadata);
    };
    /**
     * Create User
     *
     */
    SDK.prototype.createUser = function (body, metadata) {
        return this.core.fetch('/users', 'post', body, metadata);
    };
    SDK.prototype.userEmailSearch = function (body, metadata) {
        return this.core.fetch('/users/searchByEmail', 'post', body, metadata);
    };
    /**
     * Get Profile
     *
     */
    SDK.prototype.getUserProfile = function (metadata) {
        return this.core.fetch('/users/me/profile', 'get', metadata);
    };
    /**
     * Describe Link
     *
     */
    SDK.prototype.describeLink = function (body, metadata) {
        return this.core.fetch('/describeLink', 'post', body, metadata);
    };
    /**
     * Direct Embed
     *
     */
    SDK.prototype.directEmbed = function (metadata) {
        return this.core.fetch('/embeds/link', 'get', metadata);
    };
    /**
     * Get Document Embed
     *
     */
    SDK.prototype.getEmbedInformation = function (metadata) {
        return this.core.fetch('/documents/{documentId}/embeds/{embedId}', 'get', metadata);
    };
    /**
     * Delete Document Embed
     *
     */
    SDK.prototype.deleteEmbed = function (metadata) {
        return this.core.fetch('/documents/{documentId}/embeds/{embedId}', 'delete', metadata);
    };
    /**
     * Get Document Embed Document
     *
     */
    SDK.prototype.getEmbedDocument = function (metadata) {
        return this.core.fetch('/documents/{documentId}/embeds/{embedId}/document', 'get', metadata);
    };
    /**
     * Create Document Embed
     *
     */
    SDK.prototype.createEmbed = function (body, metadata) {
        return this.core.fetch('/documents/{id}/embeds', 'post', body, metadata);
    };
    /**
     * Change Document Embed Version
     *
     */
    SDK.prototype.changeEmbedVersion = function (body, metadata) {
        return this.core.fetch('/documents/{documentId}/embeds/{embedId}/changeVersion', 'post', body, metadata);
    };
    /**
     * Generate Document Picker Token
     *
     */
    SDK.prototype.generateDocumentPickerToken = function (body) {
        return this.core.fetch('/documents/pickerToken', 'post', body);
    };
    /**
     * Embedded Document Picker
     *
     */
    SDK.prototype.embeddedDocumentPicker = function (metadata) {
        return this.core.fetch('/documents/picker?token=:token', 'get', metadata);
    };
    /**
     * Get Audit Logs
     *
     */
    SDK.prototype.getAuditLogs = function (metadata) {
        return this.core.fetch('/auditLogs', 'get', metadata);
    };
    /**
     * List Teams
     *
     */
    SDK.prototype.listTeams = function (metadata) {
        return this.core.fetch('/teams', 'get', metadata);
    };
    /**
     * Create Team
     *
     */
    SDK.prototype.createTeam = function (body, metadata) {
        return this.core.fetch('/teams', 'post', body, metadata);
    };
    /**
     * Get Team
     *
     */
    SDK.prototype.getTeam = function (metadata) {
        return this.core.fetch('/teams/{id}', 'get', metadata);
    };
    /**
     * List Users on Team
     *
     */
    SDK.prototype.listUsersOnTeam = function (metadata) {
        return this.core.fetch('/teams/{id}/users', 'get', metadata);
    };
    /**
     * Add Users to Team
     *
     */
    SDK.prototype.addUsersToTeam = function (body, metadata) {
        return this.core.fetch('/teams/{id}/users/add', 'post', body, metadata);
    };
    /**
     * Remove Users from Team
     *
     */
    SDK.prototype.removeUsersFromTeam = function (body, metadata) {
        return this.core.fetch('/teams/{id}/users/remove', 'post', body, metadata);
    };
    /**
     * Archive Team
     *
     */
    SDK.prototype.archiveTeam = function (metadata) {
        return this.core.fetch('/teams/{id}/archive', 'post', metadata);
    };
    /**
     * Restore Team
     *
     */
    SDK.prototype.restoreTeam = function (metadata) {
        return this.core.fetch('/teams/{id}/restore', 'post', metadata);
    };
    return SDK;
}());
var createSDK = (function () { return new SDK(); })();
module.exports = createSDK;
