import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("");

const generateBlog = async () =>{
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    const prompt = `Please write an engaging 1000 word blog, please return the blog as a json object with the following properties. 
    
    Properties - category, content, hook, keywords, title.

    The category property should be a single word describing the category the blog should be placed under for, please write the actual blog inside the content property, please write an eye catching hook in under 20 words for the hook property, please return an array of 25-50 related seo focused keywords for the keyword property, and a brief curiosity invoking title for the title property. 
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

generateBlog();