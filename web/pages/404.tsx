import SiteLayout from "@web/components/SiteLayout";

export default function NotFoundPage() {
  return (
    <SiteLayout pageTitle="404: Not found">
      <h2>Not found</h2>
      <p>The requested page does not exist.</p>
    </SiteLayout>
  );
}
