# Contributing to Cost Katana Examples

Thank you for contributing to the Cost Katana examples repository!

## How to Contribute

### Adding New Examples

1. **Choose the Right Category**
   - `1-cost-tracking/` - Basic cost tracking examples
   - `2-gateway/` - Gateway features (caching, retry, firewall)
   - `3-optimization/` - Prompt optimization examples
   - `4-cortex/` - Cortex meta-language examples
   - `5-analytics/` - Analytics and reporting
   - `6-advanced/` - Advanced use cases
   - `7-frameworks/` - Framework integrations

2. **Create Both HTTP and NPM Examples**
   - HTTP: Create `.http` file in `http-headers/` folder
   - NPM: Create `.ts` file in `npm-package/` folder

3. **Follow the Template**

**HTTP Example Template:**
```http
### Example Title
# Description of what this example demonstrates

POST https://api.example.com/endpoint
CostKatana-Auth: Bearer YOUR_KEY
CostKatana-Project-Id: YOUR_PROJECT_ID
Content-Type: application/json

{
  "model": "gpt-4",
  "messages": [{"role": "user", "content": "..."}]
}

###
# 📊 Expected Results:
# ✅ What happens
# 💰 Cost estimates
# 📈 Where to view data
```

**NPM Example Template:**
```typescript
/**
 * Example: Title
 * 
 * Description of what this example demonstrates.
 * 
 * Run: npm run example path/to/file.ts
 */

import { ai } from 'cost-katana';
import { config, validateConfig } from '../../shared/config';
import { logResult, formatCost } from '../../shared/utils';

async function main() {
  console.log('\n🚀 Example Title\n');
  
  validateConfig();
  
  // Your example code here
  
  console.log('\n✅ Example completed!\n');
}

main().catch(console.error);
```

### Code Quality Standards

1. **TypeScript**
   - Use proper types
   - No `any` types unless necessary
   - Enable strict mode

2. **Error Handling**
   - Always use try-catch blocks
   - Provide helpful error messages
   - Log errors appropriately

3. **Documentation**
   - Add comments explaining complex logic
   - Include expected results
   - Provide cost estimates
   - Link to relevant documentation

4. **Environment Variables**
   - Never commit API keys
   - Use `config` from shared utilities
   - Validate required variables

5. **Consistency**
   - Follow existing code style
   - Use shared utilities
   - Match naming conventions

### Testing Your Examples

1. **Test HTTP Examples**
   - Use VS Code REST Client extension
   - Test with real API keys
   - Verify responses

2. **Test NPM Examples**
   ```bash
   npm run example path/to/your/example.ts
   ```

3. **Verify**
   - Check dashboard for tracked data
   - Verify cost calculations
   - Test error scenarios

### Submitting Changes

1. **Fork the Repository**
   ```bash
   git clone https://github.com/cost-katana/costkatana-examples.git
   cd costkatana-examples
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/my-example
   ```

3. **Make Changes**
   - Add your examples
   - Update relevant READMEs
   - Test thoroughly

4. **Commit**
   ```bash
   git add .
   git commit -m "Add example: My Feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/my-example
   ```
   - Create pull request on GitHub
   - Describe your changes
   - Link to any related issues

### What Makes a Good Example?

✅ **Good Example:**
- Clear, focused purpose
- Real-world use case
- Well-documented
- Tested and working
- Follows code standards
- Includes cost information

❌ **Avoid:**
- Overly complex examples
- Multiple concepts in one file
- Hardcoded API keys
- Missing error handling
- No documentation
- Untested code

### Provider Coverage

When adding examples, try to cover:
- OpenAI (GPT-4, GPT-3.5-turbo)
- Anthropic (Claude 3.5, Claude 3 Haiku)
- AWS Bedrock (Nova Pro)
- Google AI (Gemini Pro)
- Cohere (Command R+)
- Azure OpenAI
- DeepSeek
- Groq (Llama 3)

### Questions?

- **Discord**: [discord.gg/Wcwzw8wM](https://discord.gg/Wcwzw8wM)
- **Email**: support@costkatana.com
- **Docs**: [docs.costkatana.com](https://docs.costkatana.com)

Thank you for making Cost Katana better! 🙏

