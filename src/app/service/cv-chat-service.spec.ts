import { TestBed } from '@angular/core/testing';

import { CvChatService } from './cv-chat-service';

describe('CvChatService', () => {
  let service: CvChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
