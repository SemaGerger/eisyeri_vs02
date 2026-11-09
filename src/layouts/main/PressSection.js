import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ZoomIn } from "lucide-react";
import { pressData, pressPhotos } from "../../api/DefaultData";
import SectionTitle from "../../components/section/SectionTitle";
import MediaDialog from "../../components/media/MediaDialog";

const PressSection = () => {
  const { t } = useTranslation();
  const [selectedMedia, setSelectedMedia] = useState(null);
  const openVideo = (item) => setSelectedMedia({ ...item, type: "video", src: item.video });
  const openImage = (item) => setSelectedMedia({ ...item, type: "image", src: item.image });
  const renderVideo = (item, extraProps = {}) => (
    <PressCard
      key={item.id}
      poster={item.poster}
      title={item.title}
      label={t("media.playVideo", { title: item.title, defaultValue: "{{title}} videosunu oynat" })}
      onClick={() => openVideo(item)}
      {...extraProps}
    />
  );

  return (
    <section className="flex flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-2">
      <SectionTitle
        title={t("sections.pressTitle", "Basında Biz")}
        subtitle={t("sections.pressSubtitle", "Basında Eşit İşyeri ile ilgili çıkan haberler")}
      />

      <div className="w-full max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {pressData.slice(0, 3).map((item) => renderVideo(item))}
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {pressData.slice(3, 7).map((item) => renderVideo(item))}
        </div>
        <div className="mt-12 flex justify-center">
          {pressData.slice(7, 8).map((item) => renderVideo(item, {
            className: "w-full max-w-3xl",
            mediaClassName: "h-[280px]",
          }))}
        </div>

        {pressPhotos?.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {pressPhotos.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openImage(item)}
                aria-label={t("media.openImage", { title: item.title, defaultValue: "{{title}} görselini büyüt" })}
                className="group relative overflow-hidden rounded-lg bg-white text-left shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span aria-hidden="true" className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white shadow-md backdrop-blur-sm group-hover:bg-blue-600">
                  <ZoomIn size={20} />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedMedia && (
        <MediaDialog title={selectedMedia.title} onClose={() => setSelectedMedia(null)}>
          {selectedMedia.type === "video" ? (
            <video
              src={selectedMedia.src}
              poster={selectedMedia.poster}
              aria-label={selectedMedia.title}
              tabIndex={0}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-h-[70vh] w-full rounded object-contain"
            />
          ) : (
            <img
              src={selectedMedia.src}
              alt={selectedMedia.title}
              className="max-h-[75vh] max-w-full rounded object-contain"
            />
          )}
        </MediaDialog>
      )}
    </section>
  );
};

function PressCard({ poster, title, label, onClick, className = "", mediaClassName = "h-48" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group flex h-full flex-col overflow-hidden rounded-lg bg-gray-900 text-left shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${className}`}
    >
      <span className={`relative block w-full overflow-hidden ${mediaClassName}`}>
        {poster ? (
          <img src={poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full items-center justify-center px-4 text-lg font-semibold text-white">{title}</span>
        )}
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-black/15 transition group-hover:bg-black/30">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/65 text-2xl text-white">▶</span>
        </span>
      </span>
    </button>
  );
}

export default PressSection;
