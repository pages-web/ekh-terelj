"use client";

import { ErxesFormEmbed } from "@/components/erxes-form/erxes-form-embed";
import { Phone, MapPin, Mail, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCmsPosts } from "@/features/cms/hooks/cms";
import { useTranslations } from "next-intl";

export default function ContactComponent() {
  const t = useTranslations("Content");
  const tFooter = useTranslations("Footer");
  const { posts } = useCmsPosts({
    tagIds: ["P_ga05OkoXh2uQDdlCwho"],
    perPage: 1000,
  });

  const post = posts[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post?.title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {post?.excerpt}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                {post?.title}
              </h2>
              <div className="space-y-6">
                <Card className="p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t("contactPhone")}</h3>
                      <a
                        href="tel:+97688010003"
                        className="text-gray-600 hover:text-gray-700 font-medium"
                      >
                        +976 88010003, 86010003
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t("contactLocation")}</h3>
                      <p className="text-gray-600">
                        {tFooter("address")}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t("contactEmail")}</h3>
                      <a
                        href="mailto:ekh.terelj@gmail.com"
                        className="text-gray-600 hover:text-gray-700 font-medium"
                      >
                        ekh.terelj@gmail.com
                      </a>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <Card className="overflow-hidden bg-white shadow-sm border border-gray-200">
              <div className="h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2677.5520482391134!2d107.40107967680291!3d47.84827087125747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d94255801871fe5%3A0xb6d2b3a83c270feb!2sEkh%20terelj%20resort!5e0!3m2!1smn!2smn!4v1746674109557!5m2!1smn!2smn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-8 bg-white shadow-sm border border-gray-200">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-primary mb-2 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2 text-primary" />
                  {t("sendMessageTitle")}
                </h2>
                <p className="text-gray-600">
                  {t("sendMessageDescription")}
                </p>
              </div>

              <ErxesFormEmbed
                url="https://ekhterelj-w917z.nextwidgets.erxes.io/formBundle.js"
                channelID="-oLeMbHxZGDBir1uwnWse"
                formId="bFHM09"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
