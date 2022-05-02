interface Account {
    id: string;
    }
    
    interface Privacy {
    optOut?: boolean;
    useIP?: boolean;
    }
    
    interface Notification {
        titleText: string;
        bodyText: string;
        okButtonText: string;
        rejectButtonText: string;
        serviceWorkerPath: string;
        okButtonColor: string;
        skipDialog: boolean;
    }
    
    type EventArray<T extends Array<any>> = {
        push: (type: string, params: any) => void;
    };
    
    export interface Clevertap {
        event: EventArray<any>;
        profile: Array<any>;
        account: Array<Account>;
        onUserLogin: Array<any>;
        notifications: Array<Notification>;
        privacy: Array<Privacy>;
        notificationCallback?: (message: any) => void;
        raiseNotificationViewed?: () => void;
        raiseNotificationClicked?: () => void;
    }
      
    
    export const getWindow = (): Window | null => typeof window === 'undefined' ? null : window;
        
    const getClevertapAccountId = (): string => "TEST-5R6-6W9-WK6Z";
      
    const clevertap: Clevertap = {
        // TODO : never[]' is not assignable to type 'EventArray<any>
        // event: [],
        event: <any>[],
        profile: [],
        account: [],
        onUserLogin: [],
        notifications: [],
        privacy: [],
      };
      
      clevertap.account.push({ id: getClevertapAccountId() });
      clevertap.privacy.push({ optOut: false });
      clevertap.privacy.push({ useIP: false });
      
      
      
      const init = (): void => {
        const w = getWindow();
        if (!w || !getClevertapAccountId()) return;
        w.clevertap = clevertap;
      
        const wzrk = w.document.createElement('script');
        wzrk.type = 'text/javascript';
        wzrk.async = true;
        wzrk.src = `${
          w.document.location.protocol === 'https:'
            ? 'https://d2r1yp2w7bby2u.cloudfront.net'
            : 'http://static.clevertap.com'
        }/js/a.js`;
        const s = w.document.getElementsByTagName('script')[0];
        // TODO : object is possibly null
        // s.parentNode.insertBefore(wzrk, s);
        s.parentNode!.insertBefore(wzrk, s);
      };
      
      export default clevertap;
      
      export { init };
      