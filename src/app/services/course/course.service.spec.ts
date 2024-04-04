import { TestBed } from '@angular/core/testing';

import { CourseSerivce } from './course.service';

describe('UserService', () => {
    let service: CourseSerivce;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CourseSerivce);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
