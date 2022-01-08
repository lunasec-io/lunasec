import React from "react";
import Meta from "./../components/Meta";
import HeroSection2 from "./../components/HeroSection2";
import StatsSection from "./../components/StatsSection";
import TeamBiosSection from "./../components/TeamBiosSection";
import CtaSection from "./../components/CtaSection";

function AboutPage(props) {
  return (
    <>
      <Meta title="About" description="Learn about our company and team" />
      <HeroSection2
        bg="white"
        textColor="dark"
        size="lg"
        bgImage=""
        bgImageOpacity={1}
        title="We help you make money"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam!"
      />
      <StatsSection
        bg="light"
        textColor="dark"
        size="sm"
        bgImage=""
        bgImageOpacity={1}
      />
      <TeamBiosSection
        bg="white"
        textColor="dark"
        size="md"
        bgImage=""
        bgImageOpacity={1}
        title="Meet the Team"
        subtitle=""
      />
      <CtaSection
        bg="primary"
        textColor="light"
        size="sm"
        bgImage=""
        bgImageOpacity={1}
        title="Ready to get started?"
        subtitle=""
        buttonText="Get Started"
        buttonColor="light"
        buttonPath="/pricing"
      />
    </>
  );
}

export default AboutPage;
