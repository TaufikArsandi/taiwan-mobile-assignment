import { create } from 'zustand';

/**
 * @typedef {Object} ConfirmOptions
 * @property {string} title
 * @property {string} message
 * @property {string} [confirmLabel]
 * @property {string} [cancelLabel]
 * @property {'primary' | 'danger'} [tone]
 */

export const useDialogStore = create((set, get) => ({
  /** @type {ConfirmOptions | null} */
  request: null,
  /** @type {((confirmed: boolean) => void) | null} */
  resolver: null,

  /**
   * Opens the confirm dialog and resolves with the user's choice.
   * @param {ConfirmOptions} options
   * @returns {Promise<boolean>}
   */
  confirm: (options) => {
    get().resolver?.(false);
    return new Promise((resolve) => {
      set({ request: options, resolver: resolve });
    });
  },

  /** @param {boolean} confirmed */
  respond: (confirmed) => {
    get().resolver?.(confirmed);
    set({ request: null, resolver: null });
  },
}));

export const selectIsDialogOpen = (state) => state.request !== null;
