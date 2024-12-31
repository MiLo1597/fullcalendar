export class Modal {
    constructor({ title, content, onConfirm, onDelete }) {
        this.title = title || "Modal Title";
        this.content = content || "";
        this.onConfirm = onConfirm || (() => {});
        this.onDelete = onDelete || (() => {});
    }

    render() {
        let modal = document.querySelector(".modal");

        if (!modal) {
            modal = document.createElement("div");
            modal.className = "modal";
            modal.innerHTML = `
                <div class="modal-backdrop"></div>
                <div class="modal-dialog">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <button class="modal-delete">Delete</button>
                        <button class="modal-confirm">Confirm</button>
                    </div>
                </div>
            `;

            // Close button event
            modal.querySelector(".modal-close").addEventListener("click", () => {
                this.destroy()
            });
            // Delete button event
            modal.querySelector(".modal-delete").addEventListener("click", () => {
                this.onDelete();
                this.hide();
            });
            // Confirm button event
            modal.querySelector(".modal-confirm").addEventListener("click", () => {
                this.onConfirm();
                this.hide();
            });

            document.body.appendChild(modal);
        }

        this.modalElement = modal;
    }

    show() {
        this.render();

        // Update modal content dynamically
        this.modalElement.querySelector(".modal-title").textContent = this.title;
        this.modalElement.querySelector(".modal-body").innerHTML = this.content;

        this.modalElement.style.display = "flex"; // Show the modal
        document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
    }

    hide() {
        if (this.modalElement) {
            this.modalElement.style.display = "none"; // Hide the modal
            document.body.style.overflow = ""; // Enable scrolling when modal is hidden
        }
    }

    destroy() {
        if (this.modalElement) {
            this.modalElement.remove();
            this.modalElement = null;
            document.body.style.overflow = ""; // Enable scrolling when modal is destroyed
        }
    }
}
