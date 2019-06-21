import { ValidatorService } from 'ng2-smart-table-custom';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable()
export class TableOneValidatorService implements ValidatorService {
    getFormGroup(): FormGroup {
        // here define and return the FormGroup with the FormControl(s) loaded.
        return new FormGroup({
          value: new FormControl(
            null,
            [
              Validators.required,
              // Custom validators could be used here.
            ],
            null)
      });
    }
}
