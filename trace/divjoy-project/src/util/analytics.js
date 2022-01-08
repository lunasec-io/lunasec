import Analytics from "analytics";
import simpleAnalyticsPlugin from "@analytics/simple-analytics";
import { history } from "./router.js";

// Initialize analytics and plugins
// Documentation: https://getanalytics.io
const analytics = Analytics({
  debug: process.env.NODE_ENV !== "production",
  plugins: [
    // Instructions: https://divjoy.com/docs/simple-analytics
    simpleAnalyticsPlugin(),
  ],
});

// Track initial pageview
if (typeof window !== "undefined") {
  analytics.page();
}

// Track pageview on route change
history.listen(() => {
  analytics.page();
});

export default analytics;
