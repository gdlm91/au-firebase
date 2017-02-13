import { AuFirebasePage } from './app.po';

describe('au-firebase App', function() {
  let page: AuFirebasePage;

  beforeEach(() => {
    page = new AuFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
