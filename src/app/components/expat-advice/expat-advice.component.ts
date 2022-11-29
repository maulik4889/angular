import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-expat-advice',
  templateUrl: './expat-advice.component.html',
  styleUrls: ['./expat-advice.component.scss']
})
export class ExpatAdviceComponent implements OnInit {
  modalRef!: BsModalRef;

  constructor(private modal: NgbModal, public modalService: BsModalService,) { }

  ngOnInit(): void {
  }


  openExpatAdvicePopup(expatAdvice: TemplateRef<any>) {


    this.modalRef = this.modalService.show(
      expatAdvice,
      Object.assign({}, { class: 'gray modal-lg ' })
    );
  }


}
