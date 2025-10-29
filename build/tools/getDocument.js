import { z } from "zod";
import { ImageAnalyzer } from "../llm/image-analyzer.js";
import { lucidService } from "../services/lucidService.js";
export const getDocumentSchema = {
    documentId: z.string().describe("The ID of the Lucid document to retrieve. Can be extracted from URLs like https://lucid.app/lucidchart/{id}/edit"),
    analyzeImage: z.boolean().optional().describe("If true, perform AI analysis of the exported diagram (default: false)"),
    pageId: z.string().optional().describe("Page ID to export/analyze (default: '0_0')"),
    exportImage: z.boolean().optional().describe("If true, export and return the diagram as a PNG image (default: false)")
};
export const getDocumentHandler = async ({ documentId, analyzeImage = false, pageId = "0_0", exportImage = false }) => {
    try {
        // Get document metadata
        const doc = await lucidService.instance.getDocument(documentId);
        // If export image is requested (with or without analysis)
        if (exportImage || analyzeImage) {
            const imageData = await lucidService.instance.exportDocumentAsPng(documentId, pageId);
            // Build response with image
            const response = {
                content: [
                    {
                        type: "image",
                        data: imageData.base64,
                        mimeType: imageData.contentType
                    }
                ]
            };
            // If analysis is also requested, add it as text
            if (analyzeImage) {
                const analyzer = new ImageAnalyzer();
                const analysisResult = await analyzer.analyze({
                    imageBase64: imageData.base64
                });
                if (analysisResult.success) {
                    response.content.unshift({
                        type: "text",
                        text: `**${doc.title || 'Lucid Diagram'}**\n\n${analysisResult.analysis}`
                    });
                }
                else {
                    response.content.unshift({
                        type: "text",
                        text: `**${doc.title || 'Lucid Diagram'}**\n\nAnalysis failed: ${analysisResult.error}`
                    });
                }
            }
            else {
                // Add basic metadata as text
                response.content.unshift({
                    type: "text",
                    text: `**${doc.title || 'Lucid Diagram'}**\n\nDocument ID: ${documentId}\nPage: ${pageId}`
                });
            }
            return response;
        }
        // If no image/analysis needed, return comprehensive metadata
        const createdDate = doc.created ? new Date(doc.created).toLocaleDateString() : 'N/A';
        const modifiedDate = doc.lastModified ? new Date(doc.lastModified).toLocaleDateString() : 'N/A';
        // Build comprehensive document info
        let documentInfo = `**Document Information**\n`;
        documentInfo += `Title: ${doc.title || 'Untitled'}\n`;
        documentInfo += `ID: ${documentId}\n`;
        documentInfo += `Product: ${doc.product || 'N/A'}\n`;
        documentInfo += `Version: ${doc.version || 'N/A'}\n`;
        documentInfo += `Page Count: ${doc.pageCount || 'Unknown'}\n`;
        documentInfo += `Status: ${doc.status || 'N/A'}\n`;
        documentInfo += `Classification: ${doc.classification || 'None'}\n`;
        documentInfo += `Can Edit: ${doc.canEdit ? 'Yes' : 'No'}\n`;
        documentInfo += `Created: ${createdDate}\n`;
        documentInfo += `Last Modified: ${modifiedDate}\n`;
        if (doc.owner) {
            documentInfo += `\n**Owner Information**\n`;
            documentInfo += `Name: ${doc.owner.name}\n`;
            documentInfo += `ID: ${doc.owner.id}\n`;
            documentInfo += `Type: ${doc.owner.type}\n`;
        }
        if (doc.creatorId) {
            documentInfo += `\n**Creator ID:** ${doc.creatorId}\n`;
        }
        if (doc.lastModifiedUserId) {
            documentInfo += `**Last Modified by User ID:** ${doc.lastModifiedUserId}\n`;
        }
        if (doc.customTags && doc.customTags.length > 0) {
            documentInfo += `\n**Custom Tags:** ${doc.customTags.map((tag) => typeof tag === 'string' ? tag : tag.name || tag).join(', ')}\n`;
        }
        if (doc.customAttributes && doc.customAttributes.length > 0) {
            documentInfo += `\n**Custom Attributes:** ${doc.customAttributes.length} attributes defined\n`;
        }
        if (doc.editUrl) {
            documentInfo += `\n**Edit URL:** ${doc.editUrl}\n`;
        }
        if (doc.viewUrl) {
            documentInfo += `**View URL:** ${doc.viewUrl}\n`;
        }
        if (doc.trashed) {
            documentInfo += `\n**Status:** Trashed on ${new Date(doc.trashed).toLocaleDateString()}\n`;
        }
        return {
            content: [
                {
                    type: "text",
                    text: documentInfo
                }
            ]
        };
    }
    catch (err) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${err.message}`
                }
            ]
        };
    }
};
