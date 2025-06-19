export const BASE_PROMPTS = {
  SYSTEM_MESSAGE: `You are an expert at analyzing technical diagrams, architecture drawings, and visual documentation. 
You can identify components, relationships, technologies, and patterns in various types of diagrams.
Provide clear, structured, and actionable insights based on what you see in the image.`,

  LUCID_DIAGRAM_ANALYSIS: `Analyze this Lucid diagram comprehensively. First, determine what type of diagram this is, then provide appropriate analysis:

**STEP 1: DIAGRAM IDENTIFICATION**
Identify if this is:
- System Architecture (technical infrastructure, services, databases, APIs)
- Business Process (workflows, decision trees, user journeys)
- Network Diagram (servers, connections, infrastructure)
- Database Schema (tables, relationships, data flow)
- UML Diagram (classes, objects, sequences)
- Flowchart (processes, decisions, logic flow)
- Organizational Chart (people, teams, hierarchy)
- Other type (specify)

**STEP 2: COMPREHENSIVE ANALYSIS**
Based on the diagram type, provide:

1. **OVERVIEW & PURPOSE**: What does this diagram represent and what problem does it solve?

2. **COMPONENTS INVENTORY**: List all major elements with their roles:
   - For technical diagrams: systems, databases, APIs, services, technologies
   - For business processes: actors, activities, decision points, outcomes
   - For other types: key elements and their functions

3. **RELATIONSHIPS & CONNECTIONS**: Describe how components interact:
   - Follow arrows and connection lines
   - Identify data flows, communication paths, or process sequences
   - Note dependencies and integration points

4. **PATTERNS & STRUCTURE**: Identify notable patterns:
   - For technical: architectural patterns, scaling approaches, security measures
   - For business: process patterns, approval flows, exception handling
   - For other types: structural patterns and design principles

5. **TECHNOLOGY STACK** (if applicable): Specific technologies, platforms, or tools mentioned

6. **INSIGHTS & RECOMMENDATIONS**: Based on the analysis:
   - Potential improvements or optimizations
   - Best practices observed or missing
   - Scalability or maintainability considerations

**FORMATTING**: Use clear headings and bullet points. Be specific and detailed but well-structured.`,

  ERROR_FALLBACK: `I apologize, but I cannot analyze this image. This could be due to:
- Image format issues
- Network connectivity problems  
- Service limitations

Please try again with a different image or contact support if the issue persists.`
};
