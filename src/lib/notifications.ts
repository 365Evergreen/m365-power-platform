import { Category } from './types';

    return 'denied';
  return Notification.permission;

  if (!('Notificatio
   

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

      navigator.serviceWorker.rea
 

          requireInteraction: false
      });
      new N
   

}








        });
      });
    } else {
      new Notification('New Article Added', {
        body: `${title} (${category})`,
        icon: '/icon-192.svg'
      });
    }
  }
}
