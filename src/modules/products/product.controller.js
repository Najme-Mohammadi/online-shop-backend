import prisma from "../../prisma/client.js";

export const createProduct = async (req, res) => {
  try {
    const { title, price, description, stock, categoryId } = req.body;

    if (!title || !price || !categoryId) {
      return res
        .status(400)
        .json({ message: "Name, price, and categoryId are required" });
    }

    const product = await prisma.product.create({
      data: {
        title,
        price,
        description,
        stock,
        categoryId,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: { id: true, name: true },
        },
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
