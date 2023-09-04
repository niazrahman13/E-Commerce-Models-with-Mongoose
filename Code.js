const mongoose = require('mongoose');

// Step 1: Define the User Model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phoneNumber: { type: String },
});

// Step 2: Define the Product Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  imageURL: { type: String },
});

// Step 3: Define the CartItem Model
const cartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
});

// Step 4: Define the Order Model
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  totalAmount: { type: Number, required: true, min: 0 },
  shippingAddress: { type: String, required: true },
  status: { type: String, required: true, default: 'Pending' },
});

// Step 5: Implement Relationships
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);
const Order = mongoose.model('Order', orderSchema);

// Step 6: Set up relationships
// Relationship between User and CartItem
User.hasMany(CartItem, { onDelete: 'cascade' });
CartItem.belongsTo(User);

// Relationship between User and Order
User.hasMany(Order, { onDelete: 'cascade' });
Order.belongsTo(User);

module.exports = {
  User,
  Product,
  CartItem,
  Order,
};
