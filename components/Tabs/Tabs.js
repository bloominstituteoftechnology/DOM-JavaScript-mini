class TabItem {
  constructor(element) {
    // attach dom element to object. Example in Tabs class
    this.el = element;
    console.log('TabItem ', element)
  }

  select() {
    // should use classList
    this.el
    this.el.classList.add('Tabs__item-selected')
    this.el.classList.remove('Tabs__item')
  }

  deselect() {
    // should use classList
    this.el.classList.remove('Tabs__item-selected')
    this.el.classList.add('Tabs__item')
  }
}

//<div class="List__item Tabs__link" data-tab="1">Tab 1</div>
class TabLink {
  constructor(element, parent) {
    this.element = element;// attach dom element to object
    this.tabs = parent;// attach parent to object
    this.tabItem = this.tabs.getTab(this.element.dataset);// assign this to the associated tab using the parent's "getTab" method by passing it the correct data
    this.tabItem = new TabItem(this.tabItem)// reassign this.tabItem to be a new instance of TabItem, passing it this.tabItem
    this.element.addEventListener('click', () => {
      this.tabs.updateActive(this);
      this.select();
    });
  };

  select() {
    // select this link
    // select the associated tab
    this.tabItem.select();
    this.element.classList.add('Tabs__link-selected')
  }

  deselect() {
    // deselect this link
    // deselect the associated tab
    this.tabItem.deselect();
    this.element.classList.remove('Tabs__link-selected');
  }
}

class Tabs {
  constructor(element) {
    this.element = element;
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).map((link) => {
      return new TabLink(link, this);
    });
    this.activeLink = this.links[0];
    this.init();
  }

  init() {
    // select the first link and tab upon ititialization
    this.activeLink.select();
  }

  updateActive(newActive) {
    // deselect the old active link
    // assign the new active link
    this.activeLink.deselect();
    this.activeLink = newActive;

  }

  getTab(data) {
    // use the tab item classname and the data attribute to select the proper tab
    return this.element.querySelector(`.Tabs__item[data-tab='${data.tab}']`);
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));