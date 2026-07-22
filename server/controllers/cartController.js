import Cart from "../models/Cart.js";


// Get user's cart
export const getCart = async (req, res) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    }).populate("items.product");


    res.json(cart || { items: [] });


  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};



// Add item to cart
export const addToCart = async (req, res) => {
  try {

    const { productId, quantity } = req.body;


    let cart = await Cart.findOne({
      user: req.user._id,
    });


    if (!cart) {

      cart = new Cart({
        user: req.user._id,
        items: [],
      });

    }



    const itemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId
    );



    if (itemIndex > -1) {

      cart.items[itemIndex].quantity += quantity || 1;

    } 
    else {

      cart.items.push({
        product: productId,
        quantity: quantity || 1,
      });

    }



    await cart.save();



    const updatedCart =
      await Cart.findById(cart._id)
      .populate("items.product");



    res.status(200).json(updatedCart);



  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};




// Update quantity
export const updateCartQuantity = async (req, res) => {

  try {

    const { quantity } = req.body;


    const cart = await Cart.findOne({
      user: req.user._id,
    });



    if (!cart) {

      return res.status(404).json({
        message: "Cart not found",
      });

    }



    const item = cart.items.find(
      (item) =>
        item.product.toString() === req.params.productId
    );



    if (!item) {

      return res.status(404).json({
        message: "Product not found in cart",
      });

    }



    item.quantity = quantity;



    await cart.save();



    const updatedCart =
      await Cart.findById(cart._id)
      .populate("items.product");



    res.json(updatedCart);



  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};




// Remove item from cart
export const removeFromCart = async (req, res) => {

  try {


    const cart = await Cart.findOne({
      user: req.user._id,
    });



    if (!cart) {

      return res.status(404).json({
        message: "Cart not found",
      });

    }



    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !== req.params.productId
    );



    await cart.save();



    const updatedCart =
      await Cart.findById(cart._id)
      .populate("items.product");



    res.json(updatedCart);



  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};




// Clear entire cart
export const clearCart = async (req, res) => {

  try {


    const cart = await Cart.findOne({
      user: req.user._id,
    });



    if (!cart) {

      return res.status(404).json({
        message: "Cart not found",
      });

    }



    cart.items = [];



    await cart.save();



    res.json({
      message: "Cart cleared successfully",
    });



  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};