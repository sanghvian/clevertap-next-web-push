import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { getWindow, init as initClevertap } from '../lib/clevertap'
import clevertap from '../lib/clevertap';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    setTimeout(() => {
      initClevertap();
        const handleClevertap = () => {
          console.log('handling clevertap');
          clevertap.notifications.push({
            titleText: 'titleText',
            bodyText: 'bodyText',
            okButtonText: 'okButtonText',
            rejectButtonText: 'rejectButtonText',
            serviceWorkerPath: '/sw.js',
            okButtonColor: "#00a8ff",
            skipDialog: false,
          });
        };
    
        const wb = getWindow()?.workbox;
        if (wb) {
          const controllingListener = () => {
            console.log('inside activated listener');
            navigator.serviceWorker.ready.then((reg) => {
              console.log('i am registered', reg);
              reg.pushManager
                .subscribe({
                  userVisibleOnly: true,
                })
                .then((sub) => {
                  console.log('subscribed', sub);
                  handleClevertap();
                });
              reg.pushManager.getSubscription().then((sub) => {
                console.log('i am subscribed', sub);
                handleClevertap();
              });
            });
          };
          wb.addEventListener('activated', controllingListener);
          return () => {
            console.log('removing activated listener');
            wb.removeEventListener('activated', controllingListener);
          };
        }
    });
  }, []);
  return <Component {...pageProps} />
}

export default MyApp
