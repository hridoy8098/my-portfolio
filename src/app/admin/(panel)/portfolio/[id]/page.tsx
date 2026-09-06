import { notFound } from "next/navigation";
import { authedAdminClient } from "@/lib/actions/helpers";
import type { PortfolioItem } from "@/types/site";
import { PortfolioItemForm } from "@/components/admin/PortfolioItemForm";
import { AdminPageHeader } from "@/components/admin/ui";

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = await authedAdminClient();
  const { data } = await db
    .from("portfolio_items")
    .select("*")
    .eq("id", Number(id))
    .maybeSingle();

  if (!data) notFound();
  const item = data as unknown as PortfolioItem;

  return (
    <>
      <AdminPageHeader
        title={`Edit: ${item.title}`}
        description="Update the project details below."
      />
      <PortfolioItemForm item={item} />
    </>
  );
}