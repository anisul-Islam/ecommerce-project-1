import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";

import Product from "../model/product.js";
import dev from "../config/index.js";
import Order from "../model/order.js";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: String(dev.app.braintreeMerchantId),
  publicKey: String(dev.app.braintreePublickey),
  privateKey: String(dev.app.braintreePrivateKey),
});
// using formidable
// export const createProduct = async (req, res) => {
//   try {
//     const form = formidable({ multiples: true });
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return res.json({ err });
//       }
//     });
//   } catch (error) {
//     return res.status(400).send({
//       error: error.message,
//     });
//   }
// };

// using express-formidable
export const createProduct = async (req, res) => {
  try {
    // req.fields; // contains non-file fields
    // req.files;

    const { name, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    switch (true) {
      case !name.trim():
        return res.json({ error: "Name is required" });

      case !description.trim():
        return res.json({ error: "Description is required" });
      case !price.trim():
        return res.json({ error: "price is required" });
      case !category.trim():
        return res.json({ error: "category is required" });
      case !quantity.trim():
        return res.json({ error: "quantity is required" });
      case !shipping.trim():
        return res.json({ error: "shipping is required" });
      case photo && photo.size > 1000000:
        return res.json({ error: "Image should be less than 1mb in size" });
    }

    const newProduct = new Product({ ...req.fields, slug: slugify(name) });

    // if we have photo then
    if (photo) {
      newProduct.photo.data = fs.readFileSync(photo.path);
      newProduct.photo.contentType = photo.type;
    }
    await newProduct.save();
    return res.status(201).json({ message: "product was created", newProduct });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const { page = 1, limit = 2 } = req.query;

    console.log(page, limit);

    const products = await Product.find()
      .populate("category")
      .select("-photo")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // const products = await Product.find()
    //   .populate("category")
    //   .select("-photo")
    //   .limit(5)
    //   .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.json(product);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
export const getFilteredProducts = async (req, res) => {
  try {
    const { checkedPrice, checkedCategories } = req.body;

    let args = {};

    if (checkedCategories.length > 0) {
      args.category = checkedCategories;
    }
    if (checkedPrice.length) {
      args.price = { $gte: checkedPrice[0], $lte: checkedPrice[1] };
    }

    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
export const getPhoto = async (req, res) => {
  try {
    const product = await Product.findById({
      _id: req.params.productId,
    }).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }

    res.json(product);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
export const deletePhoto = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-photo");
    res.json(product);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });

      case !description.trim():
        res.json({ error: "Description is required" });
      case !price.trim():
        res.json({ error: "price is required" });
      case !category.trim():
        res.json({ error: "category is required" });
      case !quantity.trim():
        res.json({ error: "quantity is required" });
      case !shipping.trim():
        res.json({ error: "shipping is required" });
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    // if we have photo then
    if (photo) {
      updatedProduct.photo.data = fs.readFileSync(photo.path);
      updatedProduct.photo.contentType = photo.type;
    }
    await updatedProduct.save();
    return res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error: error.message,
    });
  }
};

export const productsCount = async (req, res) => {
  try {
    const totalProducts = await Product.find({}).countDocuments();
    res.json(totalProducts);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};
export const searchProducts = async (req, res) => {
  try {
    const { searchValue } = req.params;

    // search on product title and description
    const results = await Product.find({
      $or: [
        { name: { $regex: searchValue, $options: "i" } },
        { description: { $regex: searchValue, $options: "i" } },
      ],
    }).select("-photo");

    res.status(200).json(results);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
};

export const getBraintreeToken = async (req, res) => {
  try {
    // const gateway = new braintree.BraintreeGateway({
    //   environment: braintree.Environment.Sandbox,
    //   merchantId: String(dev.app.braintreeMerchantId),
    //   publicKey: String(dev.app.braintreePublickey),
    //   privateKey: String(dev.app.braintreePrivateKey),
    // });
    const token = await await gateway.clientToken.generate({});
    if (!token) {
      return res.status(500).json({
        error: "token not found",
      });
    }
    res.status(200).json(token);
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const processBraintreePayment = async (req, res) => {
  try {
    let { nonce, cartItems } = req.body;

    // let transactionResponse = await gateway.transaction.sale({
    //   amount: req.body.amount,
    //   paymentMethodNonce: req.body.nonce, // checking validaity with nonce by the transaction provider
    //   options: {
    //     submitForSettlement: true,
    //   },
    // });
    // console.log(transactionResponse);
    // req.send({data: transactionResponse})
    let totalAmount = 0;
    cartItems.map((cartItem) => {
      totalAmount += cartItem.price;
    });
    gateway.transaction
      .sale({
        amount: totalAmount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      })
      .then(function (result) {
        if (result.success) {
          // console.log("Transaction ID: " + result.transaction.id);
          // res.send(result);

          // console.log("cartItems", cartItems);
          // console.log("result", result);
          // console.log("buyer", req.userId);

          // create corder
          const order = new Order({
            products: cartItems,
            payment: result,
            buyer: req.userId,
          }).save();

          //decrementQuantity
          // decrementQuantity(cartItems);
          const bulkOps = cartItems.map((cartItem) => {
            return {
              updateOne: {
                filter: { _id: cartItem._id },
                update: { $inc: { qantity: -0, sold: +1 } },
              },
            };
          });
          Product.bulkWrite(bulkOps, {});
          res.json({ success: true });
        } else {
          console.error(result.message);
          res.send(result.message);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};

const decrementQuantity = async (cartItems) => {
  try {
    // build mongodb query
    const bulkOps = cartItems.map((cartItem) => {
      return {
        updateOne: {
          filter: { _id: cartItem._id },
          update: { $inc: { qantity: -0, sold: +1 } },
        },
      };
    });
    const updated = await Product.bulkWrite(bulkOps, {});
  } catch (error) {
    console.log(error);
  }
};
