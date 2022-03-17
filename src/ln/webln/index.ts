type RequestInvoiceArgs = {
  amount?: string | number;
  defaultAmount?: string | number;
  minimumAmount?: string | number;
  maximumAmount?: string | number;
  defaultMemo?: string;
}

export default class WebLNProvider {
  enabled: boolean;
  isEnabled: boolean;
  executing: boolean;

  constructor() {
    this.enabled = false;
    this.isEnabled = false; // some webln implementations use isEnabled and some us enabled
    this.executing = false;
  }

  enable() {
    if (this.enabled) {
      return Promise.resolve({ enabled: true })
    }
  }

  execute(type: string, args?: Record<string, unknown>): Promise<Record<string, unknown>> {
    return new Promise((resolve, reject) => {
      window.postMessage(
        {
          application: ''
        }
      )
    })
  } 
}