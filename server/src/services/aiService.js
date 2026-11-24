const providerService = require("./ai/ai-provider.service");

module.exports = {
  AIError: providerService.AIError,
  askAI: providerService.askAI,
  askAIJson: providerService.askAIJson,
  extractJson: providerService.extractJson,
  sanitizePromptInput: providerService.sanitizePromptInput,
  setProviderOverride: providerService.setProviderOverride,
  getProviderOrder: providerService.getProviderOrder,
  testProvider: providerService.testProvider,
  getProviderStatus: providerService.getProviderStatus,
  withRetry: providerService.withRetry || (async (fn) => fn()),
};
