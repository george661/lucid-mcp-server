import { z } from "zod";
import { lucidService } from "../services/lucidService.js";
import { log } from "../utils/logger.js";

export const searchDocumentsSchema = {
    keywords: z.string().optional().describe("Optional search keywords to filter documents")
};

export const searchDocumentsHandler = async ({ keywords }: { keywords?: string }) => {
    try {
        // Search for documents
        const searchResult = await lucidService.instance.searchDocuments(keywords);

        log.debug('searchDocuments searchResult:', {
            type: typeof searchResult,
            isArray: Array.isArray(searchResult),
            length: Array.isArray(searchResult) ? searchResult.length : 'N/A',
            keys: typeof searchResult === 'object' ? Object.keys(searchResult) : 'N/A'
        });

        // Handle the case where searchResult is directly an array
        const docs = Array.isArray(searchResult) ? searchResult : (searchResult?.documents || []);

        log.debug('searchDocuments docs:', {
            docsLength: docs.length,
            firstDoc: docs.length > 0 ? docs[0] : null
        });

        if (docs.length === 0) {
            // If no results with keywords, try without keywords to see if we can get any documents at all
            if (keywords) {
                log.info(`No results for keywords "${keywords}", trying without keywords...`);
                const allDocsResult = await lucidService.instance.searchDocuments(undefined);
                const allDocs = Array.isArray(allDocsResult) ? allDocsResult : (allDocsResult?.documents || []);

                if (allDocs.length === 0) {
                    return {
                        content: [
                            {
                                type: "text" as const,
                                text: "No documents found in your account. Please check your API key permissions.",
                            },
                        ],
                    };
                } else {
                    return {
                        content: [
                            {
                                type: "text" as const, text: `No documents found for keywords: "${keywords}" However, found ${allDocs.length} total documents in your account:
                                ${allDocs.slice(0, 10).map((d: any) => `• ${d.title || 'Untitled'} (ID: ${d.documentId}) - ${d.editUrl || d.viewUrl || 'No URL available'}`).join("\n")}${allDocs.length > 10 ? `\n... and ${allDocs.length - 10} more` : ""}`,
                            },
                        ],
                    };
                }
            } else {
                return {
                    content: [
                        {
                            type: "text" as const,
                            text: "No documents found in your account. Please check your API key permissions.",
                        },
                    ],
                };
            }
        }        // Format the document list
        const docList = docs.map((d: any) => `• ${d.title || 'Untitled'} (ID: ${d.documentId}) - ${d.editUrl || d.viewUrl || 'No URL available'}`).join("\n");
        const totalText = searchResult?.totalCount ? ` (showing ${docs.length} of ${searchResult.totalCount} total)` : "";

        return {
            content: [
                {
                    type: "text" as const,
                    text: `Found ${docs.length} documents${totalText}:

${docList}`,
                },
            ],
        };
    } catch (err: any) {
        log.error('searchDocuments error:', err);
        return {
            content: [
                {
                    type: "text" as const,
                    text: `Error searching documents: ${err.message}`,
                },
            ],
        };
    }
};
