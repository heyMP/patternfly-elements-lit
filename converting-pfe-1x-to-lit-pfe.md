# Converting PFE 1.x Component to Lit PFElement

## Properties (aka `static get properties`)

### `attr => attribute`
`attr` in PFElement 1.x was the preferred attribute name, in Lit, the property `attribute` can be the preferred name, or `false` if no attribute is desired.

Unlike PFE, Lit does not convert camelCase to dash-delimited for the attribute name. So `this.myAttribute` will have to be `<pfe-tag myAttribute="value">` to set the property.

[See Lit Docs for more](https://lit-element.polymer-project.org/guide/properties#property-options)

### `default => Set value in constructor`

In the top of the constructor (after `super()`), set a default value for any properties, e.g.

```js
  static get properties() {
    return {
      _lang: {
        type: String,
        attribute: "lang",
      },
    }
  };

  constructor() {
    super();
    // Set default value for attributes
    this._lang = 'en';
  }
```

### `observer => changed Lifecycle Method`

You can add the following code to see the updated lifecycle method work.

```js
  updated(changedProperties) {
    changedProperties.forEach((oldValue, property) => {
      console.log(`${property} is ${this[property]}, was ${oldValue}`);
    });
  }
```

[See Lit Docs for more](https://lit-element.polymer-project.org/guide/lifecycle#updated)