import prisma from "../../prisma/client.js";
import { getOrCreateCart } from "./cart.service.js";

export const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity = 1 } = req.body;

  const cart = await getOrCreateCart(userId);

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    }
  });

  if (existingItem) {
    const updated = await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    });

    return res.json(updated);
  }

  const item = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity
    }
  });

  res.status(201).json(item);
};

export const updateCartItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const item = await prisma.cartItem.findUnique({ where: { id: Number(id) } });
  if (!item) return res.status(404).json({ message: "Cart item not found" });

  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: Number(id) } });
    return res.json({ message: "Item removed" });
  }

  const updatedItem = await prisma.cartItem.update({
    where: { id: Number(id) },
    data: { quantity }
  });

  res.json(updatedItem);
};

export const deleteCartItem = async (req, res) => {
  const { id } = req.params;

  await prisma.cartItem.delete({
    where: { id: Number(id) }
  });

  res.json({ message: "Item deleted" });
};

export const getCart = async (req, res) => {
  const userId = req.user.id;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: { id: true, title: true, price: true }
          }
        }
      }
    }
  });

  if (!cart) {
    return res.json({ items: [], total: 0 });
  }

  const items = cart.items.map(i => ({
    id: i.id,
    product: i.product,
    quantity: i.quantity,
    total: i.product.price * i.quantity
  }));

  const cartTotal = items.reduce((sum, i) => sum + i.total, 0);

  res.json({ items, cartTotal });
};

export default {
  addToCart,
  updateCartItem,
  deleteCartItem,
  getCart
}