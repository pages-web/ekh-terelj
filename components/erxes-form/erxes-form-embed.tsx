"use client";

import Script from "next/script";

interface ErxesFormEmbedProps {
  url: string;
  channelID: string;
  formId: string;
}

export function ErxesFormEmbed({
  url,
  channelID,
  formId,
}: ErxesFormEmbedProps) {
  return (
    <>
      <Script id={`erxes-form-settings-${formId}`} strategy="afterInteractive">
        {`
          window.erxesSettings = {
            forms: [
              {
                form_id: '${formId}',
                channel_id: '${channelID}',
              },
            ],
          };
        `}
      </Script>
      <Script src={url} strategy="afterInteractive" />

      <div data-erxes-embed={formId} />
    </>
  );
}
