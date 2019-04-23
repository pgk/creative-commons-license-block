/* global wp */

// We are going to observe calls to wp.blocks.registerBlockType so that we
// know the names of the custom blocks that are being registered.
const _oldBlocks = wp.blocks;
const glitchBlocks = new Set();

const observedRegisterBlockType = ( name, settings ) => {
  console.log( name );
  glitchBlocks.add( name );
  return _oldBlocks.registerBlockType( name, settings );
}

wp.blocks = Object.assign( {}, _oldBlocks );
Object.defineProperty( wp.blocks, 'registerBlockType', {
  value: observedRegisterBlockType,
  writable: true
} );

// Load our custom blocks
import './common.scss';
import './block/block.js';

// Add our custom blocks to the editor, so they show on reload
const { 
  data: { dispatch, select }, 
  blocks: { createBlock } 
} = wp;

const block = createBlock( 'cgb/block-my-block', {} );
dispatch( 'core/editor' ).insertBlock( block );
dispatch( 'core/editor' ).resetEditorBlocks( select( 'core/editor' ).getBlocks() );

document.querySelector( '#preview' ).innerHTML = wp.blocks.getBlockContent( block );

// Restore the original, unobserved registerBlockType
wp.blocks = _oldBlocks;