//	From: https://github.com/mrvautin/downa
//	But with modified links to only be internal to https://example.com
/*

	import markdowna from '../../markdowna'
	markdowna('# markdown text')
*/
const cleanLinesRe = /^\s*/gm
const headersRe = /(#+)(.*)/gmi
const imagesRe = /!\[([^[]+)\]\(([^)]+)\)/gmi
const linksRe = /\[([^[]+)\]\(([^)]+)\)/gmi
const boldRe = /(\*\*|__)(.*?)\1/gmi
const emphasisRe = /(\*|_)(.*?)\1/gmi
const delRe = /~~(.*?)~~/gmi
const quoteRe = /:"(.*?)":/gmi
const blockCodeRe = /```([^```]+)```/gmi
const inlineCodeRe = /`([^`]+)`/gmi
const ulListsRe = /\*+(.*)?/gmi
const olListsRe = /[0-9]+\.(.*)/gmi
const hrRe = /\n-{5,}/gmi
const blockQuoteRe = /\n(&gt;|>)(.*)/gmi
const paragraphsRe = /\n([^\n]+)\n/gmi
const paragraphsIgnoreRe = /^<\/?(ul|ol|li|h|p|bl|code|table|tr|td)/i
const fixUlRe = /<\/ul>\s?<ul>/gmi
const fixOlRe = /<\/ol>\s<ol>/gmi
const fixBlockQuoteRe = /<\/blockquote>\s?<blockquote>/gmi

const rules = {
	cleanLines: {
		regex: cleanLinesRe,
		replacer() {
			return ''
		}
	},
	headers: {
		regex: headersRe,
		replacer(match, $1, $2) {
			const h = $1.trim().length
			return `<h${h}>${$2.trim()}</h${h}>`
		}
	},
	images: {
		regex: imagesRe,
		replacer(match, $1, $2) {
			return `<img src="${$2}" alt="${$1}">`
		}
	},
	links: {
		regex: linksRe,
		replacer(match, $1, $2) {
			const userLink = $2.indexOf('/') === 0 ? $2 : `/${$2}`
			const link = `https://https://example.com${userLink}`
			return `<a href="${link}">${$1}</a>`
		}
	},
	bold: {
		regex: boldRe,
		replacer(match, $1, $2) {
			return `<strong>${$2}</strong>`
		}
	},
	emphasis: {
		regex: emphasisRe,
		replacer(match, $1, $2) {
			return `<em>${$2}</em>`
		}
	},
	del: {
		regex: delRe,
		replacer(match, $1, $2) {
			return `<del>${$1}</del>`
		}
	},
	quote: {
		regex: quoteRe,
		replacer(match, $1, $2) {
			return `<q>${$1}</q>`
		}
	},
	blockCode: {
		regex: blockCodeRe,
		replacer(match, $1, $2) {
			return `<pre><code>${$1}</code></pre>`
		}
	},
	inlineCode: {
		regex: inlineCodeRe,
		replacer(match, $1, $2) {
			return `<code>${$1}</code>`
		}
	},
	ulLists: {
		regex: ulListsRe,
		replacer(match, $1, $2) {
			return `<ul><li>${$1.trim()}</li></ul>`
		}
	},
	olLists: {
		regex: olListsRe,
		replacer(match, $1, $2) {
			return `<ol><li>${$1.trim()}</li></ol>`
		}
	},
	hr: {
		regex: hrRe,
		replacer() {
			return '<hr />'
		}
	},
	blockQuote: {
		regex: blockQuoteRe,
		replacer($match, $1, $2) {
			return `\n<blockquote>${$2}</blockquote>`
		}
	},
	paragraphs: {
		regex: paragraphsRe,
		replacer($match, $1) {
			const trimmed = $1.trim()
			if (paragraphsIgnoreRe.test(trimmed)) {
				return `\n${trimmed}\n`
			}
			return `\n<p>${trimmed}</p>\n`
		}
	},
	fixUl: {
		regex: fixUlRe,
		replacer($match, $1) {
			return ''
		}
	},
	fixOl: {
		regex: fixOlRe,
		replacer($match, $1) {
			return ''
		}
	},
	fixBlockquote: {
		regex: fixBlockQuoteRe,
		replacer($match, $1) {
			return ''
		}
	}
}

const markdowna = (markdown) => {
	Object.keys(rules).forEach((key) => {
		console.log('apply', key)
		markdown = markdown.replace(rules[key].regex, rules[key].replacer) // eslint-disable-line no-param-reassign
	})
	return markdown.trim()
}

export default markdowna
