import { MockRoundUiPage } from './app.po';

describe('mock-round-ui App', () => {
  let page: MockRoundUiPage;

  beforeEach(() => {
    page = new MockRoundUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
