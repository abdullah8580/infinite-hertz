import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import React from "react";

async function getSalesData() {
  const data = await prisma.order.aggregate({
    _sum: { pricePaidInCents: true },
    _count: true,
  });

  return {
    amount: (data._sum.pricePaidInCents || 0) / 100,
    totalSales: data._count,
  };
}

async function getCustomerData() {
  const [userCount, salesData] = await Promise.all([
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { pricePaidInCents: true },
    }),
  ]);

  return {
    userCount,
    averageValue:
      userCount === 0
        ? 0
        : (salesData._sum.pricePaidInCents || 0) / userCount / 100,
  };
}

async function getProductData() {
  const [active, inactive] = await Promise.all([
    prisma.product.count({ where: { isAvailableForPurchase: true } }),
    prisma.product.count({ where: { isAvailableForPurchase: false } }),
  ]);

  return {
    active,
    inactive,
  };
}

async function AdminDashboard() {
  const [salesData, userData, productData] = await Promise.all([
    getSalesData(),
    getCustomerData(),
    getProductData(),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <DashboardCard
        title="Total Sales"
        subtitle={`${formatNumber(salesData.totalSales)} Sales`}
        body={formatCurrency(salesData.amount)}
      />
      <DashboardCard
        title="Customers"
        subtitle={`${formatCurrency(
          userData.averageValue
        )} Average Customer Value`}
        body={formatNumber(userData.userCount)}
      />
      <DashboardCard
        title="Products"
        subtitle={`${formatNumber(productData.inactive)} Inactive Products`}
        body={`${formatNumber(productData.active)} Active Products`}
      />
    </div>
  );
}

type CardType = {
  title: string;
  subtitle: string;
  body: string;
};
function DashboardCard({ title, subtitle, body }: CardType) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{body}</p>
      </CardContent>
    </Card>
  );
}

export default AdminDashboard;
