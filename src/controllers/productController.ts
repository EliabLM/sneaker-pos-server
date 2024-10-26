import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProducts = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const products = await prisma.product.findMany({
            include: {
                brand: true,
                category: true,
            },
            where: {
                name: {
                    contains: search,
                    mode: "insensitive",
                },
            },
        });

        res.json(products);
    } catch (error) {
        console.error("🚀 ~ getProducts ~ error:", error);
        res.status(500).json({ message: "Error retrieving products" });
    }
};

export const createProduct = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { name, description, image, stock, price, brand_id, category_id } =
            req.body;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                image,
                stock,
                price,
                brand_id,
                category_id,
            },
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("🚀 ~ createProduct ~ error:", error);
        res.status(500).json({ message: "Error creating product" });
    }
};
