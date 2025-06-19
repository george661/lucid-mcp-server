declare const AcceptShareLink: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly shareLinkId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Id of the share link to retrieve information for.";
                };
            };
            readonly required: readonly ["shareLinkId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly invitationType: {
                        readonly type: "string";
                        readonly description: "The kind of share link that was accepted (document or folder).";
                        readonly examples: readonly ["document"];
                    };
                    readonly documentId: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "If defined, the Id of the document whose share link was accepted.";
                        readonly examples: readonly ["f6bf19b5-d109-4ef5-92b2-cdaf0de43001"];
                    };
                    readonly folderId: {
                        readonly type: "string";
                        readonly format: "integer";
                        readonly description: "If defined, the Id of the folder whose share link was accepted.";
                    };
                };
                readonly required: readonly ["invitationType"];
            }, {
                readonly type: "object";
                readonly properties: {
                    readonly invitationType: {
                        readonly type: "string";
                        readonly description: "The kind of share link that was accepted (document or folder).";
                        readonly examples: readonly ["folder"];
                    };
                    readonly documentId: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "If defined, the Id of the document whose share link was accepted.";
                    };
                    readonly folderId: {
                        readonly type: "string";
                        readonly format: "integer";
                        readonly description: "If defined, the Id of the folder whose share link was accepted.";
                        readonly examples: readonly [123456789];
                    };
                };
                readonly required: readonly ["invitationType"];
            }];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const AddLegalHoldUsers: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly Users: {
                readonly type: "array";
                readonly items: {
                    readonly type: "number";
                };
                readonly description: "List of user ids for users to be put on the specified legal hold. Users must belong to the admin’s account. Max number of users per request is 200.";
            };
        };
        readonly required: readonly ["Users"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly legalHoldId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unique ID of the legal hold.";
                };
            };
            readonly required: readonly ["legalHoldId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const AddUsersToTeam: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly users: {
                readonly type: "array";
                readonly items: {
                    readonly type: "integer";
                };
                readonly description: "Array of IDs of users to add to the team.";
                readonly examples: readonly [321, 654, 987];
            };
        };
        readonly required: readonly ["users"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team to which to add users.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly "Lucid-Request-As": {
                    readonly type: "string";
                    readonly examples: readonly ["admin"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the requesting user is an account owner, team admin, or team manager with the required permissions and they make\nthe request with the value of “admin” as this header and include an admin scope, the request will be made using\ntheir admin permissions.\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const ArchiveTeam: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team to be archived.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly "Lucid-Request-As": {
                    readonly type: "string";
                    readonly examples: readonly ["admin"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the requesting user is an account owner, team admin, or team manager with the required permissions and they make\nthe request with the value of “admin” as this header and include an admin scope, the request will be made using\ntheir admin permissions.\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const ChangeEmbedVersion: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly embedVersion: {
                readonly type: "string";
                readonly enum: readonly ["latest-version", "snapshot-version"];
                readonly description: "Determines what version of the document will be loaded in the document viewer.";
                readonly examples: readonly ["snapshot-version"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["001bd56d-1b10-4196-8ac6-45e3c22bd1c6"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the embedded document to retrieve.";
                };
                readonly embedId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["298f9a4a-09b5-440c-b95e-4d5c2d1aaf49"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document embed to retrieve.";
                };
            };
            readonly required: readonly ["documentId", "embedId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly embedId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique identifier of the embed.";
                    readonly examples: readonly ["ec890631-c150-461c-992f-b96533aa05f4"];
                };
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique identifier of the document.";
                    readonly examples: readonly ["001bd56d-1b10-4196-8ac6-45e3c22bd1c6"];
                };
                readonly embedVersion: {
                    readonly type: "string";
                    readonly description: "The version of the embed.";
                    readonly examples: readonly ["snapshot-version"];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly description: "When the embed was created.";
                    readonly examples: readonly ["2021-10-01T20:49:36.169Z"];
                };
                readonly modified: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly description: "When the embed was last modified.";
                    readonly examples: readonly ["2021-10-01T20:49:36.169Z"];
                };
            };
            readonly description: "Information about the requested Embed.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateDocumentShareLink: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly role: {
                readonly type: "string";
                readonly enum: readonly ["editandshare", "edit", "comment", "view"];
                readonly description: "Roles determine what actions an invitation will grant on a document. Invitations to a document only grant the specified level of access to just that one document.\n- `editandshare`: View, comment on, edit, and control which users can access the document.\n- `edit`: View, comment on, and edit the document.\n- `comment`: View the document. Leave comments on the document.\n- `view`: View the document.\n";
            };
            readonly linkSecurity: {
                readonly type: "object";
                readonly properties: {
                    readonly restrictToAccount: {
                        readonly type: "boolean";
                        readonly description: "Whether or not users outside the document's account can accept the share link.";
                    };
                    readonly expires: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "If defined, the date and time the share link expires.";
                        readonly examples: readonly ["2023-12-11T21:48:35.293Z"];
                    };
                    readonly passcode: {
                        readonly type: "string";
                        readonly description: "If defined, the required passcode to accept the share link.";
                        readonly examples: readonly ["password"];
                    };
                    readonly allowAnonymous: {
                        readonly type: "boolean";
                        readonly description: "Whether or not the share link allows for anonymous guests.";
                    };
                };
                readonly required: readonly ["restrictToAccount", "allowAnonymous"];
            };
        };
        readonly required: readonly ["linkSecurity", "role"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly shareLinkId: {
                    readonly type: "string";
                    readonly description: "Id of the share link.";
                    readonly examples: readonly ["inv_8a38797a-e5fc-4479-8492-e000dc93cb60"];
                };
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Id of the document the share link belongs to.";
                    readonly examples: readonly ["f6bf19b5-d109-4ef5-92b2-cdaf0de43001"];
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["editandshare", "edit", "comment", "view"];
                    readonly description: "Roles determine what actions an invitation will grant on a document. Invitations to a document only grant the specified level of access to just that one document.\n- `editandshare`: View, comment on, edit, and control which users can access the document.\n- `edit`: View, comment on, and edit the document.\n- `comment`: View the document. Leave comments on the document.\n- `view`: View the document.\n\n\n`editandshare` `edit` `comment` `view`";
                };
                readonly linkSecurity: {
                    readonly type: "object";
                    readonly properties: {
                        readonly restrictToAccount: {
                            readonly type: "boolean";
                            readonly description: "Whether or not users outside the document's account can accept the share link.";
                        };
                        readonly expires: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "If defined, the date and time the share link expires.";
                            readonly examples: readonly ["2023-12-11T21:48:35.293Z"];
                        };
                        readonly passcode: {
                            readonly type: "string";
                            readonly description: "If defined, the required passcode to accept the share link.";
                            readonly examples: readonly ["password"];
                        };
                        readonly allowAnonymous: {
                            readonly type: "boolean";
                            readonly description: "Whether or not the share link allows for anonymous guests.";
                        };
                    };
                    readonly required: readonly ["restrictToAccount", "allowAnonymous"];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "The date and time the share link was created.";
                    readonly examples: readonly ["2022-11-11T21:48:35.293Z"];
                };
                readonly createdBy: {
                    readonly type: "number";
                    readonly description: "User Id of the user that created the share link.";
                    readonly examples: readonly [1280];
                };
                readonly lastModified: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "The date and time the share link was last modified.";
                    readonly examples: readonly ["2022-11-11T21:48:35.293Z"];
                };
                readonly acceptUrl: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to accept the share link invitation.";
                    readonly examples: readonly ["https://lucid.app/lucidchart/f6bf19b5-d109-4ef5-92b2-cdaf0de43001/edit?invitationId=inv_8a38797a-e5fc-4479-8492-e000dc93cb60"];
                };
            };
            readonly required: readonly ["shareLinkId", "documentId", "role", "linkSecurity", "created", "createdBy", "lastModified", "acceptUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateEmbed: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly embedVersion: {
                readonly type: "string";
                readonly enum: readonly ["latest-version", "snapshot-version"];
                readonly description: "Determines what version of the document will be loaded in the document viewer.";
                readonly examples: readonly ["snapshot-version"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["001bd56d-1b10-4196-8ac6-45e3c22bd1c6"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document to be embedded.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly embedId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique identifier of the embed.";
                    readonly examples: readonly ["ec890631-c150-461c-992f-b96533aa05f4"];
                };
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique identifier of the document.";
                    readonly examples: readonly ["001bd56d-1b10-4196-8ac6-45e3c22bd1c6"];
                };
                readonly embedVersion: {
                    readonly type: "string";
                    readonly description: "The version of the embed.";
                    readonly examples: readonly ["snapshot-version"];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly description: "When the embed was created.";
                    readonly examples: readonly ["2021-10-01T20:49:36.169Z"];
                };
                readonly modified: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly description: "When the embed was last modified.";
                    readonly examples: readonly ["2021-10-01T20:49:36.169Z"];
                };
            };
            readonly description: "Information about the requested Embed.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateFolder: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
                readonly description: "Name of the folder being created.";
            };
            readonly type: {
                readonly type: "string";
                readonly description: "* folder - Folders can live in other folders, team folders, or the root of a user’s folder manager (\"My Documents\"). A folder in \"My Documents\" will have a null parent field.\n* team   - Team folders can never live in another folder and are always located in the \"Team Folders\" section of a user's folder manager. Team folders will not have a parent field. Learn more\n";
                readonly enum: readonly ["folder", "team"];
                readonly examples: readonly ["folder"];
            };
            readonly parent: {
                readonly type: "number";
                readonly description: "Destination folder to create the new folder in.\nIf it is not provided, the folder will be created in the root of the user's folder manager (\"My Documents\").\n";
            };
        };
        readonly required: readonly ["name", "type"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly description: "A standard representation of a folder.";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly description: "Unique ID of the folder";
                    readonly examples: readonly [123456789];
                };
                readonly type: {
                    readonly type: "string";
                    readonly description: "* folder - Folders can live in other folders, team folders, or the root of a user’s folder manager (\"My Documents\"). A folder in \"My Documents\" will have a null parent field.\n* team   - Team folders can never live in another folder and are always located in the \"Team Folders\" section of a user's folder manager. Team folders will not have a parent field. Learn more\n\n\n`folder` `team`";
                    readonly enum: readonly ["folder", "team"];
                    readonly examples: readonly ["folder"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Name of the folder";
                    readonly examples: readonly ["Folder Name"];
                };
                readonly parent: {
                    readonly type: "number";
                    readonly description: "ID of the parent folder.";
                    readonly examples: readonly [123456788];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the folder was created";
                    readonly examples: readonly ["2020-06-26T16:29:37Z"];
                };
                readonly trashed: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the folder was trashed";
                    readonly examples: readonly ["2022-01-20T12:14:18Z"];
                };
                readonly attributes: {
                    readonly type: "array";
                    readonly description: "An array of attributes assigned to the folder. Can be null or empty.";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "An attribute assigned to the folder.";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Name of the attribute";
                                readonly examples: readonly ["Sample Label"];
                            };
                            readonly value: {
                                readonly description: "Value of the attribute. Can be any type, but attributes with the same name will always have the same type.";
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["id", "type", "name", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateLegalHold: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly Title: {
                readonly type: "string";
                readonly description: "Title that should be given to the newly created legal hold. Max length of title is 80 characters.";
            };
            readonly StartTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time that the legal hold should start. Must not be in the past.";
            };
            readonly EndTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Time that the legal hold should end. End time must be greater than or equal to 24 hours after the start time.";
            };
            readonly Description: {
                readonly type: "string";
                readonly description: "Description that should be given to the newly created legal hold. Max length of description is 256 characters.";
            };
            readonly Keywords: {
                readonly type: "string";
                readonly description: "Keyword(s) to search against document content and titles. Note: When provided, only relevant results will be added to the legal hold. Empty strings will be treated the same as when no keywords are provided. Max length of keywords is 400 characters.";
            };
        };
        readonly required: readonly ["Title", "StartTime", "EndTime"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly LegalHoldId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique ID of the legal hold.";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                };
                readonly AccountId: {
                    readonly type: "number";
                    readonly description: "Unique ID for the creating admin’s account.";
                    readonly examples: readonly [100];
                };
                readonly StartTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Start time of the legal hold.";
                    readonly examples: readonly ["2025-01-01T16:18:26Z"];
                };
                readonly EndTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "End time of the legal hold.";
                    readonly examples: readonly ["2025-12-01T16:18:26Z"];
                };
                readonly Title: {
                    readonly type: "string";
                    readonly description: "Title of the legal hold.";
                    readonly examples: readonly ["New Legal Hold"];
                };
                readonly Description: {
                    readonly type: "string";
                    readonly description: "Description of the legal hold.";
                    readonly examples: readonly ["Legal hold example"];
                };
                readonly Keywords: {
                    readonly type: "string";
                    readonly description: "Keyword(s) of the legal hold.";
                    readonly examples: readonly ["alpha"];
                };
                readonly Created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Time that the legal hold was created.";
                    readonly examples: readonly ["2024-12-01T16:25:44Z"];
                };
                readonly Modified: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Time that the legal hold was last modified.";
                    readonly examples: readonly ["2024-12-01T16:25:44Z"];
                };
            };
            readonly required: readonly ["LegalHoldId", "AccountId", "StartTime", "EndTime", "Title", "Created", "Modified"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateOrCopyOrImportDocument: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly title: {
                readonly type: "string";
                readonly description: "Title that should be given to the newly created or copied document.\nRequired for Creating or Copying a document.\n";
            };
            readonly product: {
                readonly type: "string";
                readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                readonly description: "\"lucidchart\" or \"lucidspark\".\nRequired for Creating a document.\n";
                readonly examples: readonly ["lucidchart"];
            };
            readonly parent: {
                readonly type: "number";
                readonly description: "ID of the folder to create the new document in.\nOptionally used for Creating or Copying a document.\n";
            };
            readonly template: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "ID of the document to copy.\nRequired for Copying a document.\n";
            };
            readonly extensionBootstrapData: {
                readonly type: "object";
                readonly properties: {
                    readonly packageId: {
                        readonly type: "string";
                        readonly description: "Id of the extension package which will consume this data";
                        readonly examples: readonly ["74672098-cf36-492c-b8e6-2c4233549cd3"];
                    };
                    readonly extensionName: {
                        readonly type: "string";
                        readonly description: "Name of the editor extension which will consume this data. Note this is the name field of an editor extension found in your manifest.json file.";
                        readonly examples: readonly ["sheets-adapter"];
                    };
                    readonly minimumVersion: {
                        readonly type: "string";
                        readonly description: "Minimum version of the extension package which will consume this data";
                        readonly examples: readonly ["1.4.0"];
                    };
                    readonly data: {
                        readonly type: "object";
                        readonly additionalProperties: {
                            readonly type: "string";
                        };
                        readonly description: "Data to provide to the extension package";
                    };
                };
                readonly required: readonly ["packageId", "extensionName", "minimumVersion", "data"];
                readonly description: "Bootstrap data can be attached to the created document to be consumed by a specific Extension Package.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique ID of the document";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly description: "Title of the document";
                    readonly examples: readonly ["document title"];
                };
                readonly editUrl: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to edit the document";
                    readonly examples: readonly ["https://lucid.app/lucidchart/110808fd-4553-4316-bccf-4f25ff59a532/edit"];
                };
                readonly viewUrl: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to view the document";
                    readonly examples: readonly ["https://lucid.app/lucidchart/110808fd-4553-4316-bccf-4f25ff59a532/view"];
                };
                readonly version: {
                    readonly type: "integer";
                    readonly description: "Most recent version";
                    readonly examples: readonly [101];
                };
                readonly pageCount: {
                    readonly type: "integer";
                    readonly description: "Number of pages within the document";
                    readonly examples: readonly [5];
                };
                readonly canEdit: {
                    readonly type: "boolean";
                    readonly description: "If requesting user can edit the document";
                    readonly examples: readonly [false];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the document was created";
                    readonly examples: readonly ["2019-04-22T13:47:23Z"];
                };
                readonly creatorId: {
                    readonly type: "integer";
                    readonly description: "ID of user who created and owns the document";
                    readonly examples: readonly [12345];
                };
                readonly lastModified: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the document was last modified";
                    readonly examples: readonly ["2020-06-26T16:29:37Z"];
                };
                readonly lastModifiedUserId: {
                    readonly type: "integer";
                    readonly description: "ID of user who most recently modified the document";
                    readonly examples: readonly [54321];
                };
                readonly customAttributes: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["singleLineText", "multiLineText", "singleSelectDropdown", "multiSelectDropdown", "webLink", "numericalRange", "hierarchicalDropdown"];
                                readonly description: "The custom attribute type\n\n`singleLineText` `multiLineText` `singleSelectDropdown` `multiSelectDropdown` `webLink` `numericalRange` `hierarchicalDropdown`";
                                readonly examples: readonly ["singleLineText"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Title of the custom attribute. hierarchicalDropdown attributes do not have names.";
                                readonly examples: readonly ["Sample Label"];
                            };
                            readonly value: {
                                readonly oneOf: readonly [{
                                    readonly type: "string";
                                }, {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "Custom data key";
                                                    readonly examples: readonly ["City"];
                                                };
                                                readonly value: {
                                                    readonly type: "string";
                                                    readonly description: "Custom data value";
                                                    readonly examples: readonly ["New York"];
                                                };
                                            };
                                            readonly description: "Object representing a key-value pair of data.";
                                            readonly required: readonly ["name", "value"];
                                        }, {
                                            readonly type: "string";
                                        }];
                                    };
                                }];
                                readonly description: "The value assigned to the custom attribute. The type of this value is determined by the Attribute Type.";
                                readonly examples: readonly ["New York"];
                            };
                        };
                        readonly description: "Object representing a custom attribute value for a document.";
                        readonly required: readonly ["type"];
                    };
                    readonly description: "List of any custom attributes belonging to the document. Populated for Enterprise Accounts only.";
                };
                readonly customTags: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["in progress"];
                    };
                    readonly description: "List of any custom tags assigned to the document";
                    readonly examples: readonly ["in progress"];
                };
                readonly product: {
                    readonly type: "string";
                    readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                    readonly examples: readonly ["lucidchart"];
                    readonly description: "`lucidchart` `lucidscale` `lucidspark`";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Current assigned status of the document";
                    readonly examples: readonly ["Complete"];
                };
                readonly classification: {
                    readonly type: "string";
                    readonly description: "Current assigned classification of the document";
                    readonly examples: readonly ["Private"];
                };
                readonly trashed: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "If defined, the timestamp when the document was moved to the trash";
                };
                readonly parent: {
                    readonly type: "integer";
                    readonly description: "ID of the parent folder";
                };
                readonly owner: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "number";
                            readonly description: "Id of either the user or the account, depending on the type of the document user resource.";
                            readonly examples: readonly [123456];
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "Specifies if the owner resource is referring to a user or an account. Value will be either \"user\" or \"account\".";
                            readonly examples: readonly ["user"];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Full name of the user that owns this document. This field is excluded if this document is owned by an account.";
                            readonly examples: readonly ["John Doe"];
                        };
                    };
                };
            };
            readonly required: readonly ["documentId", "title", "editUrl", "viewUrl", "version", "pageCount", "canEdit", "created", "creatorId", "lastModified", "lastModifiedUserId", "customAttributes", "customTags", "product"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateOrRefreshAccessToken: {
    readonly body: {
        readonly oneOf: readonly [{
            readonly type: "object";
            readonly required: readonly ["code", "client_id", "client_secret", "grant_type", "redirect_uri"];
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                    readonly description: "The authorization code.";
                };
                readonly client_id: {
                    readonly type: "string";
                    readonly description: "The client ID.";
                };
                readonly client_secret: {
                    readonly type: "string";
                    readonly description: "The client secret.";
                };
                readonly grant_type: {
                    readonly type: "string";
                    readonly description: "Value is always \"authorization_code\".";
                };
                readonly redirect_uri: {
                    readonly type: "string";
                    readonly description: "The redirect URI used to get the authorization code.";
                };
            };
        }, {
            readonly type: "object";
            readonly required: readonly ["refresh_token", "client_id", "client_secret", "grant_type"];
            readonly properties: {
                readonly refresh_token: {
                    readonly type: "string";
                    readonly description: "The current refresh token.";
                };
                readonly client_id: {
                    readonly type: "string";
                    readonly description: "The client ID.";
                };
                readonly client_secret: {
                    readonly type: "string";
                    readonly description: "The client secret.";
                };
                readonly grant_type: {
                    readonly type: "string";
                    readonly description: "Value is always \"refresh_token\".";
                };
            };
        }];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly access_token: {
                    readonly type: "string";
                    readonly description: "Token to be used when making requests with OAuth 2.0 authentication.";
                    readonly examples: readonly ["oauth2-Yzh4Y2Q3ZTVhY2FjYjkwOGJlZGNjNjU5NDM2NjgzZmUwMmNmMjkzM..."];
                };
                readonly client_id: {
                    readonly type: "string";
                    readonly description: "The client ID.";
                    readonly examples: readonly ["30VYbvlkqZv-SmJd7fTdpH9B9et2yqZA6Wvi5NY_"];
                };
                readonly expires_in: {
                    readonly type: "number";
                    readonly description: "The lifetime in seconds of the access token.";
                    readonly examples: readonly [3600];
                };
                readonly expires: {
                    readonly type: "number";
                    readonly format: "int64";
                    readonly description: "Time until this token expires (expressed in milliseconds since Unix epoch).";
                    readonly examples: readonly [1605732868411];
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly refresh_token: {
                    readonly type: "string";
                    readonly description: "If the token includes the scope `offline_access`, then a refresh token will be provided.";
                    readonly examples: readonly ["oauth2-AVU=-yPcwtzLkusIEnT7D9slQH4g8Ur0MdpUmpT0Z6BSMf6lmesRpTTSBGNniKd"];
                };
                readonly scopes: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly description: "Scopes allowed on this token.";
                    readonly examples: readonly ["lucidchart.document.app", "offline_access"];
                };
                readonly token_type: {
                    readonly type: "string";
                    readonly description: "Value is always \"bearer\".";
                    readonly examples: readonly ["bearer"];
                };
                readonly user_id: {
                    readonly type: "number";
                    readonly description: "ID of the user this token is on behalf of.";
                    readonly examples: readonly [341];
                };
            };
            readonly required: readonly ["access_token", "user_id", "client_id", "expires_in", "expires", "scopes", "token_type"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateTeam: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
                readonly description: "The team's name. Max length of name is 80 characters.";
                readonly examples: readonly ["Team Name"];
            };
            readonly type: {
                readonly type: "string";
                readonly enum: readonly ["hidden", "closed", "open"];
                readonly description: "The type of the team";
                readonly examples: readonly ["open"];
            };
            readonly users: {
                readonly type: "array";
                readonly items: {
                    readonly type: "integer";
                };
                readonly description: "Array of IDs of users to be on the team.";
                readonly examples: readonly [321, 654, 987];
            };
        };
        readonly required: readonly ["name", "type", "users"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly "Lucid-Request-As": {
                    readonly type: "string";
                    readonly examples: readonly ["admin"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the requesting user is an account owner, team admin, or team manager with the required permissions and they make\nthe request with the value of “admin” as this header and include an admin scope, the request will be made using\ntheir admin permissions.\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly description: "A standard representation of a team.";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly description: "The unique ID for the team.";
                    readonly examples: readonly [123456789];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The team's name.";
                    readonly examples: readonly ["Team Name"];
                };
                readonly type: {
                    readonly type: "string";
                    readonly enum: readonly ["hidden", "closed", "open"];
                    readonly description: "The type of the team\n\n`hidden` `closed` `open`";
                    readonly examples: readonly ["open"];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the team was created.";
                    readonly examples: readonly ["2024-01-30T16:29:37Z"];
                };
                readonly archived: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the team was archived (if it has been archived).";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const CreateUser: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly email: {
                readonly type: "string";
                readonly description: "The user's email.";
                readonly examples: readonly ["john-doe@example.com"];
            };
            readonly firstName: {
                readonly type: "string";
                readonly description: "The user's first name.";
                readonly examples: readonly ["John"];
            };
            readonly lastName: {
                readonly type: "string";
                readonly description: "The user's last name.";
                readonly examples: readonly ["Doe"];
            };
            readonly username: {
                readonly type: "string";
                readonly description: "The user's username. If not provided the email will be used as the username.";
                readonly examples: readonly ["john-doe@example.com"];
            };
            readonly password: {
                readonly type: "string";
                readonly description: "The user's password.";
                readonly examples: readonly ["`.~b\"J<CA95m`bV@"];
            };
            readonly roles: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly enum: readonly ["billing-admin", "team-admin", "document-admin", "template-admin"];
                    readonly description: "Allows various administrative actions.";
                };
                readonly description: "A list of roles assigned to the user.";
                readonly examples: readonly ["billing-admin", "team-admin"];
            };
        };
        readonly required: readonly ["email", "firstName", "lastName"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly accountId: {
                    readonly type: "number";
                    readonly description: "The unique ID for the user's account.";
                    readonly examples: readonly [100];
                };
                readonly email: {
                    readonly type: "string";
                    readonly description: "The user's email.";
                    readonly examples: readonly ["john-doe@example.com"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The user's full name.";
                    readonly examples: readonly ["John Doe"];
                };
                readonly userId: {
                    readonly type: "number";
                    readonly description: "The unique ID for the user.";
                    readonly examples: readonly [101];
                };
                readonly username: {
                    readonly type: "string";
                    readonly description: "The user's username.";
                    readonly examples: readonly ["johndoe"];
                };
                readonly roles: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["billing-admin", "team-admin", "document-admin", "template-admin"];
                        readonly description: "Allows various administrative actions.\n\n`billing-admin` `team-admin` `document-admin` `template-admin`";
                    };
                    readonly description: "A list of administrative roles assigned to the user.";
                    readonly examples: readonly ["billing-admin", "team-admin"];
                };
            };
            readonly description: "A standard representation of a user.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteDocumentShareLink: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
                readonly shareLinkId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Id of the share link to retrieve information for.";
                };
            };
            readonly required: readonly ["id", "shareLinkId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const DeleteDocumentTeamCollaborator: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
                readonly teamId: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team to retrieve collaborator settings for.";
                };
            };
            readonly required: readonly ["id", "teamId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const DeleteDocumentUserCollaborators: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
                readonly userId: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the user to retrieve collaborator settings for.";
                };
            };
            readonly required: readonly ["id", "userId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const DeleteEmbed: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["001bd56d-1b10-4196-8ac6-45e3c22bd1c6"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the embedded document to retrieve.";
                };
                readonly embedId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["298f9a4a-09b5-440c-b95e-4d5c2d1aaf49"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document embed to retrieve.";
                };
            };
            readonly required: readonly ["documentId", "embedId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const DeleteFolderGroupCollaborator: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Folder ID.";
                };
                readonly groupId: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Group ID.";
                };
            };
            readonly required: readonly ["id", "groupId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const DeleteFolderTeamCollaborator: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder.";
                };
                readonly teamId: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team to delete collaborator settings for.";
                };
            };
            readonly required: readonly ["id", "teamId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const DeleteFolderUserCollaborator: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder.";
                };
                readonly userId: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the user to delete collaborator settings for.";
                };
            };
            readonly required: readonly ["id", "userId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const DescribeLink: {
    readonly body: {
        readonly type: "object";
        readonly required: readonly ["url"];
        readonly properties: {
            readonly url: {
                readonly type: "string";
                readonly description: "The URL of the Lucid document link to parse information from.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly document: {
                    readonly type: "object";
                    readonly properties: {
                        readonly documentId: {
                            readonly type: "string";
                            readonly format: "uuid";
                            readonly description: "Unique identifier of the document.";
                            readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                        };
                        readonly page: {
                            readonly type: "string";
                            readonly description: "Page information of the document, if applicable.";
                        };
                        readonly product: {
                            readonly type: "string";
                            readonly description: "The Lucid product the document belongs to.";
                            readonly examples: readonly ["lucidspark"];
                        };
                    };
                    readonly description: "Information about the Document contained in the link if it exists.";
                };
                readonly invitation: {
                    readonly type: "object";
                    readonly properties: {
                        readonly invitationId: {
                            readonly type: "string";
                            readonly format: "uuid";
                            readonly description: "Unique identifier of the invitation.";
                            readonly examples: readonly ["inv_288b9365-685b-4bf2-9f6f-8aa9e2082542"];
                        };
                    };
                    readonly description: "Information about the Invitation contained in the link if it exists.";
                };
            };
            readonly description: "Resource representing information contained in a Lucid link.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DirectEmbed: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly document: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The URL of the Lucid document link or the documentId retrieved from the Describe Link endpoint.";
                };
                readonly clientId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The client ID obtained during App registration.";
                };
            };
            readonly required: readonly ["document", "clientId"];
        }];
    };
};
declare const DocumentEmbeds: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The embed session token retrieved from the Generate Embed Session Token endpoint.";
                };
            };
            readonly required: readonly ["token"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "string";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DocumentEmbedsToken: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly embedId: {
                readonly type: "string";
                readonly format: "uuid";
                readonly description: "ID of the document embed. This is needed for viewing an existing embed.";
            };
            readonly origin: {
                readonly type: "string";
                readonly description: "The domain that will be used to host the webpage in which the document picker will be embedded.";
            };
            readonly sessionConfig: {
                readonly type: "object";
                readonly properties: {
                    readonly products: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                            readonly examples: readonly ["lucidchart"];
                        };
                        readonly description: "A list of Products that a user can choose a document from to be embedded. Defaults to all products.";
                    };
                    readonly viewerType: {
                        readonly type: "object";
                        readonly properties: {
                            readonly default: {
                                readonly type: "string";
                                readonly enum: readonly ["rich", "simple"];
                                readonly description: "- rich: The standard Lucid viewer experience. A fully interactive viewer with zoom, panning, and support for hotspots and other interactive elements.\n- simple: A basic Lucid viewer experience that can be used in place of the rich viewer if there are performance or load time concerns. The simple viewer renders non-interactive raster images instead of a high-fidelity vector experience and is a poorer fit for viewing larger documents.\n";
                            };
                        };
                        readonly description: "What type of viewer to load by defaults. If not specified, defaults to rich. Users can change this later.";
                    };
                    readonly ui: {
                        readonly type: "string";
                        readonly enum: readonly ["viewer", "settings"];
                        readonly description: "- viewer: When loading an existing embed, go directly to the standard embedded view of the document.\n- settings: When loading an existing embed, show the user the embed settings interface before taking them to the standard embed view of the document.\n";
                    };
                    readonly customSettings: {
                        readonly type: "string";
                        readonly enum: readonly ["postMessage", "none"];
                        readonly description: "- postMessage: Display a \"Settings for <app>\" link in the embed settings view where users can update the settings. When clicked, the OpenCustomSettings postMessage event would be fired so the app can display its own customized settings view.\n- none: \"Settings for <app>\" link would not be available in the settings editor.\n";
                    };
                };
            };
        };
        readonly required: readonly ["origin"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "string";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const EditLegalHold: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly Title: {
                readonly type: "string";
                readonly description: "The new title for the legal hold (the existing one will be replaced). Max length of title is 80 characters.";
            };
            readonly StartTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "The new time that the legal hold will begin. Must be at least 24 hours before the end time and cannot be in the past. Cannot be changed if the legal hold has already started.";
            };
            readonly EndTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "The new time that the legal hold will end and documents on the legal hold will be released. Must be at least 24 hours after the start time and cannot be in the past.";
            };
            readonly Description: {
                readonly type: "string";
                readonly description: "The new description for the legal hold (the existing one will be replaced). Max length of description is 256 characters.";
            };
            readonly Keywords: {
                readonly type: "string";
                readonly description: "The new keywords for the legal hold (any existing ones will be replaced). Max length of keywords is 400 characters. Cannot be changed if the legal hold has already started.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly legalHoldId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unique ID of the legal hold.";
                };
            };
            readonly required: readonly ["legalHoldId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly LegalHoldId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique ID of the legal hold.";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                };
                readonly AccountId: {
                    readonly type: "number";
                    readonly description: "Unique ID for the creating admin’s account.";
                    readonly examples: readonly [100];
                };
                readonly StartTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Start time of the legal hold.";
                    readonly examples: readonly ["2025-01-01T16:18:26Z"];
                };
                readonly EndTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "End time of the legal hold.";
                    readonly examples: readonly ["2025-12-01T16:18:26Z"];
                };
                readonly Title: {
                    readonly type: "string";
                    readonly description: "Title of the legal hold.";
                    readonly examples: readonly ["New Legal Hold"];
                };
                readonly Description: {
                    readonly type: "string";
                    readonly description: "Description of the legal hold.";
                    readonly examples: readonly ["Legal hold example"];
                };
                readonly Keywords: {
                    readonly type: "string";
                    readonly description: "Keyword(s) of the legal hold.";
                    readonly examples: readonly ["alpha"];
                };
                readonly Created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Time that the legal hold was created.";
                    readonly examples: readonly ["2024-12-01T16:25:44Z"];
                };
                readonly Modified: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Time that the legal hold was last modified.";
                    readonly examples: readonly ["2024-12-01T16:25:44Z"];
                };
            };
            readonly required: readonly ["LegalHoldId", "AccountId", "StartTime", "EndTime", "Title", "Created", "Modified"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const EmbeddedDocumentPicker: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly token: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The document picker token retrieved from the Generate Document Picker Token endpoint.";
                };
                readonly allowDocumentCreation: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Enables the document picker user to create new documents. By default, created documents are not auto selected unless autoSelectCreatedDocument is set to true.";
                };
                readonly autoSelectCreatedDocument: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Enables the document picker to automatically select newly created documents.";
                };
                readonly newDocumenbtTitleSuggestion: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "When create button is enabled, it suggests a default title for the new document.";
                };
                readonly hideCancelButton: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Determines whether the document picker hides the cancel button.";
                };
                readonly onErrorRedirectUrl: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The URL to redirect the user back to if the document picker raises an error.";
                };
            };
            readonly required: readonly ["token"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "string";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GenerateDocumentPickerToken: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly product: {
                readonly type: "string";
                readonly description: "Determines which product is used for the document picker. Only documents for this product are shown.";
                readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                readonly examples: readonly ["lucidchart"];
            };
            readonly targetOrigin: {
                readonly type: "string";
                readonly description: "The domain that will be used to host the webpage in which the document picker will be embedded. This will be used as the targetOrigin parameter in a call to window.postMessage when the user selects a document.";
                readonly examples: readonly ["https://example.com"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "string";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAccountInformation: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly description: "The unique ID for the authenticated account.";
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The name assigned to the account. This field is null if no name has been assigned. Names are usually set by an admin and can be a helpful way to orient a user by informing them about which account an app will interact with.";
                };
            };
            readonly required: readonly ["id", "name"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetAuditLogs: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly from: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2021-01-01T00:00:00Z"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The timestamp from which the audit logs will be returned. Defaults to 14 days prior to the \"to\" parameter if it is defined, otherwise 14 days prior to the current timestamp.\n";
                };
                readonly to: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly examples: readonly ["2021-01-01T00:00:00Z"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The timestamp to which the logs will be returned. Defaults to the current timestamp.\n";
                };
                readonly pageSize: {
                    readonly type: "integer";
                    readonly default: 200;
                    readonly examples: readonly [100];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The number of audit logs to return per request.\n";
                };
                readonly pageToken: {
                    readonly type: "string";
                    readonly examples: readonly ["eyJvIjoiMjAyNC0wOS0wNFQxNzoxNDoyOS4zNjA5NzhaXzU4ODk4NTkxNCJ9"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "A token used for pagination to retrieve the next page of results when polling audit logs.\n";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly accountId: {
                        readonly type: "integer";
                        readonly description: "The unique ID for the account.";
                        readonly examples: readonly [1];
                    };
                    readonly actor: {
                        readonly type: "object";
                        readonly description: "Identifies the acting user that triggered the audit log event.";
                        readonly properties: {
                            readonly actorType: {
                                readonly type: "string";
                                readonly description: "The type of actor";
                                readonly examples: readonly ["user"];
                            };
                            readonly actorAccountId: {
                                readonly type: "integer";
                                readonly description: "The account ID of the actor.";
                                readonly examples: readonly [1];
                            };
                            readonly actorEmail: {
                                readonly type: "string";
                                readonly description: "The email address of the actor.";
                                readonly examples: readonly ["user@example.com"];
                            };
                            readonly actorUserId: {
                                readonly type: "number";
                                readonly description: "The user ID of the actor.";
                                readonly examples: readonly [100];
                            };
                            readonly actorClient: {
                                readonly type: "string";
                                readonly examples: readonly ["Chrome/51.0.2704.103 Safari/537.36"];
                            };
                            readonly actorIsExternal: {
                                readonly type: "boolean";
                                readonly description: "Whether the actor is external to the account.";
                                readonly examples: readonly [false];
                            };
                        };
                    };
                    readonly event: {
                        readonly type: "object";
                        readonly description: "Audit event for when a document is opened.";
                        readonly properties: {
                            readonly eventType: {
                                readonly type: "string";
                                readonly description: "The event type.";
                                readonly examples: readonly ["content.document.documentOpened"];
                            };
                            readonly documentId: {
                                readonly type: "string";
                                readonly format: "uuid";
                                readonly description: "The ID of the document opened.";
                                readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                            };
                            readonly product: {
                                readonly type: "string";
                                readonly description: "The product of the document.";
                                readonly examples: readonly ["lucidchart"];
                            };
                            readonly documentOpenedMethod: {
                                readonly type: "object";
                                readonly description: "The method used to open the document.";
                                readonly properties: {
                                    readonly methodType: {
                                        readonly type: "string";
                                        readonly description: "The method used to open the document.";
                                        readonly examples: readonly ["InApp"];
                                    };
                                };
                            };
                        };
                    };
                    readonly target: {
                        readonly type: "array";
                        readonly description: "A list of objects identifying the target of the audit event.";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly targetType: {
                                    readonly type: "string";
                                    readonly description: "The type of the target.";
                                    readonly examples: readonly ["userTarget"];
                                };
                                readonly targetId: {
                                    readonly type: "number";
                                    readonly description: "Unique identifier of the target.";
                                    readonly examples: readonly [100];
                                };
                                readonly displayName: {
                                    readonly type: "string";
                                    readonly description: "The display name of the target.";
                                    readonly examples: readonly ["User Name"];
                                };
                                readonly userEmail: {
                                    readonly type: "string";
                                    readonly format: "email";
                                    readonly description: "The email of the target user.";
                                    readonly examples: readonly ["user@example.com"];
                                };
                                readonly isExternal: {
                                    readonly type: "boolean";
                                    readonly description: "Whether the target is external to the organization.";
                                    readonly examples: readonly [false];
                                };
                            };
                        };
                    };
                    readonly flowId: {
                        readonly type: "string";
                        readonly description: "A flow id identifier.";
                        readonly examples: readonly ["55ce2349da62cba"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDocumentContent: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document to have contents retrieved.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Document ID";
                    readonly examples: readonly ["8e7b19ec-27ff-40e3-beb8-03f51b1661b2"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly description: "Title of the document";
                    readonly examples: readonly ["document title"];
                };
                readonly product: {
                    readonly type: "string";
                    readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                    readonly examples: readonly ["lucidchart"];
                    readonly description: "`lucidchart` `lucidscale` `lucidspark`";
                };
                readonly pages: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "string";
                                readonly description: "Page ID";
                                readonly examples: readonly ["YGcM5DNywbTK"];
                            };
                            readonly title: {
                                readonly type: "string";
                                readonly description: "Title of the page";
                                readonly examples: readonly ["document page title"];
                            };
                            readonly index: {
                                readonly type: "integer";
                                readonly description: "0-Based index of the page in the document";
                                readonly examples: readonly [0];
                            };
                            readonly items: {
                                readonly description: "Shapes, Lines, Groups, and Layers on the page";
                                readonly type: "object";
                                readonly properties: {
                                    readonly shapes: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "Shape ID";
                                                    readonly examples: readonly ["VTAu-oQASzul"];
                                                };
                                                readonly class: {
                                                    readonly type: "string";
                                                    readonly description: "A unique string representing the type of the shape (e.g., ProcessBlock)";
                                                    readonly examples: readonly ["ProcessBlock"];
                                                };
                                                readonly textAreas: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly label: {
                                                                readonly type: "string";
                                                                readonly description: "Text area label";
                                                                readonly examples: readonly ["Text"];
                                                            };
                                                            readonly text: {
                                                                readonly type: "string";
                                                                readonly description: "Text displayed in the text area. This is plain text. All formatting has been removed & formulas evaluated.";
                                                                readonly examples: readonly ["Start here"];
                                                            };
                                                        };
                                                        readonly description: "Object representing a text area on a Shape or Line.";
                                                        readonly required: readonly ["label", "text"];
                                                    };
                                                };
                                                readonly customData: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly description: "Custom data key";
                                                                readonly examples: readonly ["City"];
                                                            };
                                                            readonly value: {
                                                                readonly type: "string";
                                                                readonly description: "Custom data value";
                                                                readonly examples: readonly ["New York"];
                                                            };
                                                        };
                                                        readonly description: "Object representing a key-value pair of data.";
                                                        readonly required: readonly ["name", "value"];
                                                    };
                                                };
                                                readonly linkedData: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly collection_id: {
                                                                readonly type: "string";
                                                                readonly description: "Id of the collection containing the data";
                                                                readonly examples: readonly ["ABAuwlf2BTy8"];
                                                            };
                                                            readonly data: {
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly name: {
                                                                            readonly type: "string";
                                                                            readonly description: "Custom data key";
                                                                            readonly examples: readonly ["City"];
                                                                        };
                                                                        readonly value: {
                                                                            readonly type: "string";
                                                                            readonly description: "Custom data value";
                                                                            readonly examples: readonly ["New York"];
                                                                        };
                                                                    };
                                                                    readonly description: "Object representing a key-value pair of data.";
                                                                    readonly required: readonly ["name", "value"];
                                                                };
                                                                readonly description: "Key-value pairs from the dataset";
                                                            };
                                                            readonly primaryKeyValue: {
                                                                readonly type: "string";
                                                                readonly description: "The value of the primary key of the dataset";
                                                                readonly examples: readonly ["Pkey Value"];
                                                            };
                                                        };
                                                        readonly description: "Object representing data linked to a resource on a document.";
                                                        readonly required: readonly ["data", "primaryKeyValue"];
                                                    };
                                                };
                                            };
                                            readonly required: readonly ["id", "class", "textAreas", "customData", "linkedData"];
                                            readonly description: "Object representing a shape placed on a page of a document. Note that the ItemId of a shape is unique across all groups, layers, shapes, and lines.";
                                        };
                                        readonly description: "Array of Shape resources";
                                    };
                                    readonly lines: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "Line ID";
                                                    readonly examples: readonly ["VTAuwAeC0_R1"];
                                                };
                                                readonly endpoint1: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly style: {
                                                            readonly type: "string";
                                                            readonly description: "Line end style";
                                                            readonly examples: readonly ["Arrow"];
                                                        };
                                                        readonly connectedTo: {
                                                            readonly type: "string";
                                                            readonly description: "Id of shape or line the line is connected to";
                                                        };
                                                    };
                                                    readonly description: "Object representing the endpoint of a Line.";
                                                    readonly required: readonly ["style", "connectedTo"];
                                                };
                                                readonly endpoint2: {
                                                    readonly type: "object";
                                                    readonly properties: {
                                                        readonly style: {
                                                            readonly type: "string";
                                                            readonly description: "Line end style";
                                                            readonly examples: readonly ["Arrow"];
                                                        };
                                                        readonly connectedTo: {
                                                            readonly type: "string";
                                                            readonly description: "Id of shape or line the line is connected to";
                                                        };
                                                    };
                                                    readonly description: "Object representing the endpoint of a Line.";
                                                    readonly required: readonly ["style", "connectedTo"];
                                                };
                                                readonly textAreas: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly label: {
                                                                readonly type: "string";
                                                                readonly description: "Text area label";
                                                                readonly examples: readonly ["Text"];
                                                            };
                                                            readonly text: {
                                                                readonly type: "string";
                                                                readonly description: "Text displayed in the text area. This is plain text. All formatting has been removed & formulas evaluated.";
                                                                readonly examples: readonly ["Start here"];
                                                            };
                                                        };
                                                        readonly description: "Object representing a text area on a Shape or Line.";
                                                        readonly required: readonly ["label", "text"];
                                                    };
                                                };
                                                readonly customData: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly description: "Custom data key";
                                                                readonly examples: readonly ["City"];
                                                            };
                                                            readonly value: {
                                                                readonly type: "string";
                                                                readonly description: "Custom data value";
                                                                readonly examples: readonly ["New York"];
                                                            };
                                                        };
                                                        readonly description: "Object representing a key-value pair of data.";
                                                        readonly required: readonly ["name", "value"];
                                                    };
                                                };
                                                readonly linkedData: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly collection_id: {
                                                                readonly type: "string";
                                                                readonly description: "Id of the collection containing the data";
                                                                readonly examples: readonly ["ABAuwlf2BTy8"];
                                                            };
                                                            readonly data: {
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly name: {
                                                                            readonly type: "string";
                                                                            readonly description: "Custom data key";
                                                                            readonly examples: readonly ["City"];
                                                                        };
                                                                        readonly value: {
                                                                            readonly type: "string";
                                                                            readonly description: "Custom data value";
                                                                            readonly examples: readonly ["New York"];
                                                                        };
                                                                    };
                                                                    readonly description: "Object representing a key-value pair of data.";
                                                                    readonly required: readonly ["name", "value"];
                                                                };
                                                                readonly description: "Key-value pairs from the dataset";
                                                            };
                                                            readonly primaryKeyValue: {
                                                                readonly type: "string";
                                                                readonly description: "The value of the primary key of the dataset";
                                                                readonly examples: readonly ["Pkey Value"];
                                                            };
                                                        };
                                                        readonly description: "Object representing data linked to a resource on a document.";
                                                        readonly required: readonly ["data", "primaryKeyValue"];
                                                    };
                                                };
                                            };
                                            readonly description: "Object representing a line on the page of a document. Note that the ItemId of a line is unique across all groups, layers, shapes, and lines.";
                                            readonly required: readonly ["id", "endpoint1", "endpoint2", "textAreas", "customData", "linkedData"];
                                        };
                                        readonly description: "Array of Line resources";
                                    };
                                    readonly groups: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "Group ID";
                                                    readonly examples: readonly ["VTAu-dl6qtyx"];
                                                };
                                                readonly members: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "string";
                                                    };
                                                    readonly description: "Array of IDs of shapes, lines, & groups contained within the group";
                                                    readonly examples: readonly ["VTAuCB8~evzW", "VTAuo_Y56.q~"];
                                                };
                                                readonly customData: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly description: "Custom data key";
                                                                readonly examples: readonly ["City"];
                                                            };
                                                            readonly value: {
                                                                readonly type: "string";
                                                                readonly description: "Custom data value";
                                                                readonly examples: readonly ["New York"];
                                                            };
                                                        };
                                                        readonly description: "Object representing a key-value pair of data.";
                                                        readonly required: readonly ["name", "value"];
                                                    };
                                                };
                                                readonly linkedData: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly collection_id: {
                                                                readonly type: "string";
                                                                readonly description: "Id of the collection containing the data";
                                                                readonly examples: readonly ["ABAuwlf2BTy8"];
                                                            };
                                                            readonly data: {
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly name: {
                                                                            readonly type: "string";
                                                                            readonly description: "Custom data key";
                                                                            readonly examples: readonly ["City"];
                                                                        };
                                                                        readonly value: {
                                                                            readonly type: "string";
                                                                            readonly description: "Custom data value";
                                                                            readonly examples: readonly ["New York"];
                                                                        };
                                                                    };
                                                                    readonly description: "Object representing a key-value pair of data.";
                                                                    readonly required: readonly ["name", "value"];
                                                                };
                                                                readonly description: "Key-value pairs from the dataset";
                                                            };
                                                            readonly primaryKeyValue: {
                                                                readonly type: "string";
                                                                readonly description: "The value of the primary key of the dataset";
                                                                readonly examples: readonly ["Pkey Value"];
                                                            };
                                                        };
                                                        readonly description: "Object representing data linked to a resource on a document.";
                                                        readonly required: readonly ["data", "primaryKeyValue"];
                                                    };
                                                };
                                            };
                                            readonly description: "Object representing a group on the page of a document. Note that the ItemId of a group is unique across all groups, layers, shapes, and lines.";
                                            readonly required: readonly ["id", "members"];
                                        };
                                        readonly description: "Array of Group resources";
                                    };
                                    readonly layers: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly id: {
                                                    readonly type: "string";
                                                    readonly description: "Layer ID";
                                                    readonly examples: readonly ["VTAu-dl6qtyx"];
                                                };
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "The name of the layer";
                                                    readonly examples: readonly ["Layer 1"];
                                                };
                                                readonly members: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "string";
                                                    };
                                                    readonly description: "Array of IDs of shapes, lines, & groups contained within the layer";
                                                    readonly examples: readonly ["VTAuCB8~evzW", "VTAuo_Y56.q~"];
                                                };
                                                readonly customData: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly description: "Custom data key";
                                                                readonly examples: readonly ["City"];
                                                            };
                                                            readonly value: {
                                                                readonly type: "string";
                                                                readonly description: "Custom data value";
                                                                readonly examples: readonly ["New York"];
                                                            };
                                                        };
                                                        readonly description: "Object representing a key-value pair of data.";
                                                        readonly required: readonly ["name", "value"];
                                                    };
                                                };
                                                readonly linkedData: {
                                                    readonly type: "array";
                                                    readonly items: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly collection_id: {
                                                                readonly type: "string";
                                                                readonly description: "Id of the collection containing the data";
                                                                readonly examples: readonly ["ABAuwlf2BTy8"];
                                                            };
                                                            readonly data: {
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly name: {
                                                                            readonly type: "string";
                                                                            readonly description: "Custom data key";
                                                                            readonly examples: readonly ["City"];
                                                                        };
                                                                        readonly value: {
                                                                            readonly type: "string";
                                                                            readonly description: "Custom data value";
                                                                            readonly examples: readonly ["New York"];
                                                                        };
                                                                    };
                                                                    readonly description: "Object representing a key-value pair of data.";
                                                                    readonly required: readonly ["name", "value"];
                                                                };
                                                                readonly description: "Key-value pairs from the dataset";
                                                            };
                                                            readonly primaryKeyValue: {
                                                                readonly type: "string";
                                                                readonly description: "The value of the primary key of the dataset";
                                                                readonly examples: readonly ["Pkey Value"];
                                                            };
                                                        };
                                                        readonly description: "Object representing data linked to a resource on a document.";
                                                        readonly required: readonly ["data", "primaryKeyValue"];
                                                    };
                                                };
                                            };
                                            readonly description: "Object representing a layer on the page of a document. Note that the ItemId of a layer is unique across all groups, layers, shapes, and lines.";
                                            readonly required: readonly ["id", "name", "members", "customData", "linkedData"];
                                        };
                                        readonly description: "Array of Layer resources";
                                    };
                                };
                                readonly required: readonly ["shapes", "lines", "groups", "layers"];
                            };
                            readonly customData: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly name: {
                                            readonly type: "string";
                                            readonly description: "Custom data key";
                                            readonly examples: readonly ["City"];
                                        };
                                        readonly value: {
                                            readonly type: "string";
                                            readonly description: "Custom data value";
                                            readonly examples: readonly ["New York"];
                                        };
                                    };
                                    readonly description: "Object representing a key-value pair of data.";
                                    readonly required: readonly ["name", "value"];
                                };
                                readonly description: "Array of Data Pair resources linked to the page";
                            };
                            readonly linkedData: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly collection_id: {
                                            readonly type: "string";
                                            readonly description: "Id of the collection containing the data";
                                            readonly examples: readonly ["ABAuwlf2BTy8"];
                                        };
                                        readonly data: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "Custom data key";
                                                        readonly examples: readonly ["City"];
                                                    };
                                                    readonly value: {
                                                        readonly type: "string";
                                                        readonly description: "Custom data value";
                                                        readonly examples: readonly ["New York"];
                                                    };
                                                };
                                                readonly description: "Object representing a key-value pair of data.";
                                                readonly required: readonly ["name", "value"];
                                            };
                                            readonly description: "Key-value pairs from the dataset";
                                        };
                                        readonly primaryKeyValue: {
                                            readonly type: "string";
                                            readonly description: "The value of the primary key of the dataset";
                                            readonly examples: readonly ["Pkey Value"];
                                        };
                                    };
                                    readonly description: "Object representing data linked to a resource on a document.";
                                    readonly required: readonly ["data", "primaryKeyValue"];
                                };
                                readonly description: "Array of Linked Data resources linked to the page";
                            };
                        };
                        readonly description: "Object representing a single page of a Lucidchart document.";
                        readonly required: readonly ["id", "title", "index", "items", "customData", "linkedData"];
                    };
                    readonly description: "Array of Page resources on the document";
                };
                readonly data: {
                    readonly description: "Data contained on the document";
                    readonly type: "object";
                    readonly properties: {
                        readonly collections: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly id: {
                                        readonly type: "string";
                                        readonly description: "Id of the collection";
                                        readonly examples: readonly ["ABAuwlf2BTy8"];
                                    };
                                    readonly name: {
                                        readonly type: "string";
                                        readonly description: "Collection name";
                                        readonly examples: readonly ["Collection 1"];
                                    };
                                    readonly primaryKey: {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                        readonly description: "The primary key column name";
                                        readonly examples: readonly ["PKey 1"];
                                    };
                                };
                                readonly required: readonly ["id", "name", "primaryKey"];
                                readonly description: "A collection is a container inside of a source of data. A data source can have many collections, but a collection can only belong to one data source. A collection can be thought of as a tab or individual sheet in a spreadsheet file.";
                            };
                            readonly description: "Array of collections";
                        };
                    };
                    readonly required: readonly ["collections"];
                };
            };
            readonly description: "Object representing the contents of a Lucidchart document";
            readonly required: readonly ["id", "title", "product", "pages", "data"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDocumentShareLink: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
                readonly shareLinkId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Id of the share link to retrieve information for.";
                };
            };
            readonly required: readonly ["id", "shareLinkId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly shareLinkId: {
                    readonly type: "string";
                    readonly description: "Id of the share link.";
                    readonly examples: readonly ["inv_8a38797a-e5fc-4479-8492-e000dc93cb60"];
                };
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Id of the document the share link belongs to.";
                    readonly examples: readonly ["f6bf19b5-d109-4ef5-92b2-cdaf0de43001"];
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["editandshare", "edit", "comment", "view"];
                    readonly description: "Roles determine what actions an invitation will grant on a document. Invitations to a document only grant the specified level of access to just that one document.\n- `editandshare`: View, comment on, edit, and control which users can access the document.\n- `edit`: View, comment on, and edit the document.\n- `comment`: View the document. Leave comments on the document.\n- `view`: View the document.\n\n\n`editandshare` `edit` `comment` `view`";
                };
                readonly linkSecurity: {
                    readonly type: "object";
                    readonly properties: {
                        readonly restrictToAccount: {
                            readonly type: "boolean";
                            readonly description: "Whether or not users outside the document's account can accept the share link.";
                        };
                        readonly expires: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "If defined, the date and time the share link expires.";
                            readonly examples: readonly ["2023-12-11T21:48:35.293Z"];
                        };
                        readonly passcode: {
                            readonly type: "string";
                            readonly description: "If defined, the required passcode to accept the share link.";
                            readonly examples: readonly ["password"];
                        };
                        readonly allowAnonymous: {
                            readonly type: "boolean";
                            readonly description: "Whether or not the share link allows for anonymous guests.";
                        };
                    };
                    readonly required: readonly ["restrictToAccount", "allowAnonymous"];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "The date and time the share link was created.";
                    readonly examples: readonly ["2022-11-11T21:48:35.293Z"];
                };
                readonly createdBy: {
                    readonly type: "number";
                    readonly description: "User Id of the user that created the share link.";
                    readonly examples: readonly [1280];
                };
                readonly lastModified: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "The date and time the share link was last modified.";
                    readonly examples: readonly ["2022-11-11T21:48:35.293Z"];
                };
                readonly acceptUrl: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to accept the share link invitation.";
                    readonly examples: readonly ["https://lucid.app/lucidchart/f6bf19b5-d109-4ef5-92b2-cdaf0de43001/edit?invitationId=inv_8a38797a-e5fc-4479-8492-e000dc93cb60"];
                };
            };
            readonly required: readonly ["shareLinkId", "documentId", "role", "linkSecurity", "created", "createdBy", "lastModified", "acceptUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDocumentTeamCollaborator: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
                readonly teamId: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team to retrieve collaborator settings for.";
                };
            };
            readonly required: readonly ["id", "teamId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Document ID";
                };
                readonly teamId: {
                    readonly type: "integer";
                    readonly description: "Team ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["documentId", "teamId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetDocumentUserCollaborators: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
                readonly userId: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the user to retrieve collaborator settings for.";
                };
            };
            readonly required: readonly ["id", "userId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Document ID";
                };
                readonly userId: {
                    readonly type: "integer";
                    readonly description: "User ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["documentId", "userId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetEmbedDocument: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["001bd56d-1b10-4196-8ac6-45e3c22bd1c6"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the embedded document to retrieve.";
                };
                readonly embedId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["ec890631-c150-461c-992f-b96533aa05f4"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document embed to retrieve.";
                };
            };
            readonly required: readonly ["documentId", "embedId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly embedId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique identifier of the embed.";
                    readonly examples: readonly ["ec890631-c150-461c-992f-b96533aa05f4"];
                };
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique identifier of the document.";
                    readonly examples: readonly ["001bd56d-1b10-4196-8ac6-45e3c22bd1c6"];
                };
                readonly pageCount: {
                    readonly type: "number";
                    readonly description: "The number of pages on the document";
                    readonly examples: readonly [5];
                };
                readonly title: {
                    readonly type: "string";
                    readonly description: "The title of the document.";
                    readonly examples: readonly ["Documentation example document"];
                };
            };
            readonly description: "Information about the docuement correlated to the requested Embed.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetEmbedInformation: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["001bd56d-1b10-4196-8ac6-45e3c22bd1c6"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the embedded document to retrieve.";
                };
                readonly embedId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["ec890631-c150-461c-992f-b96533aa05f4"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document embed to retrieve.";
                };
            };
            readonly required: readonly ["documentId", "embedId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly embedId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique identifier of the embed.";
                    readonly examples: readonly ["ec890631-c150-461c-992f-b96533aa05f4"];
                };
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique identifier of the document.";
                    readonly examples: readonly ["001bd56d-1b10-4196-8ac6-45e3c22bd1c6"];
                };
                readonly embedVersion: {
                    readonly type: "string";
                    readonly description: "The version of the embed.";
                    readonly examples: readonly ["snapshot-version"];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly description: "When the embed was created.";
                    readonly examples: readonly ["2021-10-01T20:49:36.169Z"];
                };
                readonly modified: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly description: "When the embed was last modified.";
                    readonly examples: readonly ["2021-10-01T20:49:36.169Z"];
                };
            };
            readonly description: "Information about the requested Embed.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFolder: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder to be retrieved.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly description: "A standard representation of a folder.";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly description: "Unique ID of the folder";
                    readonly examples: readonly [123456789];
                };
                readonly type: {
                    readonly type: "string";
                    readonly description: "* folder - Folders can live in other folders, team folders, or the root of a user’s folder manager (\"My Documents\"). A folder in \"My Documents\" will have a null parent field.\n* team   - Team folders can never live in another folder and are always located in the \"Team Folders\" section of a user's folder manager. Team folders will not have a parent field. Learn more\n\n\n`folder` `team`";
                    readonly enum: readonly ["folder", "team"];
                    readonly examples: readonly ["folder"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Name of the folder";
                    readonly examples: readonly ["Folder Name"];
                };
                readonly parent: {
                    readonly type: "number";
                    readonly description: "ID of the parent folder.";
                    readonly examples: readonly [123456788];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the folder was created";
                    readonly examples: readonly ["2020-06-26T16:29:37Z"];
                };
                readonly trashed: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the folder was trashed";
                    readonly examples: readonly ["2022-01-20T12:14:18Z"];
                };
                readonly attributes: {
                    readonly type: "array";
                    readonly description: "An array of attributes assigned to the folder. Can be null or empty.";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "An attribute assigned to the folder.";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Name of the attribute";
                                readonly examples: readonly ["Sample Label"];
                            };
                            readonly value: {
                                readonly description: "Value of the attribute. Can be any type, but attributes with the same name will always have the same type.";
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["id", "type", "name", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFolderGroupCollaborator: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Folder ID.";
                };
                readonly groupId: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Group ID.";
                };
            };
            readonly required: readonly ["id", "groupId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly folderId: {
                    readonly type: "integer";
                    readonly description: "Folder ID";
                };
                readonly groupId: {
                    readonly type: "integer";
                    readonly description: "Group ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["folderId", "groupId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFolderTeamCollaborator: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder.";
                };
                readonly teamId: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team to retrieve collaborator settings for.";
                };
            };
            readonly required: readonly ["id", "teamId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly folderId: {
                    readonly type: "integer";
                    readonly description: "Folder ID";
                };
                readonly teamId: {
                    readonly type: "integer";
                    readonly description: "Team ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["folderId", "teamId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetFolderUserCollaborators: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder.";
                };
                readonly userId: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the user to retrieve collaborator settings for.";
                };
            };
            readonly required: readonly ["id", "userId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly folderId: {
                    readonly type: "integer";
                    readonly description: "Folder ID";
                };
                readonly userId: {
                    readonly type: "integer";
                    readonly description: "User ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["folderId", "userId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetLegalHoldDocuments: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly legalHoldId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unique ID of the legal hold.";
                };
            };
            readonly required: readonly ["legalHoldId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly documentId: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Unique ID of the document";
                        readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    };
                    readonly title: {
                        readonly type: "string";
                        readonly description: "Title of the document";
                        readonly examples: readonly ["document title"];
                    };
                    readonly editUrl: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "Link to edit the document";
                        readonly examples: readonly ["https://lucid.app/lucidchart/110808fd-4553-4316-bccf-4f25ff59a532/edit"];
                    };
                    readonly viewUrl: {
                        readonly type: "string";
                        readonly format: "uri";
                        readonly description: "Link to view the document";
                        readonly examples: readonly ["https://lucid.app/lucidchart/110808fd-4553-4316-bccf-4f25ff59a532/view"];
                    };
                    readonly version: {
                        readonly type: "integer";
                        readonly description: "Most recent version";
                        readonly examples: readonly [101];
                    };
                    readonly pageCount: {
                        readonly type: "integer";
                        readonly description: "Number of pages within the document";
                        readonly examples: readonly [5];
                    };
                    readonly canEdit: {
                        readonly type: "boolean";
                        readonly description: "If requesting user can edit the document";
                        readonly examples: readonly [false];
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time of when the document was created";
                        readonly examples: readonly ["2019-04-22T13:47:23Z"];
                    };
                    readonly creatorId: {
                        readonly type: "integer";
                        readonly description: "ID of user who created and owns the document";
                        readonly examples: readonly [12345];
                    };
                    readonly lastModified: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time of when the document was last modified";
                        readonly examples: readonly ["2020-06-26T16:29:37Z"];
                    };
                    readonly lastModifiedUserId: {
                        readonly type: "integer";
                        readonly description: "ID of user who most recently modified the document";
                        readonly examples: readonly [54321];
                    };
                    readonly customAttributes: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly type: {
                                    readonly type: "string";
                                    readonly enum: readonly ["singleLineText", "multiLineText", "singleSelectDropdown", "multiSelectDropdown", "webLink", "numericalRange", "hierarchicalDropdown"];
                                    readonly description: "The custom attribute type\n\n`singleLineText` `multiLineText` `singleSelectDropdown` `multiSelectDropdown` `webLink` `numericalRange` `hierarchicalDropdown`";
                                    readonly examples: readonly ["singleLineText"];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "Title of the custom attribute. hierarchicalDropdown attributes do not have names.";
                                    readonly examples: readonly ["Sample Label"];
                                };
                                readonly value: {
                                    readonly oneOf: readonly [{
                                        readonly type: "string";
                                    }, {
                                        readonly type: "array";
                                        readonly items: {
                                            readonly oneOf: readonly [{
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "Custom data key";
                                                        readonly examples: readonly ["City"];
                                                    };
                                                    readonly value: {
                                                        readonly type: "string";
                                                        readonly description: "Custom data value";
                                                        readonly examples: readonly ["New York"];
                                                    };
                                                };
                                                readonly description: "Object representing a key-value pair of data.";
                                                readonly required: readonly ["name", "value"];
                                            }, {
                                                readonly type: "string";
                                            }];
                                        };
                                    }];
                                    readonly description: "The value assigned to the custom attribute. The type of this value is determined by the Attribute Type.";
                                    readonly examples: readonly ["New York"];
                                };
                            };
                            readonly description: "Object representing a custom attribute value for a document.";
                            readonly required: readonly ["type"];
                        };
                        readonly description: "List of any custom attributes belonging to the document. Populated for Enterprise Accounts only.";
                    };
                    readonly customTags: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly examples: readonly ["in progress"];
                        };
                        readonly description: "List of any custom tags assigned to the document";
                        readonly examples: readonly ["in progress"];
                    };
                    readonly product: {
                        readonly type: "string";
                        readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                        readonly examples: readonly ["lucidchart"];
                        readonly description: "`lucidchart` `lucidscale` `lucidspark`";
                    };
                    readonly status: {
                        readonly type: "string";
                        readonly description: "Current assigned status of the document";
                        readonly examples: readonly ["Complete"];
                    };
                    readonly classification: {
                        readonly type: "string";
                        readonly description: "Current assigned classification of the document";
                        readonly examples: readonly ["Private"];
                    };
                    readonly trashed: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "If defined, the timestamp when the document was moved to the trash";
                    };
                    readonly parent: {
                        readonly type: "integer";
                        readonly description: "ID of the parent folder";
                    };
                    readonly owner: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "number";
                                readonly description: "Id of either the user or the account, depending on the type of the document user resource.";
                                readonly examples: readonly [123456];
                            };
                            readonly type: {
                                readonly type: "string";
                                readonly description: "Specifies if the owner resource is referring to a user or an account. Value will be either \"user\" or \"account\".";
                                readonly examples: readonly ["user"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Full name of the user that owns this document. This field is excluded if this document is owned by an account.";
                                readonly examples: readonly ["John Doe"];
                            };
                        };
                    };
                };
                readonly required: readonly ["documentId", "title", "editUrl", "viewUrl", "version", "pageCount", "canEdit", "created", "creatorId", "lastModified", "lastModifiedUserId", "customAttributes", "customTags", "product"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetLegalHoldUsers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly legalHoldId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unique ID of the legal hold.";
                };
            };
            readonly required: readonly ["legalHoldId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly accountId: {
                        readonly type: "number";
                        readonly description: "The unique ID for the user's account.";
                        readonly examples: readonly [100];
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly description: "The user's email.";
                        readonly examples: readonly ["john-doe@example.com"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The user's full name.";
                        readonly examples: readonly ["John Doe"];
                    };
                    readonly userId: {
                        readonly type: "number";
                        readonly description: "The unique ID for the user.";
                        readonly examples: readonly [101];
                    };
                    readonly username: {
                        readonly type: "string";
                        readonly description: "The user's username.";
                        readonly examples: readonly ["johndoe"];
                    };
                    readonly roles: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["billing-admin", "team-admin", "document-admin", "template-admin"];
                            readonly description: "Allows various administrative actions.\n\n`billing-admin` `team-admin` `document-admin` `template-admin`";
                        };
                        readonly description: "A list of administrative roles assigned to the user.";
                        readonly examples: readonly ["billing-admin", "team-admin"];
                    };
                };
                readonly description: "A standard representation of a user.";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetLegalHolds: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly LegalHoldId: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Unique ID of the legal hold.";
                        readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    };
                    readonly AccountId: {
                        readonly type: "number";
                        readonly description: "Unique ID for the creating admin’s account.";
                        readonly examples: readonly [100];
                    };
                    readonly StartTime: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Start time of the legal hold.";
                        readonly examples: readonly ["2025-01-01T16:18:26Z"];
                    };
                    readonly EndTime: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "End time of the legal hold.";
                        readonly examples: readonly ["2025-12-01T16:18:26Z"];
                    };
                    readonly Title: {
                        readonly type: "string";
                        readonly description: "Title of the legal hold.";
                        readonly examples: readonly ["New Legal Hold"];
                    };
                    readonly Description: {
                        readonly type: "string";
                        readonly description: "Description of the legal hold.";
                        readonly examples: readonly ["Legal hold example"];
                    };
                    readonly Keywords: {
                        readonly type: "string";
                        readonly description: "Keyword(s) of the legal hold.";
                        readonly examples: readonly ["alpha"];
                    };
                    readonly Created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Time that the legal hold was created.";
                        readonly examples: readonly ["2024-12-01T16:25:44Z"];
                    };
                    readonly Modified: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Time that the legal hold was last modified.";
                        readonly examples: readonly ["2024-12-01T16:25:44Z"];
                    };
                };
                readonly required: readonly ["LegalHoldId", "AccountId", "StartTime", "EndTime", "Title", "Created", "Modified"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetOrExportDocument: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document to be retrieved or exported.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly page: {
                    readonly type: "number";
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "1-based page index of the document to export. Defaults to the first page. Only a single page is allowed. Optional for export operation. Cannot be provided when pageId is provided.";
                };
                readonly pageId: {
                    readonly type: "string";
                    readonly examples: readonly ["J~65X_X714o2"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specific page of the document to export. Only a single page is allowed. Optional for export operation. Cannot be provided when page is provided.";
                };
                readonly crop: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Specifies the crop settings for the document export. Optional for export operation.\nPossible values are\n  * `x, y, width, height` - Crop to the specified region (in pixels) on the page. Example crop=1000,300,30,7\n    * Note: The region (in pixels) is accurate to the number of pixels on the canvas. The number of pixels of the outputted image will only match the crop window at a DPI of 160.\n  * `content` - Crop to page content. Example crop=content\n";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly Accept: {
                    readonly type: "string";
                    readonly examples: readonly ["image/png"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "When using the Export Document API, the format of the exported document is set via the `Accept` header. This header contains up to two parts, separated by a semicolon:\n  * A prefix stating which type of image you would like the document exported as. Options are:\n    * `image/jpeg`\n    * `image/png`\n  * Optionally, you can also supply the dots per inch (DPI) you want the exported image to have. If this value is not provided, a default of 160 will be used. For example:\n    * `image/png;dpi=256`\n    * `image/jpeg;dpi=64`\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique ID of the document";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly description: "Title of the document";
                    readonly examples: readonly ["document title"];
                };
                readonly editUrl: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to edit the document";
                    readonly examples: readonly ["https://lucid.app/lucidchart/110808fd-4553-4316-bccf-4f25ff59a532/edit"];
                };
                readonly viewUrl: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to view the document";
                    readonly examples: readonly ["https://lucid.app/lucidchart/110808fd-4553-4316-bccf-4f25ff59a532/view"];
                };
                readonly version: {
                    readonly type: "integer";
                    readonly description: "Most recent version";
                    readonly examples: readonly [101];
                };
                readonly pageCount: {
                    readonly type: "integer";
                    readonly description: "Number of pages within the document";
                    readonly examples: readonly [5];
                };
                readonly canEdit: {
                    readonly type: "boolean";
                    readonly description: "If requesting user can edit the document";
                    readonly examples: readonly [false];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the document was created";
                    readonly examples: readonly ["2019-04-22T13:47:23Z"];
                };
                readonly creatorId: {
                    readonly type: "integer";
                    readonly description: "ID of user who created and owns the document";
                    readonly examples: readonly [12345];
                };
                readonly lastModified: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the document was last modified";
                    readonly examples: readonly ["2020-06-26T16:29:37Z"];
                };
                readonly lastModifiedUserId: {
                    readonly type: "integer";
                    readonly description: "ID of user who most recently modified the document";
                    readonly examples: readonly [54321];
                };
                readonly customAttributes: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["singleLineText", "multiLineText", "singleSelectDropdown", "multiSelectDropdown", "webLink", "numericalRange", "hierarchicalDropdown"];
                                readonly description: "The custom attribute type\n\n`singleLineText` `multiLineText` `singleSelectDropdown` `multiSelectDropdown` `webLink` `numericalRange` `hierarchicalDropdown`";
                                readonly examples: readonly ["singleLineText"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Title of the custom attribute. hierarchicalDropdown attributes do not have names.";
                                readonly examples: readonly ["Sample Label"];
                            };
                            readonly value: {
                                readonly oneOf: readonly [{
                                    readonly type: "string";
                                }, {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "Custom data key";
                                                    readonly examples: readonly ["City"];
                                                };
                                                readonly value: {
                                                    readonly type: "string";
                                                    readonly description: "Custom data value";
                                                    readonly examples: readonly ["New York"];
                                                };
                                            };
                                            readonly description: "Object representing a key-value pair of data.";
                                            readonly required: readonly ["name", "value"];
                                        }, {
                                            readonly type: "string";
                                        }];
                                    };
                                }];
                                readonly description: "The value assigned to the custom attribute. The type of this value is determined by the Attribute Type.";
                                readonly examples: readonly ["New York"];
                            };
                        };
                        readonly description: "Object representing a custom attribute value for a document.";
                        readonly required: readonly ["type"];
                    };
                    readonly description: "List of any custom attributes belonging to the document. Populated for Enterprise Accounts only.";
                };
                readonly customTags: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["in progress"];
                    };
                    readonly description: "List of any custom tags assigned to the document";
                    readonly examples: readonly ["in progress"];
                };
                readonly product: {
                    readonly type: "string";
                    readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                    readonly examples: readonly ["lucidchart"];
                    readonly description: "`lucidchart` `lucidscale` `lucidspark`";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Current assigned status of the document";
                    readonly examples: readonly ["Complete"];
                };
                readonly classification: {
                    readonly type: "string";
                    readonly description: "Current assigned classification of the document";
                    readonly examples: readonly ["Private"];
                };
                readonly trashed: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "If defined, the timestamp when the document was moved to the trash";
                };
                readonly parent: {
                    readonly type: "integer";
                    readonly description: "ID of the parent folder";
                };
                readonly owner: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "number";
                            readonly description: "Id of either the user or the account, depending on the type of the document user resource.";
                            readonly examples: readonly [123456];
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "Specifies if the owner resource is referring to a user or an account. Value will be either \"user\" or \"account\".";
                            readonly examples: readonly ["user"];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Full name of the user that owns this document. This field is excluded if this document is owned by an account.";
                            readonly examples: readonly ["John Doe"];
                        };
                    };
                };
            };
            readonly required: readonly ["documentId", "title", "editUrl", "viewUrl", "version", "pageCount", "canEdit", "created", "creatorId", "lastModified", "lastModifiedUserId", "customAttributes", "customTags", "product"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTeam: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team to get.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly "Lucid-Request-As": {
                    readonly type: "string";
                    readonly examples: readonly ["admin"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the requesting user is an account owner, team admin, or team manager with the required permissions and they make\nthe request with the value of “admin” as this header and include an admin scope, the request will be made using\ntheir admin permissions.\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly description: "A standard representation of a team.";
                readonly properties: {
                    readonly id: {
                        readonly type: "number";
                        readonly description: "The unique ID for the team.";
                        readonly examples: readonly [123456789];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The team's name.";
                        readonly examples: readonly ["Team Name"];
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["hidden", "closed", "open"];
                        readonly description: "The type of the team\n\n`hidden` `closed` `open`";
                        readonly examples: readonly ["open"];
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time when the team was created.";
                        readonly examples: readonly ["2024-01-30T16:29:37Z"];
                    };
                    readonly archived: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time when the team was archived (if it has been archived).";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetUser: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly examples: readonly [204];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the user to be retrieved.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly accountId: {
                    readonly type: "number";
                    readonly description: "The unique ID for the user's account.";
                    readonly examples: readonly [100];
                };
                readonly email: {
                    readonly type: "string";
                    readonly description: "The user's email.";
                    readonly examples: readonly ["john-doe@example.com"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "The user's full name.";
                    readonly examples: readonly ["John Doe"];
                };
                readonly userId: {
                    readonly type: "number";
                    readonly description: "The unique ID for the user.";
                    readonly examples: readonly [101];
                };
                readonly username: {
                    readonly type: "string";
                    readonly description: "The user's username.";
                    readonly examples: readonly ["johndoe"];
                };
                readonly roles: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["billing-admin", "team-admin", "document-admin", "template-admin"];
                        readonly description: "Allows various administrative actions.\n\n`billing-admin` `team-admin` `document-admin` `template-admin`";
                    };
                    readonly description: "A list of administrative roles assigned to the user.";
                    readonly examples: readonly ["billing-admin", "team-admin"];
                };
            };
            readonly description: "A standard representation of a user.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetUserProfile: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly accountId: {
                    readonly type: "number";
                    readonly description: "The unique ID for the user's account.";
                    readonly examples: readonly [100];
                };
                readonly username: {
                    readonly type: "string";
                    readonly description: "Username of the user.";
                    readonly examples: readonly ["johndoe"];
                };
                readonly email: {
                    readonly type: "string";
                    readonly description: "Email of the user.";
                    readonly examples: readonly ["john-doe@example.com"];
                };
                readonly fullName: {
                    readonly type: "number";
                    readonly description: "Full name of the user.";
                    readonly examples: readonly ["John Doe"];
                };
                readonly id: {
                    readonly type: "string";
                    readonly description: "ID of the user.";
                    readonly examples: readonly [101];
                };
            };
            readonly description: "The Profile resource contains basic profile information about a user.";
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const IntrospectAccessToken: {
    readonly formData: {
        readonly type: "object";
        readonly required: readonly ["client_id", "client_secret", "token"];
        readonly properties: {
            readonly client_id: {
                readonly type: "string";
                readonly description: "The client ID.";
            };
            readonly client_secret: {
                readonly type: "string";
                readonly description: "The client secret.";
            };
            readonly token: {
                readonly type: "string";
                readonly description: "The token to inspect.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly active: {
                    readonly type: "boolean";
                    readonly description: "A boolean value indicating whether or not the token is active.";
                    readonly examples: readonly [true];
                };
                readonly client_id: {
                    readonly type: "string";
                    readonly description: "The client ID.";
                    readonly examples: readonly ["30VYbvlkqZv-SmJd7fTdpH9B9et2yqZA6Wvi5NY_"];
                };
                readonly expires_in: {
                    readonly type: "number";
                    readonly description: "The remaining lifetime in seconds of the access token.";
                    readonly examples: readonly [3500];
                };
                readonly expires: {
                    readonly type: "number";
                    readonly format: "int64";
                    readonly description: "Timestamp for when this token expires (expressed in milliseconds since Unix epoch).";
                    readonly examples: readonly [1605732868411];
                    readonly minimum: -9223372036854776000;
                    readonly maximum: 9223372036854776000;
                };
                readonly scope: {
                    readonly type: "string";
                    readonly description: "Space-separated list of scopes allowed on this token.";
                    readonly examples: readonly ["document.app offline_access"];
                };
                readonly token_type: {
                    readonly type: "string";
                    readonly description: "The type of token returned (currently, always \"bearer\").";
                    readonly examples: readonly ["bearer"];
                };
                readonly user_id: {
                    readonly type: "number";
                    readonly description: "ID of the user this token is on behalf of.";
                    readonly examples: readonly [1001];
                };
            };
            readonly required: readonly ["active", "user_id", "client_id", "token_type", "scope", "expires_in", "expires"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListDocumentUserCollaborators: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly documentId: {
                        readonly type: "string";
                        readonly format: "uuid";
                        readonly description: "Document ID";
                    };
                    readonly userId: {
                        readonly type: "integer";
                        readonly description: "User ID";
                    };
                    readonly role: {
                        readonly type: "string";
                        readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                        readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time when the collaboration was created";
                    };
                };
                readonly required: readonly ["documentId", "userId", "role", "created"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListFolderContents: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly oneOf: readonly [{
                        readonly type: "number";
                    }, {
                        readonly type: "string";
                        readonly enum: readonly ["root"];
                    }];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder or `root` to retrieve contents of the authenticated user's root directory (\"My Documents\").";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly description: "A representation of a single item contained in a folder.";
                readonly properties: {
                    readonly id: {
                        readonly anyOf: readonly [{
                            readonly type: "string";
                            readonly format: "uuid";
                        }, {
                            readonly type: "number";
                        }];
                        readonly description: "Unique ID of the folder or document being referred to. This field will be a Number for folders and a UUID for documents.";
                        readonly examples: readonly [123456789];
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "* folder  -  Type denoting that the Folder Content Resource is a folder and will have a Number id field and no product field.\n* document  -  Type denoting that the Folder Content Resource is a document and will have a UUID id field and will contain a product field.\n\n\n`folder` `document`";
                        readonly enum: readonly ["folder", "document"];
                        readonly examples: readonly ["document"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Name of the folder or document";
                        readonly examples: readonly ["Folder Name"];
                    };
                    readonly shortcut: {
                        readonly type: "boolean";
                        readonly description: "A boolean value indicating whether or not the folder or document is a shortcut. For more information on shortcuts and permissions.";
                        readonly examples: readonly [false];
                    };
                    readonly product: {
                        readonly type: "string";
                        readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                        readonly examples: readonly ["lucidchart"];
                        readonly description: "`lucidchart` `lucidscale` `lucidspark`";
                    };
                };
                readonly required: readonly ["id", "type", "name", "shortcut"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListFolderGroupCollaborators: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Folder ID.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly folderId: {
                        readonly type: "integer";
                        readonly description: "Folder ID";
                    };
                    readonly groupId: {
                        readonly type: "integer";
                        readonly description: "Group ID";
                    };
                    readonly role: {
                        readonly type: "string";
                        readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                        readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time when the collaboration was created";
                    };
                };
                readonly required: readonly ["folderId", "groupId", "role", "created"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListFolderUserCollaborators: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly folderId: {
                        readonly type: "integer";
                        readonly description: "Folder ID";
                    };
                    readonly userId: {
                        readonly type: "integer";
                        readonly description: "User ID";
                    };
                    readonly role: {
                        readonly type: "string";
                        readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                        readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time when the collaboration was created";
                    };
                };
                readonly required: readonly ["folderId", "userId", "role", "created"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListRootFolderContents: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly description: "A representation of a single item contained in a folder.";
                readonly properties: {
                    readonly id: {
                        readonly anyOf: readonly [{
                            readonly type: "string";
                            readonly format: "uuid";
                        }, {
                            readonly type: "number";
                        }];
                        readonly description: "Unique ID of the folder or document being referred to. This field will be a Number for folders and a UUID for documents.";
                        readonly examples: readonly [123456789];
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "* folder  -  Type denoting that the Folder Content Resource is a folder and will have a Number id field and no product field.\n* document  -  Type denoting that the Folder Content Resource is a document and will have a UUID id field and will contain a product field.\n\n\n`folder` `document`";
                        readonly enum: readonly ["folder", "document"];
                        readonly examples: readonly ["document"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Name of the folder or document";
                        readonly examples: readonly ["Folder Name"];
                    };
                    readonly shortcut: {
                        readonly type: "boolean";
                        readonly description: "A boolean value indicating whether or not the folder or document is a shortcut. For more information on shortcuts and permissions.";
                        readonly examples: readonly [false];
                    };
                    readonly product: {
                        readonly type: "string";
                        readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                        readonly examples: readonly ["lucidchart"];
                        readonly description: "`lucidchart` `lucidscale` `lucidspark`";
                    };
                };
                readonly required: readonly ["id", "type", "name", "shortcut"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListTeams: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly filter: {
                    readonly type: "string";
                    readonly enum: readonly ["include=memberonly"];
                    readonly examples: readonly ["include=memberonly"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The filter to apply to the returned teams. The only supported filter is \"include=memberonly\", which returns\nonly teams that the requesting user is a member of. If no filter is provided, all `open` and `closed` teams on\nthe account are returned, along with `hidden` teams that the requesting user is a member of.\n";
                };
            };
            readonly required: readonly [];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly "Lucid-Request-As": {
                    readonly type: "string";
                    readonly examples: readonly ["admin"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the requesting user is an account owner, team admin, or team manager with the required permissions and they make\nthe request with the value of “admin” as this header and include an admin scope, the request will be made using\ntheir admin permissions.\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly description: "A standard representation of a team.";
                readonly properties: {
                    readonly id: {
                        readonly type: "number";
                        readonly description: "The unique ID for the team.";
                        readonly examples: readonly [123456789];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The team's name.";
                        readonly examples: readonly ["Team Name"];
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly enum: readonly ["hidden", "closed", "open"];
                        readonly description: "The type of the team\n\n`hidden` `closed` `open`";
                        readonly examples: readonly ["open"];
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time when the team was created.";
                        readonly examples: readonly ["2024-01-30T16:29:37Z"];
                    };
                    readonly archived: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time when the team was archived (if it has been archived).";
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListUsers: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly accountId: {
                        readonly type: "number";
                        readonly description: "The unique ID for the user's account.";
                        readonly examples: readonly [100];
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly description: "The user's email.";
                        readonly examples: readonly ["john-doe@example.com"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "The user's full name.";
                        readonly examples: readonly ["John Doe"];
                    };
                    readonly userId: {
                        readonly type: "number";
                        readonly description: "The unique ID for the user.";
                        readonly examples: readonly [101];
                    };
                    readonly username: {
                        readonly type: "string";
                        readonly description: "The user's username.";
                        readonly examples: readonly ["johndoe"];
                    };
                    readonly roles: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["billing-admin", "team-admin", "document-admin", "template-admin"];
                            readonly description: "Allows various administrative actions.\n\n`billing-admin` `team-admin` `document-admin` `template-admin`";
                        };
                        readonly description: "A list of administrative roles assigned to the user.";
                        readonly examples: readonly ["billing-admin", "team-admin"];
                    };
                };
                readonly description: "A standard representation of a user.";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ListUsersOnTeam: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team to be queried.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly "Lucid-Request-As": {
                    readonly type: "string";
                    readonly examples: readonly ["admin"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the requesting user is an account owner, team admin, or team manager with the required permissions and they make\nthe request with the value of “admin” as this header and include an admin scope, the request will be made using\ntheir admin permissions.\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly accountId: {
                        readonly type: "number";
                        readonly description: "The unique ID for the user's account.";
                        readonly examples: readonly [100];
                    };
                    readonly username: {
                        readonly type: "string";
                        readonly description: "Username of the user.";
                        readonly examples: readonly ["johndoe"];
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly description: "Email of the user.";
                        readonly examples: readonly ["john-doe@example.com"];
                    };
                    readonly fullName: {
                        readonly type: "number";
                        readonly description: "Full name of the user.";
                        readonly examples: readonly ["John Doe"];
                    };
                    readonly id: {
                        readonly type: "string";
                        readonly description: "ID of the user.";
                        readonly examples: readonly [101];
                    };
                };
                readonly description: "The Profile resource contains basic profile information about a user.";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutDocumentTeamCollaborator: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly role: {
                readonly type: "string";
                readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                readonly description: "The Collaborator Role to assign to the user for this document.";
                readonly examples: readonly ["comment"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
                readonly teamId: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team to retrieve collaborator settings for.";
                };
            };
            readonly required: readonly ["id", "teamId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Document ID";
                };
                readonly teamId: {
                    readonly type: "integer";
                    readonly description: "Team ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["documentId", "teamId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Document ID";
                };
                readonly teamId: {
                    readonly type: "integer";
                    readonly description: "Team ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["documentId", "teamId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutDocumentUserCollaborators: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly role: {
                readonly type: "string";
                readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                readonly description: "The Collaborator Role to assign to the user for this document.";
                readonly examples: readonly ["comment"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
                readonly userId: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the user to retrieve collaborator settings for.";
                };
            };
            readonly required: readonly ["id", "userId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Document ID";
                };
                readonly userId: {
                    readonly type: "integer";
                    readonly description: "User ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["documentId", "userId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Document ID";
                };
                readonly userId: {
                    readonly type: "integer";
                    readonly description: "User ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["documentId", "userId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutFolderTeamCollaborator: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly role: {
                readonly type: "string";
                readonly enum: readonly ["editandshare", "edit", "comment", "view"];
                readonly description: "The Collaborator Role to assign to the team for this folder.";
                readonly examples: readonly ["comment"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder.";
                };
                readonly teamId: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team whose role is to be created or modified.";
                };
            };
            readonly required: readonly ["id", "teamId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly folderId: {
                    readonly type: "integer";
                    readonly description: "Folder ID";
                };
                readonly teamId: {
                    readonly type: "integer";
                    readonly description: "Team ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["folderId", "teamId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly folderId: {
                    readonly type: "integer";
                    readonly description: "Folder ID";
                };
                readonly teamId: {
                    readonly type: "integer";
                    readonly description: "Team ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["folderId", "teamId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutFolderUserCollaborator: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly role: {
                readonly type: "string";
                readonly enum: readonly ["editandshare", "edit", "comment", "view"];
                readonly description: "The Collaborator Role to assign to the user for this folder.";
                readonly examples: readonly ["comment"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder.";
                };
                readonly userId: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the user whose role to create or modify.";
                };
            };
            readonly required: readonly ["id", "userId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly folderId: {
                    readonly type: "integer";
                    readonly description: "Folder ID";
                };
                readonly userId: {
                    readonly type: "integer";
                    readonly description: "User ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["folderId", "userId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly folderId: {
                    readonly type: "integer";
                    readonly description: "Folder ID";
                };
                readonly userId: {
                    readonly type: "integer";
                    readonly description: "User ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["folderId", "userId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const ReleaseLegalHold: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly legalHoldId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unique ID of the legal hold.";
                };
            };
            readonly required: readonly ["legalHoldId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly LegalHoldId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique ID of the legal hold.";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                };
                readonly AccountId: {
                    readonly type: "number";
                    readonly description: "Unique ID for the creating admin’s account.";
                    readonly examples: readonly [100];
                };
                readonly StartTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Start time of the legal hold.";
                    readonly examples: readonly ["2025-01-01T16:18:26Z"];
                };
                readonly EndTime: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "End time of the legal hold.";
                    readonly examples: readonly ["2025-12-01T16:18:26Z"];
                };
                readonly Title: {
                    readonly type: "string";
                    readonly description: "Title of the legal hold.";
                    readonly examples: readonly ["New Legal Hold"];
                };
                readonly Description: {
                    readonly type: "string";
                    readonly description: "Description of the legal hold.";
                    readonly examples: readonly ["Legal hold example"];
                };
                readonly Keywords: {
                    readonly type: "string";
                    readonly description: "Keyword(s) of the legal hold.";
                    readonly examples: readonly ["alpha"];
                };
                readonly Created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Time that the legal hold was created.";
                    readonly examples: readonly ["2024-12-01T16:25:44Z"];
                };
                readonly Modified: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Time that the legal hold was last modified.";
                    readonly examples: readonly ["2024-12-01T16:25:44Z"];
                };
            };
            readonly required: readonly ["LegalHoldId", "AccountId", "StartTime", "EndTime", "Title", "Created", "Modified"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const RemoveLegalHoldUsers: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly Users: {
                readonly type: "array";
                readonly items: {
                    readonly type: "number";
                };
                readonly description: "List of user ids for users to be removed from the specified legal hold. Users must belong to the admin’s account. Max number of users per request is 200.";
            };
        };
        readonly required: readonly ["Users"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly legalHoldId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unique ID of the legal hold.";
                };
            };
            readonly required: readonly ["legalHoldId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const RemoveUsersFromTeam: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly users: {
                readonly type: "array";
                readonly items: {
                    readonly type: "integer";
                };
                readonly description: "Array of IDs of users to remove from the team.";
                readonly examples: readonly [321, 654, 987];
            };
        };
        readonly required: readonly ["users"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team from which to remove users.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly "Lucid-Request-As": {
                    readonly type: "string";
                    readonly examples: readonly ["admin"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the requesting user is an account owner, team admin, or team manager with the required permissions and they make\nthe request with the value of “admin” as this header and include an admin scope, the request will be made using\ntheir admin permissions.\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const RestoreFolder: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder to be restored from the trash.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const RestoreTeam: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly examples: readonly [99];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the team to be restored.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly "Lucid-Request-As": {
                    readonly type: "string";
                    readonly examples: readonly ["admin"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the requesting user is an account owner, team admin, or team manager with the required permissions and they make\nthe request with the value of “admin” as this header and include an admin scope, the request will be made using\ntheir admin permissions.\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const RevokeAccessToken: {
    readonly formData: {
        readonly type: "object";
        readonly required: readonly ["client_id", "client_secret", "token"];
        readonly properties: {
            readonly client_id: {
                readonly type: "string";
                readonly description: "The client ID.";
            };
            readonly client_secret: {
                readonly type: "string";
                readonly description: "The client secret.";
            };
            readonly token: {
                readonly type: "string";
                readonly description: "The token to revoke.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
};
declare const SearchAccountDocuments: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly userIds: {
                readonly type: "array";
                readonly items: {
                    readonly type: "number";
                };
                readonly description: "List of userIds to include in the search. If no ids are provided, it will search across the entire account.";
            };
            readonly ownedByUsers: {
                readonly type: "boolean";
                readonly description: "Truthy if search results should only include documents owned by users specified by userIds. Ignored if no userIds are provided.";
            };
            readonly documentIds: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly format: "uuid";
                };
                readonly description: "List of documentIds to filter by.";
            };
            readonly classificationIds: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly format: "uuid";
                };
                readonly description: "List of classificationIds to filter by.";
            };
            readonly statusIds: {
                readonly type: "array";
                readonly items: {
                    readonly type: "number";
                };
                readonly description: "List of statusIds to filter by.";
            };
            readonly createdStartTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Start of range to filter documents by created time.";
            };
            readonly createdEndTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "End of range to filter documents by created time.";
            };
            readonly lastModifiedStartTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "Start of range to filter documents by last modified time.";
            };
            readonly lastModifiedEndTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly description: "End of range to filter documents by last modified time.";
            };
            readonly product: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                    readonly examples: readonly ["lucidchart"];
                };
                readonly description: "Array of Lucid Suite products to filter by. Default value assumes all valid products for the given scopes.";
                readonly default: readonly ["lucidchart", "lucidscale", "lucidspark"];
            };
            readonly keywords: {
                readonly type: "string";
                readonly description: "Keyword(s) to search against document content and titles. When provided, results will be sorted by relevance to keyword search.";
            };
            readonly documentLocation: {
                readonly type: "string";
                readonly enum: readonly ["team folders", "users", "deleted"];
                readonly description: "Specify to search for documents owned by team folders, owned by users, or deleted";
            };
            readonly externalAccess: {
                readonly type: "string";
                readonly enum: readonly ["any", "external-collaborators", "external-links"];
                readonly description: "Specify to search for documents with either “any” type of external access, “external-collaborators”, or \"external-links\"";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly "Lucid-Request-As": {
                    readonly type: "string";
                    readonly examples: readonly ["admin"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the requesting user is an account owner or document admin with the required permissions and they make the request\nwith the value of “admin” as this header and include an admin scope, the request will be made using their admin\npermissions.\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version", "Lucid-Request-As"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique ID of the document";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly description: "Title of the document";
                    readonly examples: readonly ["document title"];
                };
                readonly adminViewUrl: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to view the document";
                    readonly examples: readonly ["https://lucid.app/lucidchart/110808fd-4553-4316-bccf-4f25ff59a532/adminView"];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the document was created";
                    readonly examples: readonly ["2019-04-22T13:47:23Z"];
                };
                readonly owner: {
                    readonly type: "object";
                    readonly properties: {
                        readonly ownerType: {
                            readonly type: "string";
                            readonly description: "user or account";
                            readonly examples: readonly ["user"];
                        };
                        readonly id: {
                            readonly type: "number";
                            readonly description: "userId or accountId";
                            readonly examples: readonly ["123456"];
                        };
                    };
                };
                readonly lastModified: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the document was last modified";
                    readonly examples: readonly ["2020-06-26T16:29:37Z"];
                };
                readonly trashed: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "If defined, the timestamp when the document was moved to the trash";
                };
                readonly customTags: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["in progress"];
                    };
                    readonly description: "List of any custom tags assigned to the document";
                    readonly examples: readonly ["in progress"];
                };
                readonly product: {
                    readonly type: "string";
                    readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                    readonly examples: readonly ["lucidchart"];
                    readonly description: "`lucidchart` `lucidscale` `lucidspark`";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Current assigned status of the document";
                    readonly examples: readonly ["Complete"];
                };
                readonly classification: {
                    readonly type: "string";
                    readonly description: "Current assigned classification of the document";
                    readonly examples: readonly ["Private"];
                };
                readonly parent: {
                    readonly type: "integer";
                    readonly description: "ID of the parent folder";
                    readonly examples: readonly [123456788];
                };
            };
            readonly required: readonly ["documentId", "title", "adminViewUrl", "created", "owner", "lastModified", "customTags", "product"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SearchDocuments: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly product: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                    readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                    readonly examples: readonly ["lucidchart"];
                };
                readonly description: "Array of Lucid Suite products to filter by. Default value assumes all valid products for the given scopes.";
                readonly default: readonly ["lucidchart", "lucidscale", "lucidspark"];
            };
            readonly createdStartTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly default: "0001-01-01T00:00:00Z";
                readonly description: "Date and time to filter documents that have been created after. Default value assumes the beginning of time.";
            };
            readonly createdEndTime: {
                readonly type: "string";
                readonly format: "date-time";
                readonly default: "now";
                readonly description: "Date and time to filter documents that have been created before. Default value assumes the current instant of time.";
            };
            readonly lastModifiedAfter: {
                readonly type: "string";
                readonly format: "date-time";
                readonly default: "0001-01-01T00:00:00Z";
                readonly description: "Date and time to filter documents that have been modified after. Default value assumes the beginning of time.";
            };
            readonly keywords: {
                readonly type: "string";
                readonly description: "Keywords to search against document content and titles. This field is truncated to 400 characters. When provided, results will be sorted by relevance to keyword search.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Unique ID of the document";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                };
                readonly title: {
                    readonly type: "string";
                    readonly description: "Title of the document";
                    readonly examples: readonly ["document title"];
                };
                readonly editUrl: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to edit the document";
                    readonly examples: readonly ["https://lucid.app/lucidchart/110808fd-4553-4316-bccf-4f25ff59a532/edit"];
                };
                readonly viewUrl: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to view the document";
                    readonly examples: readonly ["https://lucid.app/lucidchart/110808fd-4553-4316-bccf-4f25ff59a532/view"];
                };
                readonly version: {
                    readonly type: "integer";
                    readonly description: "Most recent version";
                    readonly examples: readonly [101];
                };
                readonly pageCount: {
                    readonly type: "integer";
                    readonly description: "Number of pages within the document";
                    readonly examples: readonly [5];
                };
                readonly canEdit: {
                    readonly type: "boolean";
                    readonly description: "If requesting user can edit the document";
                    readonly examples: readonly [false];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the document was created";
                    readonly examples: readonly ["2019-04-22T13:47:23Z"];
                };
                readonly creatorId: {
                    readonly type: "integer";
                    readonly description: "ID of user who created and owns the document";
                    readonly examples: readonly [12345];
                };
                readonly lastModified: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the document was last modified";
                    readonly examples: readonly ["2020-06-26T16:29:37Z"];
                };
                readonly lastModifiedUserId: {
                    readonly type: "integer";
                    readonly description: "ID of user who most recently modified the document";
                    readonly examples: readonly [54321];
                };
                readonly customAttributes: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                                readonly enum: readonly ["singleLineText", "multiLineText", "singleSelectDropdown", "multiSelectDropdown", "webLink", "numericalRange", "hierarchicalDropdown"];
                                readonly description: "The custom attribute type\n\n`singleLineText` `multiLineText` `singleSelectDropdown` `multiSelectDropdown` `webLink` `numericalRange` `hierarchicalDropdown`";
                                readonly examples: readonly ["singleLineText"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Title of the custom attribute. hierarchicalDropdown attributes do not have names.";
                                readonly examples: readonly ["Sample Label"];
                            };
                            readonly value: {
                                readonly oneOf: readonly [{
                                    readonly type: "string";
                                }, {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly oneOf: readonly [{
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly name: {
                                                    readonly type: "string";
                                                    readonly description: "Custom data key";
                                                    readonly examples: readonly ["City"];
                                                };
                                                readonly value: {
                                                    readonly type: "string";
                                                    readonly description: "Custom data value";
                                                    readonly examples: readonly ["New York"];
                                                };
                                            };
                                            readonly description: "Object representing a key-value pair of data.";
                                            readonly required: readonly ["name", "value"];
                                        }, {
                                            readonly type: "string";
                                        }];
                                    };
                                }];
                                readonly description: "The value assigned to the custom attribute. The type of this value is determined by the Attribute Type.";
                                readonly examples: readonly ["New York"];
                            };
                        };
                        readonly description: "Object representing a custom attribute value for a document.";
                        readonly required: readonly ["type"];
                    };
                    readonly description: "List of any custom attributes belonging to the document. Populated for Enterprise Accounts only.";
                };
                readonly customTags: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["in progress"];
                    };
                    readonly description: "List of any custom tags assigned to the document";
                    readonly examples: readonly ["in progress"];
                };
                readonly product: {
                    readonly type: "string";
                    readonly enum: readonly ["lucidchart", "lucidscale", "lucidspark"];
                    readonly examples: readonly ["lucidchart"];
                    readonly description: "`lucidchart` `lucidscale` `lucidspark`";
                };
                readonly status: {
                    readonly type: "string";
                    readonly description: "Current assigned status of the document";
                    readonly examples: readonly ["Complete"];
                };
                readonly classification: {
                    readonly type: "string";
                    readonly description: "Current assigned classification of the document";
                    readonly examples: readonly ["Private"];
                };
                readonly trashed: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "If defined, the timestamp when the document was moved to the trash";
                };
                readonly parent: {
                    readonly type: "integer";
                    readonly description: "ID of the parent folder";
                };
                readonly owner: {
                    readonly type: "object";
                    readonly properties: {
                        readonly id: {
                            readonly type: "number";
                            readonly description: "Id of either the user or the account, depending on the type of the document user resource.";
                            readonly examples: readonly [123456];
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly description: "Specifies if the owner resource is referring to a user or an account. Value will be either \"user\" or \"account\".";
                            readonly examples: readonly ["user"];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Full name of the user that owns this document. This field is excluded if this document is owned by an account.";
                            readonly examples: readonly ["John Doe"];
                        };
                    };
                };
            };
            readonly required: readonly ["documentId", "title", "editUrl", "viewUrl", "version", "pageCount", "canEdit", "created", "creatorId", "lastModified", "lastModifiedUserId", "customAttributes", "customTags", "product"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SearchFolders: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly type: {
                readonly type: "string";
                readonly description: "Note: This endpoint only accepts the folder type";
                readonly enum: readonly ["folder", "team"];
                readonly examples: readonly ["folder"];
            };
            readonly userIds: {
                readonly type: "array";
                readonly items: {
                    readonly type: "number";
                };
                readonly description: "List of userIds to include in search. If no ids are provided it will search across the entire account.";
            };
            readonly ownedByUsers: {
                readonly type: "boolean";
                readonly description: "Truthy if search results should only include documents owned by users specified by userIds. Ignored if no userIds are provided.";
            };
            readonly keywords: {
                readonly type: "string";
                readonly description: "Keywords to search against folder content and titles. This field is truncated to 400 characters. When provided, results will be sorted by relevance to keyword search.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
                readonly "Lucid-Request-As": {
                    readonly type: "string";
                    readonly examples: readonly ["admin"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the requesting user is an account owner or folder admin with the required permissions and they make the request\nwith the value of “admin” as this header and include an admin scope, the request will be made using their admin\npermissions.\nAccount owners and document admins can access the admin version of folder search.\n";
                };
            };
            readonly required: readonly ["Lucid-Api-Version", "Lucid-Request-As"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly description: "A standard representation of a folder.";
                readonly properties: {
                    readonly id: {
                        readonly type: "number";
                        readonly description: "Unique ID of the folder";
                        readonly examples: readonly [123456789];
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "* folder - Folders can live in other folders, team folders, or the root of a user’s folder manager (\"My Documents\"). A folder in \"My Documents\" will have a null parent field.\n* team   - Team folders can never live in another folder and are always located in the \"Team Folders\" section of a user's folder manager. Team folders will not have a parent field. Learn more\n\n\n`folder` `team`";
                        readonly enum: readonly ["folder", "team"];
                        readonly examples: readonly ["folder"];
                    };
                    readonly name: {
                        readonly type: "string";
                        readonly description: "Name of the folder";
                        readonly examples: readonly ["Folder Name"];
                    };
                    readonly parent: {
                        readonly type: "number";
                        readonly description: "ID of the parent folder.";
                        readonly examples: readonly [123456788];
                    };
                    readonly created: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time of when the folder was created";
                        readonly examples: readonly ["2020-06-26T16:29:37Z"];
                    };
                    readonly trashed: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "Date and time of when the folder was trashed";
                        readonly examples: readonly ["2022-01-20T12:14:18Z"];
                    };
                    readonly attributes: {
                        readonly type: "array";
                        readonly description: "An array of attributes assigned to the folder. Can be null or empty.";
                        readonly items: {
                            readonly type: "object";
                            readonly description: "An attribute assigned to the folder.";
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "Name of the attribute";
                                    readonly examples: readonly ["Sample Label"];
                                };
                                readonly value: {
                                    readonly description: "Value of the attribute. Can be any type, but attributes with the same name will always have the same type.";
                                };
                            };
                        };
                    };
                };
                readonly required: readonly ["id", "type", "name", "created"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const TransferUserContent: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly fromUser: {
                readonly type: "string";
                readonly format: "email";
                readonly description: "Email of the user whose content will be transferred.";
            };
            readonly toUser: {
                readonly type: "string";
                readonly format: "email";
                readonly description: "Email of the user the content will be transferred to.";
            };
        };
        readonly required: readonly ["fromUser", "toUser"];
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const TrashDocument: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly examples: readonly ["110808fd-4553-4316-bccf-4f25ff59a532"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document to be moved to the trash.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const TrashFolder: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder to be moved to the trash.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
};
declare const UpdateDocumentShareLink: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly role: {
                readonly type: "string";
                readonly enum: readonly ["editandshare", "edit", "comment", "view"];
                readonly description: "Roles determine what actions an invitation will grant on a document. Invitations to a document only grant the specified level of access to just that one document.\n- `editandshare`: View, comment on, edit, and control which users can access the document.\n- `edit`: View, comment on, and edit the document.\n- `comment`: View the document. Leave comments on the document.\n- `view`: View the document.\n";
            };
            readonly linkSecurity: {
                readonly type: "object";
                readonly properties: {
                    readonly restrictToAccount: {
                        readonly type: "boolean";
                        readonly description: "Whether or not users outside the document's account can accept the share link.";
                    };
                    readonly expires: {
                        readonly type: "string";
                        readonly format: "date-time";
                        readonly description: "If defined, the date and time the share link expires.";
                        readonly examples: readonly ["2023-12-11T21:48:35.293Z"];
                    };
                    readonly passcode: {
                        readonly type: "string";
                        readonly description: "If defined, the required passcode to accept the share link.";
                        readonly examples: readonly ["password"];
                    };
                    readonly allowAnonymous: {
                        readonly type: "boolean";
                        readonly description: "Whether or not the share link allows for anonymous guests.";
                    };
                };
                readonly required: readonly ["restrictToAccount", "allowAnonymous"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the document.";
                };
                readonly shareLinkId: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Id of the share link to retrieve information for.";
                };
            };
            readonly required: readonly ["id", "shareLinkId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly shareLinkId: {
                    readonly type: "string";
                    readonly description: "Id of the share link.";
                    readonly examples: readonly ["inv_8a38797a-e5fc-4479-8492-e000dc93cb60"];
                };
                readonly documentId: {
                    readonly type: "string";
                    readonly format: "uuid";
                    readonly description: "Id of the document the share link belongs to.";
                    readonly examples: readonly ["f6bf19b5-d109-4ef5-92b2-cdaf0de43001"];
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["editandshare", "edit", "comment", "view"];
                    readonly description: "Roles determine what actions an invitation will grant on a document. Invitations to a document only grant the specified level of access to just that one document.\n- `editandshare`: View, comment on, edit, and control which users can access the document.\n- `edit`: View, comment on, and edit the document.\n- `comment`: View the document. Leave comments on the document.\n- `view`: View the document.\n\n\n`editandshare` `edit` `comment` `view`";
                };
                readonly linkSecurity: {
                    readonly type: "object";
                    readonly properties: {
                        readonly restrictToAccount: {
                            readonly type: "boolean";
                            readonly description: "Whether or not users outside the document's account can accept the share link.";
                        };
                        readonly expires: {
                            readonly type: "string";
                            readonly format: "date-time";
                            readonly description: "If defined, the date and time the share link expires.";
                            readonly examples: readonly ["2023-12-11T21:48:35.293Z"];
                        };
                        readonly passcode: {
                            readonly type: "string";
                            readonly description: "If defined, the required passcode to accept the share link.";
                            readonly examples: readonly ["password"];
                        };
                        readonly allowAnonymous: {
                            readonly type: "boolean";
                            readonly description: "Whether or not the share link allows for anonymous guests.";
                        };
                    };
                    readonly required: readonly ["restrictToAccount", "allowAnonymous"];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "The date and time the share link was created.";
                    readonly examples: readonly ["2022-11-11T21:48:35.293Z"];
                };
                readonly createdBy: {
                    readonly type: "number";
                    readonly description: "User Id of the user that created the share link.";
                    readonly examples: readonly [1280];
                };
                readonly lastModified: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "The date and time the share link was last modified.";
                    readonly examples: readonly ["2022-11-11T21:48:35.293Z"];
                };
                readonly acceptUrl: {
                    readonly type: "string";
                    readonly format: "uri";
                    readonly description: "Link to accept the share link invitation.";
                    readonly examples: readonly ["https://lucid.app/lucidchart/f6bf19b5-d109-4ef5-92b2-cdaf0de43001/edit?invitationId=inv_8a38797a-e5fc-4479-8492-e000dc93cb60"];
                };
            };
            readonly required: readonly ["shareLinkId", "documentId", "role", "linkSecurity", "created", "createdBy", "lastModified", "acceptUrl"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UpdateFolder: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly name: {
                readonly type: "string";
                readonly description: "New name for the folder being updated.";
            };
            readonly parent: {
                readonly type: "number";
                readonly description: "New parent for the folder being updated. Causes the folder to be moved into another folder if an ID is provided or into the user's root folder (\"My Documents\") if `null` is provided. If the parent field is not included in the request, the folder will not be moved. Cannot be provided for Team Folders.\n";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "ID of the folder to be updated.";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly description: "A standard representation of a folder.";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly description: "Unique ID of the folder";
                    readonly examples: readonly [123456789];
                };
                readonly type: {
                    readonly type: "string";
                    readonly description: "* folder - Folders can live in other folders, team folders, or the root of a user’s folder manager (\"My Documents\"). A folder in \"My Documents\" will have a null parent field.\n* team   - Team folders can never live in another folder and are always located in the \"Team Folders\" section of a user's folder manager. Team folders will not have a parent field. Learn more\n\n\n`folder` `team`";
                    readonly enum: readonly ["folder", "team"];
                    readonly examples: readonly ["folder"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Name of the folder";
                    readonly examples: readonly ["Folder Name"];
                };
                readonly parent: {
                    readonly type: "number";
                    readonly description: "ID of the parent folder.";
                    readonly examples: readonly [123456788];
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the folder was created";
                    readonly examples: readonly ["2020-06-26T16:29:37Z"];
                };
                readonly trashed: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time of when the folder was trashed";
                    readonly examples: readonly ["2022-01-20T12:14:18Z"];
                };
                readonly attributes: {
                    readonly type: "array";
                    readonly description: "An array of attributes assigned to the folder. Can be null or empty.";
                    readonly items: {
                        readonly type: "object";
                        readonly description: "An attribute assigned to the folder.";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Name of the attribute";
                                readonly examples: readonly ["Sample Label"];
                            };
                            readonly value: {
                                readonly description: "Value of the attribute. Can be any type, but attributes with the same name will always have the same type.";
                            };
                        };
                    };
                };
            };
            readonly required: readonly ["id", "type", "name", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UpdateFolderGroupCollaborator: {
    readonly body: {
        readonly type: "object";
        readonly properties: {
            readonly role: {
                readonly type: "string";
                readonly enum: readonly ["editandshare", "edit", "comment", "view"];
                readonly description: "The Collaborator Role to assign to the group for this folder.";
                readonly examples: readonly ["comment"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Folder ID.";
                };
                readonly groupId: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Group ID.";
                };
            };
            readonly required: readonly ["id", "groupId"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly folderId: {
                    readonly type: "integer";
                    readonly description: "Folder ID";
                };
                readonly groupId: {
                    readonly type: "integer";
                    readonly description: "Group ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["folderId", "groupId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "201": {
            readonly type: "object";
            readonly properties: {
                readonly folderId: {
                    readonly type: "integer";
                    readonly description: "Folder ID";
                };
                readonly groupId: {
                    readonly type: "integer";
                    readonly description: "Group ID";
                };
                readonly role: {
                    readonly type: "string";
                    readonly enum: readonly ["owner", "editandshare", "edit", "comment", "view"];
                    readonly description: "The Collaborator Role on the document or folder\n\n`owner` `editandshare` `edit` `comment` `view`";
                };
                readonly created: {
                    readonly type: "string";
                    readonly format: "date-time";
                    readonly description: "Date and time when the collaboration was created";
                };
            };
            readonly required: readonly ["folderId", "groupId", "role", "created"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const UserEmailSearch: {
    readonly body: {
        readonly properties: {
            readonly emails: {
                readonly type: "array";
                readonly items: {
                    readonly type: "string";
                };
            };
        };
        readonly type: "object";
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly "Lucid-Api-Version": {
                    readonly type: "string";
                    readonly default: "1";
                    readonly examples: readonly ["1"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The API version used in the request.";
                };
            };
            readonly required: readonly ["Lucid-Api-Version"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly accountId: {
                        readonly type: "number";
                        readonly description: "The unique ID for the user's account.";
                        readonly examples: readonly [100];
                    };
                    readonly username: {
                        readonly type: "string";
                        readonly description: "Username of the user.";
                        readonly examples: readonly ["johndoe"];
                    };
                    readonly email: {
                        readonly type: "string";
                        readonly description: "Email of the user.";
                        readonly examples: readonly ["john-doe@example.com"];
                    };
                    readonly fullName: {
                        readonly type: "number";
                        readonly description: "Full name of the user.";
                        readonly examples: readonly ["John Doe"];
                    };
                    readonly id: {
                        readonly type: "string";
                        readonly description: "ID of the user.";
                        readonly examples: readonly [101];
                    };
                };
                readonly description: "The Profile resource contains basic profile information about a user.";
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { AcceptShareLink, AddLegalHoldUsers, AddUsersToTeam, ArchiveTeam, ChangeEmbedVersion, CreateDocumentShareLink, CreateEmbed, CreateFolder, CreateLegalHold, CreateOrCopyOrImportDocument, CreateOrRefreshAccessToken, CreateTeam, CreateUser, DeleteDocumentShareLink, DeleteDocumentTeamCollaborator, DeleteDocumentUserCollaborators, DeleteEmbed, DeleteFolderGroupCollaborator, DeleteFolderTeamCollaborator, DeleteFolderUserCollaborator, DescribeLink, DirectEmbed, DocumentEmbeds, DocumentEmbedsToken, EditLegalHold, EmbeddedDocumentPicker, GenerateDocumentPickerToken, GetAccountInformation, GetAuditLogs, GetDocumentContent, GetDocumentShareLink, GetDocumentTeamCollaborator, GetDocumentUserCollaborators, GetEmbedDocument, GetEmbedInformation, GetFolder, GetFolderGroupCollaborator, GetFolderTeamCollaborator, GetFolderUserCollaborators, GetLegalHoldDocuments, GetLegalHoldUsers, GetLegalHolds, GetOrExportDocument, GetTeam, GetUser, GetUserProfile, IntrospectAccessToken, ListDocumentUserCollaborators, ListFolderContents, ListFolderGroupCollaborators, ListFolderUserCollaborators, ListRootFolderContents, ListTeams, ListUsers, ListUsersOnTeam, PutDocumentTeamCollaborator, PutDocumentUserCollaborators, PutFolderTeamCollaborator, PutFolderUserCollaborator, ReleaseLegalHold, RemoveLegalHoldUsers, RemoveUsersFromTeam, RestoreFolder, RestoreTeam, RevokeAccessToken, SearchAccountDocuments, SearchDocuments, SearchFolders, TransferUserContent, TrashDocument, TrashFolder, UpdateDocumentShareLink, UpdateFolder, UpdateFolderGroupCollaborator, UserEmailSearch };
