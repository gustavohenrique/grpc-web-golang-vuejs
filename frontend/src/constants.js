export const events = {
  LOADING_START: 'loading_start',
  LOADING_STOP: 'loading_stop',
  DIALOG_ERROR: 'dialog_error_visible',

  SHOW_TERMINAL_DIALOG: 'terminal',
  SHOW_SCREENSHOT_DIALOG: 'screenshot'
}

export const TOKEN_KEY = 'X-CSRF-Token'

export default {
  events,
  TOKEN_KEY
}
