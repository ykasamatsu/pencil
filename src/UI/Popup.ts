export class Popup {
    static I: Popup;

    private overlay: HTMLElement;
    private textElement: HTMLElement;
    private closeButton: HTMLElement;

    constructor() {
        Popup.I = this;
        this.overlay = document.getElementById('hint-popup');
        this.textElement = document.getElementById('hint-text');
        this.closeButton = document.getElementById('close-popup');

        this.closeButton.addEventListener('click', () => this.hide());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hide();
            }
        });
    }

    show(message: string) {
        this.textElement.innerText = message;
        this.overlay.classList.add('show');
    }

    hide() {
        this.overlay.classList.remove('show');
    }
}
