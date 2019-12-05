# Gatsby Portfolio Studio with sample previews

This is a Sample Studio which showcases a few interesting ways to preview your content. The Studio itself is based off the [Portfolio with Gatsby](https://www.sanity.io/create/?template=sanity-io%2Fsanity-template-gatsby-portfolio) template.

## Try it out

There are two ways of getting these previews running in a Studio:

### Automatic

1. Clone this Studio
2. Change `projectId` and `dataset` in the `sanity.json` file to match a project you already own. If you want a new project to play with, get one by running `sanity init`.
3. **Optional**: For easy testing, add sample content. There's some included in this repo, just type `sanity dataset import sample-data/production.tar.gz preview-test` in your terminal to get a new dataset tanked up. Remember to update your `sanity.json` file with the new dataset name (`preview-test` in this case).

### Manual

Make yourself familiar with how the previews are defined in [deskStructure.js](./src/deskStructure.js) and copy whichever preview components from [src/components/previews](./src/components/previews) which you find interesting to your own Studio. Then modify them to make them fit your own content.


## Structure definition

For these previews to work, your Studio needs a structure definition. Locate a file named `deskStructure.js`. If there isn't one, follow [these instructions](https://www.sanity.io/docs/how-it-works) first. On the off-chance that there is a structure definition in your Studio, but it's named differently, check your `sanity.json` file for the implementation of `part:@sanity/desk-tool/structure`.

Now, instead of something like this in your `deskStructure.js` file:

```js
S.listItem()
  .title('Sample projects')
  .schemaType('sampleProject')
  .child(
    S.documentTypeList('sampleProject')
      .title('Sample projects')
  )
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

### iFrame preview of live site

This component receives a `sampleProject` document, resolves the URL to the web front-end and renders an iFrame of that page inside the Studio.

In addition to content being available in your dataset, you'll have to take control of the `gatsbyUrl` constant and possibly the `assembleProjectUrl`. Both of these are located in the `IframePreview.js` file.

<img width="1281" alt="Screenshot 2019-12-05 21 53 42" src="https://user-images.githubusercontent.com/134077/70273965-2967d480-17a3-11ea-819d-2adb7d3801a6.png">

### Colorblind preview of live site

This component does exactly the same as the iFrame preview, but in addition it let's you select a filter which optimizes the experience for users with various colorblind conditions.

### Text to Speech

This component receives a `sampleProject` document and uses the browsers speech synthesizer to utter (read out loud) the text of various document fields. You can configure the target fields by setting the `fields` property, e.g.:

```js
S.view().component(({document}) => <TextToSpeechPreview document={document} fields={['title', 'description']} />)
```

Or you can take control of the `defaultFields` in `TextToSpeechPreview.js`. Also, the `speechOptions` in that same file can be fun to play around with :)


## Cool! Do you have any other examples?

Actually yes! Check this Studio out https://github.com/sanity-io/next-landingpages-preview-poc!

