import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_MAIN_API_DOMAIN: "https://ekhterelj.api.erxes.io/gateway",
    NEXT_PUBLIC_CP_ID: "QLadNXcb8SzkzREZLmefs",
    NEXT_PUBLIC_PMS_TOKEN: "WDhfiVSLriHkdzMd9Eaa2vgCpTiEgObD",
    NEXT_PUBLIC_APP_TOKEN:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6IldlYiIsImNyZWF0ZWRBdCI6IjIwMjUtMDQtMTZUMDI6MTE6NTYuODA4WiIsInVzZXJHcm91cElkIjoiNEVIeWRUREFpczJMZFFuWm4iLCJleHBpcmVEYXRlIjoiMjAyNS0wNS0xNlQwMzo0NToyOC41MzJaIiwibm9FeHBpcmUiOnRydWUsImFsbG93QWxsUGVybWlzc2lvbiI6dHJ1ZSwiX2lkIjoib3pDMVBPcDY3bzVVME4wbTNaaFozIiwiX192IjowfSwiaWF0IjoxNzQ0Nzc1MTM2fQ.P0_-fV4i3A4eQ0kSv_h67s_Esk5WNlTteHfYZT_g6iQ",
  },
};

export default withNextIntl(nextConfig);
