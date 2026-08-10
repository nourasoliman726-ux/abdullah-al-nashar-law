import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import ArticlesBrowser from "@/components/ArticlesBrowser";
import { getPublishedArticles } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8 text-right">
            <div className="text-xs text-grayText mb-4">
              <a href="/" className="hover:text-gold">الرئيسية</a> <span className="mx-1">/</span> المقالات
            </div>
            <div className="text-sm font-semibold text-gold mb-3">المقالات</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              المقالات القانونية
            </h1>
            <p className="max-w-2xl mr-0 ml-auto text-sm md:text-base text-grayText">
              مقالات توعوية مبسطة تساعدك على فهم حقوقك والإجراءات القانونية المختلفة.
            </p>
          </div>
        </section>

        <section className="bg-cream py-10">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <ArticlesBrowser articles={articles} />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}