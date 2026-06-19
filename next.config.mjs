import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ERXES_API_URL: "https://ekhterelj-w917z.next.erxes.io/gateway/graphql",
    ERXES_API_URL_MAIN: "https://ekhterelj-w917z.next.erxes.io/gateway/graphql",
    NEXT_PUBLIC_CP_ID: "TzO81SoQJOc2QQzOU1gBQ",
    NEXT_PUBLIC_PMS_TOKEN: "pyNBV0rXuAR4Csx7-6MoU",
    ERXES_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6IjRXd050eHUxUHowM3RGSHN4YllnWCIsImlhdCI6MTc4MDIzODU3Mn0.uK7N2f92sO9O1yP19TuKYVTzpLRyyBfWlCTCpwo25tI",
  },
};

export default withNextIntl(nextConfig);
