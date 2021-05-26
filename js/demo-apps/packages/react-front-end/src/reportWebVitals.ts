import { ReportHandler } from 'web-vitals';

const reportWebVitals = async (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry) {
    await import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
