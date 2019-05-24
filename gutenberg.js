/**
 * This is the file that creates the Gutenberg assets on the Glitch CDN
 *
 * It is here for reference and reproducability. You shouldn't actually need this
 * to do any block development.
 *
 * It imports all the packages, then exports them on `window.wp`. You may need
 * to update this when a new version of Gutenberg is released. Or you can re-remix
 * the original project, it will be kept up to date with Gutenberg.
 *
 * To build this:
 *  1. Check out Gutenberg locally from https://github.com/wordpress/gutenberg
 *  2. Add/remove any packages changed below
 *  3. `npm install`
 *  4. Place this file in the gutenberg root directory (same as gutenberg.php)
 *  5. Run this command: `$(npm bin)/parcel build gutenberg.js -d dist/`
 *  6. Upload the files in dist/ to the Glitch assets
 *     6a. You can update the .js and .css files' sourcemap URLs with the CDN URLs
 *  7. Update src/index.html with the new CDN URLs
 *
 * Theoretcially, this _could_ be built on Glitch, but not all packages are currently
 * published to npm and it exceeds the resource limits in tests.
 */

/**
 * External dependencies
 */
import '@babel/polyfill';
import './playground/src/style.scss'

/**
 * WordPress dependencies
 */
import * as a11y from '@wordpress/a11y';
import * as annotations from '@wordpress/annotations';
import * as apiFetch from '@wordpress/api-fetch';
import * as autop from '@wordpress/autop';
import * as blob from '@wordpress/blob';
import * as blockEditor from '@wordpress/block-editor';
import * as blockLibrary from '@wordpress/block-library';
import * as blockSerializationDefaultParser from '@wordpress/block-serialization-default-parser';
import * as blockSerializationSpecParser from '@wordpress/block-serialization-spec-parser';
import * as blocks from '@wordpress/blocks';
import * as components from '@wordpress/components';
import * as compose from '@wordpress/compose';
import * as coreData from '@wordpress/core-data';
import * as data from '@wordpress/data';
import * as date from '@wordpress/date';
import * as deprecated from '@wordpress/deprecated';
import * as dom from '@wordpress/dom';
import * as domReady from '@wordpress/dom-ready';
import * as editPost from '@wordpress/edit-post';
import * as editWidgets from '@wordpress/edit-widgets';
import * as editor from '@wordpress/editor';
import * as element from '@wordpress/element';
import * as escapeHtml from '@wordpress/escape-html';
import * as formatLibrary from '@wordpress/format-library';
import * as hooks from '@wordpress/hooks';
import * as htmlEntities from '@wordpress/html-entities';
import * as i18n from '@wordpress/i18n';
import * as isShallowEqual from '@wordpress/is-shallow-equal';
import * as keycodes from '@wordpress/keycodes';
import * as listReusableBlocks from '@wordpress/list-reusable-blocks';
import * as notices from '@wordpress/notices';
import * as nux from '@wordpress/nux';
import * as plugins from '@wordpress/plugins';
import * as priorityQueue from '@wordpress/priority-queue';
import * as reduxRoutine from '@wordpress/redux-routine';
import * as richText from '@wordpress/rich-text';
import * as shortcode from '@wordpress/shortcode';
import * as tokenList from '@wordpress/token-list';
import * as url from '@wordpress/url';
import * as viewport from '@wordpress/viewport';
import * as wordcount from '@wordpress/wordcount';

const wp = {
    a11y,
    annotations,
    apiFetch,
    autop,
    blob,
    blockEditor,
    blockLibrary,
    blockSerializationDefaultParser,
    blockSerializationSpecParser,
    blocks,
    components,
    compose,
    coreData,
    data,
    date,
    deprecated,
    dom,
    domReady,
    editPost,
    editWidgets,
    editor,
    element,
    escapeHtml,
    formatLibrary,
    hooks,
    htmlEntities,
    i18n,
    isShallowEqual,
    keycodes,
    listReusableBlocks,
    notices,
    nux,
    plugins,
    priorityQueue,
    reduxRoutine,
    richText,
    shortcode,
    tokenList,
    url,
    viewport,
    wordcount,
};

window.wp = wp;

/* eslint-disable no-restricted-syntax */
import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/block-library/build-style/theme.css';
import '@wordpress/format-library/build-style/style.css';
