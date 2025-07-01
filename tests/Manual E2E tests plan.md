# Manual E2E Tests Plan for lucid-mcp-server

## 1. Document Search
- Expected: Searching by the keyword "lucid-mcp-server" returns a list of documents (e.g., 13 documents found).

## 2. Diagram Analysis (Azure OpenAI only)
- Expected: Diagram analysis succeeds, ImageAnalyzer is initialized with only the azure-openai provider.

## 3. Diagram Analysis (OpenAI only)
- Expected: Diagram analysis succeeds, ImageAnalyzer is initialized with only the openai provider.

## 4. Diagram Analysis (both providers)
- Expected: Both providers are available, azure-openai is used by default, ImageAnalyzer is initialized with two providers.

## 5. Fallback Check
- Expected: If one provider is unavailable, fallback to the other provider is used.

---

For each case, record logs and the result (success/failure).
