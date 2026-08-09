import ServiceForm from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-8">خدمة جديدة</h1>
      <ServiceForm />
    </div>
  );
}