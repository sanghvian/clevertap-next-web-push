import { SegmentAnalytics } from '@segment/analytics.js-core';
import { Workbox } from 'workbox-window';

declare global {
  interface Window {
    clevertap: any;
    analytics: SegmentAnalytics.AnalyticsJS;
    workbox: Workbox;
  }

//   declare module '*.svgrc' {
//     import React = require('react');

//     const ReactComponent: React.FunctionComponent<
//       React.SVGProps<SVGSVGElement>
//     >;
//     export default ReactComponent;
//   }
}

// eslint-disable-next-line import/prefer-default-export
export { global };
