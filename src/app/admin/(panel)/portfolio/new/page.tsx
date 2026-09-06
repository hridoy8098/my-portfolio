import { PortfolioItemForm } from "@/components/admin/PortfolioItemForm";
import { AdminPageHeader } from "@/components/admin/ui";

export default async function NewPortfolioPage() {
  return (
    <>
      <AdminPageHeader
        title="New project"
        description="Create a portfolio project. Edit case-study sections as JSON."
      />
      <PortfolioItemForm />
    </>
  );
}