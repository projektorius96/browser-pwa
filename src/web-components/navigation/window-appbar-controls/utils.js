/**
 * @param {interface} HTML_Known_Element - such as `HTML{Known}Element`, where the {Known} just to name a few are as follows := {Button, Div, Input, etc.}
 * @returns taking `HTMLButtonElement` as an example, strips side parts leaving only `Button`, then de-capitalizes its first letter by resulting into a result of `button`
 */
export const getImplname = (HTML_Known_Element)=> /HTML(.+)Element/.exec(HTML_Known_Element?.name)?.[1].toLowerCase();