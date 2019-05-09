/* global wp */

/**
 * This is the glue that takes your custom block and displays it on the page
 *
 * It creates a block editor, adds your custom block, and then renders
 * the output. Think of this as a little Gutenberg without WordPress
 */

// Seem to need these for Parcel to render the JSX
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Import the things we need from Gutenberg on the window.wp object
 */
const { compose } = wp.compose;
const { render, Fragment } = wp.element;
const {
	BlockEditorProvider,
	BlockList,
	WritingFlow,
	ObserveTyping,
} = wp.blockEditor;
const { createBlock, getBlockContent, getBlockTypes, serialize } = wp.blocks;
const { Popover } = wp.components;
const { registerCoreBlocks } = wp.blockLibrary;
const { withSelect, withDispatch, dispatch, select } = wp.data;

/**
 * Import our block! We keep it separate so it can be downloaded as a plugin without this custom loader
 */
import './block.js';

// Add all the core blocks. The custom blocks are registered in src/blocks.js
registerCoreBlocks();

// Get a list of blocks whose names do not start with "core" (core/, core-embed/…)
// Presumably, this is the the block we are working on
const glitchBlocks = getBlockTypes()
	.filter( b => !b.name.startsWith( 'core/' ) )
	.filter( b => !b.name.startsWith( 'core-embed/' ) );

// Add our custom block(s) to the editor, so they show on reload
// TODO persist editor state, only do this when there's no editor state persisted
glitchBlocks.forEach( b => {
	const block = createBlock( b.name, {} );
	dispatch( 'core/editor' ).insertBlock( block );
	dispatch( 'core/editor' ).resetEditorBlocks( select( 'core/editor' ).getBlocks() );
} );

/**
 *
 */
const Preview = ( {} ) => {
  return <div className="playground__preview" key={ previewHtml } dangerouslySetInnerHTML={ preview() }></div>
}

/**
 * Create a basic block editor
 */
const Editor = ( { blocks, resetEditorBlocks } ) => {
  let previewHtml = { __html: blocks ? serialize( blocks ) : '' };
  let html = blocks ? serialize( blocks ) : '';
  let oldBlocks;

	const onChange = ( newBlocks ) => {
		resetEditorBlocks();
    html = serialize( newBlocks );
    previewHtml = { __html: serialize( newBlocks ) };
    oldBlocks = newBlocks;
	}

	const preview = () => previewHtml;

	return <Fragment>
		<h1 title="This is what you'll see in Gutenberg">
			Editor
    </h1>

		<div className="playground__body">
			<BlockEditorProvider
				value={blocks}
				onInput={onChange}
				onChange={onChange}
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

		<h1 title="This is what you'll see when published">
			Published
    </h1>
		<div className="playground__preview" key={ previewHtml } dangerouslySetInnerHTML={ preview() }></div>
    
    <h1>Download Block Plugin for WordPress</h1>
    {/* Create a download link named after the first block we find */ }
    {/* (all blocks should be inculded in the file, but we need a name) */}
    <a href={'/' + glitchBlocks[ 0 ].name + '.zip'}>Download Block Plugin for WordPress</a>
	</Fragment>
};

/**
 * This connects the Editor to our data layer's select and dispatch
 * 
 * withSelect and withDispatch create functions that are bound to 
 * wp.data's select and dispatch, so when we call getEditorBlocks()
 * it can select from wp.data's store
 */
const App = compose(
	withSelect( ( select ) => {
		const { getEditorBlocks } = select( 'core/editor' );
		return {
			blocks: getEditorBlocks()
		}
	} ),
	withDispatch( ( dispatch ) => {
		const { resetEditorBlocks } = dispatch( 'core/editor' );
		return { resetEditorBlocks };
	} )
)( Editor );

// Render the editor on the page
render(
	<App />,
	document.querySelector( '#editor' )
);