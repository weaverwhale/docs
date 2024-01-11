---
layout: "../../layouts/BlogPost.astro"
title: "📠 Typescript Autocomplete"
description: "Predefined list of strings with autocomplete in typescript"
pubDate: "Jan 11 2024"
---

## I want to create a string type with a predefined list from an array, but also allow it to accept something not from the list as well

```ts
const SOME_CONST = ['a', 'b', 'c'] as const;
type SomeConstKey = (typeof SOME_CONST)[number] | (string & {});
```

To keep the autocomplete with flexibility, you add the ‘& {}’.

### Explanation

any key of the const array and NOT just any string - but rather any string+object.  “string” is a generic type, and therefore a union with it will override the specificity from the const array.  However, string & {} isn’t a generic type that will override the other options.  That being said, since every single thing in JS is basically some kind of object, a string will match the type of string & {} as well as just string.  Therefore, doing something like const x: SomeConstKey = 'y' won’t cause any issues, since y is still of type string & {}. 

### Screenshot

<img src="/y1.png" /><br>