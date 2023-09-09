// GoogleAnalytics.js
export const GA_TRACKING_ID = 'G-DPWLW5MSLT';

// Function to track page views
export const pageview = (url) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};

// Function to track events
export const event = ({ action, category, label, value }) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    });
};