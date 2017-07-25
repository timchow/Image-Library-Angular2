import { JSDataStructuresPage } from './app.po';

describe('js-data-structures App', () => {
  let page: JSDataStructuresPage;

  beforeEach(() => {
    page = new JSDataStructuresPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
