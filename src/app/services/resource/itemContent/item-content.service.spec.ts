import { TestBed } from '@angular/core/testing';
import { ItemContentService } from './item-content.service';


describe('ItemContentService', () => {
    let service: ItemContentService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ItemContentService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });


});
