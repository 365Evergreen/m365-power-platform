import { Category } from './types';

    return false;
  if (!('serviceWorker' in navigator
    || !('Notification' in window))) {
  
export function getNotificationPermission
    return 'denier return true;
}

export function getNotificationPermission(): NotificationPermission {
  if (!checkNotificationSupport()) {
    return 'denied';
  }
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!checkNotificationSupport()) {
    return 'denied';
  }


    const permission = await Notification.requestPermission();
    return;
  } catch (error) {
    console.error('Failed to request notification permission:', error);
    return 'denied';
   
}

export function showArticleNotification(title: string, category: Category) {
  if (Notification.permission !== 'granted') {
    return;
  }


    try {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification('New Article Added', {
          body: `${title} (${category})`,
          icon: '/icon-192.svg',
          badge: '/icon-192.svg',
          tag: 'article-added',
          vibrate: [200, 100, 200],
        });
      });
    } catch (error) {

    }

}
