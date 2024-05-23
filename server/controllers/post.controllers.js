import { Post } from "../models/Post.model.js";
import { User } from "../models/User.model.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstname: user.firstname,
      lastname: user.lastname,
      description,
      picturePath,
      location: user.location,
      likes: {},
      comments: {},
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatePost);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
