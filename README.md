<br/>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/logo/logo-white.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/logo/logo-black.png">
  <img alt="Siam Ahnaf" src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/logo/logo-black.png" height="auto" width="240">
</picture>
<br/> <br/>

# @siamf/next-progress
A next js (app+page) route top progress bar has all the functionality required, including all the features and fixed from earlier packages. Most popular packages are <a href="https://www.npmjs.com/package/nextjs-toploader">nextjs-toploader </a> and <a href="https://www.npmjs.com/package/next-nprogress-bar"> next-nprogress-bar </a> both has some issues. <a href="https://www.npmjs.com/package/nextjs-toploader">nextjs-toploader </a> do not come with delay time and even they don't want to give this options as it already has a closed <a href="https://github.com/TheSGJ/nextjs-toploader/pull/18">PR </a>. On the other hand <a href="https://www.npmjs.com/package/next-nprogress-bar"> next-nprogress-bar </a> has a open <a href="https://github.com/Skyleen77/next-nprogress-bar/issues/74">issue</a>. I just try solve this issues and give the options also.

<a href="https://www.buymeacoffee.com/siamahnaf" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

- Small in Size
- `delay` options
- Solve for not showing progress bar on first load
- Properly Maintained

# Installation

```bash
$ npm i @siamf/next-progress
```

# App Router
Import `AppProgressBar` in your `app/layout.tsx/js` and place inside the `body` tag.

```javascript
import { AppProgressBar } from "@siamf/next-progress";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppProgressBar />
                {children}
            </body>
        </html>
    );
}
```

### `useRouter` hook support
For triggering progress bar in your `app` folder, please use follow the steps bellow.

```javascript
//Import `useRouter` from `@siamf/next-progress` instead `next/navigation`.

import { useRouter } from "@siamf/next-progress";

//Then simple use it as like you normally use from `next/navigation`

```

# Page Router
Import `PageProgressBar` into your `pages/_app.tsx/js` and place the component on `MyApp`.

```javascript
import { PageProgressBar } from '@siamf/next-progress';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <PageProgressBar />
            <Component {...pageProps} />;
        </>
    );
}
```
`For page router you do not handle useRouter separately`


# Configurations

<table width="100%">
  <tr>
    <th> Name </th>
    <th> Description </th>
    <th> Type </th>
    <th> Default </th>
  </tr>
  <tr>
    <td> color </td>
    <td> Progress bar color. </td>
    <td> string </td>
    <td> #2299DD </td>
  </tr>
   <tr>
    <td> initialPosition </td>
    <td> The progress bar initial position in percentage. For Example - "8/100=8%=0.08" </td>
     <td> number </td>
    <td> 0.08 </td>
  </tr>
   <tr>
    <td> crawlSpeed </td>
    <td> Incremental delay speed in milliseconds. </td>
     <td> number </td>
    <td> 200 </td>
  </tr>
   <tr>
    <td> speed </td>
    <td> Animation speed for the progress bar </td>
     <td> number </td>
    <td> 200 </td>
  </tr>
  <tr>
    <td> delay </td>
    <td> Progress animation start delay </td>
     <td> number </td>
    <td> 0 </td>
  </tr>
   <tr>
    <td> easing </td>
    <td> Animation cubic-bezier setting for speed </td>
     <td> string </td>
    <td> ease </td>
  </tr>
  <tr>
    <td> height </td>
    <td> Height of the progress bar in pixels </td>
     <td> number </td>
    <td> 3 </td>
  </tr>
  <tr>
    <td> crawl </td>
    <td> Auto increment for progress bar </td>
     <td> boolean </td>
    <td> true </td>
  </tr>
  <tr>
    <td> showSpinner </td>
    <td> Toggle display of top right spinner </td>
     <td> boolean </td>
    <td> true </td>
  </tr>
   <tr>
    <td> shadow </td>
    <td> A shadow for the progress bar </td>
     <td> string | false </td>
    <td> 0 0 10px #2299DD,0 0 5px #2299DD </td>
  </tr>
   <tr>
    <td> template </td>
    <td> You can use your custom attribute for your progress bar </td>
    <td> string </td>
    <td> <div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div> </td>
  </tr>
  <tr>
    <td> zIndex </td>
    <td> You can re-define the `zIndex` for progress bar </td>
     <td> number </td>
    <td> 1600 </td>
  </tr>
  <tr>
    <td> showAtBottom </td>
    <td> To show progress bar on bottom </td>
     <td> boolean </td>
    <td> false </td>
  </tr>
  <tr>
    <td> showForHashAnchor </td>
    <td> If you want to show progress bar on hash anchor tag </td>
     <td> boolean </td>
    <td> true </td>
  </tr>
</table>

## Connect with me
<div style="display: flex; align-items: center; gap: 3px;">
<a href="https://wa.me/8801611994403"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/whatsapp.png" width="40" height="40"></a>
<a href="https://siamahnaf.com/" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/web.png" width="40" height="40"></a>
<a href="https://www.linkedin.com/in/siamahnaf/" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/linkedin.png" width="40" height="40"></a>
<a href="https://x.com/siamahnaf198" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/x.png" width="40" height="40"></a>
<a href="https://www.facebook.com/siamahnaf198/" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/facebook.png" width="40" height="40"></a>
<a href="https://t.me/siamahnaf198" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/telegram.png" width="40" height="40"></a>
<a href="https://www.npmjs.com/~siamahnaf" style="margin-right: 8px"><img src="https://raw.githubusercontent.com/siamahnaf/assets-kit/main/icons/npm.png" width="40" height="40"></a>
</div>
