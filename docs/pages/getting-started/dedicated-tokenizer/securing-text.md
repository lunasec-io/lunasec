---
id: "handling-text"
title: "Securing Text"
sidebar_label: "Securing Text"
sidebar_position: 5
---
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
:::tip
As you follow along with this guide, you can check the custom properties each component supports(and what those properties do)
in the [type documentation](/pages/react-sdk/interfaces/SecurePropsLookup).
::::
## Secure Forms

Let's create a form secured with LunaSec.  Here is a simple scenario where we want to tokenize a Social Security Number.
```tsx
<SecureForm name="secure-form-example" onSubmit={(e) => handleFormSubmit(e)}>
    <SecureInput
        name="ssn"
        onChange={(e) => setSsnToken(e.target.value)} 
        errorHandler={(e: LunaSecError) => setError(e)} // Unlike a normal input, SecureInput can throw
    />
    <input name="normal-input-coexisting"/>
    <button type="submit">Submit</button>
</SecureForm>
```
If you're used to React this should look familiar.  Just like a normal form, we watch for changes using onChange and use the
`value` to update state. Where possible, LunaSec elements attempt to mimic the behavior of basic DOM elements in order to make 
them easy to use and interoperable with other DOM libraries.

For example, `<SecureInput>` calls `onChange` and `onBlur` event handlers just like the native `<input>` element.  For the most part, they can be styled
just like native elements and will allow you to build forms and pages as you normally would, with a few exceptions.

:::tip
The secure input we created shouldn't change how the app looks at all(that's the point) but if we right-click and
inspect it we can see the cross-domain iFrame that LunaSec creates to protect your data.
:::
Creating a Text Area for multi-line data entry is pretty similar, this time let's give it some custom styling:
```tsx
// ... inside secure form
<SecureTextArea
    style={{ height: '45px' }}
    id="ssn-token-input"
    name="ssn"
    // token={some.prefilled.value}
    onChange={(e) => setTextAreaToken(e.target.value)}
    errorHandler={(e) => setError(e.message)}
/>
```


:::note
`<SecureInput>` and `<SecureTextArea>` need to be inside a `<SecureForm>` because it captures submit events and tells them
to tokenize their plaintext.
`<SecureForm>` will wait to fire your `onSubmit` handler until they are done tokenizing.  Note that normal submit methods like a submit button and 
hitting `enter` in a text box work fine.
:::

## Displaying Secure Data
The `<SecureParagraph` element can take a token and display it as text.  
```tsx
<SecureParagraph 
   token={user.ssn_token} 
   errorHandler={(e) => setError(e.message)} 
/>
```
The major caveat here is that the text can't be displayed inline because we can't leak any information about the length of the 
secured data to the surrounding page.  It's a good idea to style this element large enough to display the text it's 
going to display.

## Advanced Form Usage

SecureInput supports many options and can be used with component libraries. 

Here is a more complex example of the props that `<SecureInput>` can take:

```tsx
<SecureInput 
    // Normal input properties
    name="ssn" 
    id="ssn"
    className="ssn"
    type="text"
    placeholder='XXX-XX-XXXX'
    onChange={(e) => setSsnToken(e.target.value)}
    // Special LunaSec properties
    validator="SSN" 
    onValidate={(isValid) => setSsnValid(isValid)}
    token={prefilledSsnToken}
    errorHandler={(e) => setError(e.message)}
/>
```
Inputs come with support for all the normal input types such as `email` and `password`.  They are able to take a token for
prefilling the field with some previously created secure data.  You can choose from one of several pre-made validators if you need
basic validation.

:::note Special Cases
Some things you would normally do may need to be done differently or may not be possible because your page
just doesn't have access to the plaintext value.  An example of this is validations, where you have to use one of our pre-made validators.

Please contact us if you have a use case that this library doesn't support.  We are exploring the possibility of running custom plugins
in the Secure Frame.
:::


### Component Library Interoperability

LunaSec can work with component libraries that allow passing of a custom element, like MaterialUI.  Here is an example 
from the Demo App of using `<SecureInput>` inside of a MaterialUI `<TextField>`.

```tsx
import { SecureForm, SecureInput } from '@lunasec/react-sdk';
import { TextField } from '@material-ui/core';


// These props are predefined like this to preserve the strong typing.
// We are being fancy here and passing these into MaterialUi
const secureInputProps: React.ComponentProps<typeof SecureInput> = {
    id: 'ssn-token-input',
    name: 'ssn',
    type: 'ssn',
    validator: 'SSN',
    onValidate: (isValid: boolean) => setSsnValid(isValid),
    token: user.ssn_token || undefined,
    placeholder: 'XXX-XX-XXXX',
    onChange: (e) => setSsnToken(e.target.value),
    errorHandler: (e) => setError(e.message),
};

// ...inside a secure form
<TextField // This is a material UI component
    error={!ssnValid}
    helperText={ssnValid ? '' : 'Invalid Format'}
    variant="outlined"
    // label="Labels don't work quite right yet"
    InputProps={{
      /*
      // @ts-ignore */
      inputComponent: SecureInput, // Pass in our secure input
      inputProps: secureInputProps, // Pass in the properties to it
    }}
/>
```

This type of usage is experimental and not every feature is guaranteed to be perfectly supported.  That said, the results are impressive
given that the actual element is running inside an iFrame on another domain. It's likely good enough for most applications, 
even where UX is important.  To see it running, try using the SecureInput in the Demo App.

LunaSec should also work just fine with a form library like Formik.

[Next let's handle some secure files.](./securing-files.md)

