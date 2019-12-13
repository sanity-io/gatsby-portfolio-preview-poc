# Gatsby Portfolio Studio with sample previews

This is a Sample Studio which showcases a few interesting ways to preview your content. The Studio itself is based off the [Portfolio with Gatsby](https://www.sanity.io/create/?template=sanity-io%2Fsanity-template-gatsby-portfolio) template.

[Read our blog post about previews](https://www.sanity.io/blog/evolve-authoring-experiences-with-views-and-split-panes).

- [Try it out](#try-it-out)
  - [Automatic](#automatic)
  - [Manual](#manual)
- [Structure definition](#structure-definition)
- [Preview components and usage](#preview-components-and-usage)
  - [Wiring up Gatsby Preview](#wiring-up-gatsby-preview)
  - [Web preview with iFrame](#web-preview-with-iframe)
  - [Preview for people with colorblindness](#preview-for-people-with-colorblindness)
  - [Text to Speech preview](#text-to-speech-preview)
  - [Visual braille preview](#visual-braille-preview)
  - [SEO and social preview](#seo-and-social-preview)
  - [IRL preview](#irl-preview)
  - [PDF Business Card](#pdf-business-card)

## Try it out

There are two ways of getting these previews running in a Studio:

### Automatic

1. Clone this Studio
2. Change `projectId` and `dataset` in the `sanity.json` file to match a project you already own. If you want a new project to play with, get one by running `sanity init`.
3. **Optional**: For easy testing, add sample content. There's some included in this repo, just type `sanity dataset import ../sample-data/production.tar.gz preview-test` in your terminal to get a new dataset tanked up. Remember to update your `sanity.json` file with the new dataset name (`preview-test` in this case).

### Manual

Make yourself familiar with how the previews are defined in [deskStructure.js](./src/deskStructure.js) and copy whichever preview components from [src/components/previews](./src/components/previews) which you find interesting to your own Studio. Then modify them to make them fit your own content.

## Structure definition

For these previews to work, your Studio needs a structure definition. Locate a file named `deskStructure.js`. If there isn't one, follow [these instructions](https://www.sanity.io/docs/how-it-works) first. On the off-chance that there is a structure definition in your Studio, but it's named differently, check your `sanity.json` file for the implementation of `part:@sanity/desk-tool/structure`.

Now, instead of something like this in your `deskStructure.js` file:

```js
S.listItem()
  .title('Sample projects')
  .schemaType('sampleProject')
  .child(S.documentTypeList('sampleProject').title('Sample projects'))
```

...you want to take a bit more control by calling `.views()`:

```js
S.listItem()
  .title('Sample projects')
  .schemaType('sampleProject')
  .child(
    S.documentTypeList('sampleProject')
      .title('Sample projects')
      .child(documentId =>
        S.document()
          .documentId(documentId)
          .schemaType('sampleProject')
          .views([
            S.view.form().icon(EditIcon),
            S.view
              .component(IframePreview)
              .icon(EyeIcon)
              .title('Web Preview')
          ])
      )
  )
```

In short, what we're saying here is, "yeah we want a view to edit documents of the type `person` (`S.view.form`). And we want _another_ custom view component (`S.view.component`) which we're going to use as preview.

For the above code to work, you'll need to import the `IframePreview` component and those icons into your `deskStructure.js`:

```js
import EyeIcon from 'part:@sanity/base/eye-icon'
import EditIcon from 'part:@sanity/base/edit-icon'
import IframePreview from './components/previews/iframe/IframePreview'
```

## Preview components and usage

### Wiring up Gatsby Preview

For the iFrame and Colorblind previews to work, you need to put your web front end on the Gatsby Cloud. Sign up at https://www.gatsbyjs.com/preview/. If you got your Studio + front-end from sanity.io/create, give Gatsby your GitHub repo URL and make sure you set the base directory to `web`.

Also, set these three environment variables:

- `GATSBY_SANITY_PROJECT_ID` - The Sanity project ID
- `GATSBY_SANITY_DATASET` - The name of your dataset
- `SANITY_READ_TOKEN` - A token which will allow the Gatsby builder to fetch content. Visit [manage.sanity.io](https://manage.sanity.io) to generate such a token

### Web preview with iFrame

This component receives a `sampleProject` document, resolves the URL to the web front-end and renders an iFrame of that page inside the Studio.

In addition to content being available in your dataset, you'll have to take control of the `gatsbyUrl` constant and possibly the `assembleProjectUrl`. Both of these are located in the `IframePreview.js` file.

<img width="1281" alt="Screenshot 2019-12-05 21 53 42" src="https://user-images.githubusercontent.com/134077/70273965-2967d480-17a3-11ea-819d-2adb7d3801a6.png">

### Preview for people with colorblindness

This component does exactly the same as the iFrame preview, but in addition it let's you select a filter which optimizes the experience for users with various colorblind conditions.

![Screenshot 2019-12-06 08 50 19](https://user-images.githubusercontent.com/134077/70305747-754b6580-1805-11ea-90bf-1b4601e80ac6.png)

### Text to Speech preview

This component receives a `sampleProject` document and uses the browsers speech synthesizer to utter (read out loud) the text of various document fields. You can configure the target fields by setting the `fields` in the options method (that will be available under `props.options.fields` in the React component), e.g.:

```js
S.view().component(TextToSpeechPreview)
  .options({fields: ['title', 'description']})
  .title('Text2Speech')
))
```

Or you can take control of the `defaultFields` in `TextToSpeechPreview.js`. Also, the `speechOptions` in that same file can be fun to play around with :)

![The text to speech preview](https://user-images.githubusercontent.com/134077/70274035-4a302a00-17a3-11ea-9a19-c74fd565dac4.png)

### Visual braille preview

This component gives a visual representation of 6-point Braille script. Hence it's only useful to introduce sighted people to Braille. In order to use it in your own studio, make sure to install the dependency from npm.

```sh
npm i braillle
# or
yarn add braille
```

![Braille preview in Sanity Studio](https://cdn.sanity.io/images/3do82whm/next/bad25006e1f0e747a1edffa958fceb8f687e55af-1913x833.png?w=1000&h=1000&fit=max)

### SEO and social preview

This component receives a `route` document, resolves the `page` the `route` is pointing to and uses the content on that `page` to render:

- A Twitter share card
- A Facebook/Open Graph preview
- A Google SERP preview

Except for content being available in your dataset, no assembly is required to make this work.

![Screenshot 2019-12-06 09 16 20](https://user-images.githubusercontent.com/134077/70307283-1daef900-1809-11ea-933c-d06df8921b40.png)

### IRL preview

IRL previews are in this example ads shown in various contexts, like on billboards in New York and Osaka, or a magazine, and they use content from `ad` documents as the data source. In our examples, we have billboards in New York and Osaka, and each `ad` document has a different heading, tagline and background image that the preview component uses to show on the billboard.

![Preview](https://cdn.sanity.io/images/3do82whm/next/1b33361e5716caf8936d8079dac091e0c7b43d98-1425x767.gif)

How does this work? There are two components at play here, one is the component (`IrlPreview`) that handles all the logic for placing your ad (component) in the right position on a background image of your choosing. The other is the actual ad component that represents how your ad actually looks like. In our examples, we have one component using a background image from New York and another one from Osaka. Here is our New York component (`NewyorkPreview.js`):

```
import React from 'react'
import IrlPreview from './IrlPreview'
import NewyorkBanner from './NewyorkBanner'

const nmatrix = [0.4537803868659941,0.054970678194849784,0,0.14983119474393147,-0.004189674182450833,0.22750620023381607,0,-0.09699401181274303,0,0,1,0,-0.00010425672320324794,-0.2516019261255319,0,1.0000005448288898]

const NewyorkPreview = props => {
  if (!props.document.displayed) {
    return <div>No document to preview</div>
  }
  return (
    <IrlPreview nmatrix={nmatrix} adHeight={200} adWidth={400} bgSrc="/static/newyork.png">
      <NewyorkBanner document={props.document.displayed} />
    </IrlPreview>
  )
}

export default NewyorkPreview
```

You can see that there a few `props` at play here:

- `bgSrc` - the background image that contains the billboard where your ad goes
- `nmatrix` - an array with values representing where on the background your ad should initally be placed\*
- `adHeight` - the approx. height of your ad in pixels
- `adWidth` - the appprox. width of your ad in pixels

\*As you move your ad around, new matrix values are printent out on the bottom of the preview pane for you to copy and paste to save the position of the ad.

The `NewyorkBanner` component is the component representing the actual ad, which in HTML looks like this:

```
<div className={styles.banner}>
  <img className={styles.backgroundImage} src={imageUrl}/>
  <div className={styles.content}>
    <div className={styles.heading}>{heading}</div>
    <div className={styles.tagline}>{tagline}</div>
  </div>
</div>
```

This preview component is dependent on two packages: `react-moveable` and `resize-observer` and you need to install them as extra dependencies for it to work: `npm install --save react-moveable resize-observer`.

### PDF Business Card

This component receives a `person` document and provides a way to generate an image of what that person's business card might look like. There's also a download link to get a PDF version of that business card.

For this to work you need (apart from content) a server which does the actual image/pdf generation. A GET request w/serialized content is performed to the backend, and the response contains image data.

You can set up your own server(less) image/pdf generator by cloning this GitHub repo: https://github.com/sanity-io/json-to-pdf

The `BusinessCard.js` file has a constant `cardServiceHost` which defines the URL to the server. Change it to make requests go to your own server.

Except for content being available in your dataset, you need to install an extra dependency: `npm install --save rxjs`.

![Screenshot 2019-12-06 09 15 51](https://user-images.githubusercontent.com/134077/70307324-2ef80580-1809-11ea-9ccb-6188e643caa3.png)
