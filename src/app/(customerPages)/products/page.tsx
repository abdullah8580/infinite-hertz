import ProductCard from "@/components/ProductCard";
import prisma from "@/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import React from "react";

const getProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
  });
}, ["/products", "getProducts"]);

function ProductsPage() {
  return <GetAllProducts productsFetcher={getProducts} title="All Products" />;
}

type ProductSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

async function GetAllProducts({ productsFetcher, title }: ProductSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-5">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {(await productsFetcher()).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
