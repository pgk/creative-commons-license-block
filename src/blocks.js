/* global wp */

// We are going to observe calls to wp.blocks.registerBlockType so that we
// know the names of the custom blocks that are being registered.
const _oldRegisterBlockType = wp.blocks.registerBlockType;

wp.blocks.registerBlockType = (name, settings) => {
  
  
}


import './common.scss';
import './block/block.js';

const { 
  data: { dispatch, select }, 
  blocks: { createBlock } 
} = wp;

dispatch( 'core/editor' ).insertBlock( createBlock( 'cgb/block-my-block', {} ) );
dispatch( 'core/editor' ).resetEditorBlocks( select( 'core/editor' ).getBlocks() );
