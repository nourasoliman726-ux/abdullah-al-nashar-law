import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import VideosBrowser from "@/components/VideosBrowser";
import { getPublishedVideos } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const videos = await getPublishedVideos();

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-navy py-16">
          <div className="max-w-7xl mx-auto px-5 md:px-8 text-right">
            <div className="text-xs text-grayText mb-4">
              <a href="/" className="hover:text-gold">الرئيسية</a> <span className="mx-1">/</span> الفيديوهات
            </div>
            <div className="text-sm font-semibold text-gold mb-3">الفيديوهات</div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              مكتبة الفيديوهات القانونية
            </h1>
            <p className="max-w-2xl mr-0 ml-auto text-sm md:text-base text-grayText">
              شروحات مرئية للمفاهيم والإجراءات القانونية، مصنّفة حسب المجال.
            </p>
          </div>
        </section>

        <section className="bg-cream py-10">
          <div className="max-w-7xl mx-auto px-5 md:px-8">
            <VideosBrowser videos={videos} />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsapp />
    </>
  );
}