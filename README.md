# nicolecalzavara-site

## Build
Public build available on [Netlify](https://nicolecalzavara.netlify.app/)

## Prerequisites
1. Git
2. [Deno](https://deno.com/)
3. The [Vento extension](https://open-vsx.org/extension/oscarotero/vento-syntax) for VSCode/Codium is helpful!

## Deployment instructions
1. Clone this repo
2. In a terminal:
	- CD into the repo, then `deno task serve` to launch a local server at [http://localhost:3000](http://localhost:3000) (CTRL+C to stop server)
	- Open [http://localhost:3000](http://localhost:3000) in a web browser and see your changes in realtime
	- After committing changes with git, `git push` to deploy the main branch to netlify and make the new content appear on the website

## Structure
```
/
├─ _components/	        	=> All of the reusable components for the site. Use these when working on pages :)
│  ├─ Hero.vto
│  ├─ HorizontalGallery.vto
│  ├─ ImageGrid.vto
│  ├─ ImageWithText.vto
│  ├─ PageSeparator.vto
│  ├─ ProjectPreview.vto
│  ├─ SectionHeading.vto
│  ├─ Showcase.vto
│  ├─ StackedContent.vto
├─ _documentation/			=> To-do lists, etc
├─ _includes/				=> Templates that display the contents of the site
│  ├─ partials/				=> Smaller reusable elements of the site that don't take arguments
│  │  ├─ contact-form.vto
│  │  ├─ footer.vto
│  │  ├─ graduated-underlines.vto
│  │  ├─ grid.vto			=> Used to generate grids for things like the projects and case-studies pages
│  │  ├─ hamburger-button.vto
│  │  ├─ header.vto
│  │  ├─ menu-utility.vto	=> Used for the footer menu
│  │  ├─ menu.vto			=> Gets a list of all files with a frontmatter type of "page"
│  │  ├─ social-icon.vto
│  │  ├─ theme-selector.vto
│  ├─ layout.vto			=> The top-level HTML structure of the site, with some templating flair
│  ├─ post.vto				=> The layout for posts. Nests into layout.vto
│  ├─ project.vto			=> The layout for projects AND case-studies. Nests into layout.vto
├─ _site/					=> The Public HTML files get built into here and displayed with Netlify
├─ assets/              	=> All assets for the site
│  ├─ fonts/            	=> Fonts added here can be imported in styles.css
│  ├─ icons/            	=> Svg icons
│  ├─ images/           	=> Images for projects, posts, etc
│  ├─ scripts/          	=> JS files for handling site behaviours
├─ case-studies/			=> Case study pages!
│  ├─ case-study-1.vto		=> Example case study page.
├─ pages/
│  ├─ about.vto		
│  ├─ blog.vto				=> A list of all blog posts in the /posts directory
│  ├─ case-studies.vto		=> A list of all pages in the /case-studies directory
│  ├─ contact.vto		
│  ├─ every-component-example.vto	=> A list of all components and examples of how they can be used.
│  ├─ page-template.vto		=> Make a copy of this and edit it to make new pages. Written in Vento, but can contain plain HTML.
│  ├─ projects.vto			=> A list of all pages in the /projects directory
├─ posts/
│  ├─ example-post.md		=> Make a copy of this and edit it to make a new post. Posts are written with Markdown :)
├─ projects/				=> Project pages!
│  ├─ project-1.vto			=> Example project page.
│  ├─ project-2.vto			=> Another example project page.
├─ _config.ts				=> Top-level configuration for Lume.
├─ _data.json				=> Global site settings! Most high-level things can be changed in here.
├─ 404.vto					=> 404 page. Edit this to change the 404 message.
├─ index.vto				=> The site's homepage. Edit anything below the closing --- to show it on the homepage.
├─ README.md				=> This document :)
├─ styles.css				=> The global stylesheet for the site.

```
Ascii tree made with [ascii-tree-generator.com](https://ascii-tree-generator.com/)

## Notes
- Most actual code is written in [Vento](https://vento.js.org/), a lovely little templating language that is pretty easy to learn. All of the pages and components use Vento syntax.
- Global site settings can be found in `/_data.json`. Use this file to control things like name, background images, etc
- The actual HTML gets built into `/_site`. This folder should be ignored when making changes to the project.
- If you want to generate a new build without pushing it, you can use `deno task lume` to overwrite the files in `/_site` with the latest changes

---

## Components (Reusable blocks of code)

Components are stored in `/_components`. These are blocks of code you can call in vento (.vto) files and pass data into as arguments. For example, let's look at the **SectionHeading** component. To call it, write the following in a Vento file:

```vento
{{ await comp.SectionHeading({heading: "Hello world!", blurb: "This is the blurb :)"}) }}
```

The first important part is the `comp.SectionHeading`. This refers to a component ("comp") called SectionHeading. Component names are case _insensitive_.

Since the SectionHeading component takes two arguments (one for the heading and another for the text blurb that appears next-to/below the heading), we can separate them with a comma. The syntax for arguments is as follows:

`key: "value"`

The key is the name of the variable you can pass data to, and the value is the data you are passing. Remember to use string quotations for values!

When there's a more complex component like the **Showcase**, you can format the code as such for better readability:

```vento
{{ 
    await comp.Showcase({
            heading: "Testing the showcase", 
            blurb: "This is a blurb", 
            image_url: "assets/images/plants.png", 
            image_alt: "A dark-green spread of fronds"
        })
}}
```

> [!WARNING]
> Remember to use `await` at the start of the line when calling a component. Otherwise users could experience broken pages with how Javascript loads.

Some components allow for a number of inputs, like the HorizontalGallery component. This component allows you to add as many cards (gallery items, if you will) as you'd like, in the form of a JSON array (though a max of 4 is probably most-appropriate, since this is intended as a break in page content).

Let's look at the component below and see how to write it:

```vento
{{
    await comp.HorizontalGallery({ /* The usual syntax, until... */
        cards: [ /* We need to open an array of cards with square braces :) */
            {
                card_url: "/pages/about",
                image_url: "/assets/images/plants.png",
                heading: "Heading",
                blurb: "This is a card blurb"
            },
            /* As you can see, each card is a JSON object with the typical key: "value" structure. */
            {
                card_url: "/pages/contact",
                image_url: "/assets/images/plants.png",
                heading: "Heading 2",
                blurb: "This is a second card blurb"
            }, /* Remember to add a comma between card declarations! */
            {
                card_url: "https://example.com", /* You can give it remote URLs too! */
                image_url: "/assets/images/plants.png",
                heading: "Heading 3",
                blurb: "This is another card blurb, wow"
            }
        ]
    })
}}
```

The above allows you to add as many cards as you'd like without needing special syntax for each card!

### Loading HTML into components
The following is an example of how to add a block of HTML to a component by using a template literal (backticks):

```vto
{{
  await comp.SectionHeading({
    heading: "SectionHeading",
    blurb: 
    /* The backticks (`) here define a "template literal", 
    which can be used to add content with multiple lines 
    or formatting like HTML */
    `
      <p>Here's a list:</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3...</li>
      </ul>
    `
  })
}}
```
## Component Reference
<details>
    <summary>
		<h2>List of Components and their arguments<h2>
		<p>All arguments are strings unless otherwise noted.</p>
	</summary>
    <ul>
		<li>
			<h3>Hero</h3>
			Arguments:
			<ul>
				<li><code>section_height_min</code> (pixel value)</li>
				<li><code>heading</code></li>
				<li><code>subheading</code></li>
				<li><code>image_url</code></li>
				<li><code>image_alt</code></li>
			</ul>
		</li>
        <li>
            <h3>HorizontalGallery</h3>
            Arguments:
            <ul>
				<li><code>cards</code> (array)</li>
				<ul>
					<li><code>card_url</code></li>
					<li><code>heading</code></li>
					<li><code>blurb</code></li>
					<li><code>image_url</code></li>
					<li><code>image_alt</code></li>
				</ul>
            </ul>
        </li>    
        <li>
            <h3>ImageGrid</h3>
            Arguments:
            <ul>
				<li><code>columns</code> (integer)</li>
				<li><code>cards</code> (array)</li>
					<ul>
						<li><code>link</code></li>
						<li><code>image_url</code></li>
						<li><code>image_alt</code></li>
					</ul>
            </ul>
        </li>   
		<li>
			<h3>ImageWithText</h3>
			Arguments:
			<ul>
				<li><code>section_height_min</code> (pixel value)</li>
				<li><code>image_orientation</code> (left or right)</li>
				<li><code>image_url</code></li>
				<li><code>image_alt</code></li>
				<li><code>heading</code></li>
				<li><code>blurb</code></li>
			</ul>
		</li>
        <li>
            <h3>PageSeparator</h3>
            Arguments:
            <ul>
                <li><code>heading</code></li>
            </ul>
        </li>
        <li>
            <h3>ProjectOverview</h3>
            Arguments:
            <ul>
                <li><code>title</code></li>
				<li><code>url</code></li>
				<li><code>subheading</code></li>
				<li><code>client</code></li>
				<li><code>description</code></li>
				<li><code>keywords</code> (array)</li>
				<li><code>media_items</code> (array)</li>
				<ul>
					<li><code>image_url</code></li>
					<li><code>image_alt</code></li>
				</ul>
            </ul>
        </li>
        <li>
            <h3>SectionHeading</h3>
            Arguments:
            <ul>
                <li><code>heading</code></li>
                <li><code>blurb</code></li>
            </ul>
        </li>
        <li>
            <h3>Showcase</h3>
            Arguments:
            <ul>
                <li><code>heading</code></li>
                <li><code>blurb</code></li>
                <li><code>image_url</code></li>
                <li><code>image_alt</code></li>
            </ul>
        </li>
        <li>
            <h3>StackedContent</h3>
            Arguments:
			<ul>
				<li><code>content</code> (array)</li>
				<ul>
					<li><code>heading</code></li>
					<li><code>blurb</code></li>
				</ul>
			</ul>
        </li>
    </ul>
</details>
