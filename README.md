# Remotion TikTok explainer reel template


<iframe width="560" height="315" src="https://www.youtube.com/embed/3tL9cWyCBZ8?si=A4-pLPVecuZyxmGS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Commands

**Install Dependencies**

```console
pnpm i
```

**Start Preview**

```console
pnpm run dev
```

**Render video**

```console
npx remotion render
```

**Upgrade Remotion**

```console
npx remotion upgrade
```

## Captioning

Replace the `sample-video.mp4` with your video file.
Caption all the videos in you `public` by running the following command:

```console
node sub.mjs
```

Only caption a specific video:

```console
node sub.mjs <path-to-video-file>
```

Only caption a specific folder:

```console
node sub.mjs <path-to-folder>
```

## Configure Whisper.cpp

Captioning will download Whisper.cpp and the 1.5GB big `medium.en` model. To configure which model is being used, you can configure the variables in `whisper-config.mjs`.

It is recommended to have one installation of whisper.cpp on your machine, and give the path to that in `whisper-config.mjs`, like

```
export const WHISPER_PATH = "/Users/vibecoder/Software/whisper.cpp";

export const WHISPER_VERSION = "1.7.5";
```

### Non-English languages

To support non-English languages, you need to change the `WHISPER_MODEL` variable in `whisper-config.mjs` to a model that does not have a `.en` sufix.

