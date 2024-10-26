import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const popularProducts = await prisma.product.findMany({
      take: 15,
      include: {
        brand: true,
      },
      orderBy: {
        stock: "desc",
      },
    });
    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        creation_date: "desc",
      },
    });
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        creation_date: "desc",
      },
    });

    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
    });
  } catch (error) {
    console.error("🚀 ~ getDashboardMetrics ~ error:", error);
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
