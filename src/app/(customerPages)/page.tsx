import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import prisma from "@/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const getNewProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
}, ["/", "getNewProducts"]);

const getPopularProducts = cache(
  () => {
    return prisma.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getPopularProducts"],
  { revalidate: 60 * 60 * 12 }
);

function Home() {
  return (
    <main className="space-y-12">
      <PopularProductSection
        productsFetcher={getPopularProducts}
        title="Most Popuplar Products"
      />
      <NewProductSection
        productsFetcher={getNewProducts}
        title="Latest Products"
      />
    </main>
  );
}

type ProductSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

async function NewProductSection({
  productsFetcher,
  title,
}: ProductSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button asChild variant="outline">
          <Link href={"/products"} className="space-x-1">
            <span>See All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {(await productsFetcher()).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

async function PopularProductSection({
  productsFetcher,
  title,
}: ProductSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button asChild variant="outline">
          <Link href={"/products"} className="space-x-1">
            <span>See All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(await productsFetcher()).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
