/* global wp, localStorage */

/**
 * This is the glue that takes your custom block and displays it on the page
 *
 * It creates a block editor, adds your custom block, and then renders
 * the output. Think of this as a little Gutenberg without WordPress
 */

// Seem to need these for Parcel to render the JSX
import React from 'react';
import ReactDOM from 'react-dom';

// Import our block! We keep it separate so it can be downloaded as a plugin without this custom loader
import './block.js';

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
const { createBlock, getBlockTypes, serialize, parse } = wp.blocks;
const { Popover } = wp.components;
const { registerCoreBlocks } = wp.blockLibrary;
const { withSelect, withDispatch } = wp.data;

const BLOCK_PERSIST = 'BLOCK_PERSIST';

// Add all the core blocks. The custom blocks are registered in src/blocks.js
registerCoreBlocks();

/**
 * Create a block editor
 */
class Editor extends React.Component {
  constructor( props ) {
    super( props );
    
    // If we don't have anything persisted in the editor, add our custom blocks
    if ( props.blocks.length === 0 ) {
      this.populateDefaultBlocks();
    }
    
    this.state = { previewHtml: serialize( props.getBlocks() ) };
    this.onChange = this.onChange.bind( this );
    this.clearPersistance = this.clearPersistance.bind( this );
  }
  
  innerHtml( __html ) {
    return { __html }
  }
  
  clearPersistance() {
    localStorage.removeItem( BLOCK_PERSIST );
    this.props.removeBlocks( this.props.getBlocks().map( b => b.clientId ) )
    this.populateDefaultBlocks();
  }
  
  populateDefaultBlocks() {
    const { defaultBlocks, insertBlock, resetEditorBlocks, getBlocks } = this.props;

    defaultBlocks.forEach( blockName => {
      insertBlock( createBlock( blockName, {} ) );
    } );

    resetEditorBlocks( getBlocks() );
  }
  
  onChange( newBlocks ) {
    this.props.resetEditorBlocks();
    const previewHtml = serialize( newBlocks );
    this.setState( { previewHtml } );
    localStorage.setItem( BLOCK_PERSIST, previewHtml ); 
  }
                 
  render() {
    return <Fragment>
      <section className="playground">
        <h1 title="This is what you'll see in Gutenberg">
          Editor
        </h1>

        <div className="playground__body">
          <BlockEditorProvider
            value={this.props.blocks}
            onInput={this.onChange}
            onChange={this.onChange}
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
      </section>

      <section className="playground">
        <h1 title="This is what you'll see when published">
          Published
        </h1>
        <div className="playground__preview" dangerouslySetInnerHTML={ this.innerHtml( this.state.previewHtml ) }></div>
      </section>

      <section>
        <h1>Download Block Plugin for WordPress</h1>
        {/* Create a download link named after the first block we find */ }
        {/* all blocks should be inculded in the file, but we need a name */}
        <a href={'/' + this.props.defaultBlocks[ 0 ] + '.zip'}>Download Block Plugin for WordPress</a>

        <h1>Reset Editor</h1>
        <button onClick={ this.clearPersistance }>Clear Editor</button>
      </section>
    </Fragment>
  }
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
      const { getEditorBlocks, getBlocks } = select( 'core/editor' );
      const persistedContent = localStorage.getItem( BLOCK_PERSIST );
      const blocks = persistedContent ? parse( persistedContent ) : getEditorBlocks();
      return { blocks, getBlocks }
    } ),
    withDispatch( ( dispatch ) => {
        const { resetEditorBlocks, insertBlock, removeBlocks } = dispatch( 'core/editor' );
        return { resetEditorBlocks, insertBlock, removeBlocks };
    } )
)( Editor );

// Get a list of blocks whose names do not start with "core" (core/, core-embed/…)
// Presumably, this is the the block we are working on
// Please don't use a core namespace for your block
const glitchBlocks = getBlockTypes()
  .map( b => b.name )
  .filter( b => !b.startsWith( 'core/' ) )
  .filter( b => !b.startsWith( 'core-embed/' ) )

// Render the editor on the page
render(
    <App defaultBlocks={ glitchBlocks } />,
    document.querySelector( '#editor' )
);