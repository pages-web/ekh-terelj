import { Link } from "@/i18n/routing";
import Heading from "../heading/heading";
import HeadingButton from "../heading-button/heading-button";

export default function AboutSection() {
  return (
    <section className="flex flex-col items-center text-center">
      <div className="space-y-6">
        <HeadingButton title="About" />
        <Heading
          title="Aman New York"
          desc=" East meets West and old meets new. Manhattan’s iconic Crown Building
          is reimagined as Aman New York, where the city’s original
          architectural splendor and Aman’s harmonious design language collide,
          reimagining the inimitable tranquility of Aman in the heart of
          Manhattan’s midtown. With a year-round Garden Terrace, flagship Aman
          Spa and spacious suites all among the largest in the city."
        />
      </div>

      <div className="mt-6 w-full">
        <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden">
          <video className="w-full h-full object-cover" autoPlay loop muted>
            <source
              src="https://s3-figma-videos-production-sig.figma.com/video/966985051098804931/TEAM/5a1a/55ca/-cf93-4a2a-bd8b-034f55323929?Expires=1747612800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=O8GYX4y5jc6nW4-7orBNYPpknf6wL1qgfM1pDynoRlvSoiFTu84MGwB38h2fYFJj8Wiq9zCFVFZSPi1FGsMHPNWdfhip2XtkhwfGapAi8ii4vhDD1z-2tE9-xuGbRv4d2HqM6hVb48FYHItd0pVXR1U1TI7M7tU15gyN1dG33eMg9UmMaQVA3fInaUHozehCHCshEbNnwZPwGgbmzqgn3Y6HVrNO5cjRFXBX3~ozdpM~RgFGXHu0noHKpkitg540OREWwhY644j8gjoQ8qah3skV91TkdvV~eVYL2lDwkc5SwsCztGST6bgV~v1wcLFY0eu5VpWCLtV5A77s4~AuTw__"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
}
