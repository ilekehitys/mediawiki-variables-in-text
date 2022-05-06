## Mediawiki: variables in text

By saving this piece of javascript code to your own hosted Mediawiki's Common.js page you can create variables in text, for example for technical documentation purposes.

Put the text into **div class="dynamic-code-block"** and write your variables like below. (left divs out since github removes them automatically).
<pre>
some text with { variable1 } here
second line with address { address } here
third line with item { item } here
and then { variable1 } again in last line
</pre>
The result will be as in picture below

You can add as many dynamic-code-block divs in your page as you like. For this to work, the wiki administrator must add the js code to Common.js once. See the documentation link below.

https://www.mediawiki.org/wiki/Adding_JavaScript_to_Wiki_Pages

Templates mentioned in official text are not mandatory. Just edit your page directly. 

Please note that this is an early version and may have some (security) issues that I am not aware of. Use at your own risk!