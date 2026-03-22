import { Category } from './types';

    return 'denied';
  return Notification.permission;
    return 'denied';
   
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

    } catch (error) {
    }
 

  }













    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  } else {
    new Notification('New Article Added', {
      icon: '/icon-192.svg',
      body: `${title} (${category})`,
    });
  }
}
