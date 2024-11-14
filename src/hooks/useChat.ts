import { useState, useCallback } from 'react';

const API_KEY = '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';
const API_URL = 'https://api.github.com/graphql';

interface ChatResponse {
  role: 'assistant';
  content: string;
}

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (profile: string, message: string): Promise<ChatResponse> => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            mutation {
              createDiscussion(input: {
                repositoryId: "R_kgDOK5H8zA",
                title: "${profile}",
                body: "${message}"
              }) {
                discussion {
                  id
                }
              }
            }
          `
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Simulate AI response based on profile
      const responses: Record<string, string[]> = {
        finance: [
          "Based on your financial data, I recommend optimizing your cash flow by:\n\n1. Implementing automated payment collection systems\n2. Negotiating better payment terms with suppliers\n3. Setting up a cash reserve for emergencies\n\nWould you like me to elaborate on any of these points?",
          "Let's analyze your revenue streams and identify areas for improvement:\n\n• Current Revenue Mix:\n  - Primary streams\n  - Secondary streams\n  - Potential new opportunities\n\nShall we dive deeper into any specific area?",
          "Your current financial metrics indicate:\n\n📈 Strong Points:\n- Healthy profit margins\n- Stable cash flow\n\n📉 Areas for Improvement:\n- Working capital management\n- Operational efficiency\n\nWould you like a detailed analysis of any specific metric?"
        ],
        sales: [
          "Your sales performance shows potential for growth in:\n\n1. Digital Marketing Channels\n2. Customer Retention Programs\n3. Product Cross-selling\n\nLet me know which area you'd like to focus on first.",
          "Looking at your customer acquisition data:\n\n📊 Key Metrics:\n- CAC: Industry average\n- CLV: Above average\n- Conversion Rate: 2.8%\n\nWould you like recommendations for improving any of these metrics?",
          "I suggest focusing on these key sales metrics:\n\n1. Pipeline Velocity\n2. Win Rate\n3. Average Deal Size\n\nShall we create an action plan for any of these areas?"
        ],
        hr: [
          "Your team structure could be optimized by:\n\n1. Implementing clear career progression paths\n2. Enhancing cross-departmental collaboration\n3. Developing leadership training programs\n\nWhich aspect would you like to explore further?",
          "Based on industry standards, your HR policies need attention in:\n\n🎯 Priority Areas:\n- Employee engagement\n- Performance review process\n- Remote work policies\n\nLet me know which area you'd like to address first.",
          "Let's discuss employee engagement strategies:\n\n1. Recognition Programs\n2. Professional Development\n3. Work-Life Balance Initiatives\n\nWhich of these would you like to implement first?"
        ],
        business: [
          "Your business model shows strong potential in:\n\n💡 Key Areas:\n- Market positioning\n- Scalability\n- Innovation potential\n\nWould you like to explore any of these aspects in detail?",
          "Consider these market opportunities:\n\n1. Emerging Market Segments\n2. Strategic Partnerships\n3. Product Line Expansion\n\nLet's discuss which opportunity aligns best with your goals.",
          "Based on current trends, I recommend:\n\n🎯 Strategic Focus:\n- Digital transformation\n- Customer experience enhancement\n- Operational efficiency\n\nWhich area would you like to prioritize?"
        ],
        strategy: [
          "Your competitive advantage could be strengthened by:\n\n1. Unique Value Proposition\n2. Market Differentiation\n3. Innovation Leadership\n\nShall we develop a plan for any of these areas?",
          "Let's develop a strategic plan focusing on:\n\n📈 Growth Drivers:\n- Market expansion\n- Product innovation\n- Customer retention\n\nWhich driver would you like to explore first?",
          "Market analysis suggests focusing on:\n\n🎯 Priority Areas:\n- Customer segmentation\n- Competitive positioning\n- Value chain optimization\n\nWhich area interests you most?"
        ]
      };

      const profileResponses = responses[profile] || responses.business;
      const randomResponse = profileResponses[Math.floor(Math.random() * profileResponses.length)];

      return {
        role: 'assistant',
        content: randomResponse
      };
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    sendMessage,
    isLoading
  };
}
