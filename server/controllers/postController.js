import Post from "../models/Post.js";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

// export const generatePost = async (req, res) => {
//     console.log("Generate route hit");
//     console.log("API KEY:", process.env.GEMINI_API_KEY);  
//     const { topic } = req.body;

// //   try {
// //     const response = await axios.post(
// //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
// //       {
// //         contents: [
// //           {
// //             parts: [
// //               {
// //                 text: `Generate a blog title and short blog content on ${topic}`
// //               }
// //             ]
// //           }
// //         ]
// //       }
// //     );

// //     const text = response.data.candidates[0].content.parts[0].text;

// //     const post = await Post.create({
// //       user: req.user,
// //       topic,
// //       title: topic,
// //       content: text
// //     });

// //     res.json(post);
// //   } 
//     try{
//         const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//         const model = genAI.getGenerativeModel({
//         model: "gemini-1.5-flash-latest"
//         });

//         const result = await model.generateContent(
//         `Write a blog title and a short 150-word blog post about: ${topic}`
//         );

//         const response = await result.response;
//         const text = response.text();

//         const post = await Post.create({
//         user: req.user,
//         topic,
//         title: topic,
//         content: text
//         });

//         res.json(post);

//     }catch (error) {
//     console.log("===== GEMINI ERROR START =====");
//     console.log(error.response?.data || error.message);
//     console.log("===== GEMINI ERROR END =====");
//     res.status(500).json({ error: "AI generation failed" });
//     }
// };

export const generatePost = async (req, res) => {
  const { topic } = req.body;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Write a blog title and a short 150-word blog post about ${topic}.`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );

    const text =
      response.data.candidates[0].content.parts[0].text;

    const post = await Post.create({
      user: req.user,
      topic,
      title: topic,
      content: text
    });

    res.json(post);

  } catch (error) {
    console.log("GOOGLE API ERROR:");
    console.log(error.response?.data || error.message);
    res.status(500).json({ error: "AI generation failed" });
  }
};

export const getPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user });
  res.json(posts);
};

export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};