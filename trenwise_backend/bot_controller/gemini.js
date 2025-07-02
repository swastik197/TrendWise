// // import { GoogleGenAI } from "@google/genai";
// require('dotenv').config()
// const slugify = require('slugify');
// const { GoogleGenerativeAI } = require('@google/generative-ai')

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
// async function generate(input) {
//   try {
//     const prompt = `Write a complete, SEO-optimized blog article on the topic: "${input}".

// **Instructions:**
// - Use clear, human-like language and an engaging tone.
// - Include the following sections:
//   - H1 Title
//   - Meta Description
//   - Introduction
//   - H2 and H3 subheadings with structured content
//   - Bullet points if needed
//   - A conclusion

// **Important:**
// - Embed 1 relevant **royalty-free** image with a **direct image URL** ending in .jpg, .png, or .webp (not a Pexels/Unsplash page URL).
// - Provide the image as Markdown (e.g. ![Alt Text](https://...image.jpg))
// - Do not include placeholders like "[insert]" or notes like "(replace later)"
// - No editorial instructions — only completed blog content`
//     const result = await model.generateContent(prompt)
//     console.log('generated')
//     const response = await result.response;
//     const text = response.text();

//     // Extract image URL from markdown
//     const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/;
//     const match = text.match(imageRegex);
//     const imageUrl = match ? match[1] : null;

//     return {
//       title: input,
//       slug: slugify(input), // generate slug
//       content: text,
//       imageUrl,
//       createdAt: new Date(),
//     };
//   } catch (err) {
//     console.log('errr ', err)
//   }
// }



// module.exports = { generate }


require('dotenv').config();
const slugify = require('slugify');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function generate(input) {
  try {
//     const prompt = `
// Generate a fully SEO-optimized, blog-ready article on the topic: "${input}"

// ### Format:
// - Start with an H1 title using '#'
// - Include a bold meta description starting with "**Meta Description:**"
// - Write a compelling introduction
// - Use H2 ('##') and H3 ('###') subheadings for structured content
// - Include bullet points if relevant
// - Conclude with a brief summary
// - Embed one **real** royalty-free image (ending in .jpg, .png or .webp) using **Markdown format**: ![Alt Text](https://url)

// ### Constraints:
// - Do not use placeholders or notes
// - Return only the final blog content
// - Make sure all links/images are complete and valid
// `;
const prompt = `
Generate a fully SEO-optimized, blog-ready article on the topic: "${input}"

### Format:
- Start with an H1 title using '#'
- Include a bold meta description starting with "**Meta Description:**"
- Include a comma-separated tag list starting with "**Tags:**"
- Write a compelling introduction
- Use H2 ('##') and H3 ('###') subheadings for structured content
- Include bullet points if relevant
- Conclude with a brief summary


### Constraints:
- No editorial notes
- Provide a clean blog body
- Place tags on a separate line, not inside content
`;


    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Extract image URL from markdown
    const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+\.(jpg|jpeg|png|webp))\)/i;
    const imageMatch = text.match(imageRegex);
    const imageUrl = imageMatch ? imageMatch[1] : null;

    // Extract meta description
    const metaRegex = /\*\*Meta Description:\*\*\s*(.+)/i;
    const metaMatch = text.match(metaRegex);
    const metaDescription = metaMatch ? metaMatch[1].trim() : '';

    // Extract title from first H1
    const titleRegex = /^#\s*(.+)$/m;
    const titleMatch = text.match(titleRegex);
    const title = titleMatch ? titleMatch[1].trim() : input;

   // Extract tags
const tagsRegex = /\*\*Tags:\*\*\s*(.+)/i;
const tagsMatch = text.match(tagsRegex);
const tags = tagsMatch
  ? tagsMatch[1].split(',').map(tag => tag.trim().toLowerCase())
  : [];

 text = text
      .replace(titleRegex, '')                          // remove H1 title
      .replace(metaRegex, '')                           // remove meta description
      .replace(imageRegex, '')
      .replace(tagsRegex, '')                      // remove image markdown
      .trim();                                           // clean up extra spacing



    return {
      title,
      slug: slugify(title, { lower: true }),
      content: text,
      meta: {
        description: metaDescription,
        tags
      },
      imageUrl,
      createdAt: new Date()
    };

  } catch (err) {
    console.error('Generation error:', err);
    return null;
  }
}

module.exports = { generate };
