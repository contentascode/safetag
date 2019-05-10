[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/zeit/next.js/tree/master/examples/with-ant-design-less)

# Safetag Next Template

This repo is meant to be used as a renderer for the Safetag content as code project. The content as code pipeline will render the necessary state as:
 - A JSON hierarchy
```js
{
  result: "123",
  entities: {
    "activities": {
      "123": {
        id: "123",
        method: "2",
        title: "Automated Reconnaissance",
        time: 42,
        tech: true,
        research: false,
        interpersonal: false,
        content: "./activities/",
        summary: "./activities/automated_reconnaissance/summary.md",
        preparation: "./activities/automated_reconnaissance/preparation.md",
        ...
      }
    },
    "methods": {
      "1": { id: "1", name: "Preparation" },
      "2": { id: "2", name: "Reconnaissance", summary: "./reconnaissance/summary.md", purpose: "./" }
    },
    "comments": {
      "324": { id: "324", "commenter": "2" }
    }
  }
}
```

Using already normalized data following https://www.robinwieruch.de/the-soundcloud-client-in-react-redux-normalizr/
