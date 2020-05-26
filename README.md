# asos.com scraper

[![Made in Indonesia](https://made-in-indonesia.github.io/made-in-indonesia.svg)](https://github.com/made-in-indonesia/made-in-indonesia)

Easily use to crawl assos.com detail product by list of product url

## Install it

    $ npm install @kulkul/asos-crawler

## Input

```json
[
  {
    "url": "https://www.asos.com/prd/14031451"
  },
  {
    "url": "https://www.asos.com/prd/14084626"
  }
]
```

## Output

```json
[
  {
    "url": "https://www.asos.com/prd/14084626",
    "title": "ASOS DESIGN chest harness bag in black with slogan print",
    "price": "£20.00",
    "createdAt": "2020-05-27T16:16:12.921Z",
    "nominal": 20,
    "currency": "£",
    "productId": "14084626"
  },
  {
    "url": "https://www.asos.com/prd/14031451",
    "title": "Nike Plus mini swoosh boyfriend t-shirt in pale pink",
    "price": "£20.00",
    "createdAt": "2020-05-27T16:16:13.673Z",
    "nominal": 20,
    "currency": "£",
    "productId": "14031451"
  }
]
```