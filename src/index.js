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
const { Popover } = wp.components;
const { registerCoreBlocks } = wp.blockLibrary;
const { withSelect, withDispatch, dispatch } = wp.data;

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
