// <solar-icon icon="arrow-right-broken" size="22"> — bundled Solar Broken icons, rendered synchronously.
// Stroke = original 1.5 weight at (size - grow) plus `boost` px.
(() => {
  if (customElements.get('solar-icon')) return;
  const P = {
    'letter-broken': "<g><path d=\"M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8\"/><path d=\"M18 8L15.8411 9.79908C14.0045 11.3296 13.0861 12.0949 12 12.0949C11.3507 12.0949 10.7614 11.8214 10 11.2744M6 8L6.9 8.75L7.8 9.5\"/></g>",
    'phone-broken': "<g><path d=\"M3.00293 6.96582C3.09308 8.64534 3.81076 12.2589 7.8154 16.4751C8.92856 17.647 10.0237 18.524 11.0632 19.1772\"/><path d=\"M14.9592 20.7925C16.1226 21.0361 17.0651 21.0234 17.6763 20.9631C18.1917 20.9122 18.6399 20.6343 19.0011 20.254L20.4217 18.7584C21.3806 17.7489 21.1102 16.0182 19.8833 15.312L17.9728 14.2123C17.1673 13.7486 16.1858 13.8848 15.5562 14.5477L15.1007 15.0272C15.1007 15.0272 14.0182 16.167 11.0631 13.0559C8.10814 9.94484 9.19073 8.80507 9.19073 8.80507L9.47754 8.50311C10.1841 7.75924 10.2507 6.56497 9.63427 5.6931L8.37328 3.90962C7.61031 2.8305 6.13598 2.68795 5.26147 3.60864\"/></g>",
    'copy-broken': "<g><path d=\"M20.9983 10C20.9862 7.82497 20.8897 6.64706 20.1213 5.87868C19.2426 5 17.8284 5 15 5H12C9.17157 5 7.75736 5 6.87868 5.87868C6 6.75736 6 8.17157 6 11V16C6 18.8284 6 20.2426 6.87868 21.1213C7.75736 22 9.17157 22 12 22H15C17.8284 22 19.2426 22 20.1213 21.1213C21 20.2426 21 18.8284 21 16V15\"/><path d=\"M3 10V16C3 17.6569 4.34315 19 6 19M18 5C18 3.34315 16.6569 2 15 2H11C7.22876 2 5.34315 2 4.17157 3.17157C3.51839 3.82475 3.22937 4.69989 3.10149 6\"/></g>",
    'check-circle-broken': "<g><path d=\"M8.5 12.5L10.5 14.5L15.5 9.5\"/><path d=\"M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7\"/></g>",
    'arrow-up-broken': "<path d=\"M18 10L12 4L6 10M12 4L12 14.5M12 20V17.5\"/>",
    'close-circle-broken': ['M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5', 'M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7'],
    'arrow-right-broken': ['M4 12H6.5M14 18L20 12L14 6M20 12H9.5'],
    'arrow-right-up-broken': ['M6 18L8.5 15.5M18 15V6H9M18 6L11.5 12.5'],
    'alt-arrow-down-broken': ['M19 9L12 15L10.25 13.5M5 9L7.33333 11'],
    'add-broken': ['M4 12L12 12', 'M16 12L20 12', 'M12.0204 4L12.0205 20.0003'],
    'hamburger-menu-broken': ['M4 7L7 7M20 7L11 7', 'M20 17H17M4 17L13 17', 'M4 12H7L20 12'],
  };
  class SolarIcon extends HTMLElement {
    static get observedAttributes() { return ['icon', 'size', 'boost', 'grow']; }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const e = P[this.getAttribute('icon')] || [];
      const inner = typeof e === 'string' ? e : e.map(d => `<path d="${d}"/>`).join('');
      const size = parseFloat(this.getAttribute('size')) || 24;
      const boost = parseFloat(this.getAttribute('boost') ?? '0.5');
      const grow = parseFloat(this.getAttribute('grow') ?? '2');
      const sw = ((1.5 * (size - grow)) / 24 + boost) * (24 / size);
      this.style.width = this.style.height = size + 'px';
      if (!this.style.display) this.style.display = 'inline-block';
      this.style.flexShrink = '0';
      const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
      root.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" style="display:block;overflow:visible" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="${sw.toFixed(3)}">${inner}</svg>`;
    }
  }
  customElements.define('solar-icon', SolarIcon);
})();
