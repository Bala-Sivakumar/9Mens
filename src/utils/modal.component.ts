import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export class ModalComponent implements OnInit, OnDestroy {
  constructor(public dialogRef: MatDialogRef<ModalComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}




  ngOnInit(): void {
    // Close the modal with fading effect after 5 seconds
    setTimeout(() => {
      this.closeModalWithFade();
    }, 3000); // Adjust delay as needed (in milliseconds)
  }

  closeModalWithFade(): void {
    const modalElement = document.querySelector('.modal-content') as HTMLElement;
    modalElement.classList.add('fade-out');
    setTimeout(() => {
      this.dialogRef.close();
    }, 3000); // Ensure the modal closes after the animation duration
  }



 ngOnDestroy(): void {
    console.log(' Modal destroyed');
  }

}
