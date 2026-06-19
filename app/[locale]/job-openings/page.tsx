import { ErxesFormEmbed } from "@/components/erxes-form/erxes-form-embed";
import { Briefcase } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function JobOpenings() {
  const t = await getTranslations("Content");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-8 sm:py-12 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-lg">
            <Briefcase className="h-10 w-10 text-white" />
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            {t("jobApplication")}
          </h1>
          <p className="text-lg text-gray-600">
            {t("jobApplicationSubtitle")}
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl md:p-10">
          <ErxesFormEmbed
            url="https://ekhterelj-w917z.nextwidgets.erxes.io/formBundle.js"
            channelID="-oLeMbHxZGDBir1uwnWse"
            formId="vaZHSo"
          />
        </div>
      </div>
    </div>
  );
}
