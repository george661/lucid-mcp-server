import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
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
    auth(...values: string[] | number[]): this;
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
    server(url: string, variables?: {}): void;
    /**
     * Create or Refresh Access Token
     *
     */
    createOrRefreshAccessToken(body: types.CreateOrRefreshAccessTokenBodyParam): Promise<FetchResponse<200, types.CreateOrRefreshAccessTokenResponse200>>;
    /**
     * Introspect Access Token
     *
     */
    introspectAccessToken(body: types.IntrospectAccessTokenFormDataParam): Promise<FetchResponse<200, types.IntrospectAccessTokenResponse200>>;
    /**
     * Revoke Access Token
     *
     */
    revokeAccessToken(body: types.RevokeAccessTokenFormDataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get Account Information
     *
     */
    getAccountInformation(metadata: types.GetAccountInformationMetadataParam): Promise<FetchResponse<200, types.GetAccountInformationResponse200>>;
    /**
     * Search Account Documents
     *
     */
    searchAccountDocuments(body: types.SearchAccountDocumentsBodyParam, metadata: types.SearchAccountDocumentsMetadataParam): Promise<FetchResponse<200, types.SearchAccountDocumentsResponse200>>;
    /**
     * Create Legal Hold
     *
     */
    createLegalHold(body: types.CreateLegalHoldBodyParam, metadata: types.CreateLegalHoldMetadataParam): Promise<FetchResponse<201, types.CreateLegalHoldResponse201>>;
    /**
     * Get Legal Holds
     *
     */
    getLegalHolds(metadata: types.GetLegalHoldsMetadataParam): Promise<FetchResponse<200, types.GetLegalHoldsResponse200>>;
    /**
     * Add Legal Hold Users
     *
     */
    addLegalHoldUsers(body: types.AddLegalHoldUsersBodyParam, metadata: types.AddLegalHoldUsersMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Remove Legal Hold Users
     *
     */
    removeLegalHoldUsers(body: types.RemoveLegalHoldUsersBodyParam, metadata: types.RemoveLegalHoldUsersMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Edit Legal Hold
     *
     */
    editLegalHold(body: types.EditLegalHoldBodyParam, metadata: types.EditLegalHoldMetadataParam): Promise<FetchResponse<200, types.EditLegalHoldResponse200>>;
    /**
     * Release Legal Hold
     *
     */
    releaseLegalHold(metadata: types.ReleaseLegalHoldMetadataParam): Promise<FetchResponse<200, types.ReleaseLegalHoldResponse200>>;
    /**
     * Get Legal Hold Users
     *
     */
    getLegalHoldUsers(metadata: types.GetLegalHoldUsersMetadataParam): Promise<FetchResponse<200, types.GetLegalHoldUsersResponse200>>;
    /**
     * Get Legal Hold Documents
     *
     */
    getLegalHoldDocuments(metadata: types.GetLegalHoldDocumentsMetadataParam): Promise<FetchResponse<200, types.GetLegalHoldDocumentsResponse200>>;
    /**
     * Get Document User Collaborator
     *
     */
    getDocumentUserCollaborators(metadata: types.GetDocumentUserCollaboratorsMetadataParam): Promise<FetchResponse<200, types.GetDocumentUserCollaboratorsResponse200>>;
    /**
     * Create/Update Document User Collaborator
     *
     */
    putDocumentUserCollaborators(body: types.PutDocumentUserCollaboratorsBodyParam, metadata: types.PutDocumentUserCollaboratorsMetadataParam): Promise<FetchResponse<200, types.PutDocumentUserCollaboratorsResponse200> | FetchResponse<201, types.PutDocumentUserCollaboratorsResponse201>>;
    /**
     * Delete Document User Collaborator
     *
     */
    deleteDocumentUserCollaborators(metadata: types.DeleteDocumentUserCollaboratorsMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * List Document User Collaborators
     *
     */
    listDocumentUserCollaborators(metadata: types.ListDocumentUserCollaboratorsMetadataParam): Promise<FetchResponse<200, types.ListDocumentUserCollaboratorsResponse200>>;
    /**
     * Get Document Team Collaborator
     *
     */
    getDocumentTeamCollaborator(metadata: types.GetDocumentTeamCollaboratorMetadataParam): Promise<FetchResponse<200, types.GetDocumentTeamCollaboratorResponse200>>;
    /**
     * Create/Update Document Team Collaborator
     *
     */
    putDocumentTeamCollaborator(body: types.PutDocumentTeamCollaboratorBodyParam, metadata: types.PutDocumentTeamCollaboratorMetadataParam): Promise<FetchResponse<200, types.PutDocumentTeamCollaboratorResponse200> | FetchResponse<201, types.PutDocumentTeamCollaboratorResponse201>>;
    /**
     * Delete Document Team Collaborator
     *
     */
    deleteDocumentTeamCollaborator(metadata: types.DeleteDocumentTeamCollaboratorMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get Folder User Collaborator
     *
     */
    getFolderUserCollaborators(metadata: types.GetFolderUserCollaboratorsMetadataParam): Promise<FetchResponse<200, types.GetFolderUserCollaboratorsResponse200>>;
    /**
     * Create/Update Folder User Collaborator
     *
     */
    putFolderUserCollaborator(body: types.PutFolderUserCollaboratorBodyParam, metadata: types.PutFolderUserCollaboratorMetadataParam): Promise<FetchResponse<200, types.PutFolderUserCollaboratorResponse200> | FetchResponse<201, types.PutFolderUserCollaboratorResponse201>>;
    /**
     * Delete Folder User Collaborator
     *
     */
    deleteFolderUserCollaborator(metadata: types.DeleteFolderUserCollaboratorMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * List Folder User Collaborators
     *
     */
    listFolderUserCollaborators(metadata: types.ListFolderUserCollaboratorsMetadataParam): Promise<FetchResponse<200, types.ListFolderUserCollaboratorsResponse200>>;
    /**
     * Get Folder Group Collaborator
     *
     */
    getFolderGroupCollaborator(metadata: types.GetFolderGroupCollaboratorMetadataParam): Promise<FetchResponse<200, types.GetFolderGroupCollaboratorResponse200>>;
    /**
     * Create/Update Folder Group Collaborator
     *
     */
    updateFolderGroupCollaborator(body: types.UpdateFolderGroupCollaboratorBodyParam, metadata: types.UpdateFolderGroupCollaboratorMetadataParam): Promise<FetchResponse<200, types.UpdateFolderGroupCollaboratorResponse200> | FetchResponse<201, types.UpdateFolderGroupCollaboratorResponse201>>;
    /**
     * Delete Folder Group Collaborator
     *
     */
    deleteFolderGroupCollaborator(metadata: types.DeleteFolderGroupCollaboratorMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * List Folder Group Collaborators
     *
     */
    listFolderGroupCollaborators(metadata: types.ListFolderGroupCollaboratorsMetadataParam): Promise<FetchResponse<200, types.ListFolderGroupCollaboratorsResponse200>>;
    /**
     * Get Folder Team Collaborator
     *
     */
    getFolderTeamCollaborator(metadata: types.GetFolderTeamCollaboratorMetadataParam): Promise<FetchResponse<200, types.GetFolderTeamCollaboratorResponse200>>;
    /**
     * Create/Update Folder Team Collaborator
     *
     */
    putFolderTeamCollaborator(body: types.PutFolderTeamCollaboratorBodyParam, metadata: types.PutFolderTeamCollaboratorMetadataParam): Promise<FetchResponse<200, types.PutFolderTeamCollaboratorResponse200> | FetchResponse<201, types.PutFolderTeamCollaboratorResponse201>>;
    /**
     * Delete Folder Team Collaborator
     *
     */
    deleteFolderTeamCollaborator(metadata: types.DeleteFolderTeamCollaboratorMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create/Copy/Import Document
     *
     */
    createOrCopyOrImportDocument(body: types.CreateOrCopyOrImportDocumentBodyParam, metadata: types.CreateOrCopyOrImportDocumentMetadataParam): Promise<FetchResponse<201, types.CreateOrCopyOrImportDocumentResponse201>>;
    /**
     * Get/Export Document
     *
     */
    getOrExportDocument(metadata: types.GetOrExportDocumentMetadataParam): Promise<FetchResponse<200, types.GetOrExportDocumentResponse200>>;
    /**
     * Trash Document
     *
     */
    trashDocument(metadata: types.TrashDocumentMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Search Documents
     *
     */
    searchDocuments(body: types.SearchDocumentsBodyParam, metadata: types.SearchDocumentsMetadataParam): Promise<FetchResponse<200, types.SearchDocumentsResponse200>>;
    /**
     * Document Contents
     *
     */
    getDocumentContent(metadata: types.GetDocumentContentMetadataParam): Promise<FetchResponse<200, types.GetDocumentContentResponse200>>;
    /**
     * Embed Viewer
     *
     */
    documentEmbeds(metadata: types.DocumentEmbedsMetadataParam): Promise<FetchResponse<200, types.DocumentEmbedsResponse200>>;
    /**
     * Generate Embed Session Token
     *
     */
    documentEmbedsToken(body: types.DocumentEmbedsTokenBodyParam, metadata: types.DocumentEmbedsTokenMetadataParam): Promise<FetchResponse<200, types.DocumentEmbedsTokenResponse200>>;
    /**
     * Get Folder
     *
     */
    getFolder(metadata: types.GetFolderMetadataParam): Promise<FetchResponse<200, types.GetFolderResponse200>>;
    /**
     * Update Folder
     *
     */
    updateFolder(body: types.UpdateFolderBodyParam, metadata: types.UpdateFolderMetadataParam): Promise<FetchResponse<200, types.UpdateFolderResponse200>>;
    /**
     * Create Folder
     *
     */
    createFolder(body: types.CreateFolderBodyParam, metadata: types.CreateFolderMetadataParam): Promise<FetchResponse<201, types.CreateFolderResponse201>>;
    /**
     * Trash Folder
     *
     */
    trashFolder(metadata: types.TrashFolderMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Restore Folder
     *
     */
    restoreFolder(metadata: types.RestoreFolderMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Search Folders
     *
     */
    searchFolders(body: types.SearchFoldersBodyParam, metadata: types.SearchFoldersMetadataParam): Promise<FetchResponse<200, types.SearchFoldersResponse200>>;
    /**
     * List Folder Contents
     *
     */
    listFolderContents(metadata: types.ListFolderContentsMetadataParam): Promise<FetchResponse<200, types.ListFolderContentsResponse200>>;
    /**
     * List Root Folder Contents
     *
     */
    listRootFolderContents(metadata: types.ListRootFolderContentsMetadataParam): Promise<FetchResponse<200, types.ListRootFolderContentsResponse200>>;
    /**
     * Get Document Share Link
     *
     */
    getDocumentShareLink(metadata: types.GetDocumentShareLinkMetadataParam): Promise<FetchResponse<200, types.GetDocumentShareLinkResponse200>>;
    /**
     * Update Document Share Link
     *
     */
    updateDocumentShareLink(body: types.UpdateDocumentShareLinkBodyParam, metadata: types.UpdateDocumentShareLinkMetadataParam): Promise<FetchResponse<200, types.UpdateDocumentShareLinkResponse200>>;
    /**
     * Delete Document Share Link
     *
     */
    deleteDocumentShareLink(metadata: types.DeleteDocumentShareLinkMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Create Document Share Link
     *
     */
    createDocumentShareLink(body: types.CreateDocumentShareLinkBodyParam, metadata: types.CreateDocumentShareLinkMetadataParam): Promise<FetchResponse<201, types.CreateDocumentShareLinkResponse201>>;
    /**
     * Accept Share Links
     *
     */
    acceptShareLink(metadata: types.AcceptShareLinkMetadataParam): Promise<FetchResponse<200, types.AcceptShareLinkResponse200>>;
    /**
     * Transfer User Content
     *
     */
    transferUserContent(body: types.TransferUserContentBodyParam, metadata: types.TransferUserContentMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get User
     *
     */
    getUser(metadata: types.GetUserMetadataParam): Promise<FetchResponse<200, types.GetUserResponse200>>;
    /**
     * List Users
     *
     */
    listUsers(metadata: types.ListUsersMetadataParam): Promise<FetchResponse<200, types.ListUsersResponse200>>;
    /**
     * Create User
     *
     */
    createUser(body: types.CreateUserBodyParam, metadata: types.CreateUserMetadataParam): Promise<FetchResponse<201, types.CreateUserResponse201>>;
    /**
     * Search Users By Email
     *
     */
    userEmailSearch(body: types.UserEmailSearchBodyParam, metadata: types.UserEmailSearchMetadataParam): Promise<FetchResponse<200, types.UserEmailSearchResponse200>>;
    userEmailSearch(metadata: types.UserEmailSearchMetadataParam): Promise<FetchResponse<200, types.UserEmailSearchResponse200>>;
    /**
     * Get Profile
     *
     */
    getUserProfile(metadata: types.GetUserProfileMetadataParam): Promise<FetchResponse<200, types.GetUserProfileResponse200>>;
    /**
     * Describe Link
     *
     */
    describeLink(body: types.DescribeLinkBodyParam, metadata: types.DescribeLinkMetadataParam): Promise<FetchResponse<200, types.DescribeLinkResponse200>>;
    /**
     * Direct Embed
     *
     */
    directEmbed(metadata: types.DirectEmbedMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get Document Embed
     *
     */
    getEmbedInformation(metadata: types.GetEmbedInformationMetadataParam): Promise<FetchResponse<200, types.GetEmbedInformationResponse200>>;
    /**
     * Delete Document Embed
     *
     */
    deleteEmbed(metadata: types.DeleteEmbedMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Get Document Embed Document
     *
     */
    getEmbedDocument(metadata: types.GetEmbedDocumentMetadataParam): Promise<FetchResponse<200, types.GetEmbedDocumentResponse200>>;
    /**
     * Create Document Embed
     *
     */
    createEmbed(body: types.CreateEmbedBodyParam, metadata: types.CreateEmbedMetadataParam): Promise<FetchResponse<201, types.CreateEmbedResponse201>>;
    /**
     * Change Document Embed Version
     *
     */
    changeEmbedVersion(body: types.ChangeEmbedVersionBodyParam, metadata: types.ChangeEmbedVersionMetadataParam): Promise<FetchResponse<200, types.ChangeEmbedVersionResponse200>>;
    /**
     * Generate Document Picker Token
     *
     */
    generateDocumentPickerToken(body: types.GenerateDocumentPickerTokenBodyParam): Promise<FetchResponse<200, types.GenerateDocumentPickerTokenResponse200>>;
    /**
     * Embedded Document Picker
     *
     */
    embeddedDocumentPicker(metadata: types.EmbeddedDocumentPickerMetadataParam): Promise<FetchResponse<200, types.EmbeddedDocumentPickerResponse200>>;
    /**
     * Get Audit Logs
     *
     */
    getAuditLogs(metadata: types.GetAuditLogsMetadataParam): Promise<FetchResponse<200, types.GetAuditLogsResponse200>>;
    /**
     * List Teams
     *
     */
    listTeams(metadata: types.ListTeamsMetadataParam): Promise<FetchResponse<200, types.ListTeamsResponse200>>;
    /**
     * Create Team
     *
     */
    createTeam(body: types.CreateTeamBodyParam, metadata: types.CreateTeamMetadataParam): Promise<FetchResponse<201, types.CreateTeamResponse201>>;
    /**
     * Get Team
     *
     */
    getTeam(metadata: types.GetTeamMetadataParam): Promise<FetchResponse<200, types.GetTeamResponse200>>;
    /**
     * List Users on Team
     *
     */
    listUsersOnTeam(metadata: types.ListUsersOnTeamMetadataParam): Promise<FetchResponse<200, types.ListUsersOnTeamResponse200>>;
    /**
     * Add Users to Team
     *
     */
    addUsersToTeam(body: types.AddUsersToTeamBodyParam, metadata: types.AddUsersToTeamMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Remove Users from Team
     *
     */
    removeUsersFromTeam(body: types.RemoveUsersFromTeamBodyParam, metadata: types.RemoveUsersFromTeamMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Archive Team
     *
     */
    archiveTeam(metadata: types.ArchiveTeamMetadataParam): Promise<FetchResponse<number, unknown>>;
    /**
     * Restore Team
     *
     */
    restoreTeam(metadata: types.RestoreTeamMetadataParam): Promise<FetchResponse<number, unknown>>;
}
declare const createSDK: SDK;
export = createSDK;
