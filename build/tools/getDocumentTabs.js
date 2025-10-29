import { z } from "zod";
import { lucidService } from "../services/lucidService.js";
export const getDocumentTabsSchema = {
    documentId: z.string().describe("The ID of the Lucid document to retrieve tab metadata from. Can be extracted from URLs like https://lucid.app/lucidchart/{id}/edit"),
};
export const getDocumentTabsHandler = async ({ documentId, }) => {
    try {
        // Get document contents which includes page metadata
        const content = await lucidService.instance.getDocumentContent(documentId);
        // Extract only the tab metadata as specified
        const tabMetadata = {
            documentId: content.id,
            title: content.title,
            product: content.product,
            pages: content.pages.map((page) => ({
                id: page.id,
                title: page.title,
                index: page.index
            }))
        };
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(tabMetadata, null, 2)
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
