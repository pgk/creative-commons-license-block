/**
 * Import the things we need from Gutenberg on the window.wp object
 */
/* global wp */
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
			<div className="playground__header">
				<h1 className="playground__logo">Gutenberg Playground</h1>
			</div>
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

/**
 * Auto-add our block to the editor
 */
dispatch( 'core/editor' ).insertBlock( wp.blocks.createBlock( 'cgb/block-my-block', {} ) );
dispatch( 'core/editor' ).resetEditorBlocks( wp.data.select( 'core/editor' ).getBlocks() );

render(
	<App />,
	document.querySelector( '#app' )
);
