<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [GitLab CI](#gitlab-ci)
- [Building locally](#building-locally)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Building locally

To work locally with this project, you'll have to follow the steps below:

1. Fork, clone or download this project
1. [Install][] Jekyll
1. Generate the website: `jekyll build -d public`
1. Preview your project: `jekyll serve`
1. Add content

## Editing

To create a new blog post, just look at one of the existings.
Each post, in the \_post subdirectory, has to have:

* a ref tag to identify the same blog posts in different languages
* a lang tag to define the language
* a date
* an author
* a title
* and a body

### Translating

To translate a blog post, just copy the existing post file to a new name. You may give the file a name in the language you are going to translate to, similar to the title.
Then, start by changing the lang tag. You may add yourself to the list of translators.

## Webserver configuration

For proper multi language support, it would be nice when the webserver automatically delivers the right content language.
To have the language picker working, this should only work for the general page entry: /.

Searching the web for an easy solution with nginx uncovers https://www.cybrilla.com/blog/auto-redirect-based-on-language-in-nginx/ which works nice at our setup:

```
location = / {
	rewrite_by_lua '
		for lang in (ngx.var.http_accept_language .. ","):gmatch("([^,]*),") do
			if string.sub(lang, 0, 2) == "en" then
				ngx.redirect("/index.en.html")
			end
			if string.sub(lang, 0, 2) == "de" then
				ngx.redirect("/index.de.html")
			end
		end
		ngx.redirect("/index.de.html")
	';
}
```

## License

This site uses a modified Jekull default theme with multilingual support from https://github.com/sylvaindurand/jekyll-multilingual and is as well as those released under the MIT License.

