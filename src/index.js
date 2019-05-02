/* global wp */

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
const { createBlock, getBlockContent, getBlockTypes } = wp.blocks;
const { Popover } = wp.components;
const { registerCoreBlocks } = wp.blockLibrary;
const { withSelect, withDispatch, dispatch, select } = wp.data;
  
/**
 * Import our block! We keep it separate so it can be downloaded as a plugin without this custom loader
 */
import './block.js';

/**
 * Create a basic block editor
 */
const Editor = ( { blocks, resetEditorBlocks } ) => 
		<Fragment>
			<div className="playground__body">
				<BlockEditorProvider
					value={ blocks }
					onInput={ resetEditorBlocks }
					onChange={ resetEditorBlocks }
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

// Add all the core blocks. The custom blocks are registered in src/blocks.js
registerCoreBlocks();

// Render the editor on the page
render(
	<App />,
	document.querySelector( '#editor' )
);

// Get a list of blocks whose names do not start with "core" (core/, core-embed/…)
// Presumably, this is the the block we are working on
const glitchBlocks = getBlockTypes()
  .filter( b => ! b.name.startsWith( 'core/' ) )
  .filter( b => ! b.name.startsWith( 'core-embed/' ) );


// Add our custom block(s) to the editor, so they show on reload
let htmlPreview = '';
glitchBlocks.forEach( b => {
  const block = createBlock( b.name, {} );
  dispatch( 'core/editor' ).insertBlock( block );
  dispatch( 'core/editor' ).resetEditorBlocks( select( 'core/editor' ).getBlocks() );
  htmlPreview += getBlockContent( block );
} );

document.querySelector( '#preview' ).innerHTML = htmlPreview;

// Create a download link named after the first block we find 
// (all the blocks should be inculded, but we need a name)

const blockName = glitchBlocks[0].name;
document.querySelector( '#download-plugin' ).innerHTML = `<a href="/${blockName}.zip">Download Block Plugin for WordPress</a>`;