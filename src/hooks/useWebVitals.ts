import { useEffect } from "react";

export function useWebVitals() {
  useEffect(() => {
    if (typeof window === "undefined" || !("PerformanceObserver" in window)) {
      console.warn("[Web Vitals] PerformanceObserver is not supported by this browser.");
      return;
    }

    const observers: PerformanceObserver[] = [];

    // Helper to print beautiful colored console outputs based on thresholds
    const logMetric = (
      name: string,
      value: number,
      rating: "good" | "needs-improvement" | "poor",
      type: "live" | "final" = "live",
      details?: string
    ) => {
      const colors = {
        good: "color: #10B981; font-weight: bold;", // Emerald
        "needs-improvement": "color: #F59E0B; font-weight: bold;", // Amber
        poor: "color: #EF4444; font-weight: bold;", // Red
      };

      const tagColor = "color: #B600A8; font-weight: bold;"; // Neon Pink
      const typeLabel = type === "live" ? " [Live]" : " [Final]";
      const formattedValue = name === "CLS" ? value.toFixed(4) : `${value.toFixed(0)}ms`;

      console.log(
        `%c[Web Vitals]${typeLabel} %c${name}: %c${formattedValue} %c(${rating})${
          details ? ` - ${details}` : ""
        }`,
        tagColor,
        "color: inherit; font-weight: 500;",
        colors[rating],
        "color: gray; font-style: italic; font-weight: normal;"
      );
    };

    // 1. FIRST CONTENTFUL PAINT (FCP)
    // Good: <= 1800ms, Needs Improvement: <= 3000ms, Poor: > 3000ms
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const value = entry.startTime;
          let rating: "good" | "needs-improvement" | "poor" = "good";
          if (value > 3000) rating = "poor";
          else if (value > 1800) rating = "needs-improvement";

          logMetric("FCP", value, rating, "final", "First Contentful Paint");
        }
      });
      fcpObserver.observe({ type: "paint", buffered: true });
      observers.push(fcpObserver);
    } catch (e) {
      // Graceful fallback for browsers without 'paint' observer support
    }

    // 2. LARGEST CONTENTFUL PAINT (LCP)
    // Good: <= 2500ms, Needs Improvement: <= 4000ms, Poor: > 4000ms
    let lcpValue = 0;
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        lcpValue = lastEntry.startTime;

        let rating: "good" | "needs-improvement" | "poor" = "good";
        if (lcpValue > 4000) rating = "poor";
        else if (lcpValue > 2500) rating = "needs-improvement";

        // Log live candidate update to the developer
        logMetric("LCP", lcpValue, rating, "live", "New LCP Candidate element registered");
      });
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      observers.push(lcpObserver);
    } catch (e) {
      // Graceful fallback
    }

    // 3. FIRST INPUT DELAY (FID)
    // Good: <= 100ms, Needs Improvement: <= 300ms, Poor: > 300ms
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const delay = (entry as any).processingStart - entry.startTime;
          let rating: "good" | "needs-improvement" | "poor" = "good";
          if (delay > 300) rating = "poor";
          else if (delay > 100) rating = "needs-improvement";

          logMetric("FID", delay, rating, "final", "First Input Delay recorded on interaction");
        }
      });
      fidObserver.observe({ type: "first-input", buffered: true });
      observers.push(fidObserver);
    } catch (e) {
      // Graceful fallback
    }

    // 4. CUMULATIVE LAYOUT SHIFT (CLS)
    // Good: <= 0.1, Needs Improvement: <= 0.25, Poor: > 0.25
    let clsValue = 0;
    try {
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            let rating: "good" | "needs-improvement" | "poor" = "good";
            if (clsValue > 0.25) rating = "poor";
            else if (clsValue > 0.1) rating = "needs-improvement";

            logMetric("CLS", clsValue, rating, "live", "Layout shift detected");
          }
        }
      });
      clsObserver.observe({ type: "layout-shift", buffered: true });
      observers.push(clsObserver);
    } catch (e) {
      // Graceful fallback
    }

    // Log final summary when user departs or puts tab in background
    const logFinalSummary = () => {
      if (lcpValue > 0) {
        let rating: "good" | "needs-improvement" | "poor" = "good";
        if (lcpValue > 4000) rating = "poor";
        else if (lcpValue > 2500) rating = "needs-improvement";
        logMetric("LCP", lcpValue, rating, "final", "Largest Contentful Paint (Session Final)");
      }

      if (clsValue >= 0) {
        let rating: "good" | "needs-improvement" | "poor" = "good";
        if (clsValue > 0.25) rating = "poor";
        else if (clsValue > 0.1) rating = "needs-improvement";
        logMetric("CLS", clsValue, rating, "final", "Cumulative Layout Shift (Session Final)");
      }
    };

    window.addEventListener("visibilitychange", logFinalSummary);
    window.addEventListener("pagehide", logFinalSummary);

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener("visibilitychange", logFinalSummary);
      window.removeEventListener("pagehide", logFinalSummary);
    };
  }, []);
}
