/* global wp */

// Seem to need these for Parcel to render the JSX
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Import the things we need from Gutenberg on the window.wp object
 */
/*
const {
  blockEditor: { BlockEditorProvider, BlockList, WritingFlow, ObserveTyping },
  blockLibrary: { registerCoreBlocks },
  components: { Popover },
  compose: { compose },
  data: { withSelect, withDispatch, dispatch },
  element: { render, Fragment },
} = wp;
*/
const { compose } = wp;
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

const App = compose.compose(
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
)( ( { blocks, resetEditorBlocks } ) =>
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
);

registerCoreBlocks();

render(
	<App />,
	document.querySelector( '#app' )
);
