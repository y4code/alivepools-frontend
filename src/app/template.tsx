import SiteHeader from "@/components/custom/site-header";

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className="flex-1">
        {children}
      </div>
    </>
  );
}
