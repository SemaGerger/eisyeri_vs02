import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "../layouts/Layout";
import PageTitle from "../components/pageCards/PageTitle";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="mx-auto mt-16 max-w-3xl px-4 py-20 text-center">
        <PageTitle title={t("notFound.title")} subtitle={t("notFound.description")} />
        <Link to="/" className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800">
          {t("nav.home")}
        </Link>
      </div>
    </Layout>
  );
}
