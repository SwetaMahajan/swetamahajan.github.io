# Minimal Academic Homepage

A clean, single-page academic website for GitHub Pages. It works on phones, tablets and desktops, and you can change every piece of content without touching HTML or CSS.

**Live example:** [swetamahajan.github.io](https://swetamahajan.github.io)

---

## Use this template (about 10 minutes, no coding)

1. **Copy the repo.** Click **Use this template**, or **Fork**, at the top of this page.
   - Name the new repo **`<your-username>.github.io`** to get the URL `https://<your-username>.github.io`.
   - Any other name gives you `https://<your-username>.github.io/<repo-name>/` (see step 3).
2. **Turn on GitHub Pages.** Go to **Settings → Pages → Build and deployment**, then set *Source* to **Deploy from a branch**, *Branch* to **main**, and the folder to **/ (root)**.
3. **Edit `_config.yml`.** Set `title`, `description` and `url`. If your repo is *not* named `<username>.github.io`, set `baseurl: "/<repo-name>"`.
4. **Replace the content** in the `_data/` folder (see below) and the images in `assets/img/`.
5. Commit. Your site will go live in about a minute later. Every later commit updates it automatically.

---

## Where everything lives

```
_config.yml            Site settings: title, description, URL
_data/
  profile.yml          Your name, photo, bio and links (Email / Scholar / ...)
  sections.yml         Which sections appear, their titles and order
  news.yml             News items          (date + text)
  publications.yml     Papers              (title, authors, venue, image, links, ...)
  talks.yml            Talks               (date + text)
  service.yml          Academic service    (Role: item, item)
assets/
  img/                 Your photo, favicon and paper images
  files/               PDFs (slides, posters, CV, ...)
  css/main.css         Colors and fonts (Theme section at the top)

_layouts/, _includes/, index.html, assets/js/   Layout code, which you don't need to touch
```

**Content → `_data/`. Settings → `_config.yml`. Looks → `assets/css/main.css`.**

---

## Editing content

All text fields accept **Markdown**, for example `[link text](https://example.com)`, `**bold**` or `*italic*`.

> **YAML tip:** if a line of text contains a colon followed by a space (`: `), wrap the whole text in double quotes. Keep the indentation (spaces, not tabs) exactly as in the examples.

### Profile: `_data/profile.yml`

```yaml
name: Ada Lovelace
photo: assets/img/profile.jpg     # portrait or square, about 500px wide is plenty
bio: |
  First paragraph of your bio with a [link](https://example.com).

  Second paragraph.
links:
  - label: Email
    url: mailto:ada@example.com
  - label: CV
    url: assets/files/cv.pdf
footer: Optional small text at the bottom of the page.
```

### News or talks: `_data/news.yml`, `_data/talks.yml`

```yaml
- date: June 2026
  text: "Paper accepted at [CVPR 2026](https://cvpr.thecvf.com/)!"
```

### Publications: `_data/publications.yml`

```yaml
- title: "My Great Paper: A Subtitle"
  authors:
    - name: Ada Lovelace          # your own name is bolded automatically
      equal: true                 # adds * and an "Equal contribution" note
    - name: Charles Babbage
      url: https://example.com    # optional link on an author's name
  venue: CVPR 2026
  image: assets/img/publications/my-paper.png   # optional; a placeholder is shown otherwise
  links:
    - label: arXiv
      url: https://arxiv.org/abs/xxxx.xxxxx
    - label: Code
      url: https://github.com/you/repo
    - label: Poster
      url: assets/files/my-paper/poster.pdf
  description: One or two sentences about the paper.
```

Paper images are shown at a 5:4 ratio without cropping. For a very wide figure (e.g. a multi-panel Figure 1), add `image_wide: true` to show it across the full card width above the text.

For sharp images, export figures from the paper PDF at high resolution (about 2000px wide) rather than taking a screenshot.

### Academic service: `_data/service.yml`

```yaml
- role: Co-organizer
  items:
    - "[Some Workshop (CVPR 2026)](https://example.com)"
- role: Reviewer
  items: [CVPR, ICCV, ECCV, NeurIPS]
```

This renders as **Co-organizer:** Some Workshop (CVPR 2026) on one line, and **Reviewer:** CVPR, ICCV, ECCV, NeurIPS on the next.

### Sections: `_data/sections.yml`

Reorder, rename or delete sections, or add your own. For example, to add an **Awards** section, create `_data/awards.yml`:

```yaml
- text: Best Paper Award, Some Conference 2026
```

and add this to `_data/sections.yml`:

```yaml
- title: Awards
  data: awards        # the file name in _data/, without .yml
  type: list          # timeline | publications | roles | list
```

`show: 5` on a `timeline` or `list` section shows only the first 5 items, with a **Show more** button for the rest. A section whose data file is empty or missing is hidden automatically.

### Colors and fonts: `assets/css/main.css`

Edit the variables in the **Theme** block at the top of the file (`--link`, `--link-hover`, `--font`, ...). The dark-theme colors are in the block just below it.

### Dark theme

By default the site follows the visitor's system setting (light or dark), and a sun/moon button in the top-right corner lets them switch. Their choice is remembered. In `_config.yml`:

```yaml
default_theme: auto    # auto | light | dark
theme_toggle: true     # false hides the button
```

---

## Preview on your computer (optional)

You don't need this to publish. It's only for seeing changes before you push.

```bash
# one-time setup (needs Ruby: https://jekyllrb.com/docs/installation/)
bundle install

# run the site at http://localhost:4000
bundle exec jekyll serve
```

---

## Credits and license

The code is released under the [MIT License](LICENSE): use it, change it and share it. Keeping a link back is appreciated but not required.
