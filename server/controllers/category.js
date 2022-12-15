import slugify from "slugify";
import Category from "../model/category.js";

export const createCategory = async (req, res) => {
  try {
    const name = req.body.name;
    const exsitingCategory = await Category.findOne({ name });
    if (exsitingCategory) {
      return res.status(400).json({ error: "category already exist" });
    }

    const category = await new Category({
      name,
      slug: slugify(name), //phone iphone -> phone-iphone
    }).save();

    return res.status(201).json({
      message: "category is created",
      category,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({
        error: "No categories are found",
      });
    }
    return res.status(200).json({
      message: "all categories were returned",
      categories,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const getCategory = async (req, res) => {
  try {
    const slug = req.params.slug;
    const singleCategory = await Category.findOne({ slug });
    if (!singleCategory) {
      return res.status(404).json({
        error: "No category is found with this slug",
      });
    }
    return res.status(200).json({
      message: "single category was returned",
      singleCategory,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    return res.status(200).json({
      message: "category was updated",
      updatedCategory,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log(categoryId);
    const deletedCategory = await Category.findByIdAndDelete({
      _id: categoryId,
    });

    return res.status(200).json({
      message: "category was deleted",
      deletedCategory,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
