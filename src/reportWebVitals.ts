import {ReportHandler} from 'web-vitals';


export function reportWebVitals(onPerfEntry?: ReportHandler) {
    if (onPerfEntry) {
        import('web-vitals')
            .then(({getINP, getCLS, getFCP, getLCP, getFID, getTTFB}) => {
                getINP(onPerfEntry);
                getCLS(onPerfEntry);
                getFCP(onPerfEntry);
                getFID(onPerfEntry);
                getLCP(onPerfEntry);
                getTTFB(onPerfEntry);
            })
            .catch(console.error);
    }
}
