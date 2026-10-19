import { create } from 'zustand';

/**
 * @typedef {'success' | 'error' | 'info'} NotificationTone
 * @typedef {{ id: number, message: string, tone: NotificationTone }} Notification
 */

let nextId = 1;

export const useNotificationStore = create((set) => ({
  /** @type {Notification[]} */
  notifications: [],

  /** @param {{ message: string, tone?: NotificationTone }} notification */
  notify: ({ message, tone = 'success' }) => {
    const id = nextId++;
    set((state) => ({ notifications: [...state.notifications, { id, message, tone }] }));
    return id;
  },

  dismiss: (id) =>
    set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
}));
