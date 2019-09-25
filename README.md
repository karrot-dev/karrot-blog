## Building locally

To work locally with this project, you need Jekyll.

1. Install `ruby` and `gem` from your package manager.
1. Install bundler: `gem install bundler`

Then fork or clone this repository and get the bundle dependencies:

```sh
git clone https://github.com/yunity/karrot-blog
cd karrot-blog
bundle install
```

Run Jekyll locally:

```sh
bundle exec jekyll serve
```

It will show you a link. Open it in your browser. If you change source files, it will automatically rebuild, but it won't reload the page, so take care to reload manually.

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

