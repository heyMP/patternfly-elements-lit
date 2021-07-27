import { expect } from "@open-wc/testing/index-no-side-effects";
import { createFixture } from "../../../test/utils/create-fixture";
import { PfeBadge } from "../dist/pfe-clipboard.js";

// Background colors for the various states
const states = {
  default: "#f0f0f0",
  info: "#0066cc",
  success: "#3e8635",
  important: "#c9190b",
  moderate: "#f0ab00",
  critical: "#a30000",
};

// Converts a hex value to RGBA
const hexToRgb = hex => {
  const [, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/.exec(hex);
  return [
    parseInt(r, 16),
    parseInt(g, 16),
    parseInt(b, 16)
  ];
};

// Gets the rgba value from an element
const getColor = (el, prop) => {
  const [, r, g, b] = getComputedStyle(el, null)[prop].match(/rgba?\((\d+),\s+(\d+),\s+(\d+).*\)/)
    .map(n => +n);
  return [r, g, b];
};

const element = `
  <pfe-clipboard number="10">
    10
  </pfe-clipboard>
`;

const thresholdElement = `
  <pfe-clipboard number="900" threshold="100">
    900
  </pfe-clipboard>
`;

const underThresholdElement = `
  <pfe-clipboard number="900" threshold="1000">
    900
  </pfe-clipboard>
`

describe("<pfe-clipboard>", () => {
  it("should upgrade", async () => {
    const el = await createFixture(element);
    expect(el).to.be.an.instanceOf(customElements.get(PfeBadge.tag), "pfe-clipboard should be an instance of PfeBadge");
  });

  it("should set or reset textContent equivalent to the number attribute", async () => {
    const el = await createFixture(`
      <pfe-clipboard number="100">
        10
      </pfe-clipboard>
    `);

    expect(el.textContent).to.equal("100");
  });

  it("should add '+' sign if the value exceeds the threshold", async () => {
    const el = await createFixture(thresholdElement);
    expect(el.textContent).to.equal("100+");
    expect(el.shadowRoot.querySelector("span").textContent).to.equal("100+");
  });

  it("shouldn't add a '+' sign if the value doesn't exceed the threshold", async () => {
    const el = await createFixture(underThresholdElement);
    expect(el.textContent).to.equal("900");
    expect(el.shadowRoot.querySelector("span").textContent).to.equal("900");
  });

  Object.entries(states).forEach(set => {
    it(`should have a background color of ${set[1]} when state is ${set[0]}`, async () => {
      const el = await createFixture(element);

      if (set[0] !== "default") {
        el.setAttribute("state", set[0]);
      }

      const [r, g, b] = getColor(el.shadowRoot.querySelector("span"), "background-color");
      expect([r, g, b]).to.deep.equal(hexToRgb(set[1]));
    });
  });
});