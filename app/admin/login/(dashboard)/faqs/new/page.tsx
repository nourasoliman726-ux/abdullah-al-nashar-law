import FaqForm from "@/components/admin/FaqForm";

export default function NewFaqPage() {
  return (
    <div className="text-right">
      <h1 className="text-2xl font-extrabold text-slate mb-8">سؤال جديد</h1>
      <FaqForm />
    </div>
  );
}