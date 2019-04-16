/**
 * External dependencies
 */
import '@babel/polyfill';

/**
 * WordPress dependencies
 */
import '@wordpress/editor'; // This shouldn't be necessary

import { render, useState, Fragment } from '@wordpress/element';
import {
	BlockEditorProvider,
	BlockList,
	WritingFlow,
	ObserveTyping,
} from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';
import { registerCoreBlocks } from '@wordpress/block-library';
import '@wordpress/format-library';

// For CGB
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
// import * as editWidgets from '@wordpress/edit-widgets';
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
    // editWidgets,
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
// End CGB customizations

/**
 * Internal dependencies
 */
import './style.scss';

/* eslint-disable no-restricted-syntax */
import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/editor.css';
import '@wordpress/block-library/build-style/theme.css';
import '@wordpress/format-library/build-style/style.css';
/* eslint-enable no-restricted-syntax */

function App() {
	const [ blocks, updateBlocks ] = useState( [] );
	window.blocks = blocks;

	return (
		<Fragment>
			<div className="playground__header">
				<h1 className="playground__logo">Gutenberg Playground</h1>
			</div>
			<div className="playground__body">
				<BlockEditorProvider
					value={ blocks }
					onInput={ updateBlocks }
					onChange={ updateBlocks }
				>
					<div className="editor-styles-wrapper">
						<WritingFlow>
							<ObserveTyping>
								<BlockList />
							</ObserveTyping>
						</WritingFlow>
					</div>
					<Popover.Slot />
				</BlockEditorProvider>
			</div>
		</Fragment>
	);
}

registerCoreBlocks();
render(
	<App />,
	document.querySelector( '#app' )
);
