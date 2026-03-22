export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
}

export function showArticleNotification(title: string, category: string) {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return;
  }

  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification('New Article Added', {
        body: `${title} - ${category}`,
        icon: '/icon-192.svg',
        badge: '/icon-192.svg',
        tag: 'article-added',
        requireInteraction: false,
        data: {
          url: window.location.origin,
          timestamp: Date.now(),
        },
      } as NotificationOptions);
    });
  } else {
    new Notification('New Article Added', {
      body: `${title} - ${category}`,
      icon: '/icon-192.svg',
      tag: 'article-added',
      requireInteraction: false,
    });
  }
}

export function getNotificationStatus(): NotificationPermission {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}
